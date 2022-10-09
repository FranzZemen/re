import {ApplicationReference} from '@franzzemen/re-application';
import {ScopedReference} from '@franzzemen/re-rule';
import {ReOptions} from './scope/re-options';

export interface ReReference extends ScopedReference {
  options: ReOptions;
  applications: ApplicationReference[];
}
