import {computed, readonly, ref} from "vue";

const userRole = ref<'user'|'admin'>()
export const useUserStore = () => {

    const setRole = (role : string) => {
        console.log('new role :', role)
        if(role === 'user' || role === 'admin')
            userRole.value = role
        else
            userRole.value = undefined
    }

    const hasRoleUser = computed(() => userRole.value === 'user' || userRole.value === 'admin')
    const hasRoleAdmin = computed(() => userRole.value === 'admin')

    return {
        role: readonly(userRole),
        setRole,
        hasRoleUser,
        hasRoleAdmin
    }

}