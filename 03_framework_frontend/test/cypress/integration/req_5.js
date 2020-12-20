describe("5", () => {
  describe("website", () => {
    it("should contain two views, of which only one is visible", () => {
      cy.visit("/");
      cy.get("#root").as("root");

      cy.get("@root").children("div").should("have.length", 2);

      cy.get("@root").find('[fw-if="isPageLogIn"]').should("be.visible");

      cy.get("@root").find('[fw-if="isPageMain"]').should("not.be.visible");
    });

    it("should contain the appropriate header", () => {
      cy.visit("/");
      cy.get("#root").as("root");
      cy.get("@root").find("h1").should("contain", "Log into the Demo App");
    });
  });
});
