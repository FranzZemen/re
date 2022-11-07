import {ApplicationReference} from '@franzzemen/re-application';
import {ScopedReference} from '@franzzemen/re-rule';
import {ReRulesEngine} from './scope/re-execution-options.js';

export interface ReReference extends ScopedReference {
  options: ReRulesEngine;
  applications: ApplicationReference[];
}
