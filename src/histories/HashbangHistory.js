import parseUrl from '../utils/parseUrl'

const HashbangHistory = {
  create (base) {
    return {
      base,
      init () {
        // 查看当前路径是否满足 hashbang 的格式
        // location.href = location.href + '/#!/'
      },
      match () {

      },
      go () {

      },
      dispose () {

      }
    }
  }
}

export default HashbangHistory
