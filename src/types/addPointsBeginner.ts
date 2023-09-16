export interface FormatedData {
  igralec: string;
  soigralec: string;
  vrstaIgre: string;
  zmagal: boolean;
  izgubljeniMond: boolean;
  mond: boolean;
  palcka: boolean;
  skis: boolean;
  stKraljev: number;
  stDam: number;
  stKavalov: number;
  stPobov: number;
  stTarokov: number;
  stPlatelcev: number;
  vsiKralji: { type: boolean; napovedani: boolean, noben: boolean };
  zadnjaPalcka: { type: boolean; napovedana: boolean };
  trula: { type: boolean; napovedana: boolean };
  zadnjiKralj: { type: boolean; napovedan: boolean };
}

export interface SubmitData {
  igralec: { value: string; label: string };
  soigralec: { value: string; label: string };
  vrstaIgre: { value: string; label: string };
  mond: boolean;
  palcka: boolean;
  skis: boolean;
  stKraljev: string;
  stDam: string;
  stKavalov: string;
  stPobov: string;
  stTarokov: string;
  stPlatelcev: string;
  vsiKralji: { value: string; label: string };
  zadnjaPalcka: { value: string; label: string };
  trula: { value: string; label: string };
  zadnjiKralj: { value: string; label: string };
  zmagal: { value: string; label: string };
  izgubljeniMond: { value: string; label: string };
}
