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

        return {
            initialValues,
            resolver,
            onFormSubmit,
            toastRef,
            errors
        };
    }
});
