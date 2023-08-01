// p = palčka, m = mond, s = škis, k = kralj, d = dama, kv = kaval, p = pob, t = tarok, pl = platelc

const points = [
  {
    sign: 'p',
    name: 'Palčka',
    points: 5,
  },
  {
    sign: 'm',
    name: 'Mond',
    points: 5,
  },
  {
    sign: 's',
    name: 'Škis',
    points: 5,
  },
  {
    sign: 'k',
    name: 'Kralj',
    points: 5,
  },
  {
    sign: 'd',
    name: 'Dama',
    points: 4,
  },
  {
    sign: 'kv',
    name: 'Kaval',
    points: 3,
  },
  {
    sign: 'p',
    name: 'Pob',
    points: 2,
  },
  {
    sign: 't',
    name: 'Tarok',
    points: null,
  },
  {
    sign: 'pl',
    name: 'Platelc',
    points: null,
  },
];

const pointsMap = new Map(points.map((point) => [point.sign, point.points]));

export { pointsMap, points };
