import { AuthPluginOptions, authInstallDirective} from "./VueAuthDirective"
import { type Plugin } from 'vue'

const vueAuthDirective: Plugin = {
    install: authInstallDirective
}

export default vueAuthDirective
export { type AuthPluginOptions }