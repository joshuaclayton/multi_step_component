import { Controller } from "@hotwired/stimulus";

let isTrue = (value) => {
  return value === "true";
};

export default class extends Controller {
  static targets = [
    "step",
    "previousButton",
    "nextButton",
    "navigationButton",
    "finalContent",
  ];
  static values = {
    index: { type: Number, default: 0 },
    maxIndexVisited: { type: Number, default: 0 },
    stepsCount: { type: Number, default: 0 },
  };

  connect() {
    this.indexValue = this.element.dataset.startingStep;
    this.stepsCountValue = this.element.dataset.stepsCount;
  }

  indexValueChanged() {
    if (this.indexValue > this.maxIndexVisitedValue) {
      this.maxIndexVisitedValue = this.indexValue;
    }

    this.showCurrentStep();
    this.updateNavigationButtonClasses();
    this.updateButtonDisabledState();
    this.updatePreviousButtonVisibility();

    if (this.onFinalStep) {
      this.finalContentTarget.hidden = false;
      this.nextButtonTarget.hidden = true;
    } else {
      this.finalContentTarget.hidden = true;
      this.nextButtonTarget.hidden = false;
    }
  }

  visitStep(e) {
    this.indexValue = e.target.dataset.stepIndex;
  }

  moveNext() {
    this.indexValue++;
  }

  movePrevious() {
    this.indexValue--;
  }

  showCurrentStep() {
    this.stepTargets.forEach((element, index) => {
      element.hidden = index != this.indexValue;
    });
  }

  updatePreviousButtonVisibility() {
    if (
      isTrue(this.previousButtonTarget.dataset.hiddenOnStart) &&
      this.onFirstStep
    ) {
      this.previousButtonTarget.classList.add("invisible");
    } else {
      this.previousButtonTarget.classList.remove("invisible");
    }
  }

  updateNavigationButtonClasses() {
    this.navigationButtonTargets.forEach((element, index) => {
      element.classList.remove("previous");
      element.classList.remove("current");
      element.classList.remove("upcoming");

      if (index < this.indexValue) {
        element.classList.add("previous");
      }

      if (index === this.indexValue) {
        element.classList.add("current");
      }

      if (index > this.indexValue) {
        element.classList.add("upcoming");
      }

      if (
        index > this.indexValue + 1 &&
        index > this.maxIndexVisitedValue + 1 &&
        isTrue(element.dataset.disableForwardJump)
      ) {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    });
  }

  updateButtonDisabledState() {
    if (this.onFinalStep) {
      this.nextButtonTarget.disabled = true;
    } else {
      this.nextButtonTarget.disabled = false;
    }

    if (this.onFirstStep) {
      this.previousButtonTarget.disabled = true;
    } else {
      this.previousButtonTarget.disabled = false;
    }
  }

  get onFinalStep() {
    return this.stepsCountValue === this.indexValue + 1;
  }

  get onFirstStep() {
    return this.indexValue === 0;
  }
}
