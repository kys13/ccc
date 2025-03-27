export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = input.toString().startsWith('http') ? input : `${baseUrl}${input}`;

  const headers = new Headers(init?.headers);
  
  const response = await fetch(url, {
    ...init,
    headers,
    credentials: 'include',
  });

  return response;
} 