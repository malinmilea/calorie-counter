import { hideCharacters } from '../helpers.js'

/** Class representing the manipulation of the settings panel */
class SettingsView {
    _parentelement = document.querySelector('.settings');
    _buttons;
    _entireTable = document.querySelector('.table-settings');
    _iconOpen = document.querySelector('.fa-user-cog');
    _mainPanel = document.querySelector('.display-dayily-sumary');
    _calculator = document.querySelector('.calculator1');
    _register = document.querySelector('.display-content-register');
    _name = document.querySelector("[data-setting = 'name']");
    _email = document.querySelector("[data-setting = 'email']");
    _password = document.querySelector("[data-setting='psw']");



    constructor() {
        this._addHandlerShowSettingsMenu()
    }

    /**
     * Updates the view of the settings panel with the login information
     * @param {Object} UserInfo Login information
     * @returns {undefined}
     */
    registerData(UserInfo) {
        this._name.textContent = UserInfo.name;
        this._email.textContent = UserInfo.email;
        this._password.textContent = hideCharacters(UserInfo.pass);
    }

    /**
     * Add an event listener for the icon button from the nav bar
     */
    _addHandlerShowSettingsMenu() {
        this._iconOpen.addEventListener('click', this._openSettingsPanel.bind(this));
    }


    /**
     * The functionality of the button in the bar that opens the settings panel
     * @returns {undefined}
     */
    _openSettingsPanel() {
        if (!this._register.classList.contains('d-none')) return;
        this._parentelement.style.display = 'block';
        this._mainPanel.style.display = 'none';
        this._calculator.style.display = 'none';
    }

    /**
     * Returns an from which aims to modify a user's information
     * @param {string} dataName The selected type of information that you want to modify
     * @returns {string} 
     */
    _generateMarkup(dataName) {
        return `
    <form  class="form_${dataName} just-one">
        <input type="${dataName == "psw" ? "password" : "text"}" id="${dataName}" name="${dataName}" placeholder="Change ${dataName}"
            class="change-settings">
        <input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"
            tabindex="-1" />
    </form>
        `;
    }


    /**
     * Inserts the form which will change the textContent in the panel of the specific information
     * @param {Document} container Reprezents the container where the new data will be updated
     * @param {String} dataName Suggests us what type of information will be changed
     * @returns {undefined}
     */
    _modifyData(container, dataName) {
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', this._generateMarkup(dataName));
    }

    /**
     * Updates the selected buttons for the settings panel
     */
    _setButtons() {
        this._buttons = document.querySelectorAll('.edit-button');
    }

    /**
     * Adds an event listener for each of the buttons, to change the actual data
     * @param {Function} handler Updates the data (in the view and state)
     * @param {Document} settingsView Just a method of binding 
     * @returns {undefined}
     */
    addChangeInfo(handler, settingsView) {
        this._setButtons();
        this._buttons.forEach(button => {
            button.addEventListener('click', function () {
                if (settingsView._entireTable.querySelectorAll('.just-one').length !== 0) { return }
                const infoLine = button.closest('.section-line-settings');
                const dataContainer = infoLine.querySelectorAll('.text-setting-info')[1];
                const dataName = dataContainer.dataset.setting;
                settingsView._modifyData(dataContainer, dataName);
                handler(dataName, dataContainer);
            })
        });
    }
}

export default new SettingsView();