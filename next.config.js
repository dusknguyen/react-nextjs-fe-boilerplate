// next.config.js

const { withExpo } = require('@expo/next-adapter');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    'nativewind',
    'react-native-css-interop',
    // Add more if needed
  ],
};

// Bọc withExpo trước
const expoConfig = withExpo(baseConfig);

module.exports = expoConfig;