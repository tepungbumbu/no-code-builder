# NoCode Website Builder 🚀

Welcome! This is a **No-Code Website Builder** application. It allows you to build websites visually by dragging and dropping elements, just like playing with building blocks. You don't need to know how to write code to use the builder, but this project itself is code that you can run and modify!

## 🌱 What is this project?

This is a modern web application built with **Next.js**. Think of it as a factory that creates websites.
- **Frontend**: The visual part you see and interact with (built with React & Tailwind CSS).
- **Backend**: The logic behind the scenes (simulated in this project to make it easy to run).

## 🎨 Layout & Design

We use a simple, clean design style:
- **Colors**: Mostly white and light gray, with a nice **Purple** (`#6C5CE7`) for important buttons.
- **Style**: "Flat" design, meaning simple shapes and clear text without too many fancy 3D effects.

## 🛠️ Technology Used (For Developers)

If you are learning to code, here are the main tools we used:
- **Next.js 14**: The main framework (like the engine of a car).
- **TypeScript**: A version of JavaScript that helps catch errors (like a spellchecker for code).
- **TailwindCSS**: Used for styling (colors, spacing, fonts).
- **Zustand**: Manages the "memory" of the app (like remembering who is logged in).
- **Turborepo**: Helps organize the project files efficiently.

## 📂 Project folder map

Here is a simplified map of where things are:

```
no-code-builder/
├── apps/
│   └── web/                # The main application code lives here!
│       ├── src/
│       │   ├── app/        # The different pages (Home, Login, Dashboard)
│       │   ├── components/ # The building blocks (Buttons, Navbar, Editor elements)
│       │   └── store/      # Where we keep track of data (User info, Project list)
```

## 🚀 How to Run It

### Prerequisites
You need **Node.js** installed on your computer. It's like the runtime environment needed to play a video game.

### Installation Steps
1. Open your terminal (Command Prompt or Terminal app).
2. Go to the project folder:
   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/no-code-builder
   ```
3. Install the necessary packages (this downloads the tools):
   ```bash
   npm install
   # OR
   pnpm install
   ```
4. Start the app:
   ```bash
   npm run dev
   # OR
   pnpm dev
   ```
5. Open your web browser and go to: `http://localhost:3000`

## 📱 Features You Can Try

### ✅ Core Features
- **Responsive Navbar**: The menu works on phone and computer screens!
- **Drag & Drop**: Pick an element and drop it onto the canvas.
- **Auto-save**: The app saves your work automatically.
- **Mobile/Tablet View**: See how your site looks on different devices.

### ✅ User Journey
1. **Landing Page**: The simplified welcome page.
2. **Register/Login**: Create a fake account (it just lives in your browser's memory).
3. **Dashboard**: Manage your website projects.
4. **Editor**: The magic place where you build your site!

## 🔧 Useful Commands

These are commands you type in the terminal:
- `npm run dev`: **Starts the app**. Use this when you want to work on it.
- `npm run build`: **Builds the app**. Prepares it for the real internet (production).
- `npm run lint`: **Checks code**. Finds potential mistakes in your code.

## 📄 License
MIT License (Free to use and modify!)