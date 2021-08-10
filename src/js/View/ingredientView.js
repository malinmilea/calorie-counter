/**
 * Class representing the view of an ingredient.
 */
class IngredientView {
    _data;
    _parentelement;
    _buttons;
    _buttonsAdd;
    _errorMessage = 'We couldn not find that meal';
    _ingredientName;

    /**
     * Sets the name of the selected ingredient
     * @param {string} name Name of the ingredient
     */
    _setIngredientName(name) {
        this._ingredientName = name;
    }

    /**
     * Gets the name of the ingredient which has been set before
     * @returns {string} The name of the ingredient
     */
    getIngredientName() {
        return this._ingredientName;
    }


    /**
     * Sets the data of the ingredient 
     * @param {Object} data The informations from the api
     */
    setData(data) {
        this._data = data;
    }

    /**
     * Displays nutritional information about the ingredient when you press the green button
     * @param {Function} handler Sets the data in the state for the ingredient
     * @param {document} ingredientView Just a method to bind
     */
    addHandlerRenderInfo(handler, ingredientView) {
        let infoIngredientContainer;
        this._buttons.forEach(button => {
            button.addEventListener('click', async function () {
                try {
                    const bigContainer = button.closest('.ingredient-box-api');
                    infoIngredientContainer = bigContainer.querySelector('.info-ingredient-api');
                    if (!infoIngredientContainer.style.display) infoIngredientContainer.style.display = 'none';
                    ingredientView.renderSpinnerIngredient(infoIngredientContainer);
                    await handler(infoIngredientContainer);
                    infoIngredientContainer.innerHTML = '';
                    const markup = ingredientView._generateMarkup();
                    infoIngredientContainer.insertAdjacentHTML('afterbegin', markup);
                } catch (err) {
                    throw ingredientView.renderError(ingredientView._errorMessage, infoIngredientContainer)
                }
            })
        })
    }

    /**
     * Sets the name to be added and close the results container
     * @param {Function} handler Closes the results container, change placeholder ( measurement ) and sets the name 
     * @param {document} ingredientView  A mothod to bind 
     * @param {document} container The title container where the error will be rendered
     */
    addHandlerChangeName(handler, ingredientView, container) {
        this._buttonsAdd.forEach(button => {
            button.addEventListener('click', async function () {
                try {
                    const bigContainer = button.closest('.ingredient-box-api');
                    const id = bigContainer.querySelector('.info-ingredient-api').dataset.id;
                    const titleIngredient = bigContainer.querySelector('.name-ex-style');
                    ingredientView._setIngredientName(titleIngredient.textContent);
                    if (!handler) return;
                    handler(id);
                } catch (err) {
                    throw ingredientView.renderError(ingredientView._errorMessage, container);
                }
            })
        })
    }


    /**
     * Sets the buttons fot the displayed ingredients ( info and add buttons)
     */
    setButtons() {
        this._buttons = document.querySelectorAll('.btn-ex-api-1');
        this._buttonsAdd = document.querySelectorAll('.btn-ex-api-2');
    }


    /**
     * Shows the spinner until the ingredient information is obtained
     */
    renderSpinnerIngredient(container) {
        const markup = `
              <div class='spinner'>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45"/>
            </svg>
            </div>
            `;
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * Renders the error
     * @param {string} message the message set in the context of an error
     * @param {document} infoIngredientContainer The container which is displayed when we ask for information about the ingredient
     */
    renderError(message = this._errorMessage, infoIngredientContainer) {
        const markup = `
              <div class='error'>
              <i class="fas fa-exclamation-triangle error-icon"></i>
              <p>${message}</p>
            </div>
            `;
        infoIngredientContainer.innerHTML = '';
        infoIngredientContainer.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * @returns {string} Nutritional data obtained from api
     */
    _generateMarkup() {
        return `
        <div class="container">
        <hr style="width:100%;height:2px;color:black;background-color:black">
        <div class="row">
            <div class="col">
              <p class="nutri-info">Calories: ${this._data.calories} cal</p>
              </div>
            <div class="col">
            <p class="nutri-info">Sodium: ${this._data.sodium} g</p>
            </div>
            </div>
        <div class="row">
            <div class="col">
              <p class="nutri-info">Total Fat: ${this._data.fat} g</p>
              </div>
            <div class="col">
            <p class="nutri-info">Total Carbs: ${this._data.carbs} g</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
              <p class="nutri-info">Saturated: ${this._data.fat_sat} g</p>
              </div>
            <div class="col">
            <p class="nutri-info">Sugars: ${this._data.carbohydrates_sugar} g</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
              <p class="nutri-info">Fibres: ${this._data.fibres} g</p>
              </div>
            <div class="col">
            <p class="nutri-info">Protein: ${this._data.protein} g</p>
            </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="nutri-info">Energy: ${this._data.energy} Kj</p>
            </div>
          <div class="col">
            <p class="nutri-info">Portion: ${this._data.gramsPerPortion}</p>
            </div>
    </div>
    </div>
        `;
    }
}

export default new IngredientView();