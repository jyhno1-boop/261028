// Firebase 연결 설정 파일입니다.
// 값은 .env.local(내 컴퓨터) 또는 Netlify 환경변수에서 읽어 옵니다. (.env.example 참고)
//
// ※ 이 값들은 웹사이트 코드에 그대로 포함되며, 비밀번호가 아닙니다.
//   데이터 보호는 Firestore 보안 규칙(firestore.rules)이 담당합니다.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** 필수 설정값이 모두 채워졌는지 여부. false면 사이트는 샘플 데이터로 동작합니다. */
export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId,
);

// 설정값이 있을 때만 Firebase를 시작합니다.
const app: FirebaseApp | null = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

/** 로그인 기능 (설정 전에는 null) */
export const auth: Auth | null = app ? getAuth(app) : null;

/** Firestore 데이터베이스 (설정 전에는 null) */
export const db: Firestore | null = app ? getFirestore(app) : null;
