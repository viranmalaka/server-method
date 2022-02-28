export default class University {
  static serviceName = 'university';

  getAll () {
    // call the services and find the university
    // return the universities array
    return [{ id: 1, name: 'Uni 1' }, { id: 2, name: 'Uni 2' }];
  }

  getById ({ id }: { id: string }) {
    // call the services and find the university
    // return the university obj
    return { id: 1, name: 'Uni 1', requestedBy: id };
  }
}