describe("6", () => {
  describe("fw-attr", () => {
    it("should set the value of the disabled attribute", () => {
      cy.visit("/");
      cy.get("#root").as("root");
      cy.get("@root")
        .find('input[type="password"]')
        .should("have.css", "background-color", "rgb(255, 255, 224)");
    });
  });
});
