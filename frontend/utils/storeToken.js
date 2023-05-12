function storeToken(token) {
    // should be refactored to https cookies
    localStorage.setItem('token',token);
}

export default storeToken;