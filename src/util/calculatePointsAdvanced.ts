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
    sumOfPoints += 10;
  } else if (zadnjiKralj.type) {
    sumOfPoints += 20;
  }

  if (zadnjaPalcka.napovedana) {
    sumOfPoints += 25;
  } else if (zadnjaPalcka.type) {
    sumOfPoints += 50;
  }

  if (vsiKralji.type) {
    sumOfPoints += 10;
  }
  //! vsi kralji napovedani????????

  sumOfPoints += stRazlike;
  sumOfPoints = roundTo5(sumOfPoints);

  let soigralecPoints = sumOfPoints;
  let igralecPoints = sumOfPoints;
  if (izgubljeniMond) igralecPoints = sumOfPoints - 25;

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
