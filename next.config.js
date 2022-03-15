/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')

const conf = {
  reactStrictMode: true
}

const nextConfig = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return conf
  }
  return {
    ...conf,
    experimental: {
      outputStandalone: true,
      removeConsole: {
        exclude: ['error']
      }
    }
  }
}

module.exports = nextConfig