/**
 * Class representing the caculator for calories.
 */
class CalculatorView {
    _parentelement = document.querySelector('.calculator-form');
    _container = document.querySelector('.calculator1');
    _mainPanel = document.querySelector('.display-dayily-sumary');
    _dailyCalories = document.querySelector('.total-calories');
    _inputAge = document.querySelector('#age');
    _inputWeight = document.querySelector('#weight');
    _inputHeight = document.querySelector('#height');

    /**
     * Reveals the calculator and hides the main panel
     */
    _revealPanel() {
        this._container.style.display = 'none';
        this._mainPanel.style.display = 'block';
    }

    /**
     * Clears the inputs after you send them
     */
    _clearInput() {
        [this._inputAge, this._inputHeight, this._inputWeight].map(input => input.value = '');
    }

    /**
     * Sets the optimal calories in the main panel view
     * @param {number} kcal Calculated calories 
     */
    setDailyCalories(kcal) {
        this._dailyCalories.textContent = kcal;
    }

    /**
     * Caculates the calories
     * @param {Function} handler Load the information in the state and in the main panel
     */
    addHandlerSubmit(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target).entries());
            this._revealPanel();
            this._clearInput();
            handler(data);
        }.bind(this))
    }

}

export default new CalculatorView();