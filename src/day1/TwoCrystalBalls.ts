export default function two_crystal_balls(breaks: boolean[]): number {
    let jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jumpAmount;

    for (; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    i -= jumpAmount;
    let j = i + jumpAmount;

    for (; i <= j && i < breaks.length; i++) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
