export function isBrowser () {
  return typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
}

export function isNode () {
  return typeof global !== 'undefined' &&
    typeof process !== 'undefined' &&
    typeof module !== 'undefined'
}

export function canUseH5HistoryAPI () {
  return isBrowser() && window.history && history.pushState
}
