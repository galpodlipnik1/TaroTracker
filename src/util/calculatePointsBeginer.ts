import { pointsMap } from '@/data/pointsSheet';
import { FormatedData } from '@/types/addPointsBeginner';

const sortByPoints = (arr: string[]) => {
  const sortedArr = arr.sort((a, b) => {
    const aPoints: any = pointsMap.get(a);
    const bPoints: any = pointsMap.get(b);

    if (aPoints === null) return 1;
    if (bPoints === null) return -1;

    return bPoints - aPoints;
  });

  return sortedArr;
};

const roundto5 = (num: number) => {
  return Math.round(num / 5) * 5;
};

export const calculatePointsBeginner = (
  array: string[],
  data: FormatedData
) => {
  const {
    vrstaIgre,
    vsiKralji,
    trula,
    zadnjiKralj,
    zadnjaPalcka,
    izgubljeniMond,
  } = data;
  let sum = 0;
  const sortedTest = sortByPoints(array);

  const length = sortedTest.length;

  for (let i = 0; i < length; i += 3) {
    const firstPoint: any = pointsMap.get(sortedTest[i]);
    const secondPoint: any = pointsMap.get(sortedTest[i + 1]);
    const thirdPoint: any = pointsMap.get(sortedTest[i + 2]);

    let numOfNulls = [firstPoint, secondPoint, thirdPoint].filter(
      (el) => el === null
    ).length;

    if (secondPoint === undefined) {
      break;
    } else if (thirdPoint === undefined) {
      sum += 1;
      break;
    }

    let tempSum = 0;
    switch (numOfNulls) {
      case 0:
        tempSum = firstPoint + secondPoint + thirdPoint - 2;
        sum += tempSum;
        break;
      case 1:
        tempSum = firstPoint + secondPoint + thirdPoint - 1;
        sum += tempSum;
        break;
      case 2:
        tempSum = firstPoint + secondPoint + thirdPoint;
        sum += tempSum;
        break;
      case 3:
        sum += 1;
        break;
      default:
        throw new Error('Something went wrong');
    }
  }

  switch (vrstaIgre) {
    case 'v1':
      sum += 30;
      break;
    case 'v2':
      sum += 20;
      break;
    case 'v3':
      sum += 10;
      break;
    default:
      throw new Error('Something went wrong');
  }

  if (trula.napovedana) {
    sum += 10;
  } else if (trula.type) {
    sum += 20;
  }

  if (zadnjiKralj.napovedan) {
    sum += 10;
  } else if (zadnjiKralj.type) {
    sum += 20;
  }

  if (zadnjaPalcka.napovedana) {
    sum += 25;
  } else if (zadnjaPalcka.type) {
    sum += 50;
  }

  if (vsiKralji.type) {
    sum += 10;
  }
  //! vsi kralji napovedani????????

  let igralecPoints = sum;
  let soigralecPoints = sum;

  if (izgubljeniMond) igralecPoints = sum - 25;

  igralecPoints = roundto5(igralecPoints);
  soigralecPoints = roundto5(soigralecPoints);

  const zmagal = igralecPoints > 35;

  if (zmagal)
    return {
      igralec: { name: data.igralec, points: igralecPoints },
      soigralec: { name: data.soigralec, points: soigralecPoints },
    };
  else
    return {
      igralec: { name: data.igralec, points: -igralecPoints },
      soigralec: { name: data.soigralec, points: -soigralecPoints },
    };
};
