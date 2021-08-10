import View from "./View";

/**
 * Class representing the list of exercises.
 * @extends View
 */
class ListExercisesView extends View {
    _parentelement = document.querySelector('.box__exercises');
    _buttons;
    _actualContainer;
    _nr = -1;

    /**
     * Updates the index of the added ingredient
     * @returns {number}
     */
    addIndex() {
        this._nr++;
        return this._nr;
    }


    /**
     * After reloading the page we have to set the last index again to continue the count correctly
     * @param {number} lastIndex The index of the last added exercise 
     */
    setIndexExercise(lastIndex) {
        this._nr = lastIndex;
    }

    /**
     * Sets the buttons for the newly added exercises
     */
    setButtons() {
        this._buttons = document.querySelectorAll('.delete-individual-workout');
    }

    /**
     * The action of the individual button to delete the exercise
     * @param {document} handler Make sure the exercise is removed from both the visual field and the state
     */
    removeExerciseHandler(handler) {
        this._buttons.forEach(button => {
            button.addEventListener('click', function () {
                const exerciseContainer = button.closest('.exercise-box');
                const number = exerciseContainer.dataset.numb;
                exerciseContainer.parentNode.removeChild(exerciseContainer);
                handler(+number);
            })
        });
    }

    /**
     * List of exercises according to the sets and reps
     * @returns {string} Returns the list of exercises to be displayed
     */
    _generateMarkup() {
        return this._data.map(a => {
            return `
        <div class="row">
        <div class="exercise-1 exercise-box" data-numb="${a[2]}">
            <div class="row">
                <div class="col-1 d-flex align-items-center">
                    <i class="fas fa-dumbbell image-workout__list"></i>
                </div>
                <div class="col-9 d-flex align-items-center">
                    <p class="name-ex-style d-flex align-items-center"> <span class="name-exercise exercise__number--1">${a[0]}</span>- <span class="number-exercise reps__exercise-1">${a[1]}</span></p>
                </div>
                <div
                    class="col delete-individual-workout d-flex align-items-center justify-content-center">
                    <i class="far fa-trash-alt delete-icon"></i>
                </div>
            </div>
        </div>
    </div>`}).join('')
    }
}

export default new ListExercisesView();