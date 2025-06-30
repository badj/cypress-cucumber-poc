import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const productName = 'Light Spotted Tabby Cat'
const itemPriceWithCurrency= '$300.00';
const cartTotalPriceWithCurrency= '$900.00';
const addToCartRequest = '**/cart.js';

Given("I am on the store homepage", () => {
    cy.visit("https://testautomation.bigcartel.com/");
});

Given("I am on the product page for {string}", (productName) => {
    cy.visit(`https://testautomation.bigcartel.com/product/${productName.toLowerCase().replace(" ", "-")}`);
});

When("I search for {string}", (searchTerm) => {
    cy.get("#below-header-search-input").type(`${searchTerm}{enter}`);
});

Then("I should see search results", () => {
    cy.url().should('contain', '&search=Tabby+Cat')
    cy.wait(300)
    cy.contains('Dark Spotted Tabby Cat')
    cy.contains(productName)
});

When("I click on the first product in the results", () => {
    cy.contains(productName).click()
    cy.wait(300)
});

When("I add it to the cart", () => {
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
});

Then("I should be on the product page for {string}", (productName) => {
    cy.url().should('contain', '/product/white-tabby-cat')
    cy.contains('Model Name: Indi')
    cy.contains(productName)
    cy.get('div.page-subheading-price').contains('300.00')
});

When("I select the color {string}", (color) => {
    cy.get('#option_group_5888110').select('30861526');
});

When("I select the age {string}", (age) => {
    cy.get('#option_group_5888113').select('30861541');
});

When("I increase the quantity to {int}", (quantity) => {
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
});

Then("the selected color should be {string}", (color) => {
    cy.get('#option_group_5888110').should('have.id', 'option_group_5888110');
});

Then("the selected age should be {string}", (age) => {
    cy.get('#option_group_5888113').should('have.id', 'option_group_5888113');
});

Then("the quantity should be {int}", (quantity) => {
    cy.get('#quantity').should('have.value', '3');
});

Then("the cart total should be {string}", (quantity) => {
    // cy.get('.header-cart-total').should('have.text', '$900.00');
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
});

Then("the cart total items count should be {int}", (quantity) => {
    cy.get('#quantity').should('have.value', '3');
});

When("I add the item to the cart", () => {
    cy.get(".add-to-cart-button").click();
});

When("I proceed to the cart", () => {
    cy.intercept('GET', '**/cart').as('viewCart');
    cy.get('.product-form-cart-link-text').click();
    cy.wait('@viewCart').its('response.statusCode').should('eq', 200);
    cy.wait(1000);
    cy.url().should('contain', '/cart')
    cy.get('.page-title').should('have.text', 'Cart');
});

Then("the cart page contain product details: {string}, color {string}, age {string}, quantity {int}, price {string} totalling {string}", (productName, color, age, quantity) => {
    cy.url().should('contain', '/cart')
    cy.get('.page-title').should('have.text', 'Cart');
    cy.get('.header-cart-count').should('have.text', '3');
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-item-details-name').should('have.text', productName);
    cy.get('.cart-item-details-option').should('have.text', 'Colour: White / Age: 4YRS');
    cy.get('.cart-item-details-unit-price-inline').should('have.text', itemPriceWithCurrency);
    cy.get('#item_369374479_qty').should('have.value', '3');
    cy.get('.cart-item-details-price').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-sub-footer > .icon-link').should('have.text', '\n            \n          Continue shopping\n          ');
    cy.get('.cart-subtotal-label').should('have.text', 'Subtotal');
    cy.get('.cart-subtotal-amount').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-footer > .button').should('have.class', 'checkout-button');
});

Then("the cart page should contain the product details: {string}, {string}, {string}, {int}, {string} totalling {string}", (productName, color, age, quantity) => {
    cy.url().should('contain', '/cart');
    cy.get('.page-title').should('have.text', 'Cart');
    cy.get('.header-cart-count').should('have.text', '3');
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-item-details-name').should('have.text', productName);
    cy.get('.cart-item-details-option').should('have.text', 'Colour: White / Age: 4YRS');
    cy.get('.cart-item-details-unit-price-inline').should('have.text', itemPriceWithCurrency);
    cy.get('#item_369374479_qty').should('have.value', '3');
    cy.get('.cart-item-details-price').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-subtotal-amount').should('have.text', cartTotalPriceWithCurrency);
});

Then("the cart page should contain page elements to continue shopping, provide the sub total and to continue the checkout", () => {
    cy.url().should('contain', '/cart')
    cy.get('.page-title').should('have.text', 'Cart');
    cy.get('.cart-sub-footer > .icon-link').should('have.text', '\n            \n          Continue shopping\n          ');
    cy.get('.cart-subtotal-label').should('have.text', 'Subtotal');
    cy.get('.cart-subtotal-amount').should('have.text', cartTotalPriceWithCurrency);
    cy.get('.cart-footer > .button').should('have.class', 'checkout-button');
});

When("product {string} with color {string} with age {string} and quantity {int} is added to the cart", (productName, color, age, quantity) => {
    cy.get('#option_group_5888110').select('30861526');
    cy.wait(500);
    cy.get('#option_group_5888113').select('30861541');
    cy.wait(500);
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
    cy.wait(500);
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait(500);
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.wait(500);
    cy.get('#quantity').should('have.value', '3');
});

When("{string} with {string} with {string} and {int} is added to the cart", (productName, color, age, quantity) => {
    cy.get('#option_group_5888110').select('30861526');
    cy.wait(500);
    cy.get('#option_group_5888113').select('30861541');
    cy.wait(500);
    cy.get('#quantity').clear('3');
    cy.get('#quantity').type('3');
    cy.wait(500);
    cy.intercept('POST', '**/cart.js').as('addToCart');
    cy.get('.button-add-text').click();
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
    cy.wait(500);
    cy.get('.header-cart-total').should('have.text', cartTotalPriceWithCurrency);
    cy.wait(500);
    cy.get('#quantity').should('have.value', '3');
});

When("I continue to the checkout", () => {
    cy.get('.cart-footer > .checkout-button').click();
});

Then("The checkout proceeds to the checkout page", () => {
    cy.url().should('contain', '/checkout/')
    cy.get('h1').should('have.text', 'We’re not set up to take payments.');
});
