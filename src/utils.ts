// function to shuffle the elements of an array randomly
export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
