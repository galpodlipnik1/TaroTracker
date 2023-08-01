import { pointsMap } from '@/data/pointsSheet';

const formatData = (data) => {};

const sortByPoints = (arr) => {
  const sortedArr = arr.sort((a, b) => {
    const aPoints = pointsMap.get(a);
    const bPoints = pointsMap.get(b);

    if (aPoints === null) return 1;
    if (bPoints === null) return -1;

    return bPoints - aPoints;
  });

  return sortedArr;
};

const roundto5 = (num: number) => {
  return Math.ceil(num / 5) * 5;
};

const getNumberOfPoints = (test) => {
  let sum = 0;
  const sortedTest = sortByPoints(test);
  const length = sortedTest.length;
  for (let i = 0; i < length; i += 3) {
    const firstPoint = pointsMap.get(sortedTest[i]);
    const secondPoint = pointsMap.get(sortedTest[i + 1]);
    const thirdPoint = pointsMap.get(sortedTest[i + 2]);
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

  const roundedSum = roundto5(sum);

  return roundedSum;
};
