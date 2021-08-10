import View from "./View";

/**
 * Class representing the list of the ingredients you were looking for
 * @extends View
 */
class ResultsIngredientView extends View {
    _parentelement = document.querySelector('.list-ing-api');
    _resultsContainer = document.querySelector('.modal-container-food');
    _btnClose = document.querySelector('.exit-food-results');

    /**
     * Add an event listener for the close button and use it in the constructor for not call it again
     */
    constructor() {
        super()
        this._addHandlerShowResults();
    }

    /**
     * EventListener for the close button
     */
    _addHandlerShowResults() {
        this._btnClose.addEventListener('click', this.closeIngredientModal.bind(this));
    }

    /**
     * Closes the container of the results
     */
    closeIngredientModal() {
        this._resultsContainer.style.display = 'none';
    }

    /**
     * Shows the container of the results
     */
    showResultsContainer() {
        this._resultsContainer.style.display = 'block';
    }

    /**
     * Displays a container for each ingredient found by the api which will be joined and introduced in html
     * @returns {string} One container for each ingredient 
     */
    _generateMarkup() {
        return this._data.map(a => a = `
        <div class="ingredient-api-1 ingredient-box-api">
        <div class="row">
            <div class="col-8 d-flex align-items-center">
                <p class="name-ex-style">
                    ${a.value}
                </p>
            </div>
            <div class="col">
                <div class="buttons-ingredient-api">
                    <div class="row">
                        <div class="col-6 btn-ex-api-1">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="col-6 btn-ex-api-2">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="info-ingredient-api" data-id='${a.data.id}'>

            </div>
        </div>
    </div>`).join('');
    }

}

export default new ResultsIngredientView();