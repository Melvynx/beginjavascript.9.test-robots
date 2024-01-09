import { House } from "./House.js";

export class Robot {
  constructor() {
    this.position = [0, 0];
    this.battery = 100;
  }

  /**
   *
   * @param {Number} x position x
   * @param {Number} y position y
   */
  move(x, y) {
    if (this.checkBattery()) return;

    if (x > Math.abs(1) || y > Math.abs(1)) {
      console.log("🤖 ne peut pas se déplacer de plus d'une case à la fois.");
      return;
    }

    this.battery -= 1;
    this.position = [this.position[0] + x, this.position[1] + y];

    console.log(
      `🤖 se déplace vers la position ${this.position}. État de la batterie: ${this.battery}%`
    );
  }

  checkBattery() {
    if (this.battery <= 0) {
      console.log("🔋 épuisée. Retour à la station de recharge.");
      this.position = [0, 0];
      this.battery = 100;
      console.log("🔋 chargée. Prêt à reprendre le nettoyage.");
      return true;
    }
  }

  logBattery() {
    let batterie = "";
    let saveBattery = this.battery;
    // show 🟩 each 10% or 🟥 each 10% with no battery
    for (let i = 0; i < 10; i++) {
      if (saveBattery > 0) {
        batterie += "🟩";
      } else {
        batterie += "🟥";
      }
      saveBattery -= 10;
    }

    console.log(batterie);
  }

  /**
   *
   * @param {House} house
   */
  clean(house) {
    this.battery -= 5;
    console.log(
      `🧹 Nettoyage de la position ${this.position}. État de la batterie: ${this.battery}%`
    );

    console.warn(this);
    house.clean(this.position);

    this.checkBattery();
  }

  /**
   *
   * @param {House} house
   */
  doWork(house) {
    const nearestDirtyPiece = house.nearestDirtyPiece();
    if (!nearestDirtyPiece) {
      console.log("🤖 a terminé le nettoyage.");
      return false;
    }

    const robotPosition = this.position;
    const deltaX = nearestDirtyPiece[0] - robotPosition[0];
    const deltaY = nearestDirtyPiece[1] - robotPosition[1];

    if (deltaX === 0 && deltaY === 0) {
      this.clean(house);
    }

    if (deltaX > 0) {
      this.move(1, 0);
    } else if (deltaX < 0) {
      this.move(-1, 0);
    } else if (deltaY > 0) {
      this.move(0, 1);
    } else if (deltaY < 0) {
      this.move(0, -1);
    }

    return true;
  }
}
