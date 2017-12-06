import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export function storeCategory (category) {          /* Get categories action*/
  return {
    type: actionTypes.STORE_CATEGORY,
    category
  }
}
