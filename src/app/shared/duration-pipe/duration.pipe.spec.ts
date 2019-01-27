import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform value properly if duration > an hour', () => {
    expect(pipe.transform(333)).toBe('5h 33min');
  });

  it('should transform value properly if duration < an hour', () => {
    expect(pipe.transform(15)).toBe('15min');
  });
});
