const API_URL = 'http://localhost:4000'; // kamu bisa ganti pakai process.env.NEXT_PUBLIC_API_URL juga

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    return null;
  }

  return await res.json(); // { id, username }
}
