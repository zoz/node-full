chai = require('chai')
#chai.Assertion.includeStack = true
expect = chai.expect

describe 'Array', ->
  describe '#indexOf()', ->
    it 'index 2 should equal 4', ->
      expect(3).equal 3
