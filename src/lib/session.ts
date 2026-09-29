import { useEffect, useState } from "react";

export type DemoSession = {
  employeeId: string;
  role: string;
  name: string;
};

const KEY = "chartermind.session";

export function signIn(session: DemoSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("chartermind-session"));
}

export function signOut() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("chartermind-session"));
}

export function readSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function useSession() {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    setReady(true);
    window.addEventListener("chartermind-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("chartermind-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
