# SAMify <sub>[live](https://samify.co.in/)</sub>

>**SAMify** is a modern, full-featured digital solutions platform built with React, TypeScript, and Vite. We help businesses grow by providing a wide range of web, mobile, and digital services, all with a focus on quality, performance, and user experience.

## 🌟 Key Features

- **Animated Hero Section** with interactive carousel and custom background
- **Service Cards** with 3D flip animation and tech-themed overlay
- **Contact & Request Forms** with validation, loading states, and success feedback
- **Team, About, and Process Sections** for transparency and trust
- **Industry-Specific Solutions** for SMBs, Startups, Agencies, Enterprises, and more
- **Modern UI/UX** using Material UI, custom backgrounds, and smooth transitions
- **Responsive Design** for all devices
- **SEO-friendly** and high-performance architecture
- **FAQ Section** and testimonials for credibility
- **Reusable Components** for maintainability and scalability

## 🚀 Technologies Used

- React + TypeScript + Vite
- Material UI (MUI)
- Custom animation components (Ballpit, SlideInText, FlippingText, etc.)
- AOS for scroll animations
- Modern CSS and design best practices

## 📁 Project Folder Structure

```
public/                 # Static files served directly (images, icons, admin configs)
src/                    # Source code and assets
├── assets/             # Static assets used in the app (images, backgrounds, etc.)
├── Components/         # React components organized by category
│   ├── Animations/     # Animation components (e.g., Ballpit, SlideInText)
│   ├── Pages/          # Page-level components representing routes/views
│   ├── Reusable/       # Reusable UI components (forms, headers, cards, loaders)
│   └── Sections/       # Page sections (About, FAQs, Hero, Services, Team, etc.)
├── Content/            # JSON content data used throughout the app
├── App.tsx             # Main app component
├── main.tsx            # Entry point for React app
└── vite-env.d.ts       # Vite environment typings
```

- **public/**: Contains static assets served as-is, including images, icons, and admin configuration files.
- **src/assets/**: Holds images and other static resources imported in the source code.
- **src/Components/**: Organized React components for modularity and maintainability.
- **src/Content/**: JSON files with content data to separate content from code.
└── vite-env.d.ts       # Vite environment typings
## 📁 Project Folder Structure


## 🛠️ How to Use

1. Clone the repo and install dependencies
2. Run `npm run dev` to start the development server
3. Explore the codebase for reusable, well-structured components

---

## 📚 Documentation

This repository contains the full source code and assets for the SAMify digital solutions platform. It is built with React, TypeScript, and Vite, following modern best practices for performance and maintainability.

- To get started, clone the repository and install dependencies using your preferred package manager.
- Use `npm run dev` to start the development server with hot module replacement.
- The source code is organized under the `src/` directory, with components, assets, and content separated for clarity.
- Static files like images and admin configurations are located in the `public/` directory.
- The project uses Material UI for UI components and custom animations for enhanced user experience.
- ESLint configurations are provided to maintain code quality and consistency.
- Theme colors and design tokens are documented in this README for easy reference.

For detailed information on individual components or features, refer to the source code and comments within the `src/Components/` directory.

---

## Theme Colors (in HEX Code)

```
White: 
     Hex Value - #ffffff
     RGB Value - rgb(255, 255, 255)
     HSL Value - hsl(0,0%,100%)

SAMify & first blue square:
     Hex Value - #102036
     RGB Value - rgb(16, 32, 54)
     HSL Value - hsl(215,54%,14%)

Second Blue Square:
     Hex Value - #3682ae
     RGB Value - rgb(54, 130, 174)
     HSL Value - hsl(202,53%,45%)
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
