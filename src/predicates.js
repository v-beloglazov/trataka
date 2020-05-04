import range from "lodash/range";

const ordersForKrishna = [1, 3, 4, 5];
export function isKrishnaOrder(ind) {
    return ordersForKrishna.includes(ind);
}
const ordersForRama = [9, 11, 12, 13];
export function isRamaOrder(ind) {
    return ordersForRama.includes(ind);
}
const ends = range(1, 16, 2);
export function isStrEnd(ind) {
    return ends.includes(ind);
}
export function isMantraEnd(wordNum) {
    return wordNum % 16 === 0;
}