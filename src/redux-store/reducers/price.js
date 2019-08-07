const price = (state={value: 0.00, movement: ""}, action) => {

  switch (action.type){
    case 'STORE_PRICE':
      const value = parseFloat(action.price);
      var movement = "";
      
      if (action.price > state.value) {
        movement = "up"
      }
      else if (action.price < state.value) {
        movement = "down"
      }
      else {
        movement = ""
      }

      return {value: value, movement: movement}

      default:
        return state
  }

}

export default price