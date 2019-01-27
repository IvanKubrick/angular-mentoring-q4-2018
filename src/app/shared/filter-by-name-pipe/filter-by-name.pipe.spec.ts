import { createCoursesStub } from '@testing';

import { ICourse } from '@app/shared';
import { FilterByNamePipe } from './filter-by-name.pipe';

describe('FilterByNamePipe', () => {
  let pipe: FilterByNamePipe;
  let coursesStub: ICourse[];

  beforeEach(() => {
    pipe = new FilterByNamePipe();
    coursesStub = createCoursesStub();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter courses properly with empty search string', () => {
    const expectedResult: ICourse[] = coursesStub;
    const result: ICourse[] = pipe.transform(coursesStub, '');

    expect(result).toEqual(expectedResult);
  });

  it('should filter courses by search string properly', () => {
    const expectedResult: ICourse[] = [coursesStub[0]];
    const result: ICourse[] = pipe.transform(coursesStub, 'basics');

    expect(result).toEqual(expectedResult);
  });

  it('should return empty array when no courses were found', () => {
    const expectedResult: ICourse[] = [];
    const result: ICourse[] = pipe.transform(coursesStub, 'unit testing');

    expect(result).toEqual(expectedResult);
  });
});
