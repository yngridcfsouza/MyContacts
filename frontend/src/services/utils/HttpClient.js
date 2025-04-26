import delay from "../../utils/delay";
import APIError from "../../errors/APIError";

class HttpClient {

  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {

    await delay(500);

    const response = await fetch(
      `${this.baseURL}${path}`,
    )

    let body = null;
    const contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    /* body parse que permite pegar a resposta da request e transformar em um array com objetos json  */

    if (response.ok) {
      return body;
    }
    // optional chaining
    throw new APIError(response, body);
  }

}

// eslint-disable-next-line
export default HttpClient;

