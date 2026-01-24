// Use the env var. If it's missing, fallback to "/api" (proxy)
const ENV_URL = import.meta.env.BACKEND_SERVER_URL; // e.g., "http://localhost:3000"
const BASE_URL = ENV_URL ? `${ENV_URL}/api` : "/api";

export const api = {
  post: async (endpoint: string, data: any, token?: string | null) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Ensure endpoint has leading slash
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const text = await response.text();
    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Failed to parse API response:", text);
      result = {
        error: `Server Error: ${response.status} ${response.statusText}`,
      };
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || "Something went wrong");
    }

    return result;
  },

  get: async (endpoint: string, token?: string | null) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      method: "GET",
      headers,
    });

    const text = await response.text();
    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Failed to parse API response:", text);
      result = {
        error: `Server Error: ${response.status} ${response.statusText}`,
      };
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || "Something went wrong");
    }

    return result;
  },

  put: async (endpoint: string, data: any, token?: string | null) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    const text = await response.text();
    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Failed to parse API response:", text);
      result = {
        error: `Server Error: ${response.status} ${response.statusText}`,
      };
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || "Something went wrong");
    }

    return result;
  },

  delete: async (endpoint: string, token?: string | null) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    const response = await fetch(`${BASE_URL}${normalizedEndpoint}`, {
      method: "DELETE",
      headers,
    });

    // DELETE might return 204 No Content
    if (response.status === 204) {
      return {};
    }

    const text = await response.text();
    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Failed to parse API response:", text);
      result = {
        error: `Server Error: ${response.status} ${response.statusText}`,
      };
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || "Something went wrong");
    }

    return result;
  },
};
