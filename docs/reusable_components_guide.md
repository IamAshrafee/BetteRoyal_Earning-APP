# Reusable Components Guide

This document serves as a standard reference for using and extending our core UI components throughout the BetteRoyal Earning App.

## Philosophy

To maintain a consistent, premium feel across the application, we avoid building one-off, inline-styled elements for core functionality. Important UI elements—such as headers, cards, and buttons—are designed to be globally reusable with switchable **Variants**. 

Currently, our core architecture supports two main visual states for specialized components:

1. **Default**: Standard Material/Flat styling used on solid backgrounds (e.g., standard layout surfaces).
2. **Glass (Glorious)**: A watery, blurred, translucent "pill" style explicitly designed to overlap rich media or images (e.g., hero headers, match detail banners, and full-screen image backgrounds).

---

## Existing Components

### 1. `UserBalanceHeader`

A component designed to display the user's current wallet balance and interactive profile avatar.

**Location**: `src/components/specific/UserBalanceHeader.tsx`

**Props**:
- `balance` *(string)*: The formatted balance amount
- `currencySymbol` *(string, optional)*: Defaults to 'BTC'. Often overridden to '৳'.
- `label` *(string, optional)*: The text above the balance. Defaults to "Balance".
- `profileImage` *(string)*: URI string for the avatar.
- `variant` *( 'default' | 'glass', optional )*: Defines the visual styling. Defaults to 'default'.
- `onProfilePress` *(function, optional)*: Action triggered when tapping the avatar.
- `onBalancePress` *(function, optional)*: Action triggered when tapping the balance block.

#### Usage: 

**Standard Backgrounds**:
When placing the header on a standard white/dark surface (like the Match Lobby or Dashboard):
```tsx
import { UserBalanceHeader } from '../components/specific/UserBalanceHeader';

<UserBalanceHeader 
    balance="2,450"
    currencySymbol="৳"
    profileImage="https://example.com/avatar.jpg"
/>
```

**Image Backgrounds (The Glorious Glass Variant)**:
When overlaying the component on top of an `ImageBackground` (e.g., the Match Detail banner), **do not create custom blur wrappers inline**. Use the built-in glass variant:
```tsx
import { UserBalanceHeader } from '../components/specific/UserBalanceHeader';

<UserBalanceHeader 
    balance="2,450"
    currencySymbol="৳"
    profileImage="https://example.com/avatar.jpg"
    variant="glass"
/>
```

```

---

### 2. `AppBackButton`

A shared component for navigating back to the previous screen, supporting standard and image-overlay visual variants.

**Location**: `src/components/shared/AppBackButton.tsx`

**Props**:
- `onPress` *(function, optional)*: Overrides the default `navigation.goBack()` behavior.
- `style` *(StyleProp, optional)*: Standard style overrides.
- `variant` *( 'default' | 'glass', optional )*: Defines the visual styling. Defaults to 'default'.

#### Usage:

**Standard Backgrounds**:
```tsx
import { AppBackButton } from '../components/shared/AppBackButton';

<AppBackButton /> // Will adapt to the current theme (light/dark surface)
```

**Image Backgrounds (The Glorious Glass Variant)**:
When overlapping a banner or header image, use the built-in glass variant to generate the translucent pill overlay with white text and icons.
```tsx
import { AppBackButton } from '../components/shared/AppBackButton';

<AppBackButton variant="glass" />
```

---

## Future Components

As we expand the application, any newly introduced core block (e.g. `FloatingActionButton`, `MatchStatisticPill`) that might sit on top of images must adhere to this `variant="default" | "glass"` specification.

### Rules for Adding New Multi-Variant Components
1. **Never mutate size constraints**: Switching from `default` to `glass` should only alter backgrounds, opacities, and borders. The intrinsic width and height padding structure should remain completely identical to prevent layout shifts.
2. **Handle Text Colors Internally**: When a component is `glass`, it usually implies it sits on top of a dark image overlay. The component itself should automatically force its inner `AppText` components to `color: '#FFFFFF'` (or an opacity thereof) when the glass variant is active. The parent screen should never have to manually pass a text color override.
3. **Use the standard `glass` styles**:
```javascript
// Standard glass variant object snippet
...(isGlass && {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Pseudo backdrop blur
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999, // Pill shape
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
})
```
