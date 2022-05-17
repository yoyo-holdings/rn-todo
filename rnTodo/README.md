# Note and Todo List App

## Usage

```sh
# requirements
Node version 16.13.0
NPM version 8.1.0
Yarn version >= 1.10.1


# install dependencies
yarn install

# run on Android device/emulator
react-native run-android
or
npx react-native run-android

# run on iOS device/simulator
react-native run-ios
or
npx react-native run-ios
```
## Clean gradlew

cd ./android

./gradlew clean

## Debug Build

### Android

cd ./android

export FORCE_BUNDLING=true

./gradlew clean assembleDebug to build debug .apk

## Release Build

### Android

cd ./android

./gradlew clean assembleRelease
