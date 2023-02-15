export function toPercentString(num) {
    if (Math.abs(num) >= 0 && Math.abs(num) <= 1) num = Math.round(num * 100);
    return `${num}%`;
}