import { Course } from './course.model';
import { User } from './user.model';

class User1 implements User {
  id: 0;
  firstName: 'Ivan';
  lastName: 'Hrushevich';
}

class User2 implements User {
  constructor(public id, public firstName, public lastName) {}
}

class Course1 implements Course {
  id: 0;
  title: 'Angular';
  creationDate: null;
  duration: 1000;
  description: 'Angular mentoring program';
}

class Course2 implements Course {
  constructor(public id, public title, public creationDate, public duration, public description) {}
}
