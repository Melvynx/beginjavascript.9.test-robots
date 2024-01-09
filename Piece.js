// create a class named of a house piece
export class Piece {
  /**
   * @param {"clean" | "dirty" | "clean_by_robot"} state
   */
  constructor(state) {
    this.state = state;
  }

  getEmoji() {
    if (this.state === 'clean') {
      return '🧼';
    }

    if (this.state === 'clean_by_robot') {
      return '🧽';
    }

    return '💩';
  }

  get isDirty() {
    return this.state === 'dirty';
  }

  get isClean() {
    return this.state === 'clean' || this.state === 'clean_by_robot';
  }

  clean() {
    if (this.state !== 'dirty') return;
    this.state = 'clean_by_robot';
  }
}
