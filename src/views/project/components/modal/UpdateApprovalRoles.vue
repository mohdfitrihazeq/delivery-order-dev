<template>
    <Dialog v-model:visible="visible" modal header="Edit Approval Flow" class="w-[700px]" :closable="true" :dismissableMask="false" @hide="close">
        <div class="flex flex-col items-center space-y-6 py-4">
            <!-- Flow display -->
            <div class="flex items-center justify-center flex-wrap gap-3">
                <div v-for="(step, index) in localSteps" :key="index" class="flex items-center">
                    <div class="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 shadow-sm min-w-[100px] text-center">
                        <span class="font-medium text-gray-700">{{ step.role }}</span>
                        <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm hover:text-red-600" @click="removeStep(index)" />
                    </div>
                    <i v-if="index < localSteps.length - 1" class="pi pi-caret-right text-gray-400 text-xl mx-2"></i>
                </div>
            </div>

            <!-- Add New Role -->
            <div class="flex items-center gap-3 mt-6">
                <Dropdown v-model="selectedRole" :options="availableRoles" optionLabel="label" optionValue="value" placeholder="Select Role" class="w-[200px]" />
                <Button icon="pi pi-plus" label="Add Role" class="p-button-sm p-button-primary" @click="addStep" :disabled="!selectedRole" />
            </div>
        </div>

        <!-- Footer -->
        <template #footer>
            <Button label="Cancel" class="p-button-text text-gray-500" @click="visible = false" />
            <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="save" />
        </template>
    </Dialog>
</template>

<script lang="ts" src="./UpdateApprovalRoles.script.ts"></script>
