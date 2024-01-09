import { describe, expect, test } from "vitest";
import { Piece } from "./Piece.js";

describe("Piece", () => {
  test("the method getEmoji give the correct emoji", () => {
    const piece = new Piece("clean");
    expect(piece.getEmoji()).toBe("🧼");

    piece.state = "clean_by_robot";
    expect(piece.getEmoji()).toBe("🧽");

    piece.state = "dirty";
    expect(piece.getEmoji()).toBe("💩");
  });

  test("the getter isDirty return true if the piece is dirty", () => {
    const piece = new Piece("dirty");
    expect(piece.isDirty).toBe(true);

    piece.state = "clean";
    expect(piece.isDirty).toBe(false);
  });

  test("the getter isClean return true if the piece is clean", () => {
    const piece = new Piece("clean");
    expect(piece.isClean).toBe(true);

    piece.state = "clean_by_robot";
    expect(piece.isClean).toBe(true);

    piece.state = "dirty";
    expect(piece.isClean).toBe(false);
  });

  test("the method 'clean' clean the piece if it is dirty", () => {
    const piece = new Piece("dirty");
    piece.clean();
    expect(piece.state).toBe("clean_by_robot");

    piece.state = "clean";
    piece.clean();
    expect(piece.state).toBe("clean");
  });
});
