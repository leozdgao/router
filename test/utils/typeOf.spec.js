import typeOf from '../../src/utils/typeOf'

describe('Testing utils/typeOf and it should tell the type of the subject', _ => {
  it('should tell any type', function () {
    const suit = {
      'null': _ => null,
      'undefined': _ => (void 0),
      'NaN': _ => NaN,
      'number': _ => 1,
      'string': _ => 'Hello World',
      'function': _ => _ => {},
      'array': _ => [ 1, 2, 3 ],
      'object': _ => ({ foo: 'bar' }),
      'regex': _ => /a/
    }

    Object.keys(suit).forEach(type => {
      const getValue = suit[type]
      expect(typeOf(getValue())).to.be.equal(type)
    })
  })
})
