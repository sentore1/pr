/**
 * PM2 Ecosystem Config — Contabo VPS
 * Start with: pm2 start ecosystem.config.js --env production
 */
module.exports = {
  apps: [
    {
      name: 'pryro-cms',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/pryro',
      instances: 'max',           // use all CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pryro/error.log',
      out_file:   '/var/log/pryro/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
