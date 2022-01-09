const fs = require('fs');
const get = require('lodash.get');

function ServerMethods(options) {
  const controllers = {};

  fs.readdirSync(`${options.serviceDir}`).forEach((fileName) => {
    import(`${options.serviceDir}/${fileName}`).then((module) => {
      controllers[module.default.name] = new module.default();
    });
  })

  return (app) => {
    app.post(`${options.baseUrl}/:service/:method`, async (req, res) => {
      const { params: { service, method }, body } = req;
      try {
        const s = get(controllers, [service])
        if (!(s && controllers.hasOwnProperty(service))) {
          return res.status(404).json({
            message: 'Service Not Found',
            path: [service]
          });
        }

        const m = get(s, [method]);
        if (!(m && typeof m === 'function')){
          return res.status(404).json({
            message: 'Method Not Found',
            path: [service, method]
          });
        }

        const data = await controllers[service][method](body);
        res.status(200).json(data);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  };
}

module.exports = ServerMethods;