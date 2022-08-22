import {ExecutionContextI, LoggerAdapter} from '@franzzemen/app-utility';
import {ApplicationParser, ApplicationReference} from '@franzzemen/re-application';
import {Scope} from '@franzzemen/re-common';
import {RuleContainerParser} from '@franzzemen/re-rule';
import {ReReference} from '../re-reference';
import {ReOptions} from '../scope/re-options';
import {ReScope} from '../scope/re-scope';
import {ReHintKey} from '../util/re-hint-key';


const rulesEngineHintPrefix = 're';

/**
 * The ReParser is used to parse entire rules engine repositories.  It is "the" top level parser.
 */
export class ReParser extends RuleContainerParser<ReReference> {

  constructor() {
    super(ReHintKey.RulesEngine, []);
  }


  protected createScope(options: ReOptions | undefined, parentScope: Scope | undefined, ec: ExecutionContextI | undefined): Scope {
    return new ReScope(options, parentScope, ec);
  }

  protected createReference(refName: string, options: ReOptions): ReReference {
    return {
      refName: 'Re.Engine',
      applications: [],
      options
    };
  }

  protected delegateParsing(ref: ReReference, near: string, scope:ReScope, ec?: ExecutionContextI): string {
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

  parseText(textFormat: string, ec?: ExecutionContextI): ReReference {
    let [,ref,] = this.parse(textFormat, undefined, ec);
    if(!ref) {
      ref = this.createReference(undefined, {});
    }
    return ref;
  }

}
