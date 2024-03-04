import { createApp} from 'vue'
import './style.css'
import App from './App.vue'
import authPlugin from '../lib/main.ts'
import {useUserStore} from './store/UserStore.ts'

const userStore = useUserStore()

createApp(App).use(authPlugin, {
    accessRights: {
        user: userStore.hasRoleUser,
        admin: userStore.hasRoleAdmin
    }
}).mount('#app')
