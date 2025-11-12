# Vue 3 UI Kit Quick Start (Commands Only)

Follow these commands to set up the ProSync UI Kit in your Vue 3 + Vite project.

---

## 1️⃣ Clone and Build UI Kit

````bash
cd C:\Users\fitri\Documents\GitHub
git clone https://github.com/prosync-2026/ui-component-kit.git
cd ui-component-kit
npm install
npm run build


## 2️⃣ Install UI Kit in Project

```bash
cd ../delivery-order-dev
npm install ../ui-component-kit

## 3️⃣ Configure Vite (vite.config.ts)

alias: {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  '@qubit/prosync': fileURLToPath(new URL('../ui-component-kit/dist', import.meta.url))
}

## 4️⃣ Configure Tailwind (tailwind.config.ts)

content: [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  './node_modules/@qubit/prosync/dist/**/*.{js,vue,ts}'
]

## 5️⃣ Import in main.ts

import { VueComponentLibrary } from '@qubit/prosync';
import '@qubit/prosync/style.css';

app.use(VueComponentLibrary);

## 6️⃣ Test Components (UiKitTest.vue)

<AppCard title="Test Card">
  <AppInput v-model="email" label="Email" placeholder="Enter your email" />
  <AppButton variant="primary" @click="handleClick">Click Me</AppButton>
</AppCard>

## 7️⃣ Run Project

npm run dev


# Components like AppButton, AppCard, AppInput, AppSelect are now ready with styles applied.
````
