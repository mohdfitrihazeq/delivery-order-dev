export function formatCurrency(value: number | string): string {
    if (value === null || value === undefined || value === '') return '0.00';

    let num = Number(value);
    if (isNaN(num)) return '0.00';

    num = Math.round((num + Number.EPSILON) * 100) / 100;

    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export function formatNumber(value: number | string): string {
    if (value === null || value === undefined || value === '') return '-';

    const num = Number(value);
    return isNaN(num) ? '-' : num.toLocaleString();
}

export function formatPercent(value: number | string): string {
    if (value === null || value === undefined || value === '') return '-';

    const num = Number(value);
    return isNaN(num) ? '-' : num.toFixed(2) + '%';
}
