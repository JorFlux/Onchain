# Onchain

A modern crypto asset management app built with **React Native**. This project features:

- **SwiftUI-based Fabric Component**: A high-performance native UI component written in SwiftUI and integrated via React Native's Fabric architecture.
- **TurboModule**: A custom TurboModule bridges communication between native code and React Native, enabling fast, type-safe, and flexible data exchange.
- **TypeScript-first**: All business logic, utilities, and types are written in TypeScript for safety and maintainability.
- **Modular Structure**: UI components, business logic, and types are separated for easy testing and reuse.
- **Unit Testing**: Core logic (filtering, sorting, formatting) is covered by unit tests.

## Features

- Crypto asset overview with real-time USD/HKD conversion
- Sort and filter assets by value, name, or percentage change
- Pull-to-refresh and skeleton loading states
- Modern, accessible UI
- Native currency picker (SwiftUI Fabric component)
- Native-to-JS communication via TurboModule

## Project Structure

```
src/
  screens/
    AssetScreen/
      components/         # Reusable UI components (AssetItem, SortButton, etc.)
      utils.ts            # Pure functions (filter, sort, format, etc.)
      types.ts            # TypeScript type definitions
      index.tsx           # Main screen logic
      Currency.json       # Asset data
      Fiat_rate_hkd.json  # HKD rates
      Fiat_rate_usd.json  # USD rates
    ...
  ...
specs/
  NativeStoreValueManager.ts # TurboModule interface
  CurrencyPickerNativeComponent.swift # SwiftUI Fabric component
```

## Native Integration

### SwiftUI Fabric Component

- The currency picker is implemented in SwiftUI and exposed to React Native via the new Fabric renderer for best performance and smooth animations.

### TurboModule

- A custom TurboModule (`NativeStoreValueManager`) is used for fast, type-safe communication between native (Swift/ObjC) and React Native (TypeScript).
- Used for currency selection and other native events.

## Testing

- Pure functions (filterAssets, sortAssets, formatCurrency, etc.) are unit tested in `utils.test.ts`.
- Run tests with:
  ```sh
  npm test
  # or
  yarn test
  ```

## Running the App

1. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
2. Start Metro:
   ```sh
   yarn start
   # or
   npm start
   ```
3. Run on iOS:
   ```sh
   yarn ios
   # or
   npm run ios
   ```
4. Run on Android:
   ```sh
   yarn android
   # or
   npm run android
   ```

## Notes

- Make sure you have the required native build environment for iOS (Xcode) and Android (Android Studio/SDK).
- The SwiftUI Fabric component and TurboModule require a modern React Native version (0.70+ recommended).

---

**Onchain** is a showcase of modern React Native + Native (SwiftUI) integration, with a focus on clean architecture, type safety, and great user experience.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
