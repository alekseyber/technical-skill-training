import jwt_decode from 'jwt-decode';

export function getJWTDecode<T>(token: string | undefined): T | null {
  try {
    if (!token) return null;
    return jwt_decode<T>(token) || null;
  } catch (e) {
    return null;
  }
}
