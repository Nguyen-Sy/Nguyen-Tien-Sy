const sumToNV1 = (n: number) => {
  return (n * (n + 1)) / 2;
};

const sumToNV2 = (n: number) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sumToNV3 = (n: number) => {
  if (n === 1) return 1;
  return n + sumToNV3(n - 1);
};