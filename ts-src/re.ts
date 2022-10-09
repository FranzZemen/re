import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {Application, ApplicationResult, isApplication} from '@franzzemen/re-application';
import {RuleElementFactory, RuleElementReference, Scope} from '@franzzemen/re-common';
import {Rule} from '@franzzemen/re-rule';
import {RuleSet} from '@franzzemen/re-rule-set';
import {isPromise} from 'node:util/types';
import {ReParser} from './parser/re-parser.js';
import {ReReference} from './re-reference.js';
import {_mergeReOptions, ReOptions} from './scope/re-options.js';
import {ReScope} from './scope/re-scope.js';


export interface ReResult {
  valid: boolean;
  applicationResults: ApplicationResult[];
}


export class Re extends RuleElementFactory<Application> {
  static Engine = new Re();
  scope: ReScope;
  private options: ReOptions;

  private constructor(options?: ReOptions, ec?: ExecutionContextI) {
    super();
    // The top level structural scope is type Global of name Global
    this.scope = new ReScope(options, ec);
    this.options = options;
  }

  to(ec?: ExecutionContextI): ReReference {
    /*
    const rulesEngineRef: ReReference = {refName: 'Re.Engine', options: this.options, applications: []};
    this.getApplications().forEach(application => rulesEngineRef.applications.push(application.to(ec)));
    return rulesEngineRef;*/
    return undefined;
  }

  isC(obj: any): obj is Application {
    return isApplication(obj);
  }

  register(reference: RuleElementReference<Application>, ec?: ExecutionContextI, ...params): Application {
    throw new Error('Do not use this method, use addApplication instead');
  }

  unregister(refName: string, ec?: ExecutionContextI): boolean {
    throw new Error('Do not use this method, use removeApplication instead');
  }

  getRegistered(name: string, ec?: ExecutionContextI): Application {
    const log = new LoggerAdapter(ec, 're', 're','getRegistered');
    log.warn('Do not use this method, use getApplication instead');
    return super.getRegistered(name,ec);
  }

  addApplication(app: Application, ec?: ExecutionContextI) {
    app.scope.reParent(this.scope);
    super.register({instanceRef: {refName: app.refName, instance: app}}, ec);
  }

  getApplication(refName: string, ec?: ExecutionContextI): Application {
    return super.getRegistered(refName, ec);
  }

  getApplications(ec?: ExecutionContextI): Application [] {
    return this.getAllInstances();
  }

  removeApplication(refName: string, ec?: ExecutionContextI) {
    const app: Application = super.getRegistered(refName, ec);
    if (app) {
      app.scope.removeParent(ec);
      return super.unregister(refName, ec);
    }
  }

  /**
   * This method executes all the rules in the Re Engine Scope
   * @param dataDomain
   * @param ec
   */
  awaitEvaluation(dataDomain: any, ec?: ExecutionContextI): ReResult | Promise<ReResult> {
    const log = new LoggerAdapter(ec, 're', 'rules', 'awaitEvaluation');
    const applicationResults: ApplicationResult[] = [];
    const applicationResultsPromises: Promise<ApplicationResult>[] = [];
    let hasPromises = false;
    this.repo.forEach(element => {
      const application: Application = element.instanceRef.instance;
      const result = application.awaitEvaluation(dataDomain, ec);
      if (isPromise(result)) {
        hasPromises = true;
        applicationResults.push(undefined);
        applicationResultsPromises.push(result);
      } else {
        applicationResults.push(result);
        applicationResultsPromises.push(undefined);
      }
    });
    if (hasPromises) {
      return Promise.all(applicationResultsPromises)
        .then(settledPromises => {
          settledPromises.forEach((settled, index) => {
            if (settled !== undefined) {
              applicationResults[index] = settled;
            }
          });
          return {
            applicationResults,
            valid: applicationResults.every(result => result.valid === true)
          };
        });
    } else {
      return {
        applicationResults,
        valid: applicationResults.every(result => result.valid === true)
      };
    }
  }

  /**
   * This method executes a provided rule (in Text Format).  If the ruleText is not possibly a rule, then it is treated
   * as a rule name.
   * @param domain
   * @param ruleText
   * @param ec
   */
  /*
  awaitExecution(domain: any, ruleText: string, ec?: ExecutionContextI): RuleResult | Promise<RuleResult> {
    let rule: Rule;
    if (possiblyARuleConstruct(ruleText)) {
      const parser = new RuleParser();
      const [remaining, ruleReference] = parser.parse(ruleText, undefined, ec);
      rule = new Rule(ruleReference, undefined, ec);
    } else {
      rule = this.findFirstRule(ruleText, ec);
    }
    if (rule) {
      return rule.awaitExecution(domain, ec);
    } else {
      const log = new LoggerAdapter(ec, 'rules-engine', 'rules', 'awaitExecution');
      log.warn(`No rule for ${ruleText}`);
      return {valid: false, ruleRef: undefined, ruleText};
    }
  }*/

  /**
   * This method executes a provided rule, forcing synchronicity
   * @param domain
   * @param text
   * @param ec
   */


  awaitExecution(domain: any, text: string, ec?: ExecutionContextI): ReResult | Promise<ReResult> {
    const truOrPromise = this.load(text, ec);
    if(isPromise(truOrPromise)) {
      truOrPromise
        .then(truVal => {
          return this.awaitEvaluation(domain, ec);
        })
    } else {
      return this.awaitEvaluation(domain, ec);
    }
  }


  load(text: string, ec?: ExecutionContextI): true | Promise<true> {
    const parser = new ReParser();
    let [remaining, ref, parserMessages] = parser.parse(text, {options: this.scope.options, mergeFunction: _mergeReOptions},undefined, ec);
    // The combination of the current options in scope, which was originally initialized by them, along with the merge of those
    // Into loaded options, becomes the options for this scope recreated through parsing.
    this.scope = ref.loadedScope;
    const truOrPromise = Scope.resolve(this.scope, ec);
    if(isPromise(truOrPromise)) {
      truOrPromise
        .then(truVal => {
          ref.applications.forEach(appRef => this.addApplication(new Application(appRef, this.scope, ec)));
          return true;
        })
    } else {
      ref.applications.forEach(appRef => this.addApplication(new Application(appRef, this.scope, ec)));
      return true;
    }
  }

  clear() {
    this.repo.clear();
  }

  findFirstRuleSet(ruleSetName, ec?: ExecutionContextI): RuleSet {
    const applications = this.getApplications(ec);
    for (let i = 0; i < applications.length; i++) {
      const ruleSet = applications[i].getRuleSet(ruleSetName, ec);
      if (ruleSet) {
        return ruleSet;
      }
    }
  }

  /**
   * Note this has runtime of [count of rule sets] * [count of rules in rule sets]
   * @param ruleName
   * @param ec
   */
  findFirstRule(ruleName: string, ec?: ExecutionContextI): Rule {
    const applications = this.getApplications(ec);
    for (let i = 0; i < applications.length; i++) {
      const ruleSets = applications[i].getRuleSets();
      for (let j = 0; j < ruleSets.length; j++) {
        const rule = ruleSets[j].getRule(ruleName, ec);
        if (rule) {
          return rule;
        }
      }
    }
  }


}
