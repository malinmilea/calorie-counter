import { API_URL, RES_PER_PAGE } from "./config";
import { getJson, portionPer100grams } from "./helpers";

export let state = {
    account: {
        kg: 0,
        optimalCal: 0,
        name: '',
        email: '',
        pass: '',
    },
    exercise: {

    },
    cal: {
        workout: 0,
        food: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
    },
    searchExercise: {
        query: '',
        results: [],
        page: 1,
        name: '',
        list: [],
    },
    searchIngredient: {
        query: '',
        results: [],
        page: 1,
        name: '',
        list: [],
    },
    ingredient: {

    }
}



export const loadExercise = async function (id) {
    try {
        const data = await getJson(`${API_URL}/exercise/${id}`)
        let exercise = data;
        await Promise.all(exercise.equipment.map(id => fetch(`${API_URL}/equipment/${id}`).then(res => res.json()))).then(data => exercise.equipment = data);
        await Promise.all(exercise.muscles.map(id => fetch(`${API_URL}/muscle/${id}`).then(res => res.json()))).then(data => exercise.muscles = data);
        await Promise.all(exercise.muscles_secondary.map(id => fetch(`${API_URL}/muscle/${id}`).then(res => res.json()))).then(data => exercise.muscles_secondary = data);
        state.exercise = exercise;
    } catch (err) {
        throw err;
    }
}

export const loadMeal = async function (id) {
    try {
        const data = await getJson(`${API_URL}/ingredient/${id}`);
        let meal = data;
        const unitData = await getJson(`${API_URL}/ingredientweightunit/?ingredient=${id}`);
        if (unitData.results.length === 0) {
            const ingredient = {
                id: meal.id,
                name: meal.name,
                carbohydrates_sugar: meal.carbohydrates_sugar,
                calories: +meal.energy,
                fat: +meal.fat,
                fat_sat: +meal.fat_saturated,
                fibres: +meal.fibres,
                protein: +meal.protein,
                sodium: +meal.sodium,
                carbs: +meal.carbohydrates,
                gramsPerPortion: 'One Portion',
                measurement: 'portions',
            }
            ingredient.energy = +(ingredient.calories * 4.2).toFixed(2);
            state.ingredient = ingredient;
            return;
        };
        const grams = unitData.results[0].gram;
        const ingredient = {
            id: meal.id,
            name: meal.name,
            carbohydrates_sugar: meal.carbohydrates_sugar,
            calories: portionPer100grams(+meal.energy, grams),
            fat: portionPer100grams(meal.fat, grams),
            fat_sat: portionPer100grams(meal.fat_saturated, grams),
            fibres: portionPer100grams(meal.fibres, grams),
            protein: portionPer100grams(meal.protein, grams),
            sodium: portionPer100grams(meal.sodium, grams),
            carbs: portionPer100grams(meal.carbohydrates, grams),
            gramsPerPortion: '100 g',
            measurement: 'g',
        }
        ingredient.energy = +(ingredient.calories * 4.2).toFixed(2);
        state.ingredient = ingredient
    } catch (err) {
        throw err;
    }
}

export const loadSearchExercises = async function (query) {
    try {
        state.searchExercise.query = query;
        const data = await getJson(`${API_URL}/exercise/search/?term=${query}`);
        state.searchExercise.results = data.suggestions;

    } catch (err) {
        throw err;
    }
}

export const loadSearchIngredient = async function (query) {
    try {
        state.searchIngredient.query = query;
        const data = await getJson(`${API_URL}/ingredient/search/?term=${query}`);
        state.searchIngredient.results = data.suggestions;
    } catch (err) {
        throw err;
    }
}

export const getSearchResultsPage = function (page = state.searchExercise.page) {
    state.searchExercise.page = page;
    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;

    return state.searchExercise.results.slice(start, end);
}

export const getSearchResultsFoodPage = function (page = state.searchIngredient.page) {
    state.searchIngredient.page = page;
    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;

    return state.searchIngredient.results.slice(start, end);
}


export const pushToExercisesList = function (exercise) {
    state.searchExercise.list.push(exercise);
    updateState();
}

export const pushToIngredinetsList = function (ingredient) {
    state.searchIngredient.list.push(ingredient);
    updateState();
}

export const removeFromExercisesList = function (index) {
    state.searchExercise.list = state.searchExercise.list.filter(arr => arr[2] != index);
    updateState();
}

export const removeFromIngredientsList = function (index) {
    state.searchIngredient.list = state.searchIngredient.list.filter(arr => arr[2] != index);
    updateState();
}

export const caloriesPerWorkout = function (obj) {
    state.cal.workout = Math.round((obj.intensity * obj.time * state.account.kg) / 60);
    updateState();
}

export const caloriesPerMeals = function () {
    state.cal.food = 0;
    state.cal.proteins = 0;
    state.cal.fats = 0;
    state.cal.carbs = 0;
    state.searchIngredient.list.map(arr => {
        state.cal.food += (arr[3].calories * (+arr[1]));
        state.cal.proteins += (arr[3].protein * (+arr[1]));
        state.cal.fats += (arr[3].fat * (+arr[1]));
        state.cal.carbs += (arr[3].carbs * (+arr[1]));
    });
}

export const getLastExercise = function () {
    const listWork = state.searchExercise.list;
    const lastExercise = listWork[listWork.length - 1];
    if (!lastExercise) return 'nothing yet';
    return lastExercise[0];
}

export const getLastIngredient = function () {
    const listIngredients = state.searchIngredient.list;
    const lastIngredient = listIngredients[listIngredients.length - 1];
    if (!lastIngredient) return 'nothing yet'
    return lastIngredient[0];
}

export const getNutrients = function () {
    updateState()
    return [state.cal.proteins, state.cal.fats, state.cal.carbs].map(nutri => Math.round(nutri));
}

export const calculateCalories = function (data) {
    let amr = 0
    let bmr = 0;
    if (data.gender === "male") {
        bmr = 66.47 + (13.75 * (+data.weight)) + (5.003 * (+data.height)) - (6.755 * (+data.age));
    } else {
        bmr = 655.1 + (9.563 * (+data.weight)) + (1.850 * (+data.height)) - (4.676 * (+data.age));
    }
    switch (data.activity) {
        case 'sedentary':
            amr = bmr * 1.2;
            break;
        case 'reduced-activity':
            amr = bmr * 1.375;
            break;
        case 'active':
            amr = bmr * 1.725;
            break;
        case 'performance':
            amr = bmr * 1.9;
            break;
    }
    const kcal = data.objective === "lose-weight" ? amr - 200 : amr + 200;
    state.account.kg = +data.weight;
    state.account.optimalCal = +kcal.toFixed();
    updateState();
}

export const setUserInfo = function (data) {
    state.account.name = data.name;
    state.account.email = data.email;
    state.account.pass = data.psw;
    updateState();
}

export const updateState = function () {
    if (state.account.name.length != 0) {
        localStorage.setItem('allInfo', JSON.stringify(state))
    };
}

export const updateIndexIngredient = function () {
    return state.searchIngredient.list[state.searchIngredient.list.length - 1][2];
}

export const udateIndexWorkout = function () {
    return state.searchExercise.list[state.searchExercise.list.length - 1][2];
}

const init = function () {
    if (localStorage.getItem('allInfo') === null) { return };
    const newState = localStorage.getItem('allInfo');
    if (state.account.name.length !== '') { state = JSON.parse(newState); }
}

init();