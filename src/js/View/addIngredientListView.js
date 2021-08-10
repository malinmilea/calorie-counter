/**
 * Class representing the ingredient with the quantity.
 */
class AddIngredientListView {
    _parentelement = document.querySelector('.form_quantity-food');
    _errorMessage = 'The query is not available';

    /**
     * Gets the name that was selected from the results
     * @returns {String} The ingredient 
     */
    _getIngredientName() {
        return document.querySelector(".selected-ingredient").textContent;
    }

    /**
     * Gets the title and quantity of the ingredient
     * @returns {[string, number]} Title and quantity that was inserted in the input
     */
    getQuantity() {
        const quantity = this._parentelement.querySelector('#grams').value;
        this._clearInput();
        return [this._getIngredientName(), quantity]
    }

    /**
     * Cleans the input
     */
    _clearInput() {
        this._parentelement.querySelector('#grams').value = '';
    }


    /**
     * Renders the whole food list 
     * @param {function} handler shows the list of every ingredint and handle the delete buttons
     */
    addHandlerSubmit(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new AddIngredientListView();