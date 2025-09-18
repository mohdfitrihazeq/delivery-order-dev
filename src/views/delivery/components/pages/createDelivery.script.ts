import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Deliveries',
    components: {
        Motion
    },
    setup() {
        const steps = ['Header I', 'Header II', 'Header III'];
        const currentStep = ref(1);

        function nextStep() {
            if (currentStep.value < steps.length) {
                currentStep.value++;
            }
        }

        function prevStep() {
            if (currentStep.value > 1) {
                currentStep.value--;
            }
        }

        function submitForm() {
            alert('Form submitted!');
        }

        return {
            steps,
            currentStep,
            nextStep,
            prevStep,
            submitForm
        };
    }
});
