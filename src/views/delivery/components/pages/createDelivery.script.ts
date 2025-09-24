import DeliveryInfo from '@/views/delivery/components/deliveryWorkFlow/deliveryInfo.vue';
import SelectPO from '@/views/delivery/components/deliveryWorkFlow/selectPO.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { DeliveryInfo, SelectPO },
    setup() {
        const activeStep = ref(1);

        const deliveryData = ref({
            info: {},
            po: {},
            step3: {},
            step4: {}
        });

        const handleStep1Update = (data: any) => {
            console.log('Step 1 data received in update', data);
            deliveryData.value.info = data;
            activeStep.value = 2;
        };

        const handleStep2Update = (data: any) => {
            console.log('Step 2 data received in update', data);
            deliveryData.value.po = data;
            activeStep.value = 3;
        };
        return { activeStep, deliveryData, handleStep1Update, handleStep2Update };
    }
});
