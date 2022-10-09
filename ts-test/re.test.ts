import 'mocha';
import {isPromise} from 'node:util/types'
import chai from 'chai';
import {Re} from '../publish/index.js';


const expect = chai.expect;
const should = chai.should();

const unreachableCode = false;

describe('re tests', () => {
  describe('re.test', () => {
    it('should executeRule "ticker = "ZEM" and price > 5.0"', done => {
      const dataDomain = {
        ticker: 'ZEM',
        price: 5.0
      };
      const result = Re.Engine.awaitExecution(dataDomain, 'ticker = "ZEM" and price > 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.false;
      }
      done();
    })
    it('should executeRule "ticker = "ZEM" and price >= 5.0"', done => {
      Re.Engine.clear();
      const dataDomain = {
        ticker: 'ZEM',
        price: 5.0
      };
      const result = Re.Engine.awaitExecution(dataDomain, '<<ap name="second">> ticker = "ZEM" and price >= 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.true;
      }
      done();
    })
  })
})
