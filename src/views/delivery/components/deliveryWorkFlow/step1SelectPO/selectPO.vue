<script lang="ts" src="./selectPO.script"></script>

<template>
    <div class="p-mb-5 mt-5">
        <Message severity="secondary" variant="outlined" :closable="false">
            <i class="pi pi-box"></i>
            Select the Purchase Order that corresponds to this delivery. You can search by PO number or item name.
        </Message>

        <Card class="mt-6 border">
            <template #title>
                <div class="flex items-center gap-2">
                    <i class="pi pi-search"></i>
                    <span>Search Purchase Order</span>
                </div>
            </template>

            <template #content>
                <Form v-slot="$form" @submit="onFormSubmit" class="flex flex-col gap-4 mt-1 w-full sm:w-full">
                    <!-- Search -->
                    <div class="grid grid-cols-1 gap-4 p-3">
                        <IconField class="w-full">
                            <InputIcon class="pi pi-search" />
                            <InputText v-model="searchTerm" placeholder="Search by PO number or item name..." class="w-full" />
                        </IconField>
                    </div>

                    <!-- Cards -->
                    <div class="grid grid-cols-1 gap-4 p-3">
                        <Card v-for="card in filteredCards" :key="card.id" class="relative border rounded-lg cursor-pointer transition-colors" :class="isSelected(card) ? 'selected' : ''" @click="toggleSelect(card)">
                            <template #content>
                                <div v-if="isSelected(card)" class="absolute top-2 left-2 right-2 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-sm"> ✓ </span>
                                        <span class="text-sm font-medium text-green-700">Selected Purchase Order</span>
                                    </div>

                                    <button class="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white text-sm" @click.stop="removeCard(card)">✕</button>
                                </div>

                                <div :class="['flex justify-between items-start', isSelected(card) ? 'mt-5' : 'mt-0']">
                                    <div>
                                        <h4 class="font-semibold mb-1">{{ card.title }}</h4>
                                        <p class="text-gray-600 mb-2 text-xs">{{ card.content }}</p>
                                        <div class="flex gap-2 flex-wrap" v-if="!isSelected(card)">
                                            <Badge v-for="(badge, i) in card.badges" :key="i" :value="badge" severity="secondary" class="bg-gray-200 text-gray-700" />
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg" v-if="!isSelected(card)">
                                        <i :class="['text-gray-700', 'text-xl', 'pi', card.icon]"></i>
                                    </div>
                                </div>
                            </template>
                        </Card>
                    </div>

                    <div class="flex justify-end mt-4 gap-2">
                        <Button type="button" label="Back" severity="secondary" @click="goBack" />
                        <Button type="submit" label="Next" severity="primary" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>
</template>

<style scoped>
:deep(.p-card.selected) {
    background-color: rgb(243 244 246) !important;
}
</style>
