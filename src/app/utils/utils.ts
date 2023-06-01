/**
 * The function compares two values (numbers, strings, or dates) and returns a sorting order based on
 * whether they are ascending or descending.
 * @param {number | string | Date} a - The first parameter "a" can be a number, string or Date object.
 * @param {number | string | Date} b - The parameter "b" is a variable that can hold a value of type
 * number, string, or Date. It is used in the function to compare with the value of parameter "a" and
 * determine their order based on the "isAsc" parameter.
 * @param {boolean} isAsc - isAsc stands for "is ascending" and is a boolean value that determines
 * whether the comparison should be in ascending order (true) or descending order (false).
 * @returns a number (-1 or 1) multiplied by either 1 or -1, depending on the value of the `isAsc`
 * parameter. The number indicates the order in which the two values should be sorted. If `isAsc` is
 * true, the values will be sorted in ascending order, otherwise they will be sorted in descending
 * order.
 */
export function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  if (a instanceof Date && b instanceof Date) {
    const dateA = a.getTime();
    const dateB = b.getTime();
    return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
  } else {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}


/**
 * The function returns an array of values from an enumeration object.
 * @param {any} enumeration - The `enumeration` parameter is an object representing an enum in
 * TypeScript or a similar language. It contains key-value pairs where the keys are the names of the
 * enum values and the values are the corresponding numeric or string values assigned to those names.
 * @returns The `enumValues` function returns an array of all the values in the given enumeration
 * object. It does this by using `Object.keys` to get an array of all the keys in the object, and then
 * mapping over that array to return an array of the corresponding values.
 */
export function enumValues(enumeration: any) {
  return Object.keys(enumeration).map(key => enumeration[key]);
}