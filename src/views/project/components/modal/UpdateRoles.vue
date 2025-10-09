<template>
    <Dialog :visible="visible" modal header="Edit Approval Flow" class="w-[700px]" @hide="close">
        <!-- Approval Flow Editor -->
        <div class="flex flex-col items-center space-y-6 py-4">
            <!-- Flow display -->
            <div class="flex items-center justify-center flex-wrap gap-3">
                <div v-for="(step, index) in localSteps" :key="index" class="flex items-center">
                    <!-- Role Box -->
                    <div class="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 shadow-sm min-w-[100px] text-center">
                        <span class="font-medium text-gray-700">{{ step.role }}</span>
                        <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm hover:text-red-600" @click="removeStep(index)" />
                    </div>

                    <!-- Arrow -->
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
            <Button label="Cancel" class="p-button-text text-gray-500" @click="close" />
            <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="save" />
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { computed, ref } from 'vue';

interface Props {
    visible: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['close', 'save']);

interface RoleStep {
    role: string;
}

const allRoles = [
    { label: 'PM', value: 'PM' },
    { label: 'PD', value: 'PD' },
    { label: 'MNGT', value: 'MNGT' },
    { label: 'PURC', value: 'PURC' },
    { label: 'QS', value: 'QS' },
    { label: 'SITE', value: 'SITE' }
];

const localSteps = ref<RoleStep[]>([{ role: 'PM' }, { role: 'PD' }, { role: 'QS' }]);

const selectedRole = ref<string | null>(null);

// 过滤掉已被选择的角色
const availableRoles = computed(() => allRoles.filter((r) => !localSteps.value.some((step) => step.role === r.value)));

const addStep = (): void => {
    if (!selectedRole.value) return;
    localSteps.value.push({ role: selectedRole.value });
    selectedRole.value = null;
};

const removeStep = (index: number): void => {
    localSteps.value.splice(index, 1);
};

const close = (): void => {
    emit('close');
};

const save = (): void => {
    console.log('Updated approval flow:', localSteps.value);
    emit('save', localSteps.value);
    emit('close');
};
</script>

<style scoped>
/* 让箭头和方块排版更平衡 */
.p-dialog-content {
    overflow: visible;
}
</style>
