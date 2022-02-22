import { GenresFilterPipe } from './genres-filter.pipe';

describe('GenresSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new GenresFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
