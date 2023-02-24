/**
 * Function to generate a random string
 *
 * @param length Defines the length of the string.
 * @param number Define if the string should include numbers too.
 */
export const rndString = (length: number, number?: boolean) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = number ? "0123456789" : "";
  const string = characters + numbers;
  let counter = 0;
  while (counter < length) {
    result += string.charAt(Math.floor(Math.random() * string.length));
    counter += 1;
  }
  return result;
};
