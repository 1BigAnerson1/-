import DOM from "../../src/constants/dom.js";
describe("Create Todo", () => {
  it("user open main page and create task", () => {
    cy.visit("  http://localhost:5173/");

    cy.get("#${DOM.Button.CREATE_TASK}")
      .should("exist")
      .should("contain.html", "+ Create Task")
      .click();
  });
});
