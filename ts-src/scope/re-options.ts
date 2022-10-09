import {_mergeApplicationOptions, ApplicationOptions} from '@franzzemen/re-application';
import {_mergeRuleOptions, RuleOptionOverrides} from '@franzzemen/re-rule';
import {_mergeRuleOptionOverrides, _mergeRuleSetOptions} from '@franzzemen/re-rule-set';

export interface ReOptions extends ApplicationOptions {
  applicationOverrides?: RuleOptionOverrides[];
}


export function _mergeReOptions(target: ReOptions, source: ReOptions, mergeInto = false): ReOptions {
  const _target: ReOptions = _mergeApplicationOptions(target, source, mergeInto);
  _target.applicationOverrides = _mergeRuleOptionOverrides(target.applicationOverrides, source.applicationOverrides, _mergeApplicationOptions, mergeInto);
  return _target;
}


/* TODO:
also probably should have a scope->find dependencies in refs
bug in scope parent = child
*/
