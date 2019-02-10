module.exports = {
  apps : [{
    name: 'projel',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '800M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      key  : '/path/to/key.pem',
      user : 'ubuntu',
      host : 'host',
      ref  : 'origin/master',
      repo : 'git remote',
      path : './',
      'pre-deploy' : 'npm install && node scripts/setupDB.js',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
