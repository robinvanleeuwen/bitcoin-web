export const storeToken = token => ({
  type: 'STORE_TOKEN',
  token
})

export const deleteToken = token => ({
  type: 'DELETE_TOKEN',
  token
})

export const storeBalance = balance => ({
  type: 'STORE_BALANCE',
  balance
})

export const storePrice = price => ({
  type: "STORE_PRICE",
  price
})
