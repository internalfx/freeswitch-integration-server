
module.exports = {
  'post /api/auth/login': 'loginController.login',
  'post /api/auth/logout': 'loginController.logout',
  'get /api/auth/user': 'loginController.user',

  'post /api/v1/originate': 'v1.phoneController.originate'
}
