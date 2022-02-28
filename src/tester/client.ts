import ServerMethod from "../lib/client";
// import Student from './typings-for-client/student';
// import University from "./typings-for-client/university";

const APIService = new ServerMethod({
  baseUrl: 'http://localhost:5000/api'
})

const StudentAPI = APIService.createService('student');
const UniversityAPI = APIService.createService('university');

(async () => {
  try {
    const data = await StudentAPI.getAll();
    console.log(data);

    console.log(await StudentAPI.getById({ id: 'd' }));
    
    console.log(await UniversityAPI.getAll());
    console.log(await UniversityAPI.getById({ id: '1' }));
    

  } catch (e) {
    console.log('err', e);
  }
})();

type MyTypes = {
  name: string;
}