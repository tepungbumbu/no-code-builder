# Design Theme Reference 🎨 

This document explains the "Look and Feel" of our app. It guides us on which colors and styles to use so everything looks consistent.

## 🖼️ Reference Image
*(This is the image we are trying to copy)*
![Reference Image](/Users/ivan/.gemini/antigravity/brain/7545d9c5-bc87-4437-8854-d3a8e26a97ec/uploaded_image_1766163811820.png)

## 🎨 Color Palette (The Colors We Use)

We use specific codes for colors (Hex codes). Here is how you use them in our code (using **TailwindCSS**).

### Primary Colors (Purple)
This is our main brand color. Use it for important buttons and links.
- **Code**: `bg-primary-600` (Background) or `text-primary-600` (Text)
- **Hex**: `#6C5CE7`
- **When to use**: "Login" button, "Save" button, Active links.

### Background Colors
- **Canvas White**: `bg-white` (The main page background)
- **Off-White**: `bg-neutral-50` (Subtle backgrounds, like the sidebar)
- **Card Background**: `bg-white` + `shadow-sm` (For boxes/cards)

### Text Colors
- **Main Text**: `text-neutral-900` (Almost black - easy to read)
- **Secondary Text**: `text-neutral-600` (Gray - for descriptions or less important text)

## 📐 Design rules

### 1. Spacing
We don't crowd things together. We give them room to breathe.
- Use `p-4` or `p-6` for padding inside cards.
- Use `gap-4` for spaces between items.

### 2. Rounded Corners
We like soft corners, not sharp ones.
- Use `rounded-lg` (Large rounded) or `rounded-xl` for cards and buttons.

### 3. Shadows
We use very soft shadows to make things "pop" a little bit.
- Use `shadow-sm` (Small shadow) for cards.
- Use `shadow-md` (Medium shadow) for dropdown menus.

## 💡 How to Read Code Styles

If you see this code:
```tsx
<button className="bg-primary-600 text-white rounded-lg p-2">
  Click Me
</button>
```
It translates to:
- `bg-primary-600`: Make background Purple.
- `text-white`: Make text White.
- `rounded-lg`: Make corners rounded.
- `p-2`: Add some padding (space) inside the button.

---
**Summary**: Keep it clean, simple, and purple! 💜
