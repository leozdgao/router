import parseUrl from '../../src/utils/parseUrl'

describe('Testing utils/parseUrl, and work as url.parse in node.js', _ => {
  it('should work with full url', function () {
    const link = 'http://mydomain.com:8080'
    const url = parseUrl(link)

    expect(url.protocol).to.equal('http:')
    expect(url.hostname).to.equal('mydomain.com')
    expect(url.host).to.equal('mydomain.com:8080')
    expect(url.port).to.equal(8080)
  }),
  it('should work if inherit the scheme', function () {
    const link = '//mydomain.com:8080'
    const url = parseUrl(link)

    expect(url.protocol).to.equal(location.protocol)
  }),
  it('should parse pathname', function () {
    const link = 'http://mydomain.com/foo/bar?q=1#a'
    const innerLink = '/foo/bar?q=1#a'
    const url = parseUrl(link)
    const innerUrl = parseUrl(innerLink)

    expect(url.pathname).to.equal('/foo/bar')
    expect(url.isInnerLink).to.be.false
    expect(innerUrl.pathname).to.equal('/foo/bar')
    expect(innerUrl.isInnerLink).to.be.true
  }),
  it('should parse the hash and recognize the hashbang path', function () {
    const link = '/path/#foo'
    const hashbangLink = '/path/#!/path/to'
    const url = parseUrl(link)
    const hashbangUrl = parseUrl(hashbangLink)

    expect(url.hash).to.equal('foo')
    expect(hashbangUrl.hash).to.equal('!/path/to')
    expect(hashbangUrl.hashbangPath).to.equal('/path/to')
  }),
  it('should parse query object and search string', function () {
    const link = '/path?page=1&skip=10'
    const encodeLink = '/path?link=' + encodeURIComponent('https://www.baidu.com')
    const url = parseUrl(link)
    const encodeUrl = parseUrl(encodeLink)

    expect(url.search).to.equal('page=1&skip=10')
    expect(url.query).to.deep.equal({ page: '1', skip: '10' })
    expect(encodeUrl.search).to.equal('link=' + encodeURIComponent('https://www.baidu.com'))
    expect(encodeUrl.query).to.deep.equal({ link: 'https://www.baidu.com' })
  })
})
