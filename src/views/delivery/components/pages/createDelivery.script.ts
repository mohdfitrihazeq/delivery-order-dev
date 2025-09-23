import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Deliveries',
    components: {
        Motion
    },
    setup() {
        const activeStep = ref(1);

        return {
            activeStep
        };
    }
});
