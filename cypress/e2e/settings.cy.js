import chaiColors from 'chai-colors'
chai.use(chaiColors);

describe('Test Settings Modal', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/')
  })
  it('open and close settings modal', () => {
    cy.get('.settings').should("not.be.visible")
    cy.get('.settings-icon').click()
    cy.get('.settings').should("be.visible")
    cy.get('.close-icon').click()
    cy.get('.settings').should("not.be.visible")
    cy.get('.settings-icon').click()
    cy.get('.settings').should("be.visible")
    cy.get('.backdrop').click({ force: true })
    cy.get('.settings').should("not.be.visible")
  })
  it('User can change colour of the app', () => {
    cy.get('.colorSection .radioButtons label').each((colour) => {
      let colorValue = colour.children('input').val()
      cy.get('.settings-icon').click()
      cy.get('.settings').should("be.visible")
      cy.log(colour)
      cy.get(colour).click()
      cy.get('#submit').click()
      cy.get('.settings').should("not.be.visible")
      cy.get('circle').should('have.css', 'stroke').and('be.colored', colorValue)
      cy.get('.selected').should('have.css', 'background-color').and('be.colored', colorValue)
    })
  })
  it('User can change the font of the app', () => {
    cy.get('.fontSection .radioButtons label').each((font) => {
      let fontFamily = '"' + font.children('input').val() + '"'
      cy.get('.settings-icon').click()
      cy.get('.settings').should("be.visible")
      cy.log(font)
      cy.get(font).click()
      cy.get('#submit').click()
      cy.get('.settings').should("not.be.visible")
      cy.get('body').should('have.css', 'font-family', fontFamily)
    })
  })
  it('User can change timers for each of the countdown timers', () => {
    cy.get('input[type="number"]').each((input, i) => {
      console.log(i)
      cy.get('li.selectionItem').eq(i).click()
      cy.get('.settings-icon').click()
      cy.get('.settings').should("be.visible")
      cy.log("input id " + input.attr('id'))
      cy.get(input.siblings('.inputArrows').children('.topArrow')).click()
      cy.get(input.siblings('.inputArrows').children('.topArrow')).click()
      cy.get('#submit').click()
      cy.get('.settings').should("not.be.visible")
      cy.get('.clock').invoke('text').should('contain', parseInt(input.val(), 10) + 2)
    })
  })

})