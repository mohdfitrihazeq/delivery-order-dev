## Code Structure Guideline

All script files (e.g., composables like `@/src/views/budget/Overview.script.ts`) must follow this structure order:

1. **Static Data** → constants and datasets.  
2. **Reactive State** → refs and reactive variables.  
3. **Computed Properties** → derived values.  
4. **Functions** → handlers and business logic.  
5. **Lifecycle Hooks** → initialization logic.  
6. **Return** → expose necessary data and methods.  

➡️ Please follow this order when writing new code.  
➡️ Reviewers should check script files against this structure.
