import * as model from './model.js'
import exerciseView from './View/exerciseView.js';
import searchExerciseView from './View/searchExerciseView.js';
import resultsExerciseView from './View/resultsExerciseView.js';
import paginationExerciseView from './View/paginationExerciseView.js';
import setExerciseRepsView from './View/setExerciseRepsView.js';
import listExercisesView from './View/listExercisesView.js';
import addExerciseListView from './View/addExerciseListView.js';
import addCaloriesWorkout from './View/addCaloriesWorkout.js';
import addWholeWorkout from './View/addWholeWorkout.js';
import updateCaloriesView from './View/updateCaloriesView.js';
import searchIngredientView from './View/searchIngredientView.js';
import resultsIngredientView from './View/resultsIngredientView.js';
import ingredientView from './View/ingredientView.js';
import setIngredientQuantityView from './View/setIngredientQuantityView.js';
import addIngredientListView from './View/addIngredientListView.js';
import listIngredientView from './View/listIngredientView.js';
import addCaloriesMealView from './View/addCaloriesMealView.js';
import addWholeMeal from './View/addWholeMeal.js';
import calculatorView from './View/calculatorView.js';
import changeProgramView from './View/changeProgramView.js';
import registerView from './View/registerView.js';
import settingsView from './View/settingsView.js';
import changeSettingsDataView from './View/changeSettingsDataView.js';
import mainpanelView from './View/mainpanelView.js';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime'
import 'core-js/stable';

const controlExercise = async function (maincontainer) {
    try {
        if (maincontainer.style.display === "none") {
            maincontainer.style.display = "block";
        } else {
            maincontainer.style.display = "none";
            return;
        }
        const id = maincontainer.dataset.id;
        await model.loadExercise(id);
        exerciseView.setData(model.state.exercise);
    } catch (err) {
        exerciseView.renderError();
    }
}

const controlIngredient = async function (maincontainer) {
    try {
        if (maincontainer.style.display === "none") {
            maincontainer.style.display = "block";
        } else {
            maincontainer.style.display = "none";
            return;
        }
        const id = maincontainer.dataset.id;
        await model.loadMeal(id);
        ingredientView.setData(model.state.ingredient);
    } catch (err) {
        ingredientView.renderError();
    }
}

const controlSearchExercise = async function () {
    try {
        resultsExerciseView.showResultsContainer();
        resultsExerciseView.renderSpinner();
        const query = searchExerciseView.getQuery();
        if (!query) return;
        await model.loadSearchExercises(query);
        resultsExerciseView.render(model.getSearchResultsPage(1));
        exerciseView.setButtons();
        exerciseView.addHandlerRenderInfo(controlExercise, exerciseView);
        paginationExerciseView.changeParent('exercise');
        paginationExerciseView.render(model.state.searchExercise);
        exerciseView.addHandlerChangeName(controlChangeExercise
            , exerciseView, setExerciseRepsView.getParentElement());
        paginationExerciseView.addHandlerClick(controlExercisesPagination);
    } catch (err) {
        resultsExerciseView.renderError();
    }
}

const controlSearchIngredient = async function () {
    try {
        resultsIngredientView.showResultsContainer();
        resultsIngredientView.renderSpinner();
        const query = searchIngredientView.getQuery();
        if (!query) return;
        await model.loadSearchIngredient(query);
        resultsIngredientView.render(model.getSearchResultsFoodPage(1));
        ingredientView.setButtons();
        ingredientView.addHandlerRenderInfo(controlIngredient, ingredientView);
        paginationExerciseView.changeParent('ingredient')
        paginationExerciseView.render(model.state.searchIngredient);
        paginationExerciseView.addHandlerClick(controlIngredientPagination);
        ingredientView.addHandlerChangeName(controlChangeIngredient, ingredientView, setIngredientQuantityView.getParentElement());
    } catch (err) {
        resultsIngredientView.renderError()
    }
}

const controlChangeExercise = function () {
    const exerciseName = exerciseView.getExerciseName();
    if (!exerciseName) return;
    resultsExerciseView.closeExerciseModal();
    setExerciseRepsView.render(exerciseName);
}

const controlChangeIngredient = async function (id) {
    try {
        const ingredientName = ingredientView.getIngredientName();
        if (!ingredientName) return;
        resultsIngredientView.closeIngredientModal();
        await model.loadMeal(id);
        setIngredientQuantityView.render(ingredientName);
        setIngredientQuantityView.changePlaceHolder(model.state.ingredient.gramsPerPortion);
    } catch (err) {
        setIngredientQuantityView.renderError();
    }
}

const controlShowWorkout = function () {
    listExercisesView.renderSpinner();
    const exercise = addExerciseListView.getSetRep();
    if (!exercise) return;
    model.pushToExercisesList(exercise.concat([listExercisesView.addIndex()]));
    listExercisesView.render(model.state.searchExercise.list);
    listExercisesView.setButtons();
    listExercisesView.removeExerciseHandler(controlRenderExerciseList);
}

const controlShowMeal = function () {
    listIngredientView.renderSpinner();
    const ingredient = addIngredientListView.getQuantity();
    if (!ingredient) return;
    model.pushToIngredinetsList(ingredient.concat([listIngredientView.addIndex(), model.state.ingredient]));
    listIngredientView.render(model.state.searchIngredient.list);
    listIngredientView.setButtons();
    listIngredientView.removeIngredientHandler(controlRenderIngredientList)
}

const controlExercisesPagination = function (gotoPage) {
    resultsExerciseView.render(model.getSearchResultsPage(gotoPage));
    exerciseView.setButtons();
    exerciseView.addHandlerRenderInfo(controlExercise, exerciseView);
    exerciseView.addHandlerChangeName(controlChangeExercise
        , exerciseView, setExerciseRepsView.getParentElement('exercise'));
    paginationExerciseView.render(model.state.searchExercise);
}

const controlIngredientPagination = function (gotoPage) {
    resultsIngredientView.render(model.getSearchResultsFoodPage(gotoPage));
    ingredientView.setButtons();
    ingredientView.addHandlerRenderInfo(controlIngredient, ingredientView);
    ingredientView.addHandlerChangeName(controlChangeIngredient, ingredientView, setIngredientQuantityView.getParentElement('ingredient'));
    paginationExerciseView.render(model.state.searchIngredient);
}

const controlRenderExerciseList = function (number) {
    model.removeFromExercisesList(number);
}

const controlRenderIngredientList = function (number) {
    model.removeFromIngredientsList(number);
}

const controlCaloriesWorkouts = function () {
    model.caloriesPerWorkout(addCaloriesWorkout.getTimeIntensity());
    addWholeWorkout.closeWorkoutModal(model.state.cal.workout);
    addWholeWorkout.setLastExercise(model.getLastExercise());
    updateCaloriesView.updateCalories(model.state.cal.food, model.state.cal.workout);
}

const controlCaloriesMeals = function () {
    model.caloriesPerMeals();
    addWholeMeal.closeMealModal(model.state.cal.food);
    addWholeMeal.setLastIngredient(model.getLastIngredient());
    updateCaloriesView.updateCalories(model.state.cal.food, model.state.cal.workout);
    updateCaloriesView.updateNutrients(model.getNutrients());
}

const controlCaloriesCalculator = function (data) {
    model.calculateCalories(data);
    calculatorView.setDailyCalories(model.state.account.optimalCal);
    updateCaloriesView.updateCalories(model.state.cal.food, model.state.cal.workout);
}

const controlChangeSettingData = function (id, container) {
    changeSettingsDataView.setNewData(id, container, model.state.account);
    model.updateState();
}

const controlRegister = function (data) {
    model.setUserInfo(data);
    settingsView.registerData(model.state.account);
}

const controlSettingsData = function (dataName, dataContainer) {
    changeSettingsDataView.addSubmitForm(dataName, dataContainer, controlChangeSettingData);
}

const controlActualData = function () {
    if (model.state.searchExercise.list.length > 0) {
        listExercisesView.setIndexExercise(model.udateIndexWorkout())
        listExercisesView.render(model.state.searchExercise.list);
        listExercisesView.setButtons();
        listExercisesView.removeExerciseHandler(controlRenderExerciseList);
        addWholeWorkout.closeWorkoutModal(model.state.cal.workout);
        addWholeWorkout.setLastExercise(model.getLastExercise());
    }
    if (model.state.searchIngredient.list.length > 0) {
        listIngredientView.setIndexRecipe(model.updateIndexIngredient());
        listIngredientView.render(model.state.searchIngredient.list);
        listIngredientView.setButtons();
        listIngredientView.removeIngredientHandler(controlRenderIngredientList);
        addWholeMeal.closeMealModal(model.state.cal.food);
        addWholeMeal.setLastIngredient(model.getLastIngredient());
    }
    calculatorView.setDailyCalories(model.state.account.optimalCal);
    updateCaloriesView.updateCalories(model.state.cal.food, model.state.cal.workout);
    updateCaloriesView.updateNutrients(model.getNutrients());
    settingsView.registerData(model.state.account);
}

const init = function () {
    searchIngredientView.addHandlerSearch(controlSearchIngredient);
    searchExerciseView.addHandlerSearch(controlSearchExercise);
    addIngredientListView.addHandlerSubmit(controlShowMeal);
    addExerciseListView.addHandlerSubmit(controlShowWorkout);
    addCaloriesWorkout.addHandlerSubmit(controlCaloriesWorkouts);
    addCaloriesMealView.addHandlerClick(controlCaloriesMeals);
    calculatorView.addHandlerSubmit(controlCaloriesCalculator);
    registerView.addHandlerSubmit(controlRegister);
    settingsView.addChangeInfo(controlSettingsData, settingsView);
    controlActualData();
}

init();


// fetch('https://wger.de/api/v2/exercise/search/?term=') 

// https://wger.de/api/v2/ingredientweightunit/?ingredient=145 
// https://wger.de/api/v2/weightunit/32/

