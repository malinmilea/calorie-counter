import View from "./View";
import { RES_PER_PAGE } from "../config";

/**
 * Class representing the pagination of a page with results.
 * @extends View
 */
class PaginationExerciseView extends View {
    _parentelement = document.querySelector('.pagination-exercise');

    /**
     * Changes the functionality for exercise and ingredient
     * @param {string} selection Exercise or Ingredient
     */
    changeParent(selection) {
        this._parentelement = document.querySelector(selection == 'exercise' ? '.pagination-exercise' : '.pagination-food');
    }

    /**
     * Adds an event listenet to the buttons and will get you to the next 7 results
     * @param {Function} handler Takes you to the page that is given by the dataaset on the button
     */
    addHandlerClick(handler) {
        this._parentelement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--pagination');
            if (!btn) return;
            const gotoPage = btn.dataset.goto;
            handler(gotoPage);
        })
    }

    /**
     * @param {Number} curPage Current page of the results
     * @returns {string} Displays the button on the left and sets the dataset for the button when it will be accessed
     */
    _insertButtonLeft(curPage) {
        return `
            <button data-goto="${+curPage - 1}" class="btn--pagination pagination-exercise__btn--prev col-3"> 
            <i class="fas fa-arrow-left"></i>
            <span class="nr-page">Page ${+curPage - 1}</span>
        </button>
        `;
    }


    /**
 * @param {Number} curPage Current page of the results
 * @returns {string} Displays the button on the right and sets the dataset for the button when it will be accessed
 */
    _insertButtonRight(curPage, offset) {
        return `
            <button data-goto="${+curPage + 1}" class=" btn--pagination pagination-exercise__btn--next col-3 offset-${offset}"> 
            <span class="nr-page">Page ${+curPage + 1}</span>
            <i class="fas fa-arrow-right "></i>
            </button>
                `;
    }


    /**
     * @returns {string} Returns how the buttons will be displayed depending on the number of results and the current page
     */
    _generateMarkup() {
        const curPage = +this._data.page;
        const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);

        if (curPage === 1 && numPages > 1) {
            return this._insertButtonRight(curPage, 9)
        }

        if (curPage === numPages && numPages > 1) {
            return this._insertButtonLeft(curPage)
        }

        if (curPage < numPages) {
            return this._insertButtonLeft(curPage) + this._insertButtonRight(curPage, 6);
        }

        return '';
    }
}



export default new PaginationExerciseView();