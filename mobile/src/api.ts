export const SERVER = 'http://10.55.176.39:8000';

let token: string | null = null;

export function setToken(value: string) {
  token = value;
}

export function getToken() {
  return token;
}

export async function api(
  method: 'GET' | 'POST',
  path: string,
  body?: Record<string, string>,
) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${SERVER}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

export function errorText(data: { detail?: unknown }, fallback: string) {
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map((item: { msg?: string }) => item.msg).filter(Boolean).join(' ');
  }
  return fallback;
}
