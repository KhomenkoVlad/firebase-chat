import { Auth, getAuth } from "firebase/auth";
import { firebaseInit } from "../support/firebase";

const app = firebaseInit();

describe("Chat tests", () => {
  let auth: Auth;
  const chat = "test user";
  const message = "test message from cypress";

  it("firebase initialization", () => {
    auth = getAuth(app);
  });

  it("starts a new chat and sends a message", () => {
    cy.logIn(auth);

    cy.getByTestId("search-field").type(chat);
    cy.getByTestId("list-item", "h3").contains(chat).click();
    cy.getByTestId("search-field").should("have.value", "");
    cy.getByTestId("chat-section").should("exist");

    cy.getByTestId("message-field").type(message);
    cy.getByTestId("message-submit").click();
    cy.getByTestId("message-field").should("have.value", "");
    cy.getByTestId("message-body").contains(message).should("exist");

    cy.getByTestId("close-chat-button").click();
    cy.getByTestId("chat-section").should("not.exist");
    cy.getByTestId("list-item", "h3").contains(chat).should("exist");
  });

  it("deletes the chat and logs out", () => {
    cy.visit("/");
    cy.getByTestId("list-item", "h3").contains(chat).click();
    cy.getByTestId("chat-section").should("exist");
    cy.getByTestId("button/chat-settings").click();

    cy.location().should(loc => expect(loc.pathname).to.eq("/chat-settings"));
    cy.getByTestId("settings-delete-chat").click();
    cy.location().should(loc => expect(loc.pathname).to.eq("/"));
    cy.wait(2000);
    cy.contains("[data-testid='list-item']", chat).should("not.exist");

    cy.logOut(auth);
  });
});
