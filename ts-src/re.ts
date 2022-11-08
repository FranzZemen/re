/*
Created by Franz Zemen 11/07/2022
License Type:
*/

import {RulesEngine} from './rules-engine.js';

class Engine {
  load(): RulesEngine {
    return new RulesEngine();
  }
}


export class Rules {
  engine = new Engine();
  constructor() {
  }
}

