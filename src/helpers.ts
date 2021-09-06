/**
 * Returns the number rounded to the nearest interval.
 * Example:
 *
 *   roundToNearest(1000.5, 1); // 1000
 *   roundToNearest(1000.5, 0.5);  // 1000.5
 *
 * @param {number} value    The number to round
 * @param {number} interval The numeric interval to round to
 * @return {number}
 */
export const roundToNearest = (value: number, interval:number) => {
  return Math.floor(value / interval) * interval;
};

/**
 * Groups price levels by their price
 * Example:
 *
 *  groupByPrice([ [1000, 100], [1000, 200], [993, 20] ]) // [ [ 1000, 300 ], [ 993, 20 ] ]
 *
 * @param levels
 */
export const groupByPrice = (levels: number[][]): number[][] => {
  return levels.map((level, idx) => {
    const nextLevel = levels[idx + 1];
    const prevLevel = levels[idx - 1];

    if(nextLevel && level[0] === nextLevel[0]) {
      return [level[0], level[1] + nextLevel[1]]
    } else if(prevLevel && level[0] === prevLevel[0]) {
      return [];
    } else {
      return level;
    }
  }).filter(level => level.length > 0);
};

/**
 * Group price levels by given ticket size. Uses groupByPrice() and roundToNearest()
 * Example:
 *
 * groupByTicketSize([ [1000.5, 100], [1000, 200], [993, 20] ], 1) // [[1000, 300], [993, 20]]
 *
 * @param levels
 * @param ticketSize
 */
export const groupByTicketSize = (levels: number[][], ticketSize: number): number[][] => {
  return groupByPrice(levels.map(level => [roundToNearest(level[0], ticketSize), level[1]]));
};

export const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat('en-US').format(arg);
};
