// TODO:  Provide a way to remove custome elements and options

import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {Application, isApplication} from '../application/application';
import {ApplicationReference} from '../application/application-reference';
import {ApplicationParser} from '../application/parser/application-parser';
import {isPromise} from '../../../../re-common/ts-src/util/is-promise';
import {ReferenceType} from '../optioned-reference';
import {Options} from '../options';
import {RuleElementFactory} from '@franzzemen/re-common';
import {RuleElementInstanceReference, RuleElementModuleReference} from '@franzzemen/re-common';
import {RuleSet} from '../rule-set/rule-set';
import {RuleParser} from '../rule/parser/rule-parser';
import {possiblyARuleConstruct, Rule} from '../rule/rule';
import {Scope} from '../scope';
import {ScopeKey} from '../../../../re-common/ts-src/scope/scope-key';
import {ScopeType} from '../scope-type';
import {ApplicationResult, RuleResult, ValidationResults} from '../validation-result';
import {RulesEngineParser} from './parser/rules-engine-parser';
import {RulesEngineReference} from './rules-engine-reference';




export class Rules extends RuleElementFactory<Application> {
  static Engine = new Rules();
  private scope: Scope;

  private constructor(options?: Options, ec?: ExecutionContextI) {
    super();
    // The top level structural scope is type Global of name Global
    this.scope = new Scope(ScopeType.Global, ScopeType.Global, undefined, ec);
    if(options) {
      this.setOptions(options, ec);
    }
  }

  to(ec?: ExecutionContextI) : RulesEngineReference {
    const rulesEngineRef: RulesEngineReference = {type: ReferenceType.RulesEngine, refName: 'Rules.Engine', options: this.scope.get(ScopeKey.Options), applications: []};
    this.getApplications().forEach(application => rulesEngineRef.applications.push(application.to(ec)));
    return rulesEngineRef;
  }

  isC(obj: any): obj is Application {
    return isApplication(obj);
  }

  setOptions(options: Options, ec?: ExecutionContextI) {
    this.scope.init(options, ec);
  }

  getScope(): Map<string, any> {
    return this.scope;
  }

  register(reference: RuleElementModuleReference | RuleElementInstanceReference<Application>, override?: boolean, ec?: ExecutionContextI, ...params): Application {
    throw new Error('Do not use this method, use addApplication instead');
  }

  unregister(refName: string, ec? : ExecutionContextI): boolean {
    throw new Error('Do not use this method, use removeApplication instead');
  }

  getRegistered(name: string, ec? : ExecutionContextI): Application {
    throw new Error('Do not use this method, use getApplication instead')
  }

  addApplication(app: Application | ApplicationReference | string, ec?: ExecutionContextI) {
    if(isApplication(app)) {
      super.register({refName: app.refName, instance: app}, false, ec);
    } else {
      const theApp = new Application(app, this.scope, ec);
      super.register({refName: theApp.refName, instance: theApp}, false, ec);
    }
  }
  
  getApplication(refName: string, ec? : ExecutionContextI): Application {
    return super.getRegistered(refName, ec);
  }

  getApplications(ec? : ExecutionContextI): Application [] {
    return this.getAllInstances();
  }

  removeApplication(refName: string, ec? : ExecutionContextI) {
    return super.unregister(refName, ec);
  }

  /**
   * This method executes all the rules in the Rules Engine Scope
   * @param dataDomain
   * @param ec
   */
  awaitExecution(dataDomain: any, ec?: ExecutionContextI): ValidationResults | Promise<ValidationResults> {
    const log = new LoggerAdapter(ec, 'rules-engine', 'rules', 'awaitExecution');
    const applicationResults: ApplicationResult[] = [];
    const applicationResultsPromises: Promise<ApplicationResult>[] = [];
    let hasPromises = false;
    this.repo.forEach(element => {
      const application: Application = element.instanceRef.instance;
      const result = application.awaitExecution(dataDomain, ec);
      if(isPromise(result)) {
        hasPromises = true;
        applicationResults.push(undefined);
        applicationResultsPromises.push(result);
      } else {
        applicationResults.push(result);
        applicationResultsPromises.push(undefined);
      }
    });
    if(hasPromises) {
      return Promise.all(applicationResultsPromises)
        .then(settledPromises => {
          settledPromises.forEach((settled, index) => {
            if(settled !== undefined) {
              applicationResults[index] = settled;
            }
          });
          return {
            applicationResults,
            valid: applicationResults.every(result => result.valid === true)
          }
        })
    } else {
      return {
        applicationResults,
        valid: applicationResults.every(result => result.valid === true)
      };
    }
  }
/*
  awaitApplicationExecution(domain: any, appText: string, ec?: ExecutionContextI): ApplicationResult | Promise<ApplicationResult> {
    if(possiblyARuleConstruct(appText)) {
      const parser = new ApplicationParser();
      let [remaining, App]
    } else {
      // Application name...
    }
  }

 */

  /**
   * This method executes a provided rule (in Text Format).  If the ruleText is not possibly a rule, then it is treated
   * as a rule name.
   * @param domain
   * @param ruleText
   * @param ec
   */
  awaitRuleExecution(domain: any, ruleText: string, ec?: ExecutionContextI) : RuleResult | Promise<RuleResult> {
    let rule: Rule;
    if(possiblyARuleConstruct(ruleText)) {
      const parser = new RuleParser();
      const [remaining, ruleReference] = parser.parse(ruleText, undefined, ec);
      rule = new Rule(ruleReference, undefined, ec);

    } else {
      rule = this.findFirstRule(ruleText, ec);
    }
    if(rule) {
      return rule.awaitExecution(domain, ec);
    } else {
      const log = new LoggerAdapter(ec, 'rules-engine', 'rules', 'awaitExecution');
      log.warn(`No rule for ${ruleText}`);
      return {valid: false, ruleRef:undefined, ruleText};
    }
  }

  /**
   * This method executes a provided rule, forcing synchronicity
   * @param domain
   * @param ruleText
   * @param ec
   */
  executeRuleSync(domain: any, ruleText: string, ec?: ExecutionContextI) : RuleResult {
    const parser = new RuleParser();
    const [remaining, ruleReference] = parser.parse(ruleText,undefined, ec);
    const rule = new Rule(ruleReference,undefined, ec);
    return rule.executeSync(domain, ec);
  }


  load(schema: string, ec?: ExecutionContextI): Rules {
    return this.parseEngine(schema, ec);
  }

  /**
   * @deprecated use load
   * @param ruleText
   * @param ec
   */
  parseEngine(ruleText: string, ec?: ExecutionContextI): Rules {
    const parser = new RulesEngineParser();
    let ref = parser.parseText(ruleText, ec);
    // TODO: Should we really reset options?
    this.setOptions(ref.options, ec);
    ref.applications.forEach(appRef => this.addApplication(new Application(appRef, this.scope, ec)));
    return this;
  }

  findFirstRuleSet(ruleSetName, ec?: ExecutionContextI): RuleSet {
    const applications = this.getApplications(ec);
    for(let i = 0; i < applications.length; i++) {
      const ruleSet = applications[i].getRuleSet(ruleSetName, ec);
      if(ruleSet) {
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
    for(let i = 0; i < applications.length; i++) {
      const ruleSets = applications[i].getRuleSets();
      for(let j = 0; j < ruleSets.length; j++) {
        const rule = ruleSets[j].getRule(ruleName, ec);
        if(rule) {
          return rule;
        }
      }
    }
  }



}
