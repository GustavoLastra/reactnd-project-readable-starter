import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export function getCategories (categories) {          /* Get categories action*/
  return {
    type: actionTypes.GET_CATEGORIES,
    categories
  }
}

export const asyncGetCategories = (dispatch) => () => {
  api
    .getCategories()
    .then(categories => dispatch(getCategories(categories)))
};
