export function getCookie(key: string): string | null {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split('=');
        if (cookieKey === key) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}

export function currencyFormat(amount: number) {
    return `£${(amount / 100).toFixed(2)}`
}