import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  userId?: string;
  role?: string;
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-jwt-key-for-admin-authentication') as DecodedToken;
    return {
      ...decoded,
      isAdmin: decoded.role === 'ADMIN'
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
} 