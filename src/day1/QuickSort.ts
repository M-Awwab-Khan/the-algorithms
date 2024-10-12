function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let i = lo - 1;

  for (let j = lo; j < hi; ++j) {
    if (arr[j] <= pivot) {
      i++;
      const temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  arr[hi] = arr[i+1];
  arr[i+1] = pivot;
  return i+1;
}

function qs(arr: number[], lo: number, hi: number): void {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    qs(arr, lo, p-1);
    qs(arr, p+1, hi);
  }
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1); 
}
