export function formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';

    const d = new Date(date);
    if (isNaN(d.getTime()) || d.getFullYear() === 1970) return 'N/A';

    return d.toLocaleDateString('en-GB'); // format: DD/MM/YYYY
}

export function formatDateTime(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';

    const d = new Date(date);
    if (isNaN(d.getTime()) || d.getFullYear() === 1970) return 'N/A';

    return d.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }); // format: DD/MM/YYYY, hh:mm AM/PM
}

export function formatDateToAPI(date: string | Date | null | undefined): string {
    if (!date) return new Date().toISOString().split('T')[0];
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
}
