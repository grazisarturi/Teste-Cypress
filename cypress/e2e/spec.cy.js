describe('Cenário 1 — Teste de Login com Sucesso', () => {
  it('Login com sucesso', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()  
    cy.get('[data-test="title"]').contains('Products')
  })
  it('Login com falha', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret')
      cy.get('[data-test="login-button"]').click()  

      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })
})
describe('Cenário 2 — Teste de Login com Falha', () => {
  it('Login com falha', () => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('[data-test="username"]').type('standard_user')
      cy.get('[data-test="password"]').type('secret')
      cy.get('[data-test="login-button"]').click()  

      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })
})

describe('Cenário 3 — Adicionar ao Carrinho', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()  
  })

  it('Adicionar produtos ao carrinho', () => {

    // Adiciona dois produtos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    // Verifica se o carrinho mostra 2 itens
    cy.get('.shopping_cart_badge').should('contain', '2')
  })

})

describe('Cenário 4 — Remover produto do carrinho', () => {

  beforeEach(() => {
    // Login antes de cada teste
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()  
  })

  it('Adicionar produto, remover do carrinho e validar carrinho vazio', () => {

    // 1. Adicionar item (exemplo: Sauce Labs Backpack)
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    // Verifica se o contador do carrinho mostra "1"
    cy.get('.shopping_cart_badge').should('contain', '1')

    // 2. Ir ao carrinho
    cy.get('.shopping_cart_link').click()

    // Confirma que está no carrinho
    cy.url().should('include', '/cart.html')

    // 3. Remover item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    // 4. Validar que o carrinho está vazio
    cy.get('.shopping_cart_badge').should('not.exist')
  })

})


describe('Cenário 5 — Fluxo completo de compra', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()  
  })

  it('Comprar um produto com sucesso', () => {
    // Adicionar produto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()

    // Ir para checkout
    cy.get('[data-test="checkout"]').click()

    // Preencher dados
    cy.get('[data-test="firstName"]').type('Teste')
    cy.get('[data-test="lastName"]').type('Teste')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()

    // Finalizar compra
    cy.get('[data-test="finish"]').click()

    // Validar mensagem final
    cy.contains('Thank you for your order!').should('be.visible')
  })

})

