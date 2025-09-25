import DeliveryInfo from '@/views/delivery/components/deliveryWorkFlow/step1DeliveryInfo/deliveryInfo.vue';
import SelectPO from '@/views/delivery/components/deliveryWorkFlow/step2SelectPO/selectPO.vue';
import VerifyItem from '@/views/delivery/components/deliveryWorkFlow/step3VerifyItem/verifyItem.vue';
import Review from '@/views/delivery/components/deliveryWorkFlow/step4Review/review.vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    components: { DeliveryInfo, SelectPO, VerifyItem, Review },
    setup() {
        // ---------------------------
        // 1. DATA (constants, refs)
        // ---------------------------
        const activeStep = ref(1);

        const deliveryData = ref({
            deliveryInfo: {},
            selectPO: {},
            verifyItem: {},
            review: {}
        });

        // ---------------------------
        // 2. COMPUTED PROPERTIES
        // ---------------------------
        const canPassToReview = computed(() => {
            return (
                deliveryData.value.deliveryInfo &&
                Object.keys(deliveryData.value.deliveryInfo).length > 0 &&
                deliveryData.value.selectPO &&
                Object.keys(deliveryData.value.selectPO).length > 0 &&
                deliveryData.value.verifyItem &&
                Array.isArray(deliveryData.value.verifyItem) &&
                deliveryData.value.verifyItem.length > 0
            );
        });

        // ---------------------------
        // 3. FUNCTIONS (handlers, business logic)
        // ---------------------------
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

        const handleStep4Update = (data: any) => {
            console.log('Step 4 data received in update', data);
            deliveryData.value.review = data;
        };

        const goStep = (step: number) => {
            activeStep.value = step;
        };

        // ---------------------------
        // 5. RETURN (expose to template)
        // ---------------------------
        return {
            activeStep,
            deliveryData,
            canPassToReview,
            handleStep1Update,
            handleStep2Update,
            handleStep3Update,
            handleStep4Update,
            goStep
        };
    }
});
