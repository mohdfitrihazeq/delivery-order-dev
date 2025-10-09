import BaseTab from '@/components/tab/BaseTab.vue';
import Approval from '@/views/project/components/tab/Approval.vue';
import Location from '@/views/project/components/tab/Location.vue';
import Roles from '@/views/project/components/tab/Roles.vue';
import { Motion } from '@motionone/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ProjectDetail',
    components: { BaseTab, Motion, Location, Roles, Approval },
    setup() {
        const tabs = [
            { label: 'Project Roles', value: 'projectRoles' },
            { label: 'Project Approval', value: 'projectApproval' },
            { label: 'Location', value: 'location' }
        ];
        const activeTab = ref('projectRoles');

        return { tabs, activeTab };
    }
});
