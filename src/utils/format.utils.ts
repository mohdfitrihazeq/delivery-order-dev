export function formatCurrency(value: number | string): string {
    if (value === null || value === undefined || value === '') return '0.00';

    const num = Number(value);
    if (isNaN(num)) return '0.00';

    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
