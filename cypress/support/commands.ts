// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

Cypress.Commands.add("getByTestId", (id, selectors = "") => {
  cy.get(`[data-testid='${id}'] ${selectors}`);
});

Cypress.Commands.add("logIn", (auth, email = "cypress@test.com", password = "cypress") => {
  cy.visit("/")
    .location()
    .should(loc => {
      expect(loc.pathname).to.eq("/login");
    });

  cy.getByTestId("login-form-email").type(email);
  cy.getByTestId("login-form-password").type(password);
  cy.getByTestId("login-form-submit").click();

  cy.location()
    .should(loc => {
      expect(loc.pathname).to.eq("/");
    })
    .then(() => signInWithEmailAndPassword(auth, email, password));
});

Cypress.Commands.add("logOut", auth => {
  cy.visit("/")
    .location()
    .should(loc => {
      expect(loc.pathname).to.eq("/");
    });

  cy.window()
    .its("store")
    .invoke("getState")
    .its("chat.isSelected")
    .should(isSelected => expect(isSelected).to.eq(false));

  cy.getByTestId("log-out-button").click();
  cy.location()
    .should(loc => {
      expect(loc.pathname).to.eq("/login");
    })
    .then(() => signOut(auth));
});
