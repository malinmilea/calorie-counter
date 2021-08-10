import View from "./View";

/**
 * Class representing the list of ingredients.
 * @extends View
 */
class ListIngredientView extends View {
    _parentelement = document.querySelector('.box__meals');
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
     * @param {number} lastIndex The index of the last added ingredient 
     */
    setIndexRecipe(lastIndex) {
        this._nr = lastIndex;
    }

    /**
     * Sets the buttons for the newly added ingredients
     */
    setButtons() {
        this._buttons = document.querySelectorAll('.delete-individual-meal');
    }

    /**
     * The action of the individual button to delete the ingredient
     * @param {document} handler Make sure the ingredient is removed from both the visual field and the state
     */
    removeIngredientHandler(handler) {
        this._buttons.forEach(button => {
            button.addEventListener('click', function () {
                const ingredientContainer = button.closest('.meal-box');
                const number = ingredientContainer.dataset.numb;
                ingredientContainer.parentNode.removeChild(ingredientContainer);
                handler(+number);
            });
        });
    };

    /**
     * List of ingredients according to the measurement method: one hundred grams or per serving
     * @returns {string} Returns the list of ingredients to be displayed
     */
    _generateMarkup() {
        return this._data.map(a => {
            return `
        <div class="row">
        <div class="meal-1 meal-box" data-numb="${a[2]}">
            <div class="row">
                <div class="col-1 d-flex align-items-center">
                    <i class="fas fa-utensils image-meal__list"></i>
                </div>
                <div class="col-9 d-flex align-items-center">
                    <p class="name-ex-style d-flex align-items-center"> <span class="name-meal meal__number--1">${a[0]}</span>- <span class="quantity-meal quantity__meal-1">${a[3].gramsPerPortion === "100 g" ? a[1] * 100 : a[1]} ${a[3].measurement}</span ></p >
                </div >
            <div
                class="col delete-individual-meal d-flex align-items-center justify-content-center">
                <i class="far fa-trash-alt delete-icon"></i>
            </div>
            </div >
        </div >
    </div > `}).join('')
    }

}

export default new ListIngredientView();