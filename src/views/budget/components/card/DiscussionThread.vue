<template>
    <div class="card p-4 mb-6 shadow">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2"><i class="pi pi-comments"></i> Discussion Thread</h3>

            <div class="flex gap-2">
                <Button v-for="(item, index) in discussions" :key="index" @click="active = String(index)" rounded :label="item.role" class="w-auto h-8 px-2 p-0" :outlined="active !== String(index)" />
            </div>
        </div>

        <Accordion v-model:value="active">
            <AccordionPanel v-for="(item, index) in discussions" :key="index" :value="String(index)">
                <AccordionHeader>
                    <div class="flex justify-between items-center w-full">
                        <div class="flex gap-2 items-center">
                            <span class="font-semibold">{{ item.role }}</span>
                            <span>{{ item.name }}</span>
                            <span class="text-gray-400">{{ item.datetime }}</span>
                        </div>
                    </div>
                </AccordionHeader>

                <AccordionContent>
                    <div v-if="!item.isEditing" class="flex justify-between items-start">
                        <!-- 左边内容 -->
                        <div>
                            <p class="mb-2 text-sm text-gray-700">
                                {{ item.message || 'No comments yet.' }}
                            </p>

                            <div v-if="item.documentUrl?.length" class="flex gap-2 flex-wrap">
                                <span class="px-2 py-1 text-sm text-primary"> <i class="pi pi-file"></i> 1 Attachments </span>
                            </div>
                        </div>

                        <!-- 只有 editMode 才显示铅笔 icon -->
                        <Button v-if="editMode" icon="pi pi-pencil" text rounded @click="item.isEditing = true" />
                    </div>

                    <div v-else>
                        <label class="block text-gray-600 mb-2">Comments</label>
                        <Textarea v-model="item.message" autoResize rows="3" class="w-full text-sm mb-3" placeholder="Type your comment..." />

                        <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" class="text-xs" />

                        <div class="flex gap-2 justify-end mt-2">
                            <Button label="Save" icon="pi pi-check" @click="item.isEditing = false" />
                            <Button label="Cancel" icon="pi pi-times" outlined @click="item.isEditing = false" />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
    name: 'DiscussionThread',
    props: {
        discussions: {
            type: Array as PropType<
                {
                    role: string;
                    name: string;
                    datetime: string;
                    message?: string;
                    documentUrl?: string[];
                    isEditing?: boolean;
                }[]
            >,
            required: true
        },
        editMode: {
            type: Boolean,
            default: false // 默认是 view mode
        }
    },
    setup() {
        const active = ref('0');

        const onUpload = (event: any) => {
            console.log('uploaded', event);
        };

        return {
            active,
            onUpload
        };
    }
});
</script>
