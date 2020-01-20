import RandoML from '../src/randoml';

describe('init with default values', () => {
  const rand = new RandoML();

  test('should return output in range', () => {
    expect(rand.choose()).toBeGreaterThanOrEqual(1);
    expect(rand.choose()).toBeLessThanOrEqual(15);
  });
});

describe('init with correct values', () => {
  const rand = new RandoML({
    settings: {
      min: 20,
      max: 30,
      exclude: [24, 27]
    }
  });

  test('should return output in range', () => {
    for (let i = 0; i < 10; i++) {
      expect(rand.choose()).toBeGreaterThanOrEqual(20);
      expect(rand.choose()).toBeLessThanOrEqual(30);
    }
  });
});

describe('init with empty range', () => {
  const rand = new RandoML({
    settings: {
      min: 1,
      max: 2,
      exclude: [1, 2]
    }
  });

  test('should return error', () => {
    expect(rand.choose()).toBe(undefined);
  });
});

describe('init with hold numbers', () => {
  const rand = new RandoML({
    settings: {
      min: 1,
      max: 10,
      hold: [1, 4]
    }
  });

  test('outputs with hold numbers', () => {
    const test = [];

    for (let i = 0; i < 9; i++) {
      test.push(rand.choose());
    }

    expect(test).toEqual(expect.arrayContaining([1, 4]));
  });
});

describe('init with min number greater than max', () => {
  const rand = new RandoML({
    settings: {
      min: 3,
      max: 1,
      hold: [1, 4]
    }
  });

  test('should return error', () => {
    expect(rand.choose()).toThrow();
  });
});

describe('init with min number equal to max', () => {
  const rand = new RandoML({
    settings: {
      min: 3,
      max: 3
    }
  });

  test('should return error', () => {
    expect(rand.choose()).toThrow();
  });
});

describe('init with hold numer out of range', () => {
  const rand = new RandoML({
    settings: {
      min: -3,
      max: 10,
      hold: [1, 5, 12]
    }
  });

  test('should return error', () => {
    expect(rand.choose()).toThrow('12 are out of range -3, 10');
  });
});

// describe('predict numbers', () => {
//   test('should', () => {[
//     expect().toBe()
//   ]})
// })