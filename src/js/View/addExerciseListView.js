/**
 * Class representing the exercise with the sets.
 */
class AddExerciseListView {
    _parentelement = document.querySelector('.reps-sets-form');
    _errorMessage = 'The query is not available';

    /**
     * Gets the name that was selected from the results
     * @returns {String} The Exercise 
     */
    _getExerciseName() {
        return document.querySelector(".selected-exercise").textContent;
    }

    /**
    * Gets the title and sets, reps of the exercise
    * @returns {[string, number]} Title and sets, reps that was inserted in the input
    */
    getSetRep() {
        const set = this._parentelement.querySelector('.sets-work').value;
        const rep = this._parentelement.querySelector('.reps-work').value;
        this._clearInput();
        return [this._getExerciseName(), set + ' x ' + rep];
    }


    /**
 * Cleans the input
 */
    _clearInput() {
        this._parentelement.querySelector('.sets-work').value = '';
        this._parentelement.querySelector(".reps-work").value = '';
    }



    /**
 * Renders the whole workout list 
 * @param {function} handler shows the list of every exercise and handle the delete buttons
 */
    addHandlerSubmit(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new AddExerciseListView();