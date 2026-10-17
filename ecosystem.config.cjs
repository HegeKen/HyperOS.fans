module.exports = {
  apps: [
    {
      name: 'HyperOS.fans',
      port: '80',
      host: 'hyperos.fans',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
