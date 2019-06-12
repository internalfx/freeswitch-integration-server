
import _ from 'lodash'
import moment from 'moment'
import crypto from 'crypto'
import libPhone from 'google-libphonenumber'
let PNF = libPhone.PhoneNumberFormat
let phoneUtil = libPhone.PhoneNumberUtil.getInstance()

export let to = function (promise) {
  return promise.then(function (val) {
    return val || {}
  }).catch(function (err) {
    err.isError = true
    return err
  })
}

export let uniqueId = function (length = 10) {
  let chars = '1234567890BCDFGHJKMNPQRSTVWXYZ'
  let bytes = Array.from(crypto.randomBytes(length))

  let value = bytes.map(function (byte, idx) {
    return chars[byte % chars.length].toString()
  })

  return value.join('')
}
