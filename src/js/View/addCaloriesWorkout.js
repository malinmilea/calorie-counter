/**
 * Class representing the calories from workout.
 */
class AddCaloriesWorkout {
    _parentelement = document.querySelector('.time-intensity');


    /**
     * Gets the time and the intesity that you choose
     * @returns {object} time and the intensity of the workout
     */
    getTimeIntensity() {
        const time = this._parentelement.querySelector('.time-work').value;
        let intensity = this._parentelement.querySelector('.intensity-work').value;
        intensity = intensity === 'min' ? 3.5 : intensity === 'moderate' ? 5 : intensity === 'hard' ? 6.5 : 8;
        this._clearInput();
        return { time: time, intensity: intensity }
    }

    /**
     * cleans the inputs
     */
    _clearInput() {
        this._parentelement.querySelector('.time-work').value = '';
    }

    /**
     * Sends the information to the state and the main panel
     * @param {Function} handler Updates the user data and  displays on the main panel
     */
    addHandlerSubmit(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new AddCaloriesWorkout();