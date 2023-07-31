import { FormatedData } from '@/types/addPointsAdvanced';

export const calculatePointsAdvanced = (data: FormatedData) => {
  const { vrstaIgre, stRazlike, trula, zadnjiKralj, zadnjaPalcka, vsiKralji } = data;
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

  if(trula.type) {
    sumOfPoints += 10;
  } else if (trula.napovedana) {
    sumOfPoints += 20;
  }

  
};