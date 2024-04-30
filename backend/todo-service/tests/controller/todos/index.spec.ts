// Mock the Todo model
const mockedTodos = [{ name: "Todo 1", description: "Description 1", status: false }];

const todoDocument = {
  find: jest.fn().mockResolvedValue(mockedTodos),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
}

jest.mock("../../../src/models/todo", () => {
  return { ...todoDocument }
});

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../../src/controllers/todos";
import { beforeAll, afterAll, beforeEach, describe, it, expect } from "@jest/globals";
import { getMockReq, getMockRes } from '@jest-mock/express'

let mongoServer: MongoMemoryServer;

// Before all tests, start the MongoDB memory server and connect mongoose
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 15000);

// After all tests, stop the MongoDB memory server and close mongoose connection
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Todo API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.only("should get all todos", async () => {
    const req = getMockReq();
    const { res } = getMockRes()

    await getTodos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ todos: mockedTodos });
  });
});
