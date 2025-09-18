import { computed, defineComponent, PropType } from 'vue';

export interface CardItem {
    title: string;
    value: number;
    description: string;
    icon: string;
    color: string;
}

export default defineComponent({
    name: 'DeliveriesSummaryData',
    props: {
        cardItems: {
            type: Array as PropType<CardItem[]>,
            required: true
        },
        cardCol: {
            type: Number,
            default: 4
        }
    },
    setup(props) {
        const cardColClass = computed(() => {
            switch (props.cardCol) {
                case 2:
                    return 'xl:col-span-6';
                case 3:
                    return 'xl:col-span-4';
                case 4:
                    return 'xl:col-span-3';
                default:
                    return 'xl:col-span-3';
            }
        });

        return {
            cardColClass
        };
    }
});
