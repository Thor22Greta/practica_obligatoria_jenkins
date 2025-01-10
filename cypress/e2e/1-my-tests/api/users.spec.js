/// <reference types="cypress" />

let TOTAL_USERS = 10;

describe("Test de endpoints", () => {
  before(() => {
    // Esto asegura que la vista está lista antes de realizar peticiones
    cy.visit("/"); // Asegúrate de que la URL sea accesible y que no haya problemas en el contenedor

    // Realiza la solicitud DELETE para limpiar los usuarios antes de los tests
    cy.request("DELETE", "/api/users", {}).then((response) => {
      expect(response.body).to.have.property("message", "All users deleted");
    });
  });

  Cypress._.times(TOTAL_USERS, () => {
    it("Endpoint user creation", () => {
      const uuid = () => Cypress._.random(0, 1e6);
      const id = uuid();
      const testName = `testname${id}`;
      const testLastName = `testname${id}`;

      // Realiza la solicitud POST para crear un nuevo usuario
      cy.request("POST", "/api/users", {
        name: testName,
        lastName: testLastName,
        email: `${testName}@gmai.com`,
      }).then((response) => {
        // Comprueba que la respuesta contenga el saludo esperado
        expect(response.body).to.have.property("greeting", `Hello ${testName}`);
      });
    });
  });

  it("Endpoint get users", () => {
    // Realiza la solicitud GET para obtener los usuarios
    cy.request("GET", "/api/users", {}).then((response) => {
      // Verifica que la cantidad de usuarios sea la misma que TOTAL_USERS
      expect(response.body).to.have.lengthOf(TOTAL_USERS);
    });
  });

  after(() => {
    // Limpia la base de datos después de los tests
    cy.visit("/");
    cy.request("DELETE", "/api/users", {}).then((response) => {
      expect(response.body).to.have.property("message", "All users deleted");
    });
  });
});
