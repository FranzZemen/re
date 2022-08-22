import {ExecutionContextI} from '@franzzemen/app-utility';
import {ApplicationScope} from '@franzzemen/re-application';
import {Scope} from '@franzzemen/re-common';
import {ReOptions} from './re-options';

export class ReScope extends ApplicationScope {
  constructor(options?: ReOptions, parentScope?: Scope, ec?: ExecutionContextI) {
    super(options, parentScope, ec);
  }
}
