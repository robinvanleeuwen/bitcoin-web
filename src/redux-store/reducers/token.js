const token = (state="", action) => {

  switch (action.type){
    case 'STORE_TOKEN':
      console.log("Storing Token")
      return action.token
    case 'DELETE_TOKEN':
      return (state === action.token)? "": state
    default:
      return state
  }

}

export default token