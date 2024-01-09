import { Piece } from './Piece.js';
import { Robot } from './Robot.js';

export class House {
  /**
   *
   * @param {Piece[][]} layout
   * @param {Robot} robot
   */
  constructor(layout, robot) {
    this.layout = layout;
    this.robot = robot;
  }

  nearestDirtyPiece() {
    const position = this.robot.position;

    // check if the robot is on a dirty piece
    if (this.layout[position[0]][position[1]].isDirty) {
      return position;
    }

    let nearestDirtyPiece = null;
    let nearestDistance = null;
    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j].isDirty) {
          const distance = Math.abs(position[0] - i) + Math.abs(position[1] - j);

          if (nearestDistance === null || distance < nearestDistance) {
            nearestDistance = distance;
            nearestDirtyPiece = [i, j];
          }
        }
      }
    }

    return nearestDirtyPiece;
  }

  isAllClean() {
    return !this.layout.some((row) => row.some((piece) => piece.isDirty));
  }

  clean(position) {
    const [x, y] = position;
    this.layout[x][y].clean();
  }

  logLayout() {
    for (let i = 0; i < this.layout.length; i++) {
      let row = '';
      for (let j = 0; j < this.layout[i].length; j++) {
        if (
          this.robot &&
          this.robot.position[0] === i &&
          this.robot.position[1] === j
        ) {
          row += '🤖';
        } else {
          row += this.layout[i][j].getEmoji();
        }
      }
      console.log(row);
    }
  }
}
