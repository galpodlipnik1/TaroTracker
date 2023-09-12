export interface SubmitData {
  igralec: { value: string; label: string };
  soigralec: { value: string; label: string };
  vrstaIgre: { value: string; label: string };
  stRazlike: string;
  vsiKralji: { value: string; label: string };
  zadnjaPalcka: { value: string; label: string };
  trula: { value: string; label: string };
  zadnjiKralj: { value: string; label: string };
  zmagal: { value: string; label: string };
  izgubljeniMond: { value: string; label: string };
}

export interface FormatedData {
  igralec: string;
  soigralec: string;
  vrstaIgre: string;
  stRazlike: number;
  zmagal: boolean;
  izgubljeniMond: boolean;
  vsiKralji: { type: boolean; napovedani: boolean };
  zadnjaPalcka: { type: boolean; napovedana: boolean };
  trula: { type: boolean; napovedana: boolean };
  zadnjiKralj: { type: boolean; napovedan: boolean };
}

export interface PointsData {
  igralec: { name: string; points: number };
  soigralec: { name: string; points: number };
}
