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