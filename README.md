# VueAuthDirective

This is a vue plugin allowing you to use two directives 'v-auth' and 'v-auth-else' to show component if a habilitation allow it

## Example

define the plugin with acess rights levels
````vue
const role = ref('admin')
createApp(App).use(authPlugin, {
    accessRights: {
        admin: computed(() => role.value === 'admin'),
    }
}).mount('#app')
````

then anywhere in your application you can use v-auth directives:

````vue
<div v-auth.admin>
   components you can only use if you are an admin
</div>
<div v-auth-else>
   this will not show if you are an admin but will otherwise
</div>
````
