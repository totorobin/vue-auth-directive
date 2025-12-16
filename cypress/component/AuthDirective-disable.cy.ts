import {defineComponent, h, withDirectives, resolveDirective } from 'vue'

const ComponentWrapper = defineComponent({
    setup() {
        const vAuth = resolveDirective('auth')
        const vAuthElse = resolveDirective('auth-else')
        return () =>
            h('div', { id: 'container' }, [
                withDirectives(h('button', { id: 'adminBtn'}, 'admin btn'), [[vAuth, null, 'disabled', { admin: true }]]),
                withDirectives(h('div', { id: 'notAdminBtn'}, [h('button', 'not'),h('button', 'admin'),h('button', 'buttons')]), [[vAuthElse, null, 'disabled']]),
                withDirectives(h('button', { id: 'writerBtn'}, 'writer btn'), [[vAuth, null, 'disabled', { writer: true }]]),
                withDirectives(h('button', { id: 'readerBtn'}, 'reader btn'), [[vAuthElse, null, 'disabled', { reader: true }]]),
                withDirectives(h('button', { id: 'adminAndWriterBtn'}, 'admin and writer btn'), [[vAuth, null, 'disabled', { admin: true, writer: true }]]),
            ])
    },
})

describe('AuthDirective.cy.ts', () => {
  it('is admin only', () => {
      cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin']}}})
      cy.get('#adminBtn').should('not.be.disabled')
      cy.get('#notAdminBtn').find('button').first().should('be.disabled')
      cy.get('#notAdminBtn').find('button').last().should('be.disabled')
      cy.get('#writerBtn').should('be.disabled')
      cy.get('#readerBtn').should('be.disabled')
      cy.get('#adminAndWriterBtn').should('be.disabled')
  })

    it('is admin and writer', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['admin', 'writer']}}})
        cy.get('#adminBtn').should('not.be.disabled')
        cy.get('#notAdminBtn').find('button').first().should('be.disabled')
        cy.get('#writerBtn').should('not.be.disabled')
        cy.get('#readerBtn').should('be.disabled')
        cy.get('#adminAndWriterBtn').should('not.be.disabled')
    })

    it('is writer only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['writer']}}})
        cy.get('#adminBtn').should('be.disabled')
        cy.get('#notAdminBtn').find('button').first().should('not.be.disabled')
        cy.get('#writerBtn').should('not.be.disabled')
        cy.get('#readerBtn').should('be.disabled')
        cy.get('#adminAndWriterBtn').should('be.disabled')
    })

    it('is reader only', () => {
        cy.mount(ComponentWrapper, { global: { stubs: {roles: ['reader']}}})
        cy.get('#adminBtn').should('be.disabled')
        cy.get('#notAdminBtn').find('button').first().should('not.be.disabled')
        cy.get('#writerBtn').should('be.disabled')
        cy.get('#readerBtn').should('not.be.disabled')
        cy.get('#adminAndWriterBtn').should('be.disabled')
    })
})