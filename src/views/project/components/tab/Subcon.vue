<script lang="ts" src="./Subcon.script.ts"></script>
<template>
    <div>
        <ReusableTable :value="subconList" :columns="columns" emptyTitle="Subcon Data" :show-create="true" :show-import-file="false" :on-create="handleCreate" :on-action-click="handleActionClick" />

        <CreateSubconModal v-model:visible="showCreateModal" @submit="handleModalSubmit" />
    </div>
</template>
