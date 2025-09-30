import { authService } from '@/service/Auth.service';
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

// 初始化用户状态
const storedUser = localStorage.getItem('user');
if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
    isAuthenticated.value = true;
}

// ✅ login 直接 call service
export async function login(username: string, password: string) {
    const response = await authService.login(username, password);

    if (!response) {
        return { success: false };
    }

    console.log('response', response);

    // const { token, user } = response;

    // localStorage.setItem('token', token);
    // localStorage.setItem('user', JSON.stringify(user));

    //currentUser.value = user;
    isAuthenticated.value = true;

    // return { success: true, role: user.role };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser.value = null;
    isAuthenticated.value = false;
}
