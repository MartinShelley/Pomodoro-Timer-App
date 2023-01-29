describe('Test Timer Functionality', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/')
  })
  it('User can Start and Pause the timer', () => {
    cy.get('.action').invoke('text').should('contain', "START")
    cy.get('circle').click()
    cy.get('.action').invoke('text').should('contain', "PAUSE")
    cy.get('circle').click()
    cy.get('.action').invoke('text').should('contain', "RESUME")
  })
})