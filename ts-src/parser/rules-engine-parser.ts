import {ExecutionContextI, Hints, LoggerAdapter} from '@franzzemen/app-utility';
import {ApplicationParser} from '../../application/parser/application-parser';
import {ApplicationReference} from '../../application/application-reference';
import {HintKey} from '../../hint-key';
import {ReferenceType} from '../../optioned-reference';
import {Options} from '../../options';
import {RuleContainerParser} from '../../rule-container-parser/rule-container-parser';
import {ScopeKey} from '../../../../../re-common/ts-src/scope/scope-key';
import {ScopeType} from '../../scope-type';
import {RulesEngineReference} from '../rules-engine-reference';


const rulesEngineHintPrefix = 're';

/**
 * The RulesEngineParser is used to parse entire rules engine repositories.  It is "the" top level parser.
 */
export class RulesEngineParser extends RuleContainerParser<RulesEngineReference> {

  constructor() {
    super(ScopeType.Global, HintKey.RulesEngine, []);
  }

  protected createReference(refName: string, options: Options): RulesEngineReference {
    return {
      type: ReferenceType.RulesEngine,
      refName: 'Rules.Engine',
      applications: [],
      options
    };
  }

  protected delegateParsing(ref: RulesEngineReference, near: string, scope: Map<string,any>, ec?: ExecutionContextI): string {
    const log = new LoggerAdapter(ec, 'rules-engine', 'rules-engine-parser', 'delegateParsing');
    let remaining = near;
    // The remaining text format must fully be digested by the remaining text, and pass in hints or returned hints from further down
    // must be Application hints (until there's another top level rule container or other artifact)
    while(remaining.length > 0) {
      const appParser: ApplicationParser = new ApplicationParser();
      let appReference: ApplicationReference;
      [remaining, appReference] = appParser.parse(remaining, scope, ec);
      if(appReference) {
        ref.applications.push(appReference);
      } else if (remaining.length > 0) {
        // It is expected that a properly formatted Text representation will have fully consumed input.
        let err = new Error(`Unexpected tokens near "${near}" and before "${remaining}"`);
        log.error(err);
        throw err;
      }
    }
    if(remaining.length > 0) {
      let err = new Error(`Unexpected tokens near "${near}" and before "${remaining}"`);
      log.error(err);
      throw err;
    } else {
      return remaining;
    }
  }

  parseText(textFormat: string, ec?: ExecutionContextI): RulesEngineReference {
    let [,ref,] = this.parse(textFormat, undefined, ec);
    if(!ref) {
      ref = this.createReference(undefined, {});
    }
    return ref;
  }
}
