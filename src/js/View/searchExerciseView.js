/** Class representing the search bar and the handler for workout*/
class SearchExerciseView {
    _parentelement = document.querySelector('.searh-bar');
    _errorMessage = 'The query is not available';

    /**
 * Gets the query that you write
 * @returns {string} Returns what you insert in the search bar
 */
    getQuery() {
        const query = this._parentelement.querySelector('.search-exercise-result').value;
        this._clearInput();
        console.log(query);
        return query;
    }

    /**
    * Reset the search bar content
    */
    _clearInput() {
        return this._parentelement.querySelector('.search-exercise-result').value = '';
    }



    /**
  * Adds an event listener by submiting the query whick will display the results
  * @param {Function} handler 
  */
    addHandlerSearch(handler) {
        this._parentelement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchExerciseView();