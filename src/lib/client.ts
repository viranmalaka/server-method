import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

interface Options {
  baseUrl: string;
}

class ServerMethod {
  options: Options = { 
    baseUrl: '',
  };
  
  instance: AxiosInstance | null = null;
  
  
  constructor(options: Options) {
    this.options = options;
    this.instance = axios.create({
      baseURL: options.baseUrl,
    })
  }
  
  createService(name: string) {
    const handler = {
      get: (target: any, prop: any) => {
        return (...args: any[]) => {
          return target.__noSuchMethod__.call(target, prop, args);
        };
      },
    };
    
    return new Proxy({
      __noSuchMethod__: async (method: string, args: any) => {
        if (this.instance) {
          try {
            const res = await this.instance.post(`${name}/${method}`, args[0]);
            return res.data;
          } catch (e: any) {
            throw e.response.data;
          }
        }
        
      }
    }, handler);
  }
}

export default ServerMethod;