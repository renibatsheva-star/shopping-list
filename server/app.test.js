const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("./app");

const filePath = path.join(__dirname, "items.json");

beforeEach(() => {
  fs.writeFileSync(filePath, "[]");
});

describe("Shopping List API", () => {
  test("GET / should return API message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Shopping List API is running!");
  });

  test("GET /items should return an array", async () => {
    const response = await request(app).get("/items");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  test("POST /items should create a new item", async () => {
    const response = await request(app)
      .post("/items")
      .send({
        name: "Milk",
        quantity: 2,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Milk");
    expect(response.body.quantity).toBe(2);
    expect(response.body.bought).toBe(false);
  });

  test("PUT /items/:id should update an item", async () => {
    const created = await request(app)
      .post("/items")
      .send({
        name: "Bread",
        quantity: 1,
      });

    const id = created.body.id;

    const updated = await request(app)
      .put(`/items/${id}`)
      .send({
        name: "Whole Wheat Bread",
        quantity: 3,
        bought: true,
      });

    expect(updated.statusCode).toBe(200);
    expect(updated.body.name).toBe("Whole Wheat Bread");
    expect(updated.body.quantity).toBe(3);
    expect(updated.body.bought).toBe(true);
  });

  test("DELETE /items/:id should delete an item", async () => {
    const created = await request(app)
      .post("/items")
      .send({
        name: "Apple",
        quantity: 5,
      });

    const id = created.body.id;

    const deleted = await request(app).delete(`/items/${id}`);

    expect(deleted.statusCode).toBe(200);
    expect(deleted.body.message).toBe("Item deleted");
  });

  test("PUT /items/:id should return 404 for non-existing item", async () => {
    const response = await request(app)
      .put("/items/999999")
      .send({
        name: "Test",
        quantity: 1,
        bought: false,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Item not found");
  });

  test("DELETE /items/:id should return 404 for non-existing item", async () => {
    const response = await request(app).delete("/items/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Item not found");
  });

  test("POST /items should return 400 when name is missing", async () => {
    const response = await request(app)
      .post("/items")
      .send({
        name: "",
        quantity: 2,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Product name is required.");
  });

  test("POST /items should return 400 when quantity is invalid", async () => {
    const response = await request(app)
      .post("/items")
      .send({
        name: "Milk",
        quantity: 0,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Quantity must be greater than 0.");
  });
});




test("PUT /items/:id should return 400 when name is missing", async () => {
  const created = await request(app)
    .post("/items")
    .send({
      name: "Milk",
      quantity: 2,
    });

  const id = created.body.id;

  const response = await request(app)
    .put(`/items/${id}`)
    .send({
      name: "",
      quantity: 2,
      bought: false,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Product name is required.");
});


test("PUT /items/:id should return 400 when quantity is invalid", async () => {
  const created = await request(app)
    .post("/items")
    .send({
      name: "Milk",
      quantity: 2,
    });

  const id = created.body.id;

  const response = await request(app)
    .put(`/items/${id}`)
    .send({
      name: "Milk",
      quantity: 0,
      bought: false,
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.message).toBe("Quantity must be greater than 0.");
});