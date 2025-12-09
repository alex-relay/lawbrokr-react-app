import "whatwg-fetch";
import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";
// 1. Add WritableStream to this import list
import { ReadableStream, TransformStream, WritableStream } from "stream/web";
import { BroadcastChannel } from "worker_threads";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;
global.WritableStream = WritableStream;
global.BroadcastChannel = BroadcastChannel;
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const { setupServer } = require("msw/node");
const { handlers } = require("./app/mocks/handlers");

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
