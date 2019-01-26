import { Course, ICourse } from '@app/shared';

const day: number = 1000 * 60 * 60 * 24;
const yesterday: Date = new Date(Date.now() - day);
const tomorrow: Date = new Date(Date.now() + day);
const longAgo: Date = new Date(0);

export const createCoursesStub: () => ICourse[] = (): ICourse[] => [
  new Course(100, 'Angular Basics', new Date(tomorrow), 120, 'test', false),
  new Course(101, 'Angular Forms', new Date(yesterday), 480, 'test', false),
  new Course(102, 'Angular + RxJx', new Date(longAgo), 280, 'test', false)
];
