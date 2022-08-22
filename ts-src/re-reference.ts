import {ApplicationReference} from '@franzzemen/re-application';
import {NamedReference} from '@franzzemen/re-common';
import {ReOptions} from './scope/re-options';

export interface ReReference extends NamedReference {
  options: ReOptions;
  applications: ApplicationReference[];
}
