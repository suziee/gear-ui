import { Aggregate } from '../models';
import { API_URL } from './constants';

export default async function getAggregates() {
    const response = await fetch(API_URL + "cam/aggregates");
    const data = await response.json();
    return new Aggregate(data);
}