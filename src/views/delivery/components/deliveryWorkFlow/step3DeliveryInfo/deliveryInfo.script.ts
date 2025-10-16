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

interface FormValues {
    driverPlate: string;
    deliveryDate: Date | null;
    remarks?: string;
}

interface UploadFile {
    name: string;
    size: number;
    type?: string;
    raw: File;
}

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

        const files = ref<UploadFile[]>([]);
        const totalSize = ref(0);
        const totalSizePercent = ref(0);

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

            return { values, errors: errors };
        };

        const onSelectedFiles = (event: { files: File[] }) => {
            files.value = event.files.map((f) => ({
                name: f.name,
                size: f.size,
                type: f.type,
                raw: f
            }));
            totalSize.value = files.value.reduce((sum, f) => sum + f.size, 0);
            totalSizePercent.value = (totalSize.value / 10_000_000) * 100; // 10 MB
        };

        const onRemoveFile = (file: File | UploadFile, removeCallback: (index: number) => void, index: number) => {
            removeCallback(index);
            files.value.splice(index, 1);
            totalSize.value -= file.size;
            totalSizePercent.value = (totalSize.value / 10_000_000) * 100;
        };

        const uploadEvent = (callback: () => void) => {
            callback();
        };

        const onFormSubmit = async (event: FormSubmitEvent<Record<string, any>>) => {
            const values = event.values as FormValues;

            if (!event.valid) return;

            const dataToEmit = {
                PlateNo: values.driverPlate,
                Date: values.deliveryDate?.toISOString().slice(0, 10) || '',
                Remarks: values.remarks || '',
                attachments: files.value.map((f) => f.raw)
            };

            console.log(' Emitting data:', dataToEmit);

            emit('update', dataToEmit);

            toast.add({
                severity: 'success',
                summary: 'Data Ready',
                detail: `Emitted ${dataToEmit.attachments.length} file(s) successfully.`,
                life: 2500
            });
        };

        const goBack = () => router.push('/deliveries');

        return {
            initialValues,
            errors,
            files,
            totalSize,
            totalSizePercent,
            toastRef,
            formatSize,
            resolver,
            onFormSubmit,
            onSelectedFiles,
            onRemoveFile,
            uploadEvent,
            goBack
        };
    }
});
