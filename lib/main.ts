import { AuthPluginOptions, authInstallDirective} from "./VueAuthDirective"

export default {
    install: authInstallDirective
}

export { type AuthPluginOptions }