const SESSION_KEY = 'levillepet_admin_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

interface AdminSession {
  token: string;
  timestamp: number;
  expires: number;
}

export function createAdminSession(): void {
  const session: AdminSession = {
    token: btoa(Date.now().toString()),
    timestamp: Date.now(),
    expires: Date.now() + SESSION_DURATION,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function checkAdminSession(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session: AdminSession = JSON.parse(raw);
    if (Date.now() > session.expires) {
      destroyAdminSession();
      return false;
    }
    // Renew session on each check
    session.expires = Date.now() + SESSION_DURATION;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    destroyAdminSession();
    return false;
  }
}

export function destroyAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSessionAge(): number {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return 0;
    const session: AdminSession = JSON.parse(raw);
    return Date.now() - session.timestamp;
  } catch {
    return 0;
  }
}
