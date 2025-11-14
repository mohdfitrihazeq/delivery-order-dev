import Form, { FormResolverOptions, FormSubmitEvent } from '@primevue/forms/form';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import FileUpload from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import ProgressBar from 'primevue/progressbar';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormValues, UploadFile } from '@/types/delivery.type';

export default defineComponent({
    name: 'DeliveryFormCard',
    components: {
        Card,
        InputText,
        Button,
        Message,
        Toast,
        Form,
        Calendar,
        Textarea,
        FileUpload,
        ProgressBar,
        Badge
    },
    emits: ['update'],
    setup(_, { emit }) {
        const router = useRouter();
        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);

        const initialValues = reactive<FormValues>({
            driverPlate: '',
            deliveryDate: null,
            remarks: ''
        });

        const errors = reactive<{ driverPlate?: string; deliveryDate?: string }>({});

        // -------------------------------------------------------
        // MAIN ATTACHMENTS (with preview)
        // -------------------------------------------------------
        const deliveryAttachments = ref<UploadFile[]>([]);
        const totalSize = ref(0);
        const totalSizePercent = ref(0);

        // -------------------------------------------------------
        // EVIDENCE ATTACHMENTS (with preview)
        // -------------------------------------------------------
        const evidenceFiles = ref<UploadFile[]>([]);
        const evidenceTotalSize = ref(0);
        const evidenceTotalSizePercent = ref(0);

        // -------------------------------------------------------
        const formatSize = (bytes: number) => {
            const k = 1024;
            const dm = 2;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return `0 ${sizes[0]}`;
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
        };

        const resolver = (options: FormResolverOptions) => {
            const values = options.values as FormValues;
            errors.driverPlate = '';
            errors.deliveryDate = '';

            if (!values.driverPlate?.trim()) errors.driverPlate = 'Driver Plate Number is required.';
            if (!values.deliveryDate) errors.deliveryDate = 'Delivery Date is required.';

            return { values, errors };
        };

        // -------------------------------------------------------
        // MAIN ATTACHMENT HANDLERS
        // -------------------------------------------------------
        const onSelectedFiles = (event: { files: File[] }) => {
            deliveryAttachments.value.push(
                ...event.files.map((f) => ({
                    name: f.name,
                    size: f.size,
                    type: f.type,
                    raw: f,
                    preview: URL.createObjectURL(f)
                }))
            );

            totalSize.value = deliveryAttachments.value.reduce((sum, f) => sum + f.size, 0);
            totalSizePercent.value = (totalSize.value / 10_000_000) * 100;
        };

        const onRemoveFile = (file: UploadFile, removeCallback: (index: number) => void, index: number) => {
            removeCallback(index);

            if (file.preview) URL.revokeObjectURL(file.preview);

            deliveryAttachments.value.splice(index, 1);

            totalSize.value = deliveryAttachments.value.reduce((sum, f) => sum + f.size, 0);
            totalSizePercent.value = (totalSize.value / 10_000_000) * 100;
        };

        // -------------------------------------------------------
        // EVIDENCE ATTACHMENT HANDLERS
        // -------------------------------------------------------
        const onSelectedEvidenceFiles = (event: { files: File[] }) => {
            evidenceFiles.value.push(
                ...event.files.map((f) => ({
                    name: f.name,
                    size: f.size,
                    type: f.type,
                    raw: f,
                    preview: URL.createObjectURL(f)
                }))
            );

            evidenceTotalSize.value = evidenceFiles.value.reduce((s, f) => s + f.size, 0);
            evidenceTotalSizePercent.value = (evidenceTotalSize.value / 10_000_000) * 100;
        };

        const onRemoveEvidenceFile = (file: UploadFile, removeCallback: (index: number) => void, index: number) => {
            removeCallback(index);

            if (file.preview) URL.revokeObjectURL(file.preview);

            evidenceFiles.value.splice(index, 1);

            evidenceTotalSize.value = evidenceFiles.value.reduce((s, f) => s + f.size, 0);
            evidenceTotalSizePercent.value = (evidenceTotalSize.value / 10_000_000) * 100;
        };

        // -------------------------------------------------------
        const uploadEvent = (callback: () => void) => callback();

        const onFormSubmit = async (event: FormSubmitEvent<Record<string, any>>) => {
            const values = event.values as FormValues;
            if (!event.valid) return;

            const dataToEmit = {
                PlateNo: values.driverPlate,
                Date: values.deliveryDate?.toISOString().slice(0, 10) || '',
                Remarks: values.remarks || '',
                attachments: [...deliveryAttachments.value.map((f) => f.raw), ...evidenceFiles.value.map((f) => f.raw)]
            };

            emit('update', dataToEmit);

            toast.add({
                severity: 'success',
                summary: 'Data Ready',
                detail: `Uploaded ${dataToEmit.attachments.length} total file(s).`,
                life: 2500
            });
        };

        const goBack = () => router.push('/deliveries');

        return {
            initialValues,
            errors,

            deliveryAttachments,
            totalSize,
            totalSizePercent,

            evidenceFiles,
            evidenceTotalSize,
            evidenceTotalSizePercent,

            toastRef,
            formatSize,
            resolver,
            onFormSubmit,
            onSelectedFiles,
            onRemoveFile,
            onSelectedEvidenceFiles,
            onRemoveEvidenceFile,
            uploadEvent,
            goBack
        };
    }
});
