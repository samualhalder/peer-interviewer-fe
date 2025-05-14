export const createRoom = (id1: string, id2: string): string => {
  const arr = [id1, id2];
  arr.sort();
  const newArr = ["room", ...arr];
  const id: string = newArr.join("-");

  return id;
};
