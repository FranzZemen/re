import 'mocha';
import {isPromise} from 'node:util/types'
import chai from 'chai';
import {Rules} from '../publish/index.js';


const expect = chai.expect;
const should = chai.should();

const unreachableCode = false;

describe('re tests', () => {
  describe('re.test', () => {
    it('should executeRule "ticker = "ZEM" and price > 5.0"', () => {
      const dataDomain = {
        ticker: 'ZEM',
        price: 5.0
      };
      const result = Rules.Engine.awaitExecution(dataDomain, 'ticker = "ZEM" and price > 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.false;
      }
    })
    it('should executeRule "ticker = "ZEM" and price >= 5.0"', () => {
      Rules.Engine.clear();
      const dataDomain = {
        ticker: 'ZEM',
        price: 5.0
      };
      const result = Rules.Engine.awaitExecution(dataDomain, '<<ap name="second">> ticker = "ZEM" and price >= 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.true;
      }
    })
    /*
    it('should fail "hello"', () => {
      Rules.Engine.awaitExecution({},'hello');
    })
    
     */
  })
})
