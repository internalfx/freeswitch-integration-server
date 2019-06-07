
import crypto from 'crypto'

export let to = function (promise) {
  return promise.then(function (val) {
    return val || {}
  }).catch(function (err) {
    err.isError = true
    return err
  })
}

export let uniqueId = function (length = 10) {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let numbers = '1234567890'
  let bytes = Array.from(crypto.randomBytes(length))

  let value = bytes.map(function (byte, idx) {
    if (idx % 2) {
      return letters[byte % letters.length].toString()
    } else {
      return numbers[byte % numbers.length].toString()
    }
  })

  return value.join('')
}
