module.exports = {
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_5: 'http://localhost:8545',
    DEFAULT_CHAIN_ID: 31337,
    FORTMATIC_API_KEY: 'pk_test_A6260FCBAA2EBDFB',
    MAGIC_API_KEY: 'pk_test_398B82F5F0E88874',
    PORTIS_DAPP_ID: 'e9be171c-2b7f-4ff0-8db9-327707511ee2',
    BURNER_PROVIDER: true,
    POLLING_INTERVAL: 12000,
    APP_NAME: 'claimquest'
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
