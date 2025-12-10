<template>
    <div class="card p-4 mb-6 shadow">
        <h3 class="text-lg font-semibold flex items-center gap-2"><i class="pi pi-comments"></i> Recommendation</h3>

        <!-- Tabs -->
        <div class="flex items-center justify-between mb-4 mt-3">
            <div class="flex items-center gap-2">
                <!-- 固定 4 个 Tab -->
                <Button v-for="(item, index) in discussions" :key="index" @click="active = String(index)" rounded :label="item.role" class="h-8 px-2" :outlined="active !== String(index)" />
            </div>

            <Button icon="pi pi-plus" label="Add Comment" class="h-8" @click="showComment = true" />
        </div>

        <!-- Accordion -->
        <Accordion v-model:value="active">
            <AccordionPanel v-for="(item, index) in discussions" :key="index" :value="String(index)">
                <AccordionHeader>
                    <div class="flex items-center w-full gap-2">
                        <span class="font-semibold">{{ item.role }}:</span>
                        <span v-if="item.id !== null">{{ item.name }}</span>
                        <Badge v-else value="Waiting" severity="danger" class="ml-1" style="font-size: 0.65rem; height: 1rem" />
                    </div>
                </AccordionHeader>

                <AccordionContent>
                    <!-- 有数据 -->
                    <div v-if="item.id !== null" class="flex justify-between items-start">
                        <div class="w-full">
                            <span class="text-gray-400 text-sm">{{ formatDate(item.datetime) }}</span>

                            <!-- Selection -->
                            <div class="mt-1 text-gray-700 text-sm font-semibold flex flex-wrap items-center gap-1">
                                <span>Selection:</span>
                                <span>
                                    <template v-if="item.selectionType === 'QS_Recommendation'"> Change Budget Qty according to QS recommendation </template>
                                    <template v-else-if="item.selectionType === 'Site_Recommendation'"> Change Budget Qty according to Site recommendation </template>
                                    <template v-else-if="item.selectionType === 'Specific_Quantity'">
                                        Change Budget Qty according to Specific Quantity
                                        <span class="font-semibold">(Quantity: {{ item.quantity }})</span>
                                    </template>
                                </span>
                            </div>

                            <!-- Remark -->
                            <p class="mt-2 mb-2 text-sm text-gray-700">
                                <span class="font-semibold">Remark: </span>
                                {{ item.message || 'No comments yet.' }}
                            </p>

                            <!-- Attachments -->
                            <div v-if="item.documentUrl?.length" class="mt-4">
                                <div class="flex flex-wrap gap-2 mt-2" style="font-size: 9px !important">
                                    <Badge v-for="(file, idx) in item.documentUrl" :key="idx" :value="file.filename || `File ${idx + 1}`" severity="primary" class="cursor-pointer" @click="openFile(file.path)" />
                                </div>
                            </div>
                        </div>

                        <!-- Edit Button -->
                        <Button v-if="editMode" icon="pi pi-pencil" text rounded @click="openEditModal(item.id)" />
                    </div>

                    <!-- 无数据 -->
                    <div v-else class="text-gray-500 italic p-2">No discussion yet.</div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>

        <!-- Action Buttons -->
        <div class="flex gap-2 justify-end mt-4">
            <Button label="Approved" icon="pi pi-check" class="p-button-success" @click="onApprove" />
            <Button label="Rejected" icon="pi pi-times" class="p-button-danger" @click="onReject" />
        </div>

        <!-- Modals -->
        <commentBCRModal v-model:visible="showComment" />
        <editcommentBCRModal v-model:visible="showComment" :itemId="editingItemId" />
    </div>
</template>

<script lang="ts">
import { useBudgetChangeRequestStore } from '@/stores/budget/budgetChangeRequest.store';
import type { DiscussionItem } from '@/types/budgetChangeRequest.type';
import { formatDate } from '@/utils/dateHelper';
import commentBCRModal from '@/views/budget/components/dialog/CommentBCR.vue';
import editcommentBCRModal from '@/views/budget/components/dialog/EditCommentBCR.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'DiscussionThread',
    components: { commentBCRModal, editcommentBCRModal },
    props: { editMode: { type: Boolean, default: true } },

    setup() {
        const store = useBudgetChangeRequestStore();
        const route = useRoute();

        const active = ref('0');
        const showComment = ref(false);
        const editingItemId = ref<number | string | null>(null);

        const ROLE_ORDER = ['QS', 'Purchasing', 'Site', 'Project Director'];
        const discussions = ref<DiscussionItem[]>([]);

        const fetchDiscussion = async () => {
            const res = await store.fetchRecommendationList(Number(route.params.budgetChangeRequestId));
            const list = res ?? [];

            const mapped = list.map((item: any) => ({
                id: item.Id,
                role: item.Department,
                name: item.ReviewerName,
                datetime: item.CreatedAt,
                selectionType: item.RecommendationType,
                quantity: item.SpecificQuantity,
                message: item.Remark,
                documentUrl: item.Attachment ? JSON.parse(item.Attachment) : []
            }));

            // 固定角色顺序
            discussions.value = ROLE_ORDER.map((role) => {
                const found = mapped.find((x) => x.role === role);
                return (
                    found || {
                        id: null,
                        role,
                        name: '-',
                        datetime: '-',
                        selectionType: '',
                        quantity: null,
                        message: '',
                        documentUrl: []
                    }
                );
            });
        };

        onMounted(fetchDiscussion);

        const openEditModal = (id: number | null) => {
            if (id === null) return;
            editingItemId.value = id;
            showComment.value = true;
        };

        const openFile = (path: string) => {
            window.open(path, '_blank');
        };

        return {
            active,
            showComment,
            editingItemId,
            openEditModal,
            openFile,
            discussions,
            formatDate,
            onApprove: () => console.log('Approved'),
            onReject: () => console.log('Rejected')
        };
    }
});
</script>
