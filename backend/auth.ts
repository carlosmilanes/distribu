// auth.ts
import { db } from './database/connection';
import { users, sessions } from './database/schema';
import { eq } from 'drizzle-orm';
import { randomBytes, pbkdf2Sync } from 'crypto';

// Hash password with salt
function hashPassword(password: string, salt: string): string {
  return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Create a new user
export async function registerUser(username: string, password: string) {
  const salt = randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  return db
    .insert(users)
    .values({
      username,
      passwordHash,
      salt,
    })
    .returning({ id: users.id });
}

// Login and create session
export async function loginUser(username: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) return null;

  const passwordHash = hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) return null;

  const sessionId = randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  });

  return { sessionId, userId: user.id };
}

// Verify session
export async function verifySession(sessionId: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!session) return null;
  if (new Date() > session.expiresAt) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return null;
  }

  return session.userId;
}
