import { FormatedData } from "@/types/addPointsBeginner";

export const transformData = (data: FormatedData) => {
  const transformData = []
  
  if(data.mond)
    transformData.push('m');
  if(data.palcka)
    transformData.push('p');
  if(data.skis)
    transformData.push('s');
  
  for(let i = 0; i < data.stKraljev; i++)
    transformData.push('k');
  for(let i = 0; i < data.stDam; i++)
    transformData.push('d');
  for(let i = 0; i < data.stKavalov; i++)
    transformData.push('kv');
  for(let i = 0; i < data.stPobov; i++)
    transformData.push('p');
  for(let i = 0; i < data.stTarokov; i++)
    transformData.push('t');
  for(let i = 0; i < data.stPlatelcev; i++)
    transformData.push('pl');
  
  return transformData;
};