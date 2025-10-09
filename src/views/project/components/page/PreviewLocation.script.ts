import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import { computed, defineComponent, PropType, ref } from 'vue';

interface Location {
    name: string;
    children?: Record<string, Location>;
    [key: string]: any;
}

export default defineComponent({
    name: 'LocationItem',
    components: {
        LocationItem: () => import('@/views/project/components/tab/Location.vue'),
        Button
    },
    directives: { tooltip: Tooltip },
    props: {
        location: { type: Object as PropType<Location>, required: true },
        level: { type: Number, default: 0 }
    },
    setup(props) {
        const isExpanded = ref(true);

        const hasChildren = computed(() => {
            return props.location.children && Object.keys(props.location.children).length > 0;
        });

        const toggleExpand = () => {
            isExpanded.value = !isExpanded.value;
        };

        return {
            isExpanded,
            hasChildren,
            toggleExpand
        };
    }
});
