## Code Structure Guideline

All script files (e.g., composables like `@/src/views/budget/Overview.script.ts`) must follow this structure order:

1. **Static Data** → constants and datasets
2. **Reactive State** → ref and reactive variables
3. **Computed Properties** → derived values
4. **Functions** → handlers and business logic
5. **Lifecycle Hooks** → initialization logic
6. **Return** → expose necessary data and methods

➡️ Please follow this order when writing new code
➡️ Reviewers should check script files against this structure


## Website Self Create Components Guideline

Reference Components files (e.g., pages like `@/src/views/delivery/Deliveries.vue`)

1. **SummaryCard**
   * Props: cardItems, cardCol
   * Example: pass your card data and column count

2. **Tabs (Underline / Pills)**
   * Props: tabItems (required: value & label), optional: icon & badge
   * Example: pass tab items array with value and label

3. **Table**
   * Props: value, emptyTitle, columns, optional: filter, search, buttons
   * Example: pass table data, column config, and options if needed
