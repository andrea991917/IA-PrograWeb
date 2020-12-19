describe("8", () => {
  describe("fw-on", () => {
    it("should update state for fw-if binding", () => {
      cy.visit("/");
      cy.get("#root").as("root");

      cy.get("@root").find('input[type="text"]').type("John Doe");

      cy.get("@root").find('input[type="password"]').type("foobarbaz");

      cy.get("@root").find('input[type="submit"]').click();

      cy.get("@root").contains("this is the main page of a demo app");
    });

    it("should update state for fw-content binding", () => {
      cy.visit("/");
      cy.get("#root").as("root");

      cy.get("@root").find('input[type="text"]').type("John Doe");

      cy.get("@root").find('input[type="password"]').type("foobarbaz");

      cy.get("@root").find('input[type="submit"]').click();

      cy.get("@root").contains(
        "Hello, John Doe: this is the main page of a demo app"
      );
    });
  });
});
