export default () => ({
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 3306,
  },
});
