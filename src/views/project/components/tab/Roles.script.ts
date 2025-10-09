import AssignRoles from '@/views/project/components/modal/AssignRoles.vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import { defineComponent, ref } from 'vue';

interface Member {
    name: string;
}

interface ProjectRole {
    id: number;
    name: string;
    members: Member[];
}

export default defineComponent({
    name: 'Roles',
    components: { Avatar, AssignRoles, Button },

    props: {
        cardTitle: {
            type: String,
            required: true
        }
    },

    setup(props) {
        const masterProjectRoles = ref<ProjectRole[]>([
            {
                id: 1,
                name: 'Purchase',
                members: [{ name: 'Alice Tan' }, { name: 'Ben Lim' }, { name: 'Carmen Ong' }, { name: 'Daniel Lee' }, { name: 'Elaine Wong' }]
            },
            { id: 2, name: 'Site', members: [{ name: 'Francis Goh' }, { name: 'Grace Chia' }] },
            {
                id: 3,
                name: 'Project Manager (PM)',
                members: [{ name: 'Henry Low' }, { name: 'Irene Teo' }, { name: 'Jason Koh' }]
            },
            { id: 4, name: 'Project Director (PD)', members: [] },
            { id: 5, name: 'Account', members: [{ name: 'Karen Chan' }] },
            {
                id: 6,
                name: 'Quantity Surveyor (QS)',
                members: [{ name: 'Lucas Tan' }, { name: 'Megan Yeo' }, { name: 'Nicholas Chew' }, { name: 'Olivia Tan' }, { name: 'Peter Wong' }]
            }
        ]);

        const getInitials = (name: string): string =>
            name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

        const viewMore = (roleId: number): void => {
            alert(`View more members for role ID: ${roleId}`);
        };
        const showDialog = ref(false);

        const handleSave = (assignments: any[]) => {
            console.log('Saved assignments:', assignments);
        };

        return {
            props,
            masterProjectRoles,
            getInitials,
            viewMore,
            showDialog,
            handleSave
        };
    }
});
