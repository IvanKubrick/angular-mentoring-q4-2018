import { createCoursesStub } from '@testing';

import { ICourse } from '@app/shared';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let coursesStub: ICourse[];

  beforeEach(() => {
    pipe = new OrderByPipe();
    coursesStub = createCoursesStub();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should place courses in the right order by date (from the oldest to the newest)', () => {
    const expectedResult: ICourse[] = [coursesStub[2], coursesStub[1], coursesStub[0]];
    const result: ICourse[] = pipe.transform(coursesStub, 'date');

    expect(result).toEqual(expectedResult);
  });

  it('should place courses in the right order by duration (from the shortest to the longest)', () => {
    const expectedResult: ICourse[] = [coursesStub[0], coursesStub[2], coursesStub[1]];
    const result: ICourse[] = pipe.transform(coursesStub, 'duration');

    expect(result).toEqual(expectedResult);
  });
});
