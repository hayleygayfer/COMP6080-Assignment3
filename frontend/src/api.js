import PropTypes from 'prop-types';
/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (request) =>
  fetch(request)
    .then(res => res.json())
    .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
  /** @param {String} url */
  constructor (url) {
    this.url = url;
  }

  /** @param {String} path */
  makeAPIRequest (path, token, method, urlParameters, data) {
    // /////////////////////// USAGE /////////////////////
    // path = auth/login etc
    // token = token, or '' if no token needed
    // method = 'GET', 'POST', etc
    // url parameters = '?id=3' etc
    // data = {name: 'big nose', email: 'bignose@gmail.com'} etc
    const headersObj = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token !== '') {
      headersObj.Authorization = `Bearer ${token}`;
    }
    const headers = new Headers(headersObj);
    const requestsObj = {
      method: method,
      headers: headers,
      mode: 'cors',
      cache: 'default',
    }
    if (data !== '') {
      requestsObj.body = JSON.stringify(data);
    }
    const request = new Request(`${this.url}/${path}${urlParameters}`, requestsObj);
    if (method === 'POST') {
      // if method is post, DON'T return JSON
      return fetch(request)
        .then(res => res)
        .catch(err => console.warn(`API_ERROR: ${err.message}`));
    } else {
      return getJSON(request);
    }
    // pass headers into function
  }
}
API.propTypes = {
  path: PropTypes.string,
  token: PropTypes.string,
  method: PropTypes.string,
  urlParameters: PropTypes.string,
  data: PropTypes.any
};
