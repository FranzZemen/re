import {LogExecutionContext} from '@franzzemen/logger-adapter';
import {ApplicationStringifier} from '@franzzemen/re-application';

import {ReReference} from '../re-reference.js';
import {ReScope} from '../scope/re-scope.js';
import {ReHintKey} from '../util/re-hint-key.js';
import {StringifyReOptions} from './stringify-re-options.js';

export class ReStringifier {
  constructor() {
  }
  stringify(reReference: ReReference, scope: ReScope, options?: StringifyReOptions, ec?: LogExecutionContext) {
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
