import  {type App , ComputedRef } from "vue";

export interface AuthPluginOptions {
    accessRights : Record<string, ComputedRef<boolean>>
}
export const authInstallDirective =
     (app : App, options :  AuthPluginOptions) => {
        const savedPlaces = new WeakMap()
        // eslint-disable-next-line
        const display = (el: any , show : boolean) => {
            console.log(el, show)
            if (!show) {
                // cas "classique" si pas d'habilitation on remplace le composant par un commentaire
                const replacer = document.createComment(`v-auth`)
                if (el.parentNode != null) savedPlaces.set(el, { parentNode: el.parentNode, replacer }) // on sauvegarde sans écraser
                el.parentNode?.replaceChild(replacer, el)
            } else {
                const ctx = savedPlaces.get(el)
                if (ctx?.replacer) {
                    ctx.parentNode?.replaceChild(el, ctx.replacer)
                }
            }
        }

        // eslint-disable-next-line
        const disabled = (el: any, show : boolean ) => {
            if(!show) {
                const nodes = el.getElementsByTagName('*')
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].disabled = 'disabled'
                    nodes[i].classList.add('is-disabled')
                }
                el.disabled = true
                el.classList.add('is-disabled')
            }
        }

        const checkAccessRights = (keys: string[], previousValue : boolean) : boolean => {
            let hasHab = previousValue
            if (keys.length === 0) {
                if ('default' in options.accessRights) {
                    hasHab = options.accessRights["default"].value && hasHab
                }
            } else {
                keys.forEach((hrName) => {
                    if (hrName in options.accessRights) {
                        hasHab = options.accessRights[hrName].value && hasHab
                    }
                })
            }
            return hasHab
        }

        let lastRes = false
        // eslint-disable-next-line
        app.directive( 'auth',  (el, binding, _vnode) => {
            let hasHab = checkAccessRights(Object.keys(binding.modifiers), true)
            lastRes = hasHab
            if (binding.value) {
                // cas d'une fonction en param, on l'execute, la fonction peux prendre en paramère un booléen à true si on a l'habilitation, a false sinon
                binding.value(hasHab)
            } else if (binding.arg === 'disabled') {
                disabled(el, hasHab)
            } else {
                display(el, hasHab)
            }
        })

        // eslint-disable-next-line
        app.directive('auth-else', (el, binding, _vnode) => {
            let hasHab = checkAccessRights(Object.keys(binding.modifiers), !lastRes)
            // pour les auth-else suivant, on garde a true, si il y a déjà eu un affiché
            lastRes = lastRes || hasHab
            if (binding.value) {
                // cas d'une fonction en param, on l'execute, la fonction peux prendre en paramère un booléen à true si on a l'habilitation, a false sinon
                binding.value(hasHab)
            } else if (binding.arg === 'disabled') {
                disabled(el, hasHab)
            } else {
                display(el, hasHab)
            }
        })

    }
