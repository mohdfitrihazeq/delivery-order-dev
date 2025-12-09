<template>
    <div class="card p-4 mb-6 shadow">
        <h3 class="text-lg font-semibold flex items-center gap-2"><i class="pi pi-comments"></i> Discussion Thread</h3>

        <!-- Tabs -->
        <div class="flex items-center justify-between mb-4 mt-3">
            <div class="flex items-center gap-2">
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
                        {{ item.name }}
                    </div>
                </AccordionHeader>

                <AccordionContent>
                    <!-- VIEW MODE -->
                    <div v-if="!item.isEditing" class="flex justify-between items-start">
                        <div class="w-full">
                            <!-- DateTime -->
                            <span class="text-gray-400 text-sm">{{ item.datetime }}</span>

                            <!-- Selection -->
                            <div class="mt-1 text-gray-700 text-sm">
                                <span class="font-semibold">Selection:</span>

                                <!-- 1. QS Recommendation -->
                                <template v-if="item.selectionType === 'qs'"> Change Budget Qty according to QS recommendation </template>

                                <!-- 2. Specific Amount -->
                                <template v-else-if="item.selectionType === 'specific'">
                                    Change Budget Qty to specific amount
                                    <span class="font-semibold">(Quantity: {{ item.quantity }})</span>
                                </template>

                                <!-- 3. fallback -->
                                <template v-else>
                                    {{ item.selection }}
                                </template>
                            </div>

                            <!-- Remark -->
                            <p class="mt-2 mb-2 text-sm text-gray-700">
                                <span class="font-semibold">Remark: </span>
                                {{ item.message || 'No comments yet.' }}
                            </p>

                            <!-- Attachments (multiple) -->
                            <div v-if="item.documentUrl?.length" class="mt-2">
                                <div class="flex flex-wrap gap-2 mt-2" style="font-size: 9px !important">
                                    <Badge v-for="(file, index) in item.documentUrl" :key="index" :value="file.name || `File ${index + 1}`" severity="primary" class="cursor-pointer" @click="openFile(file)" />
                                </div>
                            </div>
                        </div>

                        <!-- Edit Button -->
                        <Button v-if="editMode" icon="pi pi-pencil" text rounded @click="openEditModal(item.id)" />
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>

        <!-- APPROVE / REJECT -->
        <div class="flex gap-2 justify-end mt-4">
            <Button label="Approved" icon="pi pi-check" class="p-button-success" @click="onApprove" />
            <Button label="Rejected" icon="pi pi-times" class="p-button-danger" @click="onReject" />
        </div>

        <!-- ADD COMMENT MODAL -->
        <commentBCRModal v-model:visible="showComment" />

        <!-- EDIT COMMENT MODAL -->
        <editcommentBCRModal v-model:visible="showComment" :itemId="editingItemId" />
    </div>
</template>

<script lang="ts">
import commentBCRModal from '@/views/budget/components/dialog/CommentBCR.vue';
import editcommentBCRModal from '@/views/budget/components/dialog/EditCommentBCR.vue';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
    name: 'DiscussionThread',
    components: { commentBCRModal, editcommentBCRModal },
    props: {
        discussions: {
            type: Array as PropType<
                {
                    id: number | string;
                    role: string;
                    name: string;
                    datetime: string;
                    selectionType?: string;
                    selection?: string;
                    quantity?: number;
                    message?: string;
                    documentUrl?: any[];
                    isEditing?: boolean;
                }[]
            >,
            required: true
        },
        editMode: { type: Boolean, default: true }
    },
    setup() {
        const active = ref('0');
        const showComment = ref(false);

        // 当前正在编辑的 item id
        const editingItemId = ref<number | string | null>(null);

        const openEditModal = (id: number | string) => {
            editingItemId.value = id;
            showComment.value = true;
        };

        const onApprove = () => console.log('Approved clicked');
        const onReject = () => console.log('Rejected clicked');

        return {
            active,
            showComment,
            editingItemId,
            openEditModal,
            onApprove,
            onReject
        };
    }
});
</script>
