import { useToast } from 'primevue/usetoast';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:visible', 'submit'],
    setup(props, { emit }) {
        const selection = ref<string>('');
        const quantity = ref<string>('');
        const remark = ref<string>('');
        const files = ref<File[]>([]);
        const toast = useToast();

        const onAdvancedUpload = () => {
            toast.add({
                severity: 'success',
                summary: 'Upload Successful',
                detail: 'File Uploaded',
                life: 3000
            });
        };

        const handleSubmit = () => {
            if (!remark.value.trim()) {
                toast.add({
                    severity: 'warn',
                    summary: 'Remark Required',
                    detail: 'Please enter your remark before submitting.',
                    life: 3000
                });
                return;
            }

            emit('submit', {
                selection: selection.value,
                quantity: quantity.value,
                remark: remark.value,
                files: files.value
            });

            // Reset after submit
            selection.value = '';
            quantity.value = '';
            remark.value = '';
            files.value = [];

            emit('update:visible', false);
        };

        return {
            selection,
            quantity,
            remark,
            files,
            onAdvancedUpload,
            handleSubmit
        };
    }
});
