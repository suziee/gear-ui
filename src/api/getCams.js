//https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
//https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest

import { API_URL } from './constants';
import { Cam } from '../models';

export default async function getCams() {
    const response = await fetch(API_URL + "cam");
    const data = await response.json();

    let cams = data.map((element, index) => {
        return new Cam(element);
    });

    return cams;
}