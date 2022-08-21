import {ApplicationReference} from '../application/application-reference';
import {OptionedReference} from '../optioned-reference';

export interface RulesEngineReference extends OptionedReference {
  applications: ApplicationReference[];
}
