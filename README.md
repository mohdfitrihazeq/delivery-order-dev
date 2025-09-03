# DO System

## Overview

TailAdmin provides essential UI components and layouts for building feature-rich, data-driven admin dashboards and control panels. It's built on:

- Vue 3 (Vite)
- TypeScript
- Tailwind CSS

## Installation

### Prerequisites

To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)
- Recommended IDE Setup: [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

#### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/TailAdmin/vue-tailwind-admin-dashboard.git
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Components

All components are built with Vue and styled using Tailwind CSS for easy customization.

## Features

**💎 High-quality, Premium Modern Design:**
A thoughtfully designed dashboard template with a deep focus on UX/UI, already trusted and utilized by over 10K+ web apps worldwide.

**✨ Vue 3:**
Get enhanced performance with the latest Vue version.

**⚡ Vite Build System:**
Enjoy quick development with Vite, ensuring fast code compilation.

**🔀 Vue Router:**
Manage app navigation with ease using Vue Router for seamless transitions.

**💡 Reactive Utilities:**
Enhance component reactivity with @vueuse/core utilities.

**📊 Charting with ApexCharts:**
Visualize data with ApexCharts for beautiful analytics.

**🗺️ Vector Maps with JSVectorMap:**
Easily integrate interactive vector maps with JSVectorMap.

**🖌️ UI with Tailwind CSS:**
Frontend UI built on the powerful and versatile Tailwind CSS framework.

**💫 TypeScript Support:**
Write safer, maintainable code with TailAdmin Vue's TypeScript Support.

**✅ Linting and Formatting:**
Maintain a clean codebase with built-in linting and formatting.

**🗃️ State Management with Pinia:**
Handle your app's state with Pinia for clean, organized code.

## Update Logs

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to Tailwind CSS v4 for better performance and efficiency.
- Updated class usage to match the latest syntax and features.
- Replaced deprecated class and optimized styles.

#### Next Steps

- Run npm install or yarn install to update dependencies.
- Check for any style changes or compatibility issues.
- Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
- This update keeps the project up to date with the latest Tailwind improvements. 🚀

### Version 2.0.0 - [February 2025]

Major update with Vue 3 migration and comprehensive redesign.

#### Major Improvements

- Complete migration to Vue 3 Composition API
- Updated to Vue Router 4
- Enhanced user interface with new Vue 3 components
- Improved performance with Vue 3's virtual DOM
- Better accessibility and responsive design

#### New Features

- Redesigned dashboards (Ecommerce, Analytics, Marketing, CRM)
- Collapsible sidebar with Vue 3 integration
- Enhanced navigation with Vue Router 4
- Real-time chat functionality
- Full-featured calendar with drag-and-drop
- Advanced table components
- Updated data visualization with ApexCharts

#### Breaking Changes

- Requires Vue 3 and Vue Router 4
- Chart components migrated to ApexCharts for Vue 3
- Modified routing implementation
- Updated component APIs for Vue 3 compatibility

[Read more](https://tailadmin.com/docs/update-logs/vue) on this release.

### Version 1.0.2 - [June 19, 2024]

#### Issues

- Fix Mobile Menu Hamburger Icon issue.

### Version 1.0.1 - [Feb 08, 2024]

#### Enhancements

- Make it functional [Multiselect Dropdown/Form Elements].
- Delete SelectGroup Components then create a SelectGroup folder and create two files under this
  folder SelectGroupOne.vue SelectGroupTwo.vue [Select Group/Form Elements & Layout].
- Update style.css file.

### Version 1.0.0 - Initial Release - [Jan 22, 2024]

- Initial release of TailAdmin Vue.
