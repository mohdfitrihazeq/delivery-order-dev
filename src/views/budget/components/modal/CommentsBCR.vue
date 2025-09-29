<script lang="ts" src="./CommentsBCR.script.ts"></script>

<template>
    <Dialog :visible="visible" modal :style="{ width: '40rem' }" @update:visible="$emit('update:visible', $event)">
        <!-- Header -->
        <template #header>
            <span class="font-bold">Add Comments : {{ requestNo }}</span>
        </template>

        <div class="flex flex-col gap-3">
            <!-- Comment Section -->
            <label class="font-medium">Comment:</label>
            <span class="text-gray-600 text-sm"> Add your comment to the discussion thread for this budget change request </span>
            <Textarea v-model="comment" rows="4" placeholder="Enter your comment" class="w-full" />

            <!-- Attachments Section -->
            <label class="font-medium">Attachments:</label>
            <Toast />
            <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" class="custom-file-upload">
                <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                </template>
            </FileUpload>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-2 mt-2">
                <Button label="Cancel" outlined @click="$emit('update:visible', false)" />
                <Button label="Add Comment" @click="handleSubmit" />
            </div>
        </div>
    </Dialog>
</template>
