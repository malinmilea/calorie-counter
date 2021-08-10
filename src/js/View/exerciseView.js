/**
 * Class representing the view of an exercise.
 */
class ExerciseView {
    _parentelement;
    _buttons;
    _buttonsAdd;
    _errorMessage = 'We couldn not find that exercise';
    _exerciseName;

    /**
     * Sets the name of the selected exercise
     * @param {string} name Name of the exercise
     */
    _setExerciseName(name) {
        this._exerciseName = name;
    }

    /**
     * Gets the name of the exercise which has been set before
     * @returns {string} The name of the exercise
     */
    getExerciseName() {
        return this._exerciseName;
    }


    /**
 * Sets the data of the exercise 
 * @param {Object} data The informations from the api
 */
    setData(data) {
        this._data = data;
    }

    /**
     * Sets the buttons fot the displayed exercises ( info and add buttons)
     */
    setButtons() {
        this._buttons = document.querySelectorAll('.btn-ex-api-1');
        this._buttonsAdd = document.querySelectorAll('.btn-ex-api-2');
    }



    /**
     * Displays  information about the exercise when you press the green button
     * @param {Function} handler Sets the data in the state for the ingredient
     * @param {document} exerciseView Just a method to bind
     */
    addHandlerRenderInfo(handler, exerciseView) {
        let infoExerciseContainer;
        this._buttons.forEach(button => {
            button.addEventListener('click', async function () {
                try {
                    const bigContainer = button.closest('.exercise-box-api');
                    infoExerciseContainer = bigContainer.querySelector('.info-exercise-api');
                    if (!infoExerciseContainer.style.display) infoExerciseContainer.style.display = 'none';
                    exerciseView.renderSpinnerExercise(infoExerciseContainer)
                    await handler(infoExerciseContainer);
                    infoExerciseContainer.innerHTML = '';
                    const markup = exerciseView._generateMarkup();
                    infoExerciseContainer.insertAdjacentHTML('afterbegin', markup);
                } catch (err) {
                    throw exerciseView.renderError(exerciseView._errorMessage, infoExerciseContainer)
                }
            })
        })
    }

    /**
     * Sets the name to be added and close the results container
     * @param {Function} handler Closes the results container and sets the name 
     * @param {document} exerciseView  A mothod to bind 
     * @param {document} container The title container where the error will be rendered
     */
    addHandlerChangeName(handler, exerciseView, container) {
        this._buttonsAdd.forEach(button => {
            button.addEventListener('click', async function () {
                try {
                    const bigContainer = button.closest('.exercise-box-api');
                    console.log(bigContainer);
                    const titleExercise = bigContainer.querySelector('.name-ex-style');
                    exerciseView._setExerciseName(titleExercise.textContent);
                    if (handler) handler();
                } catch (err) {
                    throw exerciseView.renderError(exerciseView._errorMessage, container);
                }
            })
        })
    }

    /**
   * Shows the spinner until the exercise information is obtained
   */
    renderSpinnerExercise(container) {
        const markup = `
              <div class='spinner'>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45"/>
            </svg>
            </div>
            `;
        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', markup);
    }

    /**
    * @returns {string}  data obtained from api about exercise
    */
    _generateMarkup() {
        return `
        <div class="container">
        <div class="row">
            <div class="col">
                <p class="req-equipment"> Equipment: <span class="equipment"
                        style="color: green;">${this._data.equipment.map(a => a.name).join(", ")}</span></p>
            </div>
            <div class="col">
                <p class="list-muscles"> Muscles: <span class="prim-muscles"
                        style="color: green;">
                        ${this._data.muscles?.map(a => a.name).join(', ')}
                    </span> <span class="sec-muscles"
                        style="color:rgb(165, 165, 38);">,
                        ${this._data.muscles_secondary.map(a => a.name).join(', ')}
                    </span></p>
            </div>
        </div>
        <div class="row">
            <div class="desc-exercise-api">
                ${this._data.description}
            </div>
        </div>
    </div>
        `;
    }

    /**
   * Renders the error
   * @param {string} message the message set in the context of an error
   * @param {document} infoIngredientContainer The container which is displayed when we ask for information about the exercise
   */
    renderError(message = this._errorMessage, infoExerciseContainer) {
        const markup = `
              <div class='error'>
              <i class="fas fa-exclamation-triangle error-icon"></i>
              <p>${message}</p>
            </div>
            `;
        infoExerciseContainer.innerHTML = '';
        infoExerciseContainer.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new ExerciseView();