import { API_URL } from './constants';

export default async function getModelsByBrand(brand) {
    const response = await fetch(API_URL + `cam/${brand}/models`);
    const data = await response.json();
    return data;
}