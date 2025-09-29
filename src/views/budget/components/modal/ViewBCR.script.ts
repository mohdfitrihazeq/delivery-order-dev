import type { Order } from '@/types/bcr.type';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
    name: 'ViewRo',
    components: {
        Dialog,
        Button
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        order: {
            type: Object as PropType<Order | null>,
            default: null
        },
        isPurchasingRole: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:visible', 'approve', 'reject'],
    setup(props, { emit }) {
        const localVisible = ref(props.visible);

        // Sync prop changes from parent
        watch(
            () => props.visible,
            (newVal) => {
                localVisible.value = newVal;
            }
        );

        // Emit changes to parent
        watch(localVisible, (val) => {
            emit('update:visible', val);
        });

        function handleClose(): void {
            localVisible.value = false;
        }

        function handleApprove(): void {
            emit('approve', props.order);
            localVisible.value = false;
        }

        function handleReject(): void {
            emit('reject', props.order);
            localVisible.value = false;
        }

        return {
            localVisible,
            handleClose,
            handleApprove,
            handleReject
        };
    }
});
