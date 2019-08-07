import {combineReducers} from 'redux'
import token from './token'
import price from './price'
import balance from './balance'

const rootReducer = combineReducers({
  token: token,
  price: price,
  balance: balance
});

export default rootReducer;
