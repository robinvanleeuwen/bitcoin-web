const balance = (state={}, action) => {

  switch (action.type){
    case 'STORE_BALANCE':
      console.log("Storing Balance")
      return action.balance
    default:
      return state
  }

}

export default balance