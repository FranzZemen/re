import {LogExecutionContext} from '@franzzemen/logger-adapter';
import {ApplicationScope} from '@franzzemen/re-application';
import {ReParser} from '../parser/re-parser.js';
import {ReRulesEngine} from './re-execution-options.js';

export class ReScope extends ApplicationScope {
  static ReParser = 'ReParser';

  constructor(options?: ReRulesEngine, ec?: LogExecutionContext) {
    super(options, undefined, ec);
    this.set(ReScope.ReParser, new ReParser());
  }

  get options(): ReRulesEngine {
    return this._options;
  }
}
