import fs from 'fs';
import get from 'lodash.get';
import { Express } from 'express';

interface Options {
  serviceDir: string;
  baseUrl: string;
}

export const ServerMethod = (options: Options) => {
  const controllers = {};  

  fs.readdirSync(`${options.serviceDir}`).filter(name => name.endsWith('.js')).forEach((fileName) => {
    import(`${options.serviceDir}/${fileName}`).then((module) => {
      // @ts-ignore
      controllers[module.default.serviceName] = new module.default();
      
    });
  });

  return (app: Express) => {
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

        // @ts-ignore
        const data = await controllers[service][method](body);
        res.status(200).json(data);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  };
}

export default ServerMethod;