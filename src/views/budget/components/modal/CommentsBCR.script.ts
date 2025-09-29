import { useToast } from 'primevue/usetoast';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        requestNo: {
            type: String,
            default: null
        }
    },
    emits: ['update:visible', 'submit'],
    setup(props, { emit }) {
        const comment = ref('');
        const files = ref<File[]>([]);
        const toast = useToast();

        // 提交
        function handleSubmit() {
            if (props.requestNo) {
                emit('submit', props.requestNo, comment.value, files.value);
                comment.value = '';
                files.value = [];
                emit('update:visible', false);
            }
        }

        // 文件上传回调
        function onAdvancedUpload() {
            toast.add({
                severity: 'info',
                summary: 'Success',
                detail: 'File Uploaded',
                life: 3000
            });
        }

        return {
            comment,
            files,
            handleSubmit,
            onAdvancedUpload
        };
    }
});
