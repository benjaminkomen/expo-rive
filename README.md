# Expo Rive

This is a demo project to show how to use Rive with Expo.

See also:

- https://expo.dev/blog/how-to-add-an-animated-splash-screen-with-expo-custom-assets
- https://github.com/rive-app/rive-react-native/issues/185#issuecomment-2322810427

## Instructions

To create a project like this from scratch, follow these steps.

### Project setup

- Run `npx create-expo-app@latest --template blank-typescript`
- Choose name `expo-rive`
- Run `cd expo-rive`
- Remove `package-lock.json`
- Run `npx expo install expo-asset expo-dev-client`
- Run `yarn add rive-react-native`

### Rive setup

- Get a `*.riv` file from e.g. the [Rive marketplace](https://rive.app/marketplace/) or one you created yourself. In
  this
  example app we will use
  this [weather animation](https://github.com/rive-app/weather-app-mobile/blob/main/WeatherApp/ios/Assets/weather_app.riv)
- Put the file in the `assets/rive/` folder

> [!NOTE]
> Expo added support for Rive assets in this [commit](https://github.com/expo/expo/pull/35758), it will be available in
> Expo SDK 53. Until that time add the following `metro.config.js` file to your project:

```javascript
const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver["assetExts"] = [
    ...(config.resolver.assetExts || []),
    // for rive animations
    "riv",
];

module.exports = config;
```

- Wrap your Rive component with the `RiveAnimation.tsx` file in this project and use `source` as the prop with your file
  name
- You can hot-reload your `*.riv` file, no need to create a new build, because the asset is served by the Metro server

### Expo development build setup

- If you haven't set up EAS before, run: `npm install -g eas-cli`, then `eas login` to your Expo account (create one on
  expo.dev if you don't have one) and then run `eas build:configure` and follow the instructions to create a new
  eas.json file
- In your eas.json, replace your development section with the following snippet:

```
"development": {
  "developmentClient": true,
  "distribution": "internal",
  "ios": {
    "resourceClass": "m-medium"
  },
  "env": {
    "APP_ENV": "development"
  }
},
"development:device": {
  "extends": "development",
  "ios": {
    "simulator": false
  }
},
"development:simulator": {
  "extends": "development",
  "ios": {
    "simulator": true
  }
},
```

- To your package.json scripts section, add the following build scripts:

```
"build:simulator:android": "eas build --profile development:simulator --platform android --message $(git symbolic-ref --short HEAD) --local",
"build:simulator:ios": "eas build --profile development:simulator --platform ios --message $(git symbolic-ref --short HEAD) --local",
"build:device:android": "eas build --profile development:device --platform android --message $(git symbolic-ref --short HEAD) --local",
"build:device:ios": "eas build --profile development:device --platform ios --message $(git symbolic-ref --short HEAD) --local"
```

- Optionally, to your `.gitignore` file, add the following lines:

```
# build artifacts
*.tar.gz
*.app
*.ipa
*.apk
*.aab
```

- Now run `yarn build:simulator:ios` to build the app for the iOS simulator, accept the suggested iOS bundle identifier
    - Note: if you get a build error `CocoaPods could not find compatible versions for pod "RiveRuntime"` then run
      `pod repo update`
- Then run `yarn build:simulator:android` to build the app for the Android emulator, accept the suggested Android
  package 
