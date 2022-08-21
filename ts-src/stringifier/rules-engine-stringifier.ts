import {ExecutionContextI} from '@franzzemen/app-utility';
import {ApplicationStringifier} from '../../application/stringifier/application-stringifier';
import {HintKey} from '../../hint-key';
import {Scope} from '../../scope';
import {StringifyOptions} from '../../stringify-options';
import {RulesEngineReference} from '../rules-engine-reference';

export class RulesEngineStringifier {
  constructor() {
  }
  stringify(reReference: RulesEngineReference, scope: Scope, options?: StringifyOptions, ec?: ExecutionContextI) {
    let stringified;
    // TODO stringify options
    if(reReference.refName.indexOf(' ') < 0) {
      stringified = `<<${HintKey.RulesEngine} name=${reReference.refName}>>`;
    } else {
      stringified = `<<${HintKey.RulesEngine} name="${reReference.refName}">>`;
    }
    const applicationStringifier = new ApplicationStringifier();
    reReference.applications.forEach(application => {
      stringified += ` ${applicationStringifier.stringify(application, scope, options, ec)}`;
    });
    return stringified;
  }
}
