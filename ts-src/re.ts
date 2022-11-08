/*
Created by Franz Zemen 11/07/2022
License Type:
*/

import {RulesEngine} from './rules-engine.js';


export abstract class Rules {
  static Engine: Engine;
  protected constructor() {
  }
  abstract load(): Engine;
}

export class Engine extends Rules {
  static {
    Rules.Engine = new Engine();
  }
  protected constructor() {
    super();
  }
  static load(): Engine {
    console.log('Static load');
    const engine = new Engine();
    return engine.load();
  }
  load(): Engine {
    console.log('Dynamic load');
    return this;
  }
}




/*

class Engine {
  protected constructor() {
    super();
  }
  static load(): Rules {
    console.log('Static load');
    const rules = new Rules();

  }
}


export class Rules {
  static Engine = new Rules(false);
  protected rulesEngine: RulesEngine;
  protected constructor(protected instance = true) {
    if(instance) {
      this.rulesEngine = new RulesEngine();
    }
  }

  load(): Rules {
    if (this.instance) {
      this.rulesEngine.load('1=1');
      return this;
    } else {
      console.warn('Invoking load() from Engine returns a new Rules instance.  You should use the return value, or lose the results')
      const instance = new Rules();
      return instance.load();
    }
  }

}

*/


