module.exports = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN || 'access',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN || 'refresh',
  ACCESS: 'access',
  ACCESS_TOKEN: 'access_token',
  EXPIRES_FOR_ACCESS: '30m',
  EXPIRES_FOR_REFRESH: '30d',
  REFRESH: 'refresh',
  REFRESH_TOKEN: 'refresh_token',
};
