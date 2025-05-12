import delay from "../../utils/delay";
import APIError from "../../errors/APIError";

class HttpClient {

  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {

    await delay(500);

    /* ao invés de passar o objeto direto na response, pegando a instncia de Headers,
     permite usar os métodos dela para manipular os objetos */
    const headers = new Headers();

    // evita preflights desnecessários
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    //custom headers
    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(
      `${this.baseURL}${path}`, {
        method: options.method,
        body: JSON.stringify(options.body),
        headers,
      }
    )

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

// eslint-disable-next-line
export default HttpClient;
