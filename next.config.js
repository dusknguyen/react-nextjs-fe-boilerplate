const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 keeps a small set of recently visited routes in React Activity,
  // preserving local UI state and avoiding unnecessary remounts on back/forward.
  cacheComponents: true,
  reactStrictMode: true,
  // Expo requires the NativeWind Babel preset. Force Next to keep using its
  // compiler so tsconfig's jsxImportSource="nativewind" is honored on web.
  experimental: {
    forceSwcTransforms: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.next.json',
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'nativewind',
    'react-native-css-interop',
    'react-native-safe-area-context',
    '@react-native-community/slider',
    '@react-native-community/netinfo',
    '@react-native-segmented-control/segmented-control',
    '@react-native-picker/picker',
    '@shopify/flash-list',
    'expo',
    'expo-battery',
    'expo-blur',
    'expo-clipboard',
    'expo-crypto',
    'expo-device',
    'expo-document-picker',
    'expo-haptics',
    'expo-image',
    'expo-image-picker',
    'expo-linear-gradient',
    'expo-localization',
    'expo-location',
    'expo-modules-core',
    'expo-network',
    'expo-sharing',
    'expo-speech',
    'expo-web-browser',
    'moti',
    'react-native-calendars',
    'react-native-marked',
    'react-native-qrcode-svg',
    'react-native-svg',
  ],
  webpack(config, { webpack }) {
    // A few Android + Web packages in React Native Directory publish Flow or
    // raw JSX. Keep the compatibility adapter narrowly scoped to those
    // packages so the rest of Next continues through SWC.
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: [
        path.resolve(__dirname, 'node_modules/@react-native-segmented-control/segmented-control'),
        path.resolve(__dirname, 'node_modules/react-native-swipe-gestures'),
      ],
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          cacheDirectory: true,
          configFile: false,
          presets: [[require.resolve('babel-preset-expo'), { jsxImportSource: 'nativewind' }]],
        },
      },
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
    };
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...config.resolve.extensions,
    ];
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
