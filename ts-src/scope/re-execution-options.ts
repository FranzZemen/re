import {AppExecutionContextDefaults, appSchemaWrapper} from '@franzzemen/app-execution-context';
import {ExecutionContextDefaults, executionSchemaWrapper} from '@franzzemen/execution-context';
import {LogExecutionContextDefaults, logSchemaWrapper} from '@franzzemen/logger-adapter';
import {
  ApplicationExecutionContext, ApplicationExecutionContextDefaults,
  ApplicationOptions,
  applicationOptionsSchemaWrapper, ReApplication
} from '@franzzemen/re-application';
import {CommonExecutionContextDefaults, commonOptionsSchemaWrapper} from '@franzzemen/re-common';
import {ConditionExecutionContextDefaults, conditionOptionsSchemaWrapper} from '@franzzemen/re-condition';
import {DataTypeExecutionContextDefaults, dataTypeOptionsSchemaWrapper} from '@franzzemen/re-data-type';
import {ExpressionExecutionContextDefaults, expressionOptionsSchemaWrapper} from '@franzzemen/re-expression';
import {
  LogicalConditionExecutionContextDefaults,
  logicalConditionOptionsSchemaWrapper
} from '@franzzemen/re-logical-condition';
import {RuleExecutionContextDefaults, RuleOptionOverrides, ruleOptionsSchemaWrapper} from '@franzzemen/re-rule';
import {
  ruleOptionOverrideSchemaWrapper,
  RuleSetExecutionContextDefaults,
  ruleSetOptionsSchemaWrapper
} from '@franzzemen/re-rule-set';
import Validator, {ValidationError} from 'fastest-validator';
import {isPromise} from 'util/types';

export interface RulesEngineOptions extends ApplicationOptions {
  applicationOverrides?: RuleOptionOverrides[];
}


export interface ReRulesEngine extends ReApplication {
  rulesEngine?: RulesEngineOptions;
}

export interface RulesEngineExecutionContext extends ApplicationExecutionContext {
  re?: ReRulesEngine;
}

export class RulesEngineExecutionContextDefaults {
  static RulesEngineOptions: RulesEngineOptions = {};
  static ReRulesEngine: ReRulesEngine = {
    common: CommonExecutionContextDefaults.CommonOptions,
    data: DataTypeExecutionContextDefaults.DataTypeOptions,
    expression: ExpressionExecutionContextDefaults.ExpressionOptions,
    condition: ConditionExecutionContextDefaults.ConditionOptions,
    logicalCondition: LogicalConditionExecutionContextDefaults.LogicalConditionOptions,
    rule: RuleExecutionContextDefaults.RuleOptions,
    ruleset: RuleSetExecutionContextDefaults.RuleSetOptions,
    application: ApplicationExecutionContextDefaults.ApplicationOptions,
    rulesEngine: RulesEngineExecutionContextDefaults.RulesEngineOptions
  };
  static RulesEngineExecutionContext: RulesEngineExecutionContext = {
    execution: ExecutionContextDefaults.Execution(),
    app: AppExecutionContextDefaults.App,
    log: LogExecutionContextDefaults.Log,
    re: RulesEngineExecutionContextDefaults.ReRulesEngine
  };
}

export const rulesEngineOptionsSchema = {
  ruleOptionOverrides: {type: 'array', optional: true, items: ruleOptionOverrideSchemaWrapper},
  ruleSetOptionOverrides: {type: 'array', optional: true, items: ruleOptionOverrideSchemaWrapper},
  applicationOverrides: {type: 'array', optional: true, items: ruleOptionOverrideSchemaWrapper}
};

export const rulesEngineOptionsSchemaWrapper = {
  type: 'object',
  optional: true,
  default: RulesEngineExecutionContextDefaults.RulesEngineOptions,
  props: rulesEngineOptionsSchema
};

const reRulesEngineSchema = {
  common: commonOptionsSchemaWrapper,
  data: dataTypeOptionsSchemaWrapper,
  expression: expressionOptionsSchemaWrapper,
  condition: conditionOptionsSchemaWrapper,
  logicalCondition: logicalConditionOptionsSchemaWrapper,
  rule: ruleOptionsSchemaWrapper,
  ruleSet: ruleSetOptionsSchemaWrapper,
  application: applicationOptionsSchemaWrapper,
  rulesEngine: rulesEngineOptionsSchemaWrapper
};

export const reRulesEngineSchemaWrapper = {
  type: 'object',
  optional: true,
  default: RulesEngineExecutionContextDefaults.ReRulesEngine,
  props: reRulesEngineSchema
};


export const rulesEngineExecutionContextSchema = {
  execution: executionSchemaWrapper,
  app: appSchemaWrapper,
  log: logSchemaWrapper,
  re: reRulesEngineSchemaWrapper
};

export const rulesEngineExecutionContextSchemaWrapper = {
  type: 'object',
  optional: true,
  default: RulesEngineExecutionContextDefaults.RulesEngineExecutionContext,
  props: rulesEngineExecutionContextSchema
};


export function isRulesEngineExecutionContext(options: any | RulesEngineExecutionContext): options is RulesEngineExecutionContext {
  return options && 're' in options; // Faster than validate
}

const check = (new Validator({useNewCustomCheckerFunction: true})).compile(rulesEngineExecutionContextSchema);

export function validate(context: RulesEngineExecutionContext): true | ValidationError[] {
  const result = check(context);
  if (isPromise(result)) {
    throw new Error('Unexpected asynchronous on RulesEngineExecutionContext validation');
  } else {
    if (result === true) {
      context.validated = true;
    }
    return result;
  }
}


