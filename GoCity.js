/// <reference types="Cypress" />

//Todo - Seperate them into independent test cases

context('All Inclusive Pass Purchase Journey', () => {

  it('Verify customer is able to add to cart', () => {
    cy.visit('https://gocity.com/boston/en-us/products/all-inclusive')


    //select and vertify 3 day pass
    cy.get('select').select('3 day pass from $131')
      .should('have.value', 'Bos_Prod_Go_d3') //assert if 3 day pass is selected - this can be parametrised
    cy.wait(1000) //Improve on wait, make it wait for a element

    //Add one adult and one child pass and verify
    cy.get(':nth-child(3) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > [data-testid=cartItemIncrease]').contains('+').click()
    cy.get(':nth-child(3) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > .lc-cart__item-amount-value')
      .should('have.text', '1') //assert if adult  pass is 1
    cy.get('.row > .react-component > .cart-icon > .cart-icon__icon > .cart-icon__icon-counter')
      .should('have.text', '1') //assert if cart value is 1
    cy.wait(1000) //Improve on wait, make it wait for a element
    cy.get(':nth-child(4) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > [data-testid=cartItemIncrease]').contains('+').click()
    cy.get(':nth-child(4) > .lc-cart__item-amount-wrapper > .lc-cart__item-amount > .lc-cart__item-amount-value')
      .should('have.text', '1') //assert if child  pass is 1
    //Verify total
    cy.get('.lc-cart__prices-total')
      .should('have.text', 'Order Total$220')//add regex and put a function to get the value
    cy.get('.row > .react-component > .cart-icon > .cart-icon__icon > .cart-icon__icon-counter')
      .should('have.text', '2') //assert if adult  pass is 2  - this can be parametrised

    //Checkout
    cy.wait(2000) //Improve on wait, make it wait for a element
    cy.get('.lc-cart__purchase').contains('Checkout').click()
    cy.wait(2000) //Improve on wait, make it wait for a element

    //Verify cart still has 3 day pass
    cy.get('.lc-cart__pass-product-name')
      .eq(0).should('have.text', '3 day pass Adult All-Inclusive ') //add make it regex
    cy.get('.lc-cart__pass-product-name').eq(1).should('have.text', '3 day pass Child (3–12) All-Inclusive ')//add to make it regex

    //Set data and checout
    cy.get('input[placeholder="MM-DD-YYYY"]').type('06-06-2021', { force: true }) //add assertion
    cy.get('.lc-cart__title').contains('Your Cart').click()
    cy.wait(2000) //Improve on wait, make it wait for a element
    //Improve this selector
    cy.get('.block-region-first > .block-go-commerce > .block-container > .block-inner > .block-content-wrapper > .react-component > :nth-child(1) > :nth-child(1) > [data-testid=continueToPayment]').contains('Continue to payment').click()

    //Payment Page
    cy.wait(2000) //Improve on wait, make it wait for a element
    cy.get('button').contains('Agree').click()
    cy.get('#braintree-hosted-field-number').then($element => {

      const $body = $element.contents().find('body')
      //add tests to verify all validation in the fields
      let brainTree = cy.wrap($body)
      brainTree.find('input[name="credit-card-number"]').click().type('4242424242424242', { force: true })//parametrise and use diffrent test caards
      cy.wait(2000) //Improve on wait, make it wait for a element
      brainTree = cy.wrap($body)
      brainTree.find('input[name="expiration-month"]').type('10', { force: true })
      cy.wait(3000) //Improve on wait, make it wait for a element
      brainTree = cy.wrap($body)
      brainTree.find('input[name="expiration-year"]').type('21', { force: true })
      cy.wait(4000) //Improve on wait, make it wait for a element
      brainTree = cy.wrap($body)
      brainTree.find('input[name="cvv"]').type('211', { force: true })
      cy.wait(4000) //Improve on wait, make it wait for a element
    })
    cy.get('input[name="firstName"]').type("Go")
    cy.get('input[name="lastName"]').type("City")
    cy.get('input[name="lastName"]').type("City")
    cy.get('input[name="phoneNumber"]').type("01234567890")
    cy.get('input[id="checkout-form-address"]').type("4 Tilehurst Road")
    cy.get('.suggestion-item').contains('4 Tilehurst Road, London, UK').click()
    cy.wait(3000) //Improve on wait, make it wait for a element
    cy.get('input[id="checkout-form-terms"]').click()
    cy.wait(3000) //Improve on wait, make it wait for a element
    cy.get('span[data-testid="confirmOrderAndPay"]').eq(0).click({ force: true })
    cy.wait(3000) //Improve on wait, make it wait for a element
    cy.get('.alert')
      .should('have.text', 'Unable to process the payment. Please verify the Card Details and try again.')


  })
})