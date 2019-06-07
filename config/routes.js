
module.exports = {
  'post /api/auth/login': 'loginController.login',
  'post /api/auth/logout': 'loginController.logout',
  'get /api/auth/user': 'loginController.user'
}
