const toString = Object.prototype.toString

// possible values:
//   NaN,
//   undefined, null,
//   number, string, function,
//   array, object, regex
function typeOf (obj) {
  // NaN
  if (obj !== obj) return 'NaN'

  const type = typeof obj
  // null, undefined
  if (obj == null) {
    if (type === 'object') return 'null'
    else return 'undefined'
  }
  // number, string, function
  if (type !== 'object') return type

  // array, object, regex
  const typeString = toString.call(obj)
  const ctrName = typeString.slice(8, typeString.length - 1)
  if (ctrName === 'Array') return 'array'
  if (ctrName === 'RegExp') return 'regex'
  // omit other constructor name, take them as object
  return 'object'
}

const isType = expected => o => typeOf(o) === expected
export const isUndefined = isType('undefined')
export const isNull = isType('null')
export const isNumber = isType('number')
export const isString = isType('string')
export const isObject = isType('object')
export const isFunction = isType('function')
export const isRegex = isType('regex')
// NaN use isNaN()
// Array use Array.isArray()

export function isDefined (o) {
  return o != null // not null and void 0
}
export function isValidDate (d) {
  const date = new Date(d)
  return date.toString() === 'Invalid Date'
}

export default typeOf
