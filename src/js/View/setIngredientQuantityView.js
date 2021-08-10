import View from "./View";

/**
 * Class representing the view for the ingredient quantity
 * @extends View
 */
class SetIngredientQuantityView extends View {
    _parentelement = document.querySelector('.title-ingredient');
    _quantityInput = document.querySelector('.quanity-food');

    /**
     *  Get the title element of ingredient.
     * @returns {document} The new title of ingredient which will be inserted in the food list
     */
    getParentElement() {
        return this._parentelement;
    }

    /**
     * Checks the quantity unit, and change the placeholder of the input
     * @param {string} portion Set the quantity unit
     */
    changePlaceHolder(portion) {
        this._quantityInput.placeholder = portion == 'One Portion' ? "Number of portions" : 'Qunatity of food (100 g)';
    }

    /**
     * Generates the heading for the title 
     * @returns {string} title of the selected ingredient 
     */
    _generateMarkup() {
        return `<h3 class="selected-ingredient">${this._data}</h3>`;
    }
}

export default new SetIngredientQuantityView();