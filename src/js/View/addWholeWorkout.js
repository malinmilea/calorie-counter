/**
 * Class representing the control of the workout with the latest info and buttons handeling.
 */
class AddWholeWorkout {
    _parentelement = document.querySelector('.modal-window');
    _caloriesWorkout = document.querySelector('.exercise-calories');
    _lastExercise = document.querySelector('.render-last-exercise');
    _btnClose = document.querySelector('.exit-modal-workout');
    _btnOpen = document.querySelector('.add-workout');
    _iconOpen = document.querySelector('.fa-dumbbell')


    constructor() {
        this._addHandlerHideWorkoutMenu();
        this._addHandlerShowWorkoutMenu();
    }

    /**
       * An event listener for close button of the workout modal.
       */
    _addHandlerHideWorkoutMenu() {
        this._btnClose.addEventListener('click', function () {
            this._parentelement.style.display = 'none';
        }.bind(this));
    }

    /**
     * An event listenere for open button ( main panel ) and the icon button.
     */
    _addHandlerShowWorkoutMenu() {
        this._btnOpen.addEventListener('click', this._openWorkoutModal.bind(this));
        this._iconOpen.addEventListener('click', this._openWorkoutModal.bind(this));
    }

    /**
     * Shows the workout modal.
     */
    _openWorkoutModal() {
        this._parentelement.style.display = 'block';
    }

    /**
     * Hides the workout modal and sets the new burned calories by the exercises
     * @param {number} cal Calories are shown in the main panel where net calories are calculated 
     */
    closeWorkoutModal(cal) {
        this._parentelement.style.display = 'none';
        this._setCaloriesPanel(Math.round(cal));
    }

    /**
     * Sets the calories in the main panel 
     * @param {number} cal Calories burned 
     */
    _setCaloriesPanel(cal) {
        this._caloriesWorkout.textContent = cal;
    }

    /**
     * Sets the last exercise from the workout and will be shown in the recent activties table
     * @param {string} exercise The last exercise 
     */
    setLastExercise(exercise) {
        this._lastExercise.textContent = exercise;
    }
}

export default new AddWholeWorkout();