export function saveDataToLocalStorage(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
}

export function fetchDataFromLocalStorage<T>(key: string): T | undefined {
    const data = localStorage.getItem(key);
    if (!data) return undefined;
    try {
        return JSON.parse(data) as T;
    } catch (e) {
        console.error(
            'Failed to parse localStorage data:',
            e instanceof Error ? e.message : 'Unknown error'
        );
        return undefined;
    }
}
