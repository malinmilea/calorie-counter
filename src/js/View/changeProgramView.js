/**
 * Class representing the view for the option to change the optimal cal.
 */
class ChangeProgramView {
    _btnChange = document.querySelector('.btn-change');
    _container = document.querySelector('.calculator1');
    _mainPanel = document.querySelector('.display-dayily-sumary');

    constructor() {
        this._addHandlerClick();
    }

    /**
     * An event listener for the Change the program button whick will show you the calculator
     */
    _addHandlerClick() {
        this._btnChange.addEventListener('click', function (e) {
            e.preventDefault();
            this._container.style.display = 'block';
            this._mainPanel.style.display = 'none';
        }.bind(this));
    }

}

export default new ChangeProgramView()