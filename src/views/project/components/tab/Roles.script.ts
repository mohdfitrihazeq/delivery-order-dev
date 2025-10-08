import Avatar from 'primevue/avatar';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { Avatar },
    data() {
        return {
            masterProjectRoles: [
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
            ]
        };
    },
    methods: {
        getInitials(name: string) {
            return name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();
        },
        viewMore(roleId: number) {
            alert(`View more members for role ID: ${roleId}`);
        }
    }
});
