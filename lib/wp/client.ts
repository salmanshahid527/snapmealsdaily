/**
 * Server-side fetch wrapper for WordPress REST API
 * Uses ISR cache (revalidate: 60s)
 * Falls back to mock data if API is unavailable
 */

import { mockCategories, mockPosts } from "./mock-data";

export async function fetchWp<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not set - using mock data");
    return getMockData(path) as T;
  }

  try {
    const url = new URL(`${baseUrl}${path}`);

    // Add query parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 404) {
      return [] as unknown as T;
    }

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status}`, res.statusText);
      console.log(`Using mock data for ${path} due to API error`);
      return getMockData(path) as T;
    }

    return res.json();
  } catch (error) {
    console.error(`WordPress API fetch failed for ${path}:`, error);
    console.log(`Using mock data for ${path} due to fetch error`);
    return getMockData(path) as T;
  }
}

function getMockData(path: string): unknown {
  if (path.includes("categories")) {
    return mockCategories;
  }
  if (path.includes("posts")) {
    return mockPosts;
  }
  return [];
}

/**
 * Paginated fetch for WordPress endpoints
 * Returns data + total page count
 * Falls back to mock data if API is unavailable
 */
export async function fetchWpPaginated<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<{ data: T; totalPages: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not set - using mock data");
    const mockData = getMockData(path);
    return { data: mockData as T, totalPages: 1 };
  }

  try {
    const url = new URL(`${baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.log(`Using mock data for ${path} due to API error (status: ${res.status})`);
      const mockData = getMockData(path);
      return { data: mockData as T, totalPages: 1 };
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
    const data = await res.json();

    return { data, totalPages };
  } catch (error) {
    console.error(`WordPress API paginated fetch failed for ${path}:`, error);
    console.log(`Using mock data for ${path} due to fetch error`);
    const mockData = getMockData(path);
    return { data: mockData as T, totalPages: 1 };
  }
}

/**
 * Client-side fetch for React Query
 * No ISR cache, fresh data only
 * Falls back to mock data if API is unavailable
 */
export async function fetchWpClient<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not set - using mock data");
    return getMockData(path) as T;
  }

  try {
    const url = new URL(`${baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status}`);
      console.log(`Using mock data for ${path} due to API error`);
      return getMockData(path) as T;
    }

    return res.json();
  } catch (error) {
    console.error(`WordPress API client fetch failed for ${path}:`, error);
    console.log(`Using mock data for ${path} due to fetch error`);
    return getMockData(path) as T;
  }
}
