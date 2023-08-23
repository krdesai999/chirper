var awsConfig = {
  region: process.env.region,
  ClientId: process.env.ClientId,
};

var poolConfig = {
  UserPoolId: process.env.UserPoolId,
  ClientId: awsConfig.ClientId,
};


module.exports.poolConfig = poolConfig;
module.exports.awsConfig = awsConfig;
