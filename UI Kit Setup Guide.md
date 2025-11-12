# UI Kit Setup Guide

This guide explains how to install and use the **ProSync UI Kit** (`@qubit/prosync`) in your Vue 3 + Vite project with Tailwind CSS.

---

## 1️⃣ Clone the UI Kit Repository

````bash
cd C:\Users\fitri\Documents\GitHub
git clone https://github.com/prosync-2026/ui-component-kit.git
cd ui-component-kit

## 2️⃣ Install Dependencies and Build the UI Kit

```bash
npm install
npm run build

# This generates the dist/ folder with compiled JS and CSS.
# Do not use src/ directly in your main project; always use the built dist/ files.

## 3️⃣ Install the UI Kit in Your Project

```bash
cd ../delivery-order-dev
npm install ../ui-component-kit

## 4️⃣ Configure Vite Aliases

# Edit vite.config.ts:

import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(async () => {
  const { PrimeVueResolver } = await import('@primevue/auto-import-resolver');

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [PrimeVueResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@qubit/prosync': fileURLToPath(new URL('../ui-component-kit/dist', import.meta.url))
      }
    }
  };
});

# The alias must point to dist/, not src/.


## 5️⃣ Configure Tailwind CSS

# Edit tailwind.config.ts:

/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  darkMode: ['selector', '[class*="app-dark"]'],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@qubit/prosync/dist/**/*.{js,vue,ts}'
  ],
  plugins: [PrimeUI],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    }
  }
};


## 6️⃣ Import the UI Kit in main.ts

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import HighchartsVue from 'highcharts-vue';

// UI Kit
import { VueComponentLibrary } from '@qubit/prosync';
import '@qubit/prosync/style.css';

import '@/assets/tailwind.css';
import '@/assets/styles.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.component('Toast', Toast);
app.use(ConfirmationService);
app.use(HighchartsVue);

// Register UI kit components globally
app.use(VueComponentLibrary);

app.mount('#app');

## 7️⃣ Using the Components

// Example UiKitTest.vue:

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

function handleClick() {
  alert(`Email entered: ${email.value}`);
}
</script>

<template>
  <div class="p-6">
    <AppCard title="Test Card" class="mb-4">
      <p>This is a test card using the UI kit.</p>
      <AppInput v-model="email" label="Email" placeholder="Enter your email" class="mb-2" />
      <AppButton variant="primary" @click="handleClick">Click Me</AppButton>
    </AppCard>
  </div>
</template>

// Use AppButton, AppCard, AppInput, AppSelect for globally registered components.

## 8️⃣ Running the Project

```bash
npm run dev

// Visit your test page (e.g., /ui-kit-test) to see fully styled components.

## 9️⃣ Tips

// Always build the UI kit after any changes:

```bash
cd ui-component-kit
npm run build


// Ensure Tailwind scans the dist folder, otherwise UI kit classes won’t be applied.

// For new components in the UI kit:

// Add them to src/components/YourComponent/

// Export them in src/index.ts

// Run npm run build

// Test in delivery-order-dev
````
