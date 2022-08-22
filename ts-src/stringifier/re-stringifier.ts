import {ExecutionContextI} from '@franzzemen/app-utility';
import {ApplicationStringifier} from '@franzzemen/re-application';

import {ReReference} from '../re-reference';
import {ReScope} from '../scope/re-scope';
import {ReHintKey} from '../util/re-hint-key';
import {StringifyReOptions} from './stringify-re-options';

export class ReStringifier {
  constructor() {
  }
  stringify(reReference: ReReference, scope: ReScope, options?: StringifyReOptions, ec?: ExecutionContextI) {
    let stringified;
    // TODO stringify options
    if(reReference.refName.indexOf(' ') < 0) {
      stringified = `<<${ReHintKey.RulesEngine} name=${reReference.refName}>>`;
    } else {
      stringified = `<<${ReHintKey.RulesEngine} name="${reReference.refName}">>`;
    }
    const applicationStringifier = new ApplicationStringifier();
    reReference.applications.forEach(application => {
      stringified += ` ${applicationStringifier.stringify(application, scope, options, ec)}`;
    });
    return stringified;
  }
}
