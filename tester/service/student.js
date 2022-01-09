class Student {
  static name = 'student';

  getAll () {
		// call the services and find the students
    // return the students array
    return [{ id: 1, name: 'Std 1' }, { id: 2, name: 'Std 2' }];
  }

  getById ({ id }) {
		// call the services and find the student
    // return the student obj
    return { id: 1, name: 'Std 1', requested: id };
  }
}

module.exports = Student;