import { describe, expect, test, vi } from "vitest";
import { House, createLayout } from "./House.js";
import { Piece } from "./Piece.js";
import { Robot } from "./Robot.js";

describe("House", () => {
  test("logLayout show the correct emojis", () => {
    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean"), new Piece("clean")],
      [new Piece("clean"), new Piece("clean_by_robot"), new Piece("clean")],
    ];
    const robot = new Robot();
    robot.position = [0, 0];
    const house = new House(LAYOUT, robot);

    house.logLayout();

    expect(console.log).toBeCalledTimes(LAYOUT.length);
    expect(console.log).toHaveBeenNthCalledWith(1, "🤖🧼💩");
    expect(console.log).toHaveBeenNthCalledWith(2, "🧼🧼🧼");
    expect(console.log).toHaveBeenNthCalledWith(3, "🧼🧽🧼");
  });

  test("clean method should call the correct piece clean method", () => {
    const dirtyPiece = new Piece("dirty");
    dirtyPiece.clean = vi.fn();

    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), dirtyPiece],
      [new Piece("clean"), new Piece("clean"), new Piece("clean")],
      [new Piece("clean"), new Piece("clean_by_robot"), new Piece("clean")],
    ];
    const robot = new Robot();
    const house = new House(LAYOUT, robot);

    // Act
    house.clean([0, 2]);

    expect(dirtyPiece.clean).toBeCalledTimes(1);
  });

  test("isAllClean return true if all the piece is clean", () => {
    const LAYOUT = [[new Piece("clean")]];
    const robot = new Robot();
    const house = new House(LAYOUT, robot);

    expect(house.isAllClean()).toBe(true);
  });

  test("isAllClean return false if not the piece is clean", () => {
    const LAYOUT = [[new Piece("clean"), new Piece("dirty")]];
    const robot = new Robot();
    const house = new House(LAYOUT, robot);

    expect(house.isAllClean()).toBe(false);
  });

  test("nearestDirtyPiece return the nearest piece of the robot 1", () => {
    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean_by_robot"), new Piece("clean")],
    ];
    const robot = new Robot();
    robot.position = [0, 0];
    const house = new House(LAYOUT, robot);

    // Act
    const nearestDirtyPiece = house.nearestDirtyPiece();

    expect(nearestDirtyPiece).toEqual([0, 2]);
  });

  test("nearestDirtyPiece return the nearest piece of the robot 2", () => {
    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean_by_robot"), new Piece("clean")],
    ];
    const robot = new Robot();
    robot.position = [1, 0];
    const house = new House(LAYOUT, robot);

    // Act
    const nearestDirtyPiece = house.nearestDirtyPiece();

    expect(nearestDirtyPiece).toEqual([1, 2]);
  });
});

describe("createLayout", () => {
  test("should create layout with good size", () => {
    const layout = createLayout([2, 3]);

    expect(layout.length).toBe(2);
    expect(layout[0].length).toBe(3);
  });

  test("should create layout with only dirty and clean piece", () => {
    const layout = createLayout([100, 1]);

    const isOneDirtyPiece = layout.some((row) =>
      row.some((piece) => piece.isDirty)
    );
    const isOneCleanPiece = layout.some((row) =>
      row.some((piece) => piece.isClean)
    );

    expect(isOneDirtyPiece).toBe(true);
    expect(isOneCleanPiece).toBe(true);
  });
});
