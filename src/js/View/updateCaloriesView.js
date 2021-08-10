/**Class which updates the calories informations */
class UpdateCaloriesView {
    _netcalories = document.querySelector('.net-calories');
    _progressBar = document.querySelector('.progress-bar');
    _totalCal = document.querySelector('.total-calories');
    _proteins = document.querySelector('.value-protein');
    _fats = document.querySelector('.value-fats');
    _carbs = document.querySelector('.value-carbs');


    /**
     * Updates the visual field of information for calories and for the progress bar
     * @param {Number} calFood Calories that came from food
     * @param {Number} calExercice Calories burned from workout
     * @returns {undefined}
     */
    updateCalories(calFood, calExercice) {
        const calTotal = +this._totalCal.textContent;
        this._netcalories.textContent = Math.round(calFood - calExercice);
        this._progressBar.style.width = `${Math.round(((calFood - calExercice) * 100) / calTotal)}%`;
    }


    /**
     * Updates the field of view on the main panel
     * @param {Array} arrNutri All nutrients in an array
     * @returns {undefined}
     */
    updateNutrients(arrNutri = [0, 0, 0]) {
        this._proteins.textContent = arrNutri[0];
        this._fats.textContent = arrNutri[1];
        this._carbs.textContent = arrNutri[2];
    }


}

export default new UpdateCaloriesView();