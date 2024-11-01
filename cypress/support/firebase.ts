import { deleteApp, FirebaseApp, initializeApp, SDK_VERSION, setLogLevel } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

export const firebaseConfig = {
  apiKey: Cypress.env("VITE_FIREBASE_API_KEY"),
  authDomain: Cypress.env("VITE_FIREBASE_AUTH_DOMAIN"),
  databaseURL: Cypress.env("VITE_FIREBASE_DATABASE_URL"),
  projectId: Cypress.env("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("VITE_FIREBASE_APP_ID"),
};

export const user = {
  email: "cypress@test.com",
  password: "cypress",
};

export const firebaseInit = () => {
  let app: FirebaseApp;

  before(() => {
    console.log("FIREBASE VERSION", SDK_VERSION);
    app = initializeApp(firebaseConfig);
    setLogLevel("warn");
  });

  after(() => {
    signOut(getAuth(app));
    deleteApp(app);
  });

  return app;
};

export const getRandomUser = () => {
  const random = Math.trunc(Math.random() * 1000000);

  return {
    name: "name-" + random,
    email: "email-" + random + "@test.com",
    password: "pass-" + random,
  };
};
