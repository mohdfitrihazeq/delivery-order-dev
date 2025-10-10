<script lang="ts" src="./CostCenterElement.script.ts"></script>

<template>
    <div>
        <ReusableTable :value="costCenterList" :columns="columns" emptyTitle="Cost Center Data" :show-create="true" :show-import-file="false" :on-create="handleCreate" :on-action-click="handleActionClick" />

        <CreateCostCenterModal v-model:visible="showCreateModal" @submit="handleModalSubmit" />
    </div>
</template>
