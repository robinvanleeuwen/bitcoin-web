import {axios} from 'axios'

function getBalance(username, token, callback) {
  
  var payload = {
    username: username, 
    token: token,
  }

  axios.post("http://localhost:5000/api/account/balance", payload)
  .then((response) => {callback(response)})

}

export default getBalance;