import { hideCharacters } from '../helpers.js'

/**
 * Class representing  the data from the settings panel
 */
class ChangeSettingsDataView {
    _selectedFrom;

    /**
    * Checks the name field
    * @param {string} fname Your full name 
    * @param {document} input the name input
    * @returns {boolean}
    */
    _checkName(fname, input) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm;
        return this._inputVerification(regex, input, fname)
    }

    /**
   * Checks the email field
   * @param {string} fname Your email 
   * @param {document} input the emai input
   * @returns {boolean}
   */
    _checkEmail(email, input) {
        const regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;
        return this._inputVerification(regex, input, email);
    }


    /**
      * Checks the password field
      * @param {string} fname Your password
      * @returns {boolean}
      */
    _checkpsw(pass, input) {
        const regex = /^.{6,}$/gm;
        return this._inputVerification(regex, input, pass);
    }

    /**
     * You can write your address as you want
     * @returns {true}
     */
    _checkAddress() {
        return true;
    }

    /**
      * Changes the view of the inputs with red borders and an effect
      * @param {regex} regex Checks for login fields
      * @param {document} field login fields
      * @param {string} data  The data you wrote it
      * @returns {boolean} If it s true the change will be made
      */
    _inputVerification(regex, field, data) {
        if (!regex.test(data)) {
            field.classList.add('wrong-input');
            setTimeout(function () {
                field.classList.remove('wrong-input');
            }, 300);
            field.classList.add('glowing-border');
            return false;
        }
        field.classList.remove('glowing-border');
        return true;
    }


    /**
     * Sets the new view and  the data in the state
     * @param {*} id The id of the field 
     * @param {*} dataContainer Field of the input
     * @param {*} modelUpdate Updates data in the state
     */
    setNewData(id, dataContainer, modelUpdate) {
        const newData = this._selectedFrom.querySelector(`#${id}`).value;
        if (id == 'name' ? this._checkName(newData, dataContainer) : id == 'address' ? this._checkAddress(newData, dataContainer) : id == "email" ? this._checkEmail(newData, dataContainer) : this._checkpsw(newData, dataContainer)) {
            dataContainer.innerHTML = '';
            dataContainer.textContent = id == "psw" ? hideCharacters(newData) : newData;
        };
        id == 'name' ? modelUpdate.name = newData : id == 'email' ? modelUpdate.email = newData : id == "psw" ? modelUpdate.pass = newData : modelUpdate.adresss = newData;
    }

    /**
* Adds an event listener for the field that you selected and you cannot access another before changing that field
* @param {formClass} formClass the id of the input
*@param {document} dataContainer Field of the input 
* @param {Function} handler Updates the data (in the view and state)
* @returns {undefined}
*/
    addSubmitForm(formClass, dataContainer, handler) {
        this._selectedFrom = document.querySelector(`.form_${formClass}`);
        this._selectedFrom.addEventListener('submit', function (e) {
            e.preventDefault();
            handler(formClass, dataContainer)
        })
    }
}

export default new ChangeSettingsDataView();