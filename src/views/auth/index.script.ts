import { animate } from '@motionone/dom';
import { onMounted, ref } from 'vue';

export const isAuthenticated = ref(false);
export const currentUser = ref<{ username: string; role: string } | null>(null);
export function useLoginCardAnimation() {
    const loginCard = ref<HTMLElement | null>(null);

    onMounted(() => {
        if (loginCard.value) {
            animate(
                loginCard.value,
                {
                    opacity: [0, 1],
                    transform: ['translateY(-40px)', 'translateY(0)']
                },
                {
                    duration: 0.8,
                    easing: 'ease-out'
                }
            );
        }
    });

    return { loginCard };
}

// mock users (temporary, replace with API later)
export const mockUsers = [
    { username: 'pm_user', password: 'pm123', role: 'PM' },
    { username: 'site_user', password: 'site123', role: 'Site' },
    { username: 'purchasing_user', password: 'purchase123', role: 'Purchasing' }
];

const storedUser = localStorage.getItem('user');
if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
    isAuthenticated.value = true;
}

export function login(username: string, password: string) {
    const user = mockUsers.find((u) => u.username === username && u.password === password);
    if (user) {
        const userData = { username: user.username, role: user.role };
        localStorage.setItem('user', JSON.stringify(userData));
        currentUser.value = userData;
        isAuthenticated.value = true;
        return { success: true, role: user.role };
    }
    return { success: false, message: 'Invalid username or password' };
}

export function logout() {
    localStorage.removeItem('user');
    currentUser.value = null;
    isAuthenticated.value = false;
}
