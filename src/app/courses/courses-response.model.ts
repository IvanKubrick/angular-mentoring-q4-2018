import { ICourse } from '@app/shared';

export interface ICoursesResponse {
  courses: ICourse[];
  total: number;
}
