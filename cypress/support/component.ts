// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { ref, computed } from 'vue'
import { mount } from 'cypress/vue'
import authPlugin from '../../lib/main'
import '@cypress/code-coverage/support'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (cpt, options = {}) => {
    // Setup options object
    options.global ||= {}
    options.global.components ||= {}

    // Add plugins here
    options.global.plugins ||= []
    options.global.plugins.push({
        install(app) {
            const roles = ref<List<string>>(options.global.stubs.roles || [])
            app.use(authPlugin, {
                accessRights: {
                    admin: computed(() => roles.value.includes('admin')),
                    writer: computed(() => roles.value.includes('writer')),
                    reader: computed(() => roles.value.includes('reader')),
                },
            })
        },
    })

    return mount(cpt, options)
})


// Example use:
// cy.mount(MyComponent)