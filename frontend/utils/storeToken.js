import Cookies from 'js-cookie';

function storeToken(token) {
    // should be refactored to https cookies
    Cookies.set('token', token, { expires: 1, secure: true });
}

export default storeToken;