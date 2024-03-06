import { createApp} from 'vue'
import './style.css'
import App from './App.vue'
import authPlugin from '../lib/main'
import {useUserStore} from './store/UserStore'

const userStore = useUserStore()

createApp(App).use(authPlugin, {
    accessRights: {
        user: userStore.hasRoleUser,
        admin: userStore.hasRoleAdmin
    }
}).mount('#app')
