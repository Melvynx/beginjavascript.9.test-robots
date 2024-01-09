import { describe, expect, test, vi } from "vitest";
import { House, createLayout } from "./House.js";
import { Piece } from "./Piece.js";
import { Robot } from "./Robot.js";

describe("Robot", () => {
  test("the checkBattery method should do nothing if the battery is not empty", () => {
    const robot = new Robot();
    robot.position = [22, 22];
    robot.battery = 1;

    robot.checkBattery();

    expect(console.log).toBeCalledTimes(0);
    expect(robot.position).toEqual([22, 22]);
  });

  test("the checkBattery method should log the position and the battery if the battery is empty", () => {
    const robot = new Robot();
    robot.position = [22, 22];
    robot.battery = 0;

    robot.checkBattery();

    expect(console.log).toBeCalledTimes(2);
    expect(robot.position).toEqual([0, 0]);
    expect(robot.battery).toEqual(100);
  });

  test("the move method move the robot only if the value is maximum 1", () => {
    const robot = new Robot();
    robot.battery = 99;

    robot.move(2, 2);

    expect(console.log).toBeCalledTimes(1);
    expect(robot.battery).toBe(99);
  });

  test("the move method move the robot correctly", () => {
    const robot = new Robot();
    robot.battery = 99;

    robot.move(1, 1);

    expect(console.log).toBeCalledTimes(1);
    expect(robot.battery).toBe(98);
    expect(robot.position).toEqual([1, 1]);
  });

  test("logBattery method correctly show battery emojis", () => {
    const robot = new Robot();

    robot.battery = 41;

    robot.logBattery();

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith("🟩🟩🟩🟩🟩🟥🟥🟥🟥🟥");

    vi.mocked(console.log).mockReset();

    robot.battery = 39;

    robot.logBattery();

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith("🟩🟩🟩🟩🟥🟥🟥🟥🟥🟥");
  });

  test("clean the house should remove 5 percent of battery", () => {
    const robot = new Robot();
    const house = new House(createLayout([10, 10]), robot);
    house.clean = vi.fn();

    robot.clean(house);

    expect(robot.battery).toBe(95);
    expect(house.clean).toBeCalledTimes(1);
  });

  test("doWork method will clean the nearest dirty place", () => {
    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), new Piece("dirty")],
      [new Piece("clean"), new Piece("clean"), new Piece("clean")],
      [new Piece("clean"), new Piece("clean"), new Piece("clean")],
    ];
    const robot = new Robot();
    robot.position = [1, 1];
    robot.move = vi.fn();
    robot.clean = vi.fn();

    const house = new House(LAYOUT, robot);

    robot.doWork(house);

    expect(robot.move).toBeCalledTimes(1);
    expect(robot.move).toBeCalledWith(-1, 0);

    vi.mocked(robot.move).mockReset();

    robot.position = [0, 2];

    robot.doWork(house);

    expect(robot.move).toBeCalledTimes(0);
    expect(robot.clean).toBeCalledTimes(1);
  });

  test("doWork method will do nothing if there is only clean piece", () => {
    const LAYOUT = [
      [new Piece("clean"), new Piece("clean"), new Piece("clean")],
    ];
    const robot = new Robot();
    const house = new House(LAYOUT, robot);

    const result = robot.doWork(house);

    expect(result).toBe(false);
  });
});
