import {combineReducers} from 'redux';
import {FETCH_BEERS, FETCH_BEER_IMAGES} from '../actions/types';

export default combineReducers({
    beers: function(state = null, {type, payload}) {
        switch(type) {
            case FETCH_BEERS:
                return payload;
            default:
                return state;
        }
    },

    beerImages: function(state = null, {type, payload}) {
        switch(type) {
            case FETCH_BEER_IMAGES:
                return payload;
            default:
                return state;
        }
    },
})