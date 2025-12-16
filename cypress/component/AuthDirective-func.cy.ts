import {defineComponent, h, withDirectives, resolveDirective , ref } from 'vue'

const ComponentWrapper = defineComponent({
    setup() {
        const vAuth = resolveDirective('auth')
        const vAuthElse = resolveDirective('auth-else')
        const isAdmin = ref(false)
        const isElse = ref(false)
        return () =>
            h('div', { id: 'container' }, [
                withDirectives(h('div', { id: 'admin'}, ['is admin : ', h('span', isAdmin.value)]), [[vAuth, (hab) => isAdmin.value = hab, null, { admin: true }]]),
                withDirectives(h('div', { id: 'notAdmin'}, ['is not admin : ', h('span', isElse.value)]), [[vAuthElse, (hab) => isElse.value = hab]]),
            ])
    },
})

describe('AuthDirective.cy.ts', () => {
  it('is admin only', () => {
      cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin']}}})
      cy.get('#admin > span').should('contain.text', 'true')
      cy.get('#notAdmin > span').should('contain.text', 'false')
  })

    it('is admin and writer', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin', 'writer']}}})
        cy.get('#admin > span').should('contain.text', 'true')
    })

    it('is writer only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['writer']}}})
        cy.get('#admin > span').should('contain.text', 'false')
        cy.get('#notAdmin > span').should('contain.text', 'true')
    })

    it('is reader only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['reader']}}})
        cy.get('#admin > span').should('contain.text', 'false')
    })
})