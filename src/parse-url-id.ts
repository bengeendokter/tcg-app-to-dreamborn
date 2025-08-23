export function parseUrlId(url: string): string {
    if (!URL.canParse(url)) {
        throw Error(`${url} is not a valid URL`);
    }

    const backupUrl: URL = new URL(url);
    const searchParams: URLSearchParams = backupUrl.searchParams;
    if (!searchParams.has('id')) {
        throw Error(`URL ${url} does not contain a valid id parameter`);
    }

    const id: string | null = searchParams.get("id");
    if (id === null || id.length === 0) {
        throw Error(`URL ${url} does not contain a valid id parameter`);
    }

    return id;
}
