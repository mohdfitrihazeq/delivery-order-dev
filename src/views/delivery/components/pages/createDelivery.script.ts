import DeliveryInfo from '@/views/delivery/components/deliveryWorkFlow/step1DeliveryInfo/deliveryInfo.vue';
import SelectPO from '@/views/delivery/components/deliveryWorkFlow/step2SelectPO/selectPO.vue';
import VerifyItem from '@/views/delivery/components/deliveryWorkFlow/step3VerifyItem/verifyItem.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { DeliveryInfo, SelectPO, VerifyItem },
    setup() {
        const activeStep = ref(1);

        const deliveryData = ref({
            deliveryInfo: {},
            selectPO: {},
            verifyItem: {},
            review: {}
        });

        const handleStep1Update = (data: any) => {
            console.log('Step 1 data received in update', data);
            deliveryData.value.deliveryInfo = data;
            activeStep.value = 2;
        };

        const handleStep2Update = (data: any) => {
            console.log('Step 2 data received in update', data);
            deliveryData.value.selectPO = data;
            activeStep.value = 3;
        };

        const handleStep3Update = (data: any) => {
            console.log('Step 3 data received in update', data);
            deliveryData.value.verifyItem = data;
            activeStep.value = 4;
        };
        const goStep = (step: number) => {
            activeStep.value = step;
        };
        return { activeStep, deliveryData, handleStep1Update, handleStep2Update, handleStep3Update, goStep };
    }
});
