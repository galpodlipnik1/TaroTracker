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
  let sumOfSpecial = 0;
  const sortedTest = sortByPoints(array);
  let cardPoints = 0;

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
      cardPoints += 1;
      break;
    }

    let tempSum = 0;
    switch (numOfNulls) {
      case 0:
        tempSum = firstPoint + secondPoint + thirdPoint - 2;
        cardPoints += tempSum;
        break;
      case 1:
        tempSum = firstPoint + secondPoint + thirdPoint - 1;
        cardPoints += tempSum;
        break;
      case 2:
        tempSum = firstPoint + secondPoint + thirdPoint;
        cardPoints += tempSum;
        break;
      case 3:
        cardPoints += 1;
        break;
      default:
        throw new Error('Something went wrong');
    }
  }

  switch (vrstaIgre) {
    case 'v1':
      sumOfSpecial += 30;
      break;
    case 'v2':
      sumOfSpecial += 20;
      break;
    case 'v3':
      sumOfSpecial += 10;
      break;
    default:
      throw new Error('Something went wrong');
  }

  if (trula.napovedana) {
    sumOfSpecial += 10;
  } else if (trula.type) {
    sumOfSpecial += 20;
  }

  if (zadnjiKralj.napovedan) {
    sumOfSpecial += 10;
  } else if (zadnjiKralj.type) {
    sumOfSpecial += 20;
  }

  if (zadnjaPalcka.napovedana) {
    sumOfSpecial += 25;
  } else if (zadnjaPalcka.type) {
    sumOfSpecial += 50;
  }

  if (vsiKralji.type) {
    sumOfSpecial += 10;
  }
  //! vsi kralji napovedani????????

  const zmagal = roundto5(cardPoints) > 35;
  const razlika = 75 - cardPoints;
  const sum = roundto5(razlika) + sumOfSpecial;
  let igralecPoints = sum;
  let soigralecPoints = sum;

  if (izgubljeniMond && zmagal) igralecPoints = sum - 25;
  if (izgubljeniMond && !zmagal) igralecPoints = sum + 25;

  igralecPoints = roundto5(igralecPoints);
  soigralecPoints = roundto5(soigralecPoints);

  if (zmagal) {
    if (data.soigralec === '')
      return {
        igralec: { name: data.igralec, points: igralecPoints },
        soigralec: null,
      };
    else {
      return {
        igralec: { name: data.igralec, points: igralecPoints },
        soigralec: { name: data.soigralec, points: soigralecPoints },
      };
    }
  } else {
    if (data.soigralec === '')
      return {
        igralec: { name: data.igralec, points: -igralecPoints },
        soigralec: null,
      };
    else {
      return {
        igralec: { name: data.igralec, points: -igralecPoints },
        soigralec: { name: data.soigralec, points: -soigralecPoints },
      };
    }
  }
};
