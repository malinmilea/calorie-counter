import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const getJson = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(10)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${res.status}`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const portionPer100grams = function (number, grams) {
    return +(number / grams * 100).toFixed(2);
}

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const hideCharacters = function (arr) {
    return arr.split('').reduce((acc, _) => acc + '*', '');
}