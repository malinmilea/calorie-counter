/** Class represeting a view of different elements */
export default class View {
    _data;

    /**
     * Render the received object to the DOM
     * @param {Object | Object[]} data The date to be rendered (e.g lists of exercises/ingredients etc);
     * @this {Object} View instance
     * @returns {undefined}
     * @author Milea Laurentiu Malin
     */
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentelement.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * Inserts an error message if something doesn't work
     * @param {string}  message the Individual message for each view in the context of an error
     * @returns {undefined}
     */

    renderError(message = this._errorMessage) {
        const markup = `
              <div class='error'>
              <i class="fas fa-exclamation-triangle error-icon"></i>
              <p>${message}</p>
            </div>
            `;
        this._clear();
        this._parentelement.insertAdjacentHTML('afterbegin', markup);
    }

    /**
     * Removes content from the selected field
     * @returns {undefined}
     */
    _clear() {
        this._parentelement.innerHTML = '';
    }


    /**
     *  Inserts a spinner while an action is in progress
     *  @returns {undefined}
     */
    renderSpinner() {
        const markup = `
              <div class='spinner'>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45"/>
            </svg>
            </div>
            `;
        this._clear();
        this._parentelement.insertAdjacentHTML('afterbegin', markup);
    }
}