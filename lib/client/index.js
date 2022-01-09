const axios = require('axios');

module.exports = class ServiceMethod {
  options = {};
  instance = null;

  constructor(options) {
    this.options = options;
    this.instance = axios.create({
      baseURL: options.baseURL,
    });
  }

  createService(name) {
    const handler = {
      get: (target, prop) => {
        return (...args) => {
          return target.__noSuchMethod__.call(target, prop, args);
        };
      },
    };

    return new Proxy({
      __noSuchMethod__: async (method, args) => {
        try {
          const res = await this.instance.post(`${name}/${method}`, args[0]);
          return res.data;
        } catch (e) {
          return e.response.data;
        }
      }
    }, handler);
  }

}