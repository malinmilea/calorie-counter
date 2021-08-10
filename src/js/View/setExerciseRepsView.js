import View from "./View";

/**
 * Class representing the view for the exercise
 * @extends View
 */
class SetExerciseRepsView extends View {
    _parentelement = document.querySelector('.title-exercise');

    /**
  *  Get the title element of exercise.
  * @returns {document} The new title of exercise which will be inserted in the workout
  */
    getParentElement() {
        return this._parentelement;
    }

    /**
   * Generates the heading for the title 
   * @returns {string} title of the selected exercise 
   */
    _generateMarkup() {
        return `
        <h3 class="selected-exercise">${this._data}</h3>
        `
    }
}

export default new SetExerciseRepsView();