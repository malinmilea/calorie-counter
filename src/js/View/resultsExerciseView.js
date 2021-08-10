import View from "./View";

/**
 * Class representing the list of the exercises you were looking for
 * @extends View
 */
class ResultsExerciseView extends View {
    _parentelement = document.querySelector('.list-ex-api');
    _resultsContainer = document.querySelector('.modal-container');
    _btnClose = document.querySelector('.exit-modal-results');

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
        this._btnClose.addEventListener('click', this.closeExerciseModal.bind(this));
    }

    /**
 * Closes the container of the results
 */
    closeExerciseModal() {
        this._resultsContainer.style.display = 'none';
    }

    /**
 * Shows the container of the results
 */
    showResultsContainer() {
        this._resultsContainer.style.display = 'block';
    }

    /**
 * Displays a container for each exercise found by the api which will be joined and introduced in html
 * @returns {string} One container for each exercise 
 */
    _generateMarkup() {
        return this._data.map(a => a = `
        <div class="exercise-api-1 exercise-box-api">
        <div class="row">
            <div class="col-8 d-flex align-items-center">
                <p class="name-ex-style">
                    ${a.value}
                </p>
            </div>
            <div class="col">
                <div class="buttons-exercise-api">
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
            <div class="info-exercise-api" data-id='${a.data.id}'>

            </div>
        </div>
    </div>`).join('');
    }

}

export default new ResultsExerciseView();