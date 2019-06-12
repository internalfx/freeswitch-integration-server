
module.exports = {
  '*': true,

  'loginController': {
    '*': true
  },

  'v1.phoneController': {
    '*': 'hasAccessToken'
  }
}
