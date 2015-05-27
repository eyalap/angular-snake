export class Score {

  constructor() {
    this.scores = {};
  }

  setScore(player, score) {
    this.score[player] = score;
  }

  getScore(player) {
    return this.scores[player];
  }
}
