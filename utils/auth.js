'use server';

import { cookies } from 'next/headers';

export async function setToken(token) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  cookies().set('refresh-token', token, {
    httpOnly: !isDevelopment,
    secure: !isDevelopment,
    sameSite: isDevelopment ? 'none' : 'strict', // Gunakan 'none' untuk development
    expires: 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days8
  });
}

export async function getToken() {
  return cookies().get('refresh-token');
}

export async function clearToken() {
  cookies().delete('refresh-token');
}
