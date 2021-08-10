/**
 * Class representing the control of the meals with the latest info and buttons handeling.
 */
class AddWholeMeal {
    _parentelement = document.querySelector('.modal-window-food');
    _caloriesMeal = document.querySelector('.food-calories');
    _lastIngredient = document.querySelector('.render-last-recipe');
    _btnClose = document.querySelector('.exit-modal-meal');
    _btnOpen = document.querySelector('.add-food');
    _iconOpen = document.querySelector('.fa-hamburger');


    constructor() {
        this._addHandlerHideMealMenu();
        this._addHandlerShowMealMenu();
    }

    /**
      * An event listener for close button of the meal modal.
      */
    _addHandlerHideMealMenu() {
        this._btnClose.addEventListener('click', function () {
            this._parentelement.style.display = 'none';
        }.bind(this));
    }


    /**
     * Shows the meal modal.
     */
    _openMealModal() {
        this._parentelement.style.display = 'block';
    }

    /**
   * An event listenere for open button ( main panel ) and the icon button.
   */
    _addHandlerShowMealMenu() {
        this._btnOpen.addEventListener('click', this._openMealModal.bind(this));
        this._iconOpen.addEventListener('click', this._openMealModal.bind(this));
    }

    /**
   * Hides the meal modal and sets the new calories from food
   * @param {number} cal Calories are shown in the main panel where net calories are calculated 
   */
    closeMealModal(cal) {
        this._parentelement.style.display = 'none';
        this._caloriesMeal.textContent = Math.round(cal);
    }

        /**
     * Sets the last ingredient from the meals and will be shown in the recent activties table
     * @param {string} ingredient The last ingredient 
     */
    setLastIngredient(ingredient) {
        this._lastIngredient.textContent = ingredient;
    }


}

export default new AddWholeMeal();