/**
 * Class representing the calories from meals.
 */
class AddCaloriesMealView {
    _parentelement = document.querySelector('.save-meal');


    /**
     * Sends the information to the state and the main panel
     * @param {Function} handler Updates the user data and  displays on the main panel
     */
    addHandlerClick(handler) {
        this._parentelement.addEventListener('click', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new AddCaloriesMealView();