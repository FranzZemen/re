import {LogExecutionContext, LoggerAdapter} from '@franzzemen/logger-adapter';
import {ApplicationParser, ApplicationReference, ApplicationScope} from '@franzzemen/re-application';
import {ParserMessages, Scope} from '@franzzemen/re-common';
import {DelegateOptions, RuleContainerParser, RuleOptionOverrides} from '@franzzemen/re-rule';
import {ReReference} from '../re-reference.js';
import {ReRulesEngine, RulesEngineOptions} from '../scope/re-execution-options.js';
import {ReScope} from '../scope/re-scope.js';
import {ReHintKey} from '../util/re-hint-key.js';


const rulesEngineHintPrefix = 're';

/**
 * The ReParser is used to parse entire rules engine repositories.  It is "the" top level parser.
 */
export class ReParser extends RuleContainerParser<ReReference> {

  constructor() {
    super(ReHintKey.RulesEngine, []);
  }

  protected createScope(options?: ReRulesEngine, parentScope?: Scope, ec?: LogExecutionContext): ReScope {
    return new ReScope(options, ec);
  }

  protected createReference(refName: string, options: ReRulesEngine): ReReference {
    return {
      refName: 'Rules.Engine',
      applications: [],
      options
    };
  }

  protected delegateParsing(ref: ReReference, near: string, scope: ReScope, ec?: LogExecutionContext): [string, ParserMessages] {
    const log = new LoggerAdapter(ec, 'rules-engine', 'rules-engine-parser', 'delegateParsing');
    let remaining = near;
    // The remaining text format must fully be digested by the remaining text, and pass in hints or returned hints from further down
    // must be Application hints (until there's another top level rule container or other artifact)
    while (remaining.length > 0) {
      const appParser: ApplicationParser = new ApplicationParser();
      let appReference: ApplicationReference, appScope: ApplicationScope, parserMessages: ParserMessages;
      let delegateOptions: DelegateOptions;
      let appOverrides: RuleOptionOverrides[] = (scope?.options as ReRulesEngine)?.['re-rules-engine']?.applicationOverrides;
      if (appOverrides && appOverrides.length > 0) {
        delegateOptions = {overrides: appOverrides};
      }
      [remaining, appReference, parserMessages] = appParser.parse(remaining, delegateOptions, scope, ec);
      if (appReference) {
        ref.applications.push(appReference);
      } else if (remaining.length > 0) {
        // It is expected that a properly formatted Text representation will have fully consumed input.
        let err = new Error(`Unexpected tokens near "${near}" and before "${remaining}"`);
        log.error(err);
        throw err;
      }
    }
    if (remaining.length > 0) {
      let err = new Error(`Unexpected tokens near "${near}" and before "${remaining}"`);
      log.error(err);
      throw err;
    } else {
      return [remaining, undefined];
    }
  }

}
