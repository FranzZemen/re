import 'mocha';
import {isPromise} from '@franzzemen/re-common';
import chai from 'chai';
import {Re} from '../publish';


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
      const result = Re.Engine.awaitRuleExecution(dataDomain, 'ticker = "ZEM" and price > 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.false;
      }
      done();
    })
    it('should executeRule "ticker = "ZEM" and price >= 5.0"', done => {
      const dataDomain = {
        ticker: 'ZEM',
        price: 5.0
      };
      const result = Re.Engine.awaitRuleExecution(dataDomain, 'ticker = "ZEM" and price >= 5.0');
      if(isPromise(result)) {
        unreachableCode.should.be.true;
      } else {
        result.valid.should.be.true;
      }
      done();
    })
  })
})
