import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function verifyAuth(req: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch (error) {
    return null
  }
}

