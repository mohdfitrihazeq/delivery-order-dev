<template>
    <Dialog :visible="visible" modal header="Assign Project Roles" class="w-[750px]" @hide="close">
        <!-- Approval Flow Header -->
        <div class="flex items-center justify-between mb-5">
            <h6 class="text-gray-700 font-semibold text-lg mb-0">Approval Flow</h6>
            <Button icon="pi pi-pencil" class="p-button-text p-button-sm hover:text-teal-700" label="Edit Flow" @click="showUpdateRoles = true" />
        </div>

        <!-- Approval Flow Section -->
        <div class="approval-flow text-center mb-8">
            <div class="flex items-center justify-center gap-4 flex-wrap">
                <div v-for="(step, index) in approvalSteps" :key="step.role" class="flex items-center">
                    <div class="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 font-semibold min-w-[100px] text-center shadow-sm">
                        {{ step.role }}
                    </div>
                    <i v-if="index < approvalSteps.length - 1" class="pi pi-caret-right text-gray-400 text-lg ml-3 mr-1"></i>
                </div>
            </div>
        </div>

        <!-- User Role Table -->
        <div class="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="text-left py-3 px-5 font-semibold text-gray-600 w-1/3">Role</th>
                        <th class="text-left py-3 px-5 font-semibold text-gray-600">Assigned Users</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(step, index) in approvalSteps" :key="index" class="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td class="py-3 px-5 font-medium text-gray-700">
                            {{ step.role }}
                        </td>
                        <td class="py-3 px-5">
                            <div v-if="step.users.length" class="flex flex-wrap gap-2">
                                <span v-for="user in step.users" :key="user" class="bg-teal-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                    {{ user }}
                                </span>
                            </div>
                            <div v-else class="text-gray-400 text-xs italic">No users assigned</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <template #footer>
            <Button label="Close" icon="pi pi-times" class="p-button-text text-gray-500" @click="close" />
            <Button label="Save Changes" icon="pi pi-check" class="p-button-primary" @click="save" />
        </template>

        <!-- Update Roles Modal -->
        <UpdateRoles v-if="showUpdateRoles" :visible="showUpdateRoles" @close="showUpdateRoles = false" :title="props.title" />
    </Dialog>
</template>

<script lang="ts" setup>
import UpdateRoles from '@/views/project/components/modal/UpdateRoles.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

interface Props {
    visible: boolean;
    title?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['close']);

interface ApprovalStep {
    role: string;
    users: string[];
}

// ✅ 数据
const approvalSteps = ref<ApprovalStep[]>([
    { role: 'PM', users: ['Alice', 'Bob'] },
    { role: 'PD', users: ['ZIYU'] },
    { role: 'QS', users: [] }
]);

// ✅ 控制子弹窗
const showUpdateRoles = ref(false);

// ✅ 关闭
const close = (): void => {
    emit('close');
};

// ✅ 保存
const save = (): void => {
    console.log('Saving roles:', approvalSteps.value);
    emit('close');
};
</script>

<style scoped>
.approval-flow {
    h6 {
        font-size: 16px;
        font-weight: 600;
    }
}
</style>
