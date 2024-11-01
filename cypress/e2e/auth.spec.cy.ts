import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { deleteDoc, doc, Firestore, getFirestore } from "firebase/firestore";
import { firebaseInit, getRandomUser } from "../support/firebase";

const app = firebaseInit();
const user = getRandomUser();

describe("Authentication tests", () => {
  let firestore: Firestore, auth: Auth;

  it("firebase initialization", () => {
    firestore = getFirestore(app);
    auth = getAuth(app);
  });

  it("loads and registers a new user", () => {
    cy.visit("/");
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });

    cy.getByTestId("form-login-to-register").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/register");
    });

    cy.getByTestId("register-form-name").type(user.name);
    cy.getByTestId("register-form-email").type(user.email);
    cy.getByTestId("register-form-password").type(user.password);
    cy.getByTestId("register-form-submit").click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("logs out and logs in again", () => {
    cy.visit("/");

    cy.getByTestId("log-out-button").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });

    cy.getByTestId("login-form-email").type(user.email);
    cy.getByTestId("login-form-password").type(user.password);
    cy.getByTestId("login-form-submit").click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });

    cy.getByTestId("log-out-button").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it("delete user", () => {
    cy.visit("/");
    cy.location()
      .should(loc => {
        expect(loc.pathname).to.eq("/login");
      })
      .then(() => signInWithEmailAndPassword(auth, user.email, user.password))
      .then(async credential => {
        await deleteDoc(doc(firestore, "users", credential.user.uid));
        await credential.user.delete();
      });
  });
});
