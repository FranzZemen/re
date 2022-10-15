import {ExecutionContextI} from '@franzzemen/app-utility';
import {ApplicationScope} from '@franzzemen/re-application';
import {ReOptions} from './re-options.js';
import {ReParser} from '../parser/re-parser.js';

export class ReScope extends ApplicationScope {
  static ReParser = 'ReParser';
  constructor(options?: ReOptions, ec?: ExecutionContextI) {
    super(options, undefined, ec);
    this.set(ReScope.ReParser, new ReParser());
  }
}
