describe("My First Test", () => {
  it("TestSite", () => {
    cy.visit("http://localhost:5173");
  });

  it("Successfully signs up a new user", () => {
    cy.visit("/signup");

    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/signin");
  });
  

  it("Successfully signs in with valid credentials", () => {
    cy.visit("/signin");

    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");
  });

  it("Redirects to sign-in page if not authenticated", () => {
    cy.visit("/");

    cy.url().should("include", "/signin");
  });

  it("Navigates to home page after successful sign-in", () => {
    cy.visit("/signin");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");
  });
});

describe("ThemeChange", () => {
  it("should switch to dark mode and update localStorage theme", () => {
    cy.visit("http://localhost:5173/signin");

    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");

    cy.get('input[type="checkbox"]').click();

    cy.window().its("localStorage").should("have.property", "theme", "dark");
  });
});

describe("SignIn, UserList Navigation, and Delete User", () => {
  it("should sign in, navigate between pages, and delete a user", () => {
    cy.intercept("GET", "https://reqres.in/api/users?page=1").as("getUsers");
    cy.intercept("DELETE", "https://reqres.in/api/users/*").as("deleteUser");

    cy.visit("http://localhost:5173/signin");

    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");

    cy.wait("@getUsers").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.data).to.have.lengthOf(6);
    });

    cy.get("button").contains("Next Page").click();

    cy.wait("@getUsers").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.data).to.have.lengthOf(6);
    });

    cy.contains("button", "Delete").click();

    cy.wait("@deleteUser").then((interception) => {
      expect(interception.response.statusCode).to.equal(204);
    });

    cy.get(".MuiCard-root").should("have.length", 5);
  });
});

describe("Create User", () => {
  it("successfully creates a new user after signing in", () => {
    cy.visit("/signin");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:5173/");
    cy.contains("Welcome").should("exist");

    cy.contains("Create New User").click();

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");

    cy.intercept("POST", "https://reqres.in/api/users", {
      statusCode: 201,
      body: {
        id: 101,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    }).as("createUser");

    cy.get(".create-button").click();

    cy.wait("@createUser");

    cy.get("dialog").should("not.exist");

    cy.contains("John Doe").should("exist");
    cy.contains("john.doe@example.com").should("exist");
  });
});

describe("Update User Dialog", () => {
  it("should update user details", () => {
    cy.visit("/signin");
    cy.get('input[name="email"]').type("eve.holt@reqres.in");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.contains("button", "Update").click();

    cy.get('input[name="firstName"]').clear().type("New First Name");
    cy.get('input[name="lastName"]').clear().type("New Last Name");
    cy.get('input[name="email"]').clear().type("new-email@example.com");

    cy.get(".update-user-button").click();

    cy.contains("New First Name");
    cy.contains("New Last Name");
    cy.contains("new-email@example.com");
  });
});
