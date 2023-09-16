import { FormatedData } from '@/types/addPointsAdvanced';

const roundTo5 = (num: number) => {
  return Math.round(num / 5) * 5;
};

export const calculatePointsAdvanced = (data: FormatedData) => {
  const {
    vrstaIgre,
    stRazlike,
    trula,
    zadnjiKralj,
    zadnjaPalcka,
    vsiKralji,
    zmagal,
    izgubljeniMond,
  } = data;
  let sumOfPoints = 0;

  if (data.igralec === '') throw new Error('Igralec mora biti izbran');

  switch (vrstaIgre) {
    case 'v1':
      sumOfPoints += 30;
      break;
    case 'v2':
      sumOfPoints += 20;
      break;
    case 'v3':
      sumOfPoints += 10;
      break;
    default:
      throw new Error('Something went wrong');
  }

  if (trula.napovedana) {
    sumOfPoints += 10;
  } else if (trula.type) {
    sumOfPoints += 20;
  }

  if (zadnjiKralj.napovedan) {
    sumOfPoints += 20;
  } else if (zadnjiKralj.type) {
    sumOfPoints += 10;
  }

  if (zadnjaPalcka.napovedana) {
    sumOfPoints += 25;
  } else if (zadnjaPalcka.type) {
    sumOfPoints += 50;
  }

  if (vsiKralji.type) {
    sumOfPoints += 10;
  }

  if (vsiKralji.noben) {
    sumOfPoints -= 10; //! ali je to pravilno?
  }
  //! vsi kralji napovedani????????

  sumOfPoints += stRazlike;
  sumOfPoints = roundTo5(sumOfPoints);

  let soigralecPoints = sumOfPoints;
  let igralecPoints = sumOfPoints;
  if (izgubljeniMond && zmagal) igralecPoints = sumOfPoints - 25;
  if (izgubljeniMond && !zmagal) igralecPoints = sumOfPoints + 25;

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
