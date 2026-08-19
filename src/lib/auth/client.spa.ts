import { useSyncExternalStore } from "react";
import { GROK_PROVIDERS } from "./providers";

export { GROK_PROVIDERS };

export const authEnabled = true;

const USERS_KEY = "oncovigil.users.v1";
const SESSION_KEY = "oncovigil.session.v1";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredUser[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

function writeSession(user: SessionUser | null) {
  if (user) window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(SESSION_KEY);
  emit();
}

async function hashPassword(password: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function toSession(user: StoredUser): SessionUser {
  return { id: user.id, name: user.name, email: user.email, image: null };
}

export function getBearerToken(): string | null {
  return null;
}

export const authClient = {
  useSession() {
    const user = useSyncExternalStore(
      (cb) => {
        listeners.add(cb);
        return () => {
          listeners.delete(cb);
        };
      },
      readSession,
      () => null,
    );
    return {
      data: user ? { user } : null,
      isPending: false,
    };
  },
  async getSession() {
    const user = readSession();
    return { data: user ? { user } : null, error: null };
  },
  async signOut() {
    writeSession(null);
    return { data: null, error: null };
  },
  signIn: {
    async email({ email, password }: { email: string; password: string }) {
      const hashed = await hashPassword(password);
      const match = loadUsers().find((u) => u.email === email.trim().toLowerCase() && u.password === hashed);
      if (!match) return { data: null, error: { message: "Invalid email or password" } };
      writeSession(toSession(match));
      return { data: { user: toSession(match) }, error: null };
    },
  },
  signUp: {
    async email({ email, password, name }: { email: string; password: string; name: string }) {
      const normalized = email.trim().toLowerCase();
      const users = loadUsers();
      if (users.some((u) => u.email === normalized)) {
        return { data: null, error: { message: "That email is already registered" } };
      }
      const user: StoredUser = {
        id: crypto.randomUUID(),
        name: name.trim() || normalized.split("@")[0] || "OncoVigil",
        email: normalized,
        password: await hashPassword(password),
      };
      users.push(user);
      saveUsers(users);
      writeSession(toSession(user));
      return { data: { user: toSession(user) }, error: null };
    },
  },
};

export async function signIn(
  _providerId: string,
  _opts: { callbackURL?: string; errorCallbackURL?: string } = {},
): Promise<void> {
  throw new Error("Google and X sign-in are on the live OncoVigil app. Use email here.");
}

export async function signOut(redirectTo = "/"): Promise<void> {
  writeSession(null);
  const base = import.meta.env.BASE_URL || "/";
  const path = redirectTo.startsWith("/") ? redirectTo.slice(1) : redirectTo;
  window.location.href = `${base}${path}`;
}
