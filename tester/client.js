const ServerMethod = require('../lib/client');

const APIService = new ServerMethod({
  baseURL: 'http://localhost:5000/api'
})

const StudentAPI = APIService.createService('student');
const UniversityAPI = APIService.createService('university');
const University2API = APIService.createService('university2');

(async () => {
  const data = await StudentAPI.getAll();
  console.log(data);

  console.log(await StudentAPI.getById({ id: 1 }));

  console.log(await UniversityAPI.getAll({ id: 1 }));
  console.log(await UniversityAPI.set({ id: 1 }));

  console.log(await University2API.get('somethign'));
})();

