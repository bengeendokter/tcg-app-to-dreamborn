export async function fetchJson(url: string): Promise<object> {

    const response: Response = await fetch(url);

    if (!response.ok) {
        throw Error(`Failed to fetch data from ${url}`);
    }

    const result: unknown = await response.json();
    if (typeof result !== 'object' || result === null) {
        throw Error(`Fetched data from ${url} is not an object`);
    }

    return result;
}