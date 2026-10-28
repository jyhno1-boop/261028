import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../lib/firebase';

// 로그인 상태를 사이트 전체에서 함께 쓰기 위한 도구입니다.
// 사용 예: const { user, isAdmin, login, logout } = useAuth();

interface AuthState {
  user: User | null; // 로그인한 사용자 (로그인 전에는 null)
  isAdmin: boolean; // 관리자 여부 (Firestore admins 목록에 이메일이 있으면 true)
  ready: boolean; // 로그인 상태 확인이 끝났는지
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isAdmin: false,
  ready: false,
  login: async () => {},
  logout: async () => {},
});

/** 관리자 목록(admins/{이메일})에 있는지 확인합니다. (로그인할 때 읽기 1회) */
async function checkAdmin(user: User): Promise<boolean> {
  if (!db || !user.email) return false;
  try {
    const snap = await getDoc(doc(db, 'admins', user.email));
    return snap.exists();
  } catch (error) {
    console.error('[auth] 관리자 확인 실패', error);
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(!auth);

  // 로그인/로그아웃이 일어날 때마다 상태를 갱신합니다. (Firestore 읽기 아님)
  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setIsAdmin(nextUser ? await checkAdmin(nextUser) : false);
      setReady(true);
    });
  }, []);

  const login = useCallback(async () => {
    if (!auth) throw new Error('Firebase 설정이 없습니다.');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // 매번 계정 선택 화면 표시
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
  }, []);

  return <AuthContext.Provider value={{ user, isAdmin, ready, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
