import Validator from "./Validator.js";
import View from "./View.js";
import Lotto from "./Lotto.js";
import Utils from "./Utils.js";

export default class Domain {
  #winnings;
  #bonus;
  #lottos;
  #lotteryResults;
  #view;
  #validator;

  constructor() {
    this.#winnings = [];
    this.#bonus = 0;
    this.#lottos = [];
    this.#lotteryResults = [0, 0, 0, 0, 0];
    this.#view = new View();
    this.#validator = new Validator();
  }

  purchaseLottos(purchaseCost) {
    if (this.#validator.isEmpty(purchaseCost)) return this.#view.errorNoInput();
    if (this.#validator.isCorrectCost(purchaseCost))
      return this.#view.errorPurchaseCost();

    this.#lottos = Array(Number(purchaseCost) / 1000)
      .fill("")
      .map(() => new Lotto(Utils.genRandomLottoNumber()));

    return this.#view.announcePurchasing(
      Number(purchaseCost) / 1000,
      this.#lottos
    );
  }

  setWinnings(winnings) {
    if (this.#validator.isEmpty(winnings)) return this.#view.errorNoInput();
    if (this.#validator.isWhiteSpace(winnings))
      return this.#view.errorWhiteSpace();
    if (!this.#validator.isRepeat(winnings))
      return this.#view.errorWinningsRepeat();
    if (this.#validator.isCorrectWinnings(winnings))
      return this.#view.errorWinnings();

    this.#winnings = winnings.split(",").map((element) => Number(element));
    return true;
  }

  setBonus(bonus) {
    // 1. validation
    // 2. after -> set
  }

  get getWinnings() {
    return this.#winnings;
  }

  get getBonus() {
    return this.#bonus;
  }

  get getLottos() {
    if (this.#lottos.length !== 0) {
      // #lottos 배열 순환하면서 요소를 문자열형으로 변환하여 반환
    }
  }
}