const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// This should not be necessary anymore after this https://github.com/expo/expo/pull/35758 lands in Expo SDK 53
config.resolver["assetExts"] = [
    ...(config.resolver.assetExts || []),
    // for rive animations
    "riv",
];

module.exports = config;
