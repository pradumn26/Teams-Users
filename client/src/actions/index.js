import axios from 'axios';
import {FETCH_BEERS, FETCH_BEER_IMAGES} from './types';

export const fetchBeers = () => dispatch => {
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json')
        .then((res) => {
            dispatch({
                type: FETCH_BEERS,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const fetchBeerImages = () => dispatch => {
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json')
        .then((res) => {
            dispatch({
                type: FETCH_BEER_IMAGES,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}