<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '@/stores/auth/auth.store';
import { Motion } from '@motionone/vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import type { MenuItemCommandEvent } from 'primevue/menuitem';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();
const authStore = useAuthStore();

/* ================= 用户登出 ================= */
const handleSignOut = () => {
    authStore.logout();
    router.push({ name: 'login' });
};

const profileMenu = ref([
    {
        label: 'Notification',
        icon: 'pi pi-bell',
        command: (event: MenuItemCommandEvent) => router.push('/notifications')
    },
    {
        label: 'Company',
        icon: 'pi pi-building',
        command: (event: MenuItemCommandEvent) => router.push('/companyList')
    },
    {
        label: 'Project',
        icon: 'pi pi-receipt',
        command: (event: MenuItemCommandEvent) => router.push('/projectList')
    },
    { separator: true },
    {
        label: computed(() => (isDarkTheme.value ? 'Light Mode' : 'Dark Mode')),
        icon: computed(() => (isDarkTheme.value ? 'pi pi-sun' : 'pi pi-moon')),
        command: () => toggleDarkMode()
    },

    { separator: true },
    {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: handleSignOut
    }
]);

const profileMenuRef = ref();
const toggleProfileMenu = (event: Event) => {
    profileMenuRef.value.toggle(event);
};

/* ================= 用户名 + 项目信息 ================= */
const username = ref<string | null>(null);
const showProjectDialog = ref(false);
const selectedProject = ref<{ company: string; name: string; ProjectId: number } | null>(null);

interface Project {
    ProjectId: number;
    name: string;
    status: 'Active' | 'Inactive';
    budget: string;
}
interface CompanyGroup {
    company: string;
    projects: Project[];
}

const companyProjects = ref<CompanyGroup[]>([
    {
        company: 'Alunan Asas',
        projects: [
            { ProjectId: 1, name: 'MKT', status: 'Active', budget: 'RM 50,000' },
            { ProjectId: 2, name: 'AR469', status: 'Inactive', budget: 'RM 20,000' },
            { ProjectId: 3, name: 'BKT2CH', status: 'Active', budget: 'RM 75,000' }
        ]
    },
    {
        company: 'Metrio',
        projects: [
            { ProjectId: 4, name: 'MK3-B', status: 'Active', budget: 'RM 100,000' },
            { ProjectId: 5, name: 'Forum 2', status: 'Inactive', budget: 'RM 10,000' }
        ]
    }
]);

const saveProjectToStorage = (project: { company: string; name: string; ProjectId: number } | null) => {
    try {
        if (project) {
            const dataToSave = {
                company: project.company,
                name: project.name,
                ProjectId: project.ProjectId
            };
            localStorage.setItem('selectedProject', JSON.stringify(dataToSave));
        } else {
            localStorage.removeItem('selectedProject');
        }
    } catch (error) {
        console.error('Error saving project to localStorage:', error);
    }
};

const loadProjectFromStorage = (): { company: string; name: string; ProjectId: number } | null => {
    try {
        const stored = localStorage.getItem('selectedProject');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.company && parsed.name && parsed.ProjectId) {
                return parsed;
            }
        }
    } catch (error) {
        console.error('Error loading project from localStorage:', error);
    }
    return null;
};

const selectProject = (company: string, project: Project) => {
    selectedProject.value = {
        company,
        name: project.name,
        ProjectId: project.ProjectId
    };
    showProjectDialog.value = false;
};

watch(selectedProject, (newProject) => saveProjectToStorage(newProject), { deep: true });

onMounted(() => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            username.value = JSON.parse(user).username;
        } catch {
            username.value = user;
        }
    }

    const storedProject = loadProjectFromStorage();
    if (storedProject) {
        const projectExists = companyProjects.value.some((company) => company.company === storedProject.company && company.projects.some((project) => project.name === storedProject.name));
        selectedProject.value = projectExists ? storedProject : { company: 'Alunan Asas', name: 'MKT', ProjectId: 1 };
    } else {
        selectedProject.value = { company: 'Alunan Asas', name: 'MKT', ProjectId: 1 };
    }
});
</script>

<template>
    <Motion tag="div" class="layout-topbar shadow" :initial="{ y: -80, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
        <!-- 3-column grid: left, center, right -->
        <div class="grid grid-cols-3 items-center px-2 py-1">
            <!-- Left: menu + logo -->
            <div class="flex items-center gap-3">
                <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                    <i class="pi pi-bars dark:text-white"></i>
                </button>
                <router-link to="/" class="layout-topbar-logo">
                    <h1 class="text-2xl font-extrabold leading-tight m-0 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">DO SYSTEM</h1>
                </router-link>
            </div>

            <!-- Center: project selection -->
            <div class="flex justify-center">
                <div class="ml-28 shadow-sm cursor-pointer border border-gray-200 dark:bg-gray-800 px-3 py-1 rounded hover:bg-gray-100" @click="showProjectDialog = true">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-briefcase text-xs text-gray-500 dark:text-white"></i>
                            <span class="text-gray-500 dark:text-white font-semibold text-[13px]">
                                {{ selectedProject?.name || 'Select Project' }}
                            </span>
                        </div>
                        <i class="pi pi-chevron-down text-sm text-gray-500 dark:text-gray-100 ml-3"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right: profile -->
        <div class="layout-topbar-actions flex items-center gap-3 relative">
            <!-- Desktop: show avatar + username -->
            <div class="hidden lg:flex items-center gap-2">
                <Button class="p-button-text p-button-plain p-button-sm flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition" @click="toggleProfileMenu">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar" class="w-7 h-7 rounded-full object-cover" />
                    <span class="font-medium">{{ username || 'PM User' }}</span>
                </Button>
            </div>

            <!-- Mobile: show 3 dots -->
            <div class="flex lg:hidden items-center relative">
                <Button ref="mobileProfileButtonRef" icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-sm text-gray-700 dark:text-gray-200 hover:text-blue-500" @click="toggleProfileMenu" />
            </div>

            <!-- Shared dropdown menu -->
            <Menu ref="profileMenuRef" :model="profileMenu" popup class="w-56 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900" :append-to="mobileProfileButtonRef">
                <!-- Profile header only on mobile -->
                <template #start>
                    <div class="lg:hidden flex items-center gap-3 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar" class="w-8 h-8 rounded-full object-cover" />
                        <span class="font-semibold text-gray-800 dark:text-gray-100">
                            {{ username || 'PM User' }}
                        </span>
                    </div>
                </template>

                <template #item="{ item }">
                    <Motion
                        tag="div"
                        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        :initial="{ opacity: 0, y: -5 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.2, ease: 'easeOut' }"
                        @click="item.command && item.command($event)"
                    >
                        <i :class="item.icon" class="text-gray-600 dark:text-gray-200"></i>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-100">
                            {{ item.label }}
                        </span>
                    </Motion>
                </template>
            </Menu>

            <Toast />
        </div>

        <!-- Project Dialog -->
        <Dialog v-model:visible="showProjectDialog" header="Select Project" modal class="w-[500px]">
            <div v-for="group in companyProjects" :key="group.company" class="mb-4">
                <h3 class="text-lg font-semibold mb-2">{{ group.company }}</h3>
                <div class="space-y-2">
                    <div
                        v-for="project in group.projects"
                        :key="`${group.company}-${project.name}`"
                        @click="selectProject(group.company, project)"
                        class="cursor-pointer border rounded-lg p-3 hover:bg-gray-100 transition"
                        :class="{
                            'bg-blue-50 border-blue-300': selectedProject?.name === project.name && selectedProject?.company === group.company
                        }"
                    >
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold">{{ project.name }}</span>
                            <Badge :value="project.status" :severity="project.status === 'Active' ? 'success' : 'contrast'" />
                        </div>
                        <p class="text-sm text-gray-500">Budget: {{ project.budget }}</p>
                    </div>
                </div>
            </div>
        </Dialog>

        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>
    </Motion>
</template>
