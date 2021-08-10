/** Class representing the register section. */
class RegisterView {
    _parentelement = document.querySelector('.form-create_account');
    _container = document.querySelector('.display-content-register');
    _mainPanel = document.querySelector('.display-dayily-sumary');
    _calculator = document.querySelector('.calculator1');
    _fnameInput = document.querySelector('.fname-field');
    _emailInput = document.querySelector('.email-field');
    _passInput = document.querySelector('.psw-field');


    /**
 * Checks if you already got an account
 */
    constructor() {
        this._addHandlerAlreadyLogged();
    }

    /**
     * It works conditionally, if you have an account, the main panel will be displayed and if not, you need to register
     */
    _addHandlerAlreadyLogged() {
        if (localStorage.getItem('allInfo') !== null) {
            this._container.classList.add("d-none");
            this._mainPanel.style.display = 'block';
        }
    }

    /**
     * Reveals the calculator after 1 second
     */
    _revealCalculator() {
        setTimeout(function () {
            this._container.classList.add("d-none");
            this._calculator.style.display = 'block';
        }.bind(this), 1000);
    }


    /**
     * Revelas the spinner one second before the computer
     */
    _renderSpinner() {
        const markup = `
              <div class='spinner'>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45"/>
            </svg>
            </div>
            `;
        this._container.innerHTML = '';
        this._container.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * Changes the view of the inputs with red borders and an effect
     * @param {regex} regex Checks for login fields
     * @param {document} field login fields
     * @param {string} data  The data you wrote it
     * @returns {boolean} If all are true the login will be done
     */
    _inputVerification(regex, field, data) {
        if (!regex.test(data)) {
            field.classList.add('wrong-input');
            setTimeout(function () {
                field.classList.remove('wrong-input');
            }.bind(this), 300);
            field.classList.add('glowing-border');
            return false;
        }
        return true;
    }

    /**
     * Checks the name field
     * @param {string} fname Your full name 
     * @returns {boolean}
     */
    _checkFullName(fname) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm;
        return this._inputVerification(regex, this._fnameInput, fname)
    }

    /**
  * Checks the email field
  * @param {string} fname Your email 
  * @returns {boolean}
  */
    _checkEmail(email) {
        const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;
        return this._inputVerification(regex, this._emailInput, email);
    }

    /**
      * Checks the password field
      * @param {string} fname Your password
      * @returns {boolean}
      */
    _checkPassword(pass) {
        const regex = /^.{6,}$/gm;
        return this._inputVerification(regex, this._passInput, pass);
    }


    /**
 * Adds an event listener for and checks if the inserted data are correct
 * @param {Function} handler Updates the data (in the view and state)
 * @returns {undefined}
 */
    addHandlerSubmit(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target).entries());
            if (this._checkFullName(data.fname) && this._checkEmail(data.email) && this._checkPassword(data.psw)) {
                this._renderSpinner();
                this._revealCalculator();
                handler(data);
            }
        }.bind(this))
    }

}

export default new RegisterView();