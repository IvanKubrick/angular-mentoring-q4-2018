import { FilterByNamePipe } from './filter-by-name.pipe';

describe('FilterByNamePipe', () => {
  it('create an instance', () => {
    const pipe: FilterByNamePipe = new FilterByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
