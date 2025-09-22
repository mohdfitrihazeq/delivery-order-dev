<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import { logout } from '@/views/auth/index.script';
import { Motion } from '@motionone/vue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppConfigurator from './AppConfigurator.vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();

const handleSignOut = () => {
    logout();
    router.push('/auth/login');
};

const username = ref<string | null>(null);

const showProjectDialog = ref(false);
const selectedProject = ref<{ company: string; name: string } | null>(null);

interface Project {
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
            { name: 'MKT', status: 'Active', budget: 'RM 50,000' },
            { name: 'AR469', status: 'Inactive', budget: 'RM 20,000' },
            { name: 'BKT2CH', status: 'Active', budget: 'RM 75,000' }
        ]
    },
    {
        company: 'Metrio',
        projects: [
            { name: 'MK3-B', status: 'Active', budget: 'RM 100,000' },
            { name: 'Forum 2', status: 'Inactive', budget: 'RM 10,000' }
        ]
    }
]);

const saveProjectToStorage = (project: { company: string; name: string } | null) => {
    try {
        if (project) {
            localStorage.setItem('selectedProject', JSON.stringify(project));
        } else {
            localStorage.removeItem('selectedProject');
        }
    } catch (error) {
        console.error('Error saving project to localStorage:', error);
    }
};

const loadProjectFromStorage = (): { company: string; name: string } | null => {
    try {
        const stored = localStorage.getItem('selectedProject');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading project from localStorage:', error);
    }
    return null;
};

const selectProject = (company: string, name: string) => {
    selectedProject.value = { company, name };
    showProjectDialog.value = false;
};

watch(
    selectedProject,
    (newProject) => {
        saveProjectToStorage(newProject);
    },
    { deep: true }
);

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

        if (projectExists) {
            selectedProject.value = storedProject;
        } else {
            selectedProject.value = { company: 'Alunan Asas', name: 'MKT' };
        }
    } else {
        selectedProject.value = { company: 'Alunan Asas', name: 'MKT' };
    }
});
</script>

<template>
    <Motion tag="div" class="layout-topbar shadow" :initial="{ y: -80, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
        <div class="layout-topbar-logo-container flex items-center gap-3">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars dark:text-white"></i>
            </button>

            <router-link to="/" class="layout-topbar-logo">
                <h1 class="text-2xl font-extrabold leading-tight m-0 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">DO SYSTEM</h1>
            </router-link>
        </div>

        <div class="layout-topbar-actions flex items-center gap-3">
            <div class="shadow-sm cursor-pointer border border-gray-300 dark:bg-gray-800 px-3 py-1 rounded hover:bg-gray-100 bg-gray-50" @click="showProjectDialog = true">
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-briefcase text-xs text-gray-500 dark:text-white"></i>
                        <span class="text-gray-500 dark:text-white font-semibold text-[13px]">
                            {{ selectedProject?.name || 'Select Project' }}
                        </span>
                    </div>
                    <i class="pi pi-chevron-down text-sm text-gray-500 dark:text-gray-100 ml-3"></i>
                </div>
                <div v-if="selectedProject?.company" class="text-xs text-gray-400 dark:text-gray-300 mt-0.5">
                    {{ selectedProject.company }}
                </div>
            </div>

            <Dialog v-model:visible="showProjectDialog" header="Select Project" modal class="w-[500px]">
                <div v-for="group in companyProjects" :key="group.company" class="mb-4">
                    <h3 class="text-lg font-semibold mb-2">{{ group.company }}</h3>

                    <div class="space-y-2">
                        <div
                            v-for="project in group.projects"
                            :key="`${group.company}-${project.name}`"
                            @click="selectProject(group.company, project.name)"
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

            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon text-white': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content flex gap-2">
                    <button type="button" class="layout-topbar-action text-white hover:opacity-80 transition">
                        <i class="pi pi-bell"></i>
                        <span>Notification</span>
                    </button>
                    <button type="button" class="layout-topbar-action text-white hover:opacity-80 transition" @click="handleSignOut">
                        <i class="pi pi-sign-out"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>
    </Motion>
</template>
