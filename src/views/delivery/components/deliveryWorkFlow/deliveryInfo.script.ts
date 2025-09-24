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

interface FormValues {
    driverPlate: string;
    deliveryDate: Date | null;
}

export default defineComponent({
    name: 'DeliveryFormCard',
    components: { Card, InputText, Button, Message, Toast, Form, Calendar, Textarea, FileUpload, ProgressBar, Badge },
    emits: ['update', 'next-step'],
    setup(_, { emit }) {
        const toast = useToast();
        const toastRef = ref<InstanceType<typeof Toast> | null>(null);

        const initialValues = reactive<FormValues>({
            driverPlate: '',
            deliveryDate: null
        });

        const errors = reactive<{ driverPlate?: string; deliveryDate?: string }>({});

        const resolver = (options: FormResolverOptions) => {
            const values = options.values as FormValues;
            errors.driverPlate = '';
            errors.deliveryDate = '';

            if (!values.driverPlate?.trim()) errors.driverPlate = 'Driver Plate Number is required.';
            if (!values.deliveryDate) errors.deliveryDate = 'Delivery Date is required.';

            return { values, errors: errors };
        };

        const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
            const values = event.values as FormValues;
            console.log('values', values);
            if (event.valid) {
                emit('update', values);
                emit('next-step');
                toast.add({
                    severity: 'success',
                    summary: 'Form is submitted.',
                    life: 3000
                });
            }
        };

        // File upload
        const files = ref<UploadFile[]>([]);
        const totalSize = ref(0);
        const totalSizePercent = ref(0);

        const formatSize = (bytes: number) => {
            const k = 1024;
            const dm = 2;
            const sizes = $primevue.config?.locale?.fileSizeTypes || ['B', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return `0 ${sizes[0]}`;
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
            return `${formattedSize} ${sizes[i]}`;
        };

        const onSelectedFiles = (event: { files: any[] }) => {
            files.value = event.files;
            totalSize.value = 0;
            files.value.forEach((f) => (totalSize.value += f.size));
            totalSizePercent.value = (totalSize.value / 1_000_000) * 100;
        };

        const onRemoveTemplatingFile = (file: any, removeFileCallback: (index: number) => void, index: number) => {
            removeFileCallback(index);
            totalSize.value -= file.size;
            totalSizePercent.value = (totalSize.value / 1_000_000) * 100;
        };

        const uploadEvent = (callback: () => void) => {
            totalSizePercent.value = (totalSize.value / 1_000_000) * 100;
            callback();
        };

        const onTemplatedUpload = (event?: any) => {
            toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        };

        return {
            initialValues,
            resolver,
            onFormSubmit,
            toastRef,
            errors,
            files,
            totalSize,
            totalSizePercent,
            formatSize,
            onSelectedFiles,
            onRemoveTemplatingFile,
            uploadEvent,
            onTemplatedUpload
        };
    }
});
