export const suffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

  