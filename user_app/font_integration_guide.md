# Custom Font Integration Guide

Follow these steps to integrate your downloaded "Plus Jakarta Sans" fonts into the React Native project.

## Step 1: Place Font Files

1.  Open your file explorer.
2.  Go to the folder where you unzipped the Google Fonts.
3.  Copy all the **`.ttf`** files (e.g., `PlusJakartaSans-Regular.ttf`, `PlusJakartaSans-Bold.ttf`, etc.).
4.  Paste them into this directory in your project:
    `d:\Projects FINAL\React Native\BetteRoyal_Earning-APP\user_app\assets\fonts`

    *(I have already created this folder for you)*

## Step 2: Link the Assets

Since we are on a modern version of React Native, we use a utility to link these assets to the native projects.

1.  Open your terminal in the `user_app` directory.
2.  Run the following command to link the assets:
    ```bash
    npx react-native-asset
    ```
    *(If it asks to install `react-native-asset`, press `y`)*

    **What this does:**
    - Copies fonts to `android/app/src/main/assets/fonts`
    - Updates `Info.plist` for iOS (if applicable)

## Step 3: Verify and Rebuild

1.  After linking, you must rebuild the native app.
2.  Run the `fresh_start.bat` file I created earlier, or run:
    ```bash
    cd android && gradlew clean && cd .. && npx react-native run-android
    ```

## Step 4: Verify Typography Configuration

Ensure your `src/theme/typography.ts` file matches the **exact filenames** of the fonts you pasted.

For example, if your file is named `PlusJakartaSans-Bold.ttf`, your configuration should look like this:

```typescript
// src/theme/typography.ts
export const typography = {
    fontFamily: {
        regular: 'PlusJakartaSans-Regular',
        medium: 'PlusJakartaSans-Medium',
        semiBold: 'PlusJakartaSans-SemiBold',
        bold: 'PlusJakartaSans-Bold',
    },
    // ...
};
```

**Crucial Note on Android:**
Android uses the **filename** to load the font.
- File: `PlusJakartaSans-Bold.ttf` -> Family Name: `PlusJakartaSans-Bold`
- If the file is named `PlusJakartaSans-BoldItalic.ttf`, use `PlusJakartaSans-BoldItalic`.

## Summary Checklist
- [ ] Copy `.ttf` files to `user_app\assets\fonts`.
- [ ] Run `npx react-native-asset` in `user_app` directory.
- [ ] Update `src/theme/typography.ts` if filenames differ.
- [ ] Rebuild using `fresh_start.bat`.
