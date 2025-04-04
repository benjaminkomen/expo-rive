# Expo Rive

This is a demo project to show how to use Rive with Expo.

## Instructions

To create a project like this from scratch, follow these steps:

- Run `npx create-expo-app@latest --template blank-typescript`
- Choose name `expo-rive`
- Run `cd expo-rive`
- Remove `package-lock.json`
- Run `npx expo install expo-asset expo-dev-client`
- Run `yarn add rive-react-native`
- If you haven't set up EAS before, run: `npm install -g eas-cli`, then `eas login` to your Expo account (create one on expo.dev if you don't have one) and then run `eas build:configure` and follow the instructions to create a new eas.json file
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
"build:simulator:android": "eas build --profile development:simulator --platform ios --message $(git symbolic-ref --short HEAD) --local",
"build:simulator:ios": "eas build --profile development:simulator --platform ios --message $(git symbolic-ref --short HEAD) --local",
"build:device:android": "eas build --profile development:device --platform android --message $(git symbolic-ref --short HEAD) --local",
"build:device:ios": "eas build --profile development:device --platform ios --message $(git symbolic-ref --short HEAD) --local"
```
- Now run `yarn build:simulator:ios` to build the app for the iOS simulator, accept the suggested iOS bundle identifier
    - Note: if you get a build error `CocoaPods could not find compatible versions for pod "RiveRuntime"` then run `pod repo update`
- Then run `yarn build:simulator:android` to build the app for the Android emulator, accept the suggested Android package 
