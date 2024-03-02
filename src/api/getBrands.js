import { API_URL } from './constants';

export default async function getBrands() {
    const response = await fetch(API_URL + "cam/brands");
    const data = await response.json();
    return data;
}