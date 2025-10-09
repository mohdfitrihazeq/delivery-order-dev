<template>
    <Dialog v-model:visible="visible" modal header="Assign Project Roles" class="w-[700px]" :closable="true" :dismissableMask="false" @hide="close">
        <!-- Selection row -->
        <div class="flex items-center gap-3 mb-4">
            <Dropdown v-model="selectedRole" :options="roles" optionLabel="label" optionValue="value" placeholder="Select Project Role" class="w-[180px] p-dropdown-sm" />
            <Dropdown v-model="selectedUser" :options="users" optionLabel="label" optionValue="value" placeholder="Select System User" class="w-[180px] p-dropdown-sm" />
            <Button label="Add" icon="pi pi-plus" class="p-button-primary p-button-sm" :disabled="!selectedRole || !selectedUser" @click="addAssignment" />
        </div>

        <!-- Assigned Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="text-left py-2 px-4 font-semibold">Project Role</th>
                        <th class="text-left py-2 px-4 font-semibold">System User</th>
                        <th class="py-2 px-4 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in assignments" :key="index" class="border-b hover:bg-gray-50 transition-colors">
                        <td class="py-2 px-4">{{ item.role }}</td>
                        <td class="py-2 px-4">{{ item.user }}</td>
                        <td class="py-2 px-4">
                            <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm" @click="removeAssignment(index)" />
                        </td>
                    </tr>
                    <tr v-if="assignments.length === 0">
                        <td colspan="3" class="py-2 px-4 text-gray-400 italic text-center">No assignments yet</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <template #footer>
            <Button label="Cancel" class="p-button-text text-gray-500" @click="close" />
            <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="save" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { defineComponent, ref, watch } from 'vue';

interface Assignment {
    role: string;
    user: string;
}

export default defineComponent({
    name: 'AssignRoles',
    components: { Dialog, Dropdown, Button },
    props: {
        modelValue: { type: Boolean, required: true }
    },
    emits: ['update:modelValue', 'save'],
    setup(props, { emit }) {
        const visible = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (val) => {
                visible.value = val;
            }
        );

        const roles = [
            { label: 'PURC', value: 'PURC' },
            { label: 'QS', value: 'QS' },
            { label: 'SITE', value: 'SITE' },
            { label: 'PD', value: 'PD' },
            { label: 'PM', value: 'PM' },
            { label: 'MNGT', value: 'MNGT' }
        ];

        const users = [
            { label: 'Alice', value: 'Alice' },
            { label: 'Bob', value: 'Bob' },
            { label: 'Charlie', value: 'Charlie' },
            { label: 'ZIYU', value: 'ZIYU' }
        ];

        const selectedRole = ref<string | null>(null);
        const selectedUser = ref<string | null>(null);
        const assignments = ref<Assignment[]>([]);

        const addAssignment = () => {
            if (!selectedRole.value || !selectedUser.value) return;
            if (assignments.value.some((a) => a.role === selectedRole.value && a.user === selectedUser.value)) return;
            assignments.value.push({ role: selectedRole.value, user: selectedUser.value });
            selectedRole.value = null;
            selectedUser.value = null;
        };

        const removeAssignment = (index: number) => {
            assignments.value.splice(index, 1);
        };

        const close = () => {
            emit('update:modelValue', false);
        };

        const save = () => {
            emit('save', assignments.value);
            emit('update:modelValue', false);
        };

        return {
            visible,
            roles,
            users,
            selectedRole,
            selectedUser,
            assignments,
            addAssignment,
            removeAssignment,
            close,
            save
        };
    }
});
</script>
