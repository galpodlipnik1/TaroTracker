
import { SubmitData } from '@/types/addPointsAdvanced';

const formatData = (data:SubmitData) => {
  const formatedData = {
    igralec: data.igralec.value,
    soigralec: data.soigralec.value,
    vrstaIgre: data.vrstaIgre.value,
    stRazlike: Number(data.stRazlike),
    trula: data.trula.value === 'Da' ? {type: true, napovedana: false} : data.trula.value === 'Napovedana' ? {type: true, napovedana: true} : {type: false, napovedana: false},
    zadnjiKralj: data.zadnjiKralj.value === 'Da' ? {type: true, napovedan: false} : data.zadnjiKralj.value === 'Napovedan' ? {type: true, napovedan: true} : {type: false, napovedan: false},
    zadnjaPalcka: data.zadnjaPalcka.value === 'Da' ? {type: true, napovedana: false} : data.zadnjaPalcka.value === 'Napovedana' ? {type: true, napovedana: true} : {type: false, napovedana: false},
    vsiKralji: data.vsiKralji.value === 'Da' ? {type: true, napovedani: false} : data.vsiKralji.value === 'Napovedani' ? {type: true, napovedani: true} : {type: false, napovedani: false},
  }

  return formatedData;
};


export const validateAddPointsAdvanced = (data:SubmitData) => {
  const res = { isValid: true, error: '', formatedData: {} };
  if(data.igralec.value === data.soigralec.value) {
    res.isValid = false;
    res.error = 'Igralec in soigralec ne moreta biti enaka';
  }

  if(Number(data.stRazlike) < 0  || Number(data.stRazlike) > 35) {
    res.isValid = false;
    res.error = 'Število razlike mora biti med 0 in 35';
  }

  const formatedData = formatData(data);

  res.formatedData = formatedData;

  return res;
}