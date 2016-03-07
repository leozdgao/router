import parseUrl from '../../src/utils/parseUrl'

describe('Testing utils/parseUrl, and work as url.parse in node.js', function () {
  it('should work with full url', function () {
    const link = 'http://mydomain.com:8080'
    const url = parseUrl(link)
    expect(url.protocol).to.equal('http:')
    expect(url.hostname).to.equal('mydomain.com')
    expect(url.port).to.equal(8080)
  })
})
