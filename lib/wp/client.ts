/** Lazy so importing this module never throws during chunk evaluation. */
function getApiBase(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!apiUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set — expected e.g. https://api.snapmealsdaily.com/wp-json"
    );
  }
  return `${apiUrl}/wp/v2`;
}

export async function fetchWp<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = new URL(`${getApiBase()}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    if (res.status === 404) return [] as unknown as T;
    throw new Error(`WP API error ${res.status}: ${url.toString()}`);
  }

  return res.json() as Promise<T>;
}

export type WpPaginatedResult<T> = {
  data: T;
  totalPages: number;
  total: number;
};

/** Fetch with WP pagination headers — used for sitemap and blog listing */
export async function fetchWpPaginated<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<WpPaginatedResult<T>> {
  const url = new URL(`${getApiBase()}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    if (res.status === 404)
      return { data: [] as unknown as T, totalPages: 0, total: 0 };
    throw new Error(`WP API error ${res.status}: ${url.toString()}`);
  }

  const total = Number.parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPagesRaw = Number.parseInt(
    res.headers.get("X-WP-TotalPages") ?? "0",
    10
  );
  const totalPages = Number.isFinite(totalPagesRaw)
    ? Math.max(0, totalPagesRaw)
    : 0;
  const data = (await res.json()) as T;
  return {
    data,
    totalPages,
    total: Number.isFinite(total) ? total : 0,
  };
}

/** Client-side only fetch (no ISR cache) — used inside React Query queryFn */
export async function fetchWpClient<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = new URL(`${getApiBase()}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    if (res.status === 404) return [] as unknown as T;
    throw new Error(`WP API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/** Client-side paginated fetch — used inside React Query for blog listing */
export async function fetchWpClientPaginated<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<WpPaginatedResult<T>> {
  const url = new URL(`${getApiBase()}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    if (res.status === 404)
      return { data: [] as unknown as T, totalPages: 0, total: 0 };
    throw new Error(`WP API error ${res.status}`);
  }

  const total = Number.parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPagesRaw = Number.parseInt(
    res.headers.get("X-WP-TotalPages") ?? "0",
    10
  );
  const totalPages = Number.isFinite(totalPagesRaw)
    ? Math.max(0, totalPagesRaw)
    : 0;
  const data = (await res.json()) as T;
  return {
    data,
    totalPages,
    total: Number.isFinite(total) ? total : 0,
  };
}
