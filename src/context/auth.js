function useAuth(token) {

  console.log("auth.js, token:", token)
  if (token === undefined || token === ""){
    return false;
  }
  return true;
}

export default useAuth;