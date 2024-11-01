/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByTestId('test-id', 'selectors')
     */
    getByTestId(id: string, selectors?: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to log in with firebase authentication.
     * @example cy.logIn(auth, "email", "password")
     */
    logIn(auth: any, email?: string, password?: string): Chainable<any>;
    /**
     * Custom command to log out with firebase authentication.
     * @example cy.logOut(auth)
     */
    logOut(auth: any): Chainable<any>;
  }
}
