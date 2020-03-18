const { validateCommand } = require('./commandValidator');
const { validateBlackList } = require('./blacklistValidator');
const { validateCooldown } = require('./cooldownValidator');
const { validateServerRegistration } = require('./serverRegistrationValidator');

exports.validateCommand = validateCommand;
exports.validateBlackList = validateBlackList;
exports.validateCooldown = validateCooldown;
exports.validateServerRegistration = validateServerRegistration;
