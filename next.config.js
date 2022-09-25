/** @type {import('next').NextConfig} */
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

const conf = {
  reactStrictMode: false
}

const nextConfig = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return conf
  }
  return {
    ...conf,
    output: 'standalone',
    compiler: {
      removeConsole: {
        exclude: ['error']
      }
    }
  }
}

module.exports = withPWA(nextConfig)
