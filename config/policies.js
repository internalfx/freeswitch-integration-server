
module.exports = {
  '*': false,

  'loginController': {
    '*': true
  },

  'v1.phoneController': {
    '*': 'hasAccessToken'
  }
}
