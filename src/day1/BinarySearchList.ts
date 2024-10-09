export default function bs_list(haystack: number[], needle: number): boolean {
    let lo: number = 0;
    let hi: number = haystack.length - 1;

    while (lo <= hi) {
        let mid: number = Math.floor((lo + hi) / 2);

        if (haystack[mid] == needle) {
            return true;
        } else if (needle < haystack[mid]) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    return false;
}
