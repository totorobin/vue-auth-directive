import {defineComponent, h, withDirectives, resolveDirective } from 'vue'

const ComponentWrapper = defineComponent({
    setup() {
        const vAuth = resolveDirective('auth')
        const vAuthElse = resolveDirective('auth-else')
        return () =>
            h('div', { id: 'container' }, [
                withDirectives(h('div', 'is admin'), [[vAuth, null, null, { admin: true }]]),
                withDirectives(h('div', [ h('p', 'is not admin'), 'this is an other div']), [[vAuthElse]]),
                withDirectives(h('div', 'is writer'), [[vAuth, null, null, { writer: true }]]),
                withDirectives(h('div', 'is not writer but reader'), [[vAuthElse, null, null, { reader: true }]]),
                withDirectives(h('div', 'is admin and writer'), [[vAuth, null, null, { admin: true, writer: true }]]),
            ])
    },
})

describe('AuthDirective.cy.ts', () => {
  it('is admin only', () => {
      cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin']}}})
      cy.get('#container').contains('is admin')
      cy.get('#container').should('not.contain', 'is not admin')
      cy.get('#container').should('not.contain', 'is writer')
      cy.get('#container').should('not.contain', 'is admin and writer')
      cy.get('#container').should('not.contain', 'is not writer but reader')
  })

    it('is admin and writer', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin', 'writer']}}})
        cy.get('#container').contains('is admin')
        cy.get('#container').should('not.contain', 'is not admin')
        cy.get('#container').should('contain', 'is writer')
        cy.get('#container').should('contain', 'is admin and writer')
        cy.get('#container').should('not.contain', 'is not writer but reader')
    })

    it('is writer only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['writer']}}})
        cy.get('#container').should('not.contain','is admin')
        cy.get('#container').should('contain', 'is not admin')
        cy.get('#container').should('contain', 'is writer')
        cy.get('#container').should('not.contain', 'is not writer but reader')
        cy.get('#container').should('not.contain', 'is admin and writer')
    })

    it('is reader only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['reader']}}})
        cy.get('#container').should('not.contain','is admin')
        cy.get('#container').should('contain', 'is not admin')
        cy.get('#container').should('not.contain', 'is writer')
        cy.get('#container').should('contain', 'is not writer but reader')
    })
})