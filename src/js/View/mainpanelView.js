/**
 * Class representing the main panel. 
 */
class MainPanel {
    _parentelement = document.querySelector('.display-dayily-sumary');
    _calculator = document.querySelector('.calculator1');
    _settings = document.querySelector('.settings');
    _iconOpen = document.querySelector('.fa-house-damage');
    _register = document.querySelector('.display-content-register');


    constructor() {
        this._addHandlerShowMainMenu()
    }

    /**
     * Event listener for the icon button (Main Panel)
     */
    _addHandlerShowMainMenu() {
        this._iconOpen.addEventListener('click', this._openMainPanel.bind(this));
    }

    /**
     * Opens the MainPanel
     * @returns {} Returns if the registration has not yet taken place
     */
    _openMainPanel() {
        if (!this._register.classList.contains('d-none')) return;
        this._parentelement.style.display = 'block';
        this._calculator.style.display = 'none';
        this._settings.style.display = 'none';
    }



}

export default new MainPanel();
