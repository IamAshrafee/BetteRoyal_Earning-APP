# BetteRoyal Design System

This document serves as the single source of truth for the BetteRoyal App design system.

## 1. Design Philosophy
- **Modern & Premium & gaming vibes**: Uses a vibrant Red/Dark theme inspired by top-tier eSports platforms.
- **Content-First**: High contrast, legible typography, and clear visual hierarchy.
- **Consistent**: All UI elements strictly adhere to the defined tokens.

## 2. Color Palette

### Primary
- **Primary Red**: `#FF3B30` (Used for primary actions, active states, important highlights)

### Neutral / Surface (Dark Mode Default)
- **Background**: `#121212` (Main app background)
- **Surface**: `#1E1E1E` (Cards, Modals, Bottom Sheets)
- **Border**: `#2C2C2E`
- **Input Background**: `#1E1E1E`

### Neutral / Surface (Light Mode)
- **Background**: `#F8F8F8`
- **Surface**: `#FFFFFF`
- **Border**: `#E5E5EA`

### Text
- **Primary (Dark)**: `#FFFFFF`
- **Secondary (Dark)**: `#A1A1AA`
- **Primary (Light)**: `#1A1A1A`
- **Secondary (Light)**: `#8E8E93` // Muted text

### Semantic / Functional
- **Success**: `#34C759` (Green - Live status, Winning bets)
- **Warning**: `#FF9500` (Orange - Pending, Late game)
- **Info**: `#00C7BE` (Teal - Analysis, Stats)
- **Error**: `#FF3B30` (Same as primary)

## 3. Typography
**Font Family**: `Plus Jakarta Sans`

| Scale | Size | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Display (H1)** | 32px | Bold (700) | Hero headers, Big counts |
| **Heading (H2)** | 24px | Bold (700) | Section titles |
| **Heading (H3)** | 20px | SemiBold (600) | Card titles |
| **Body (lg)** | 18px | Regular (400) | Featured text |
| **Body (md)** | 16px | Regular (400) | Default text, Inputs |
| **Body (sm)** | 14px | Regular (400) | Secondary text, Descriptions |
| **Caption (xs)** | 12px | Medium (500) | Labels, Tags, Timestamps |

## 4. Spacing & Layout
Base unit: **4px**

| Token | Value | Usage |
| :--- | :--- | :--- |
| **xs** | 4px | Tight spacing, Icon gaps |
| **sm** | 8px | Elements inside a card |
| **md** | 16px | Standard padding, Input internal padding |
| **lg** | 24px | Section gaps, Modal padding |
| **xl** | 32px | Screen margins, large separators |

## 5. Shape & Effects

### Border Radius
- **base**: `12px` (Standard for Buttons, Inputs, Cards)
- **lg**: `16px` (Large modals, Bottom sheets)
- **full**: `9999px` (Pills, Avatars)

### Shadows
- **soft**: `0 4px 20px -2px rgba(0, 0, 0, 0.05)`
- **card**: `0 2px 8px rgba(0, 0, 0, 0.04)`
- **glow**: `0 0 12px rgba(255, 59, 48, 0.3)` (Primary Red Glow)

## 6. Components

### Buttons
- **Primary**: Full Primary Red background, White text, Glow shadow.
- **Secondary/Outline**: Transparent background, Border color, Text color.
- **Ghost**: No background, Primary text.
- **Social**: Surface color, Border, Icon left.

### Inputs
- **Height**: 56px
- **Radius**: 12px
- **Background**: Surface color.
- **Border**: 1px solid Border color (Primary color on focus).

### Cards (AppCard)
- **Padding**: 16px
- **Radius**: 12px or 16px
- **Background**: Surface color
- **Border**: 1px solid Border color
