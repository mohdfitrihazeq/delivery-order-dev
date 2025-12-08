module.exports = {
  apps: [
    {
      name: 'Do_web_dev',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: 'dist',            
        PM2_SERVE_PORT: 13001,             // dev port
        PM2_SERVE_SPA: 'true',             
        PM2_SERVE_HOMEPAGE: '/index.html',
        NODE_ENV: 'development',
      },
      env_file: '.env',
    },
    {
      name: 'Do_web',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: 'dist',
        PM2_SERVE_PORT: 12001,              // prod port
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
        NODE_ENV: 'production',
      },
      env_file: '.env',
    },
  ],
};