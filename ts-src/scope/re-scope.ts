import {ExecutionContextI} from '@franzzemen/app-utility';
import {ApplicationScope} from '@franzzemen/re-application';
import {Scope} from '@franzzemen/re-common';
import {ReOptions} from './re-options.js';

export class ReScope extends ApplicationScope {
  constructor(options?: ReOptions, ec?: ExecutionContextI) {
    super(options, undefined, ec);
  }
}
