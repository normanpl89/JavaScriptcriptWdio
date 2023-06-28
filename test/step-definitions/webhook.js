const myLogger = require('../../src/core/helpers/LoggerUtils');
const adminPanel = require('../../src/ui/admin/adminPanel.page');

const logoutAdminPanel = async () => {
  adminPanel.open();
  if (await adminPanel.isUserLoggedToAdmin()) {
    await adminPanel.logout();
  }
  myLogger.info('logout admin hook completed');
};

module.exports = {
  logoutAdmin: logoutAdminPanel
};
