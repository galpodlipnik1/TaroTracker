import { SubmitData } from '@/types/addPointsBeginner';

const formatData = (data: SubmitData) => {
  const formatedData = {
    igralec: data.igralec.value,
    soigralec: data.soigralec.value,
    vrstaIgre: data.vrstaIgre.value,
    zmagal: data.zmagal.value === 'Da' ? true : false,
    izgubljeniMond: data.izgubljeniMond.value === 'Da' ? true : false,
    mond: data.mond,
    palcka: data.palcka,
    skis: data.skis,
    stKraljev: Number(data.stKraljev),
    stDam: Number(data.stDam),
    stKavalov: Number(data.stKavalov),
    stPobov: Number(data.stPobov),
    stTarokov: Number(data.stTarokov),
    stPlatelcev: Number(data.stPlatelcev),
    trula:
      data.trula.value === 'Da'
        ? { type: true, napovedana: false }
        : data.trula.value === 'Napovedana'
        ? { type: true, napovedana: true }
        : { type: false, napovedana: false },
    zadnjiKralj:
      data.zadnjiKralj.value === 'Da'
        ? { type: true, napovedan: false }
        : data.zadnjiKralj.value === 'Napovedan'
        ? { type: true, napovedan: true }
        : { type: false, napovedan: false },
    zadnjaPalcka:
      data.zadnjaPalcka.value === 'Da'
        ? { type: true, napovedana: false }
        : data.zadnjaPalcka.value === 'Napovedana'
        ? { type: true, napovedana: true }
        : { type: false, napovedana: false },
    vsiKralji:
      data.vsiKralji.value === 'Da'
        ? { type: true, napovedani: false }
        : data.vsiKralji.value === 'Napovedani'
        ? { type: true, napovedani: true }
        : { type: false, napovedani: false },
  };

  return formatedData;
};

export const validateAddPointsBeginner = (data: SubmitData) => {
  const res = { isValid: true, error: '', formatedData: {} };
  if (data.igralec.value === data.soigralec.value) {
    res.isValid = false;
    res.error = 'Igralec in soigralec ne moreta biti enaka';
  }

  if (
    Number(data.stKraljev) +
      Number(data.stDam) +
      Number(data.stKavalov) +
      Number(data.stPobov) +
      Number(data.stTarokov) +
      Number(data.stPlatelcev) >
    70
  ) {
    res.isValid = false;
    res.error = 'Število razlike mora biti med 0 in 35';
  }

  const formatedData = formatData(data);

  res.formatedData = formatedData;

  return res;
};
