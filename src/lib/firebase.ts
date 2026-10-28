// Firebase 연결 설정 파일입니다.
// 아래 defaultConfig 값을 기본으로 사용합니다.
// 다른 Firebase 프로젝트로 바꾸고 싶을 때만 .env.local 또는 Netlify 환경변수(.env.example 참고)로 덮어씁니다.
//
// ※ 이 값들은 웹사이트 코드에 그대로 포함되며, 비밀번호가 아닙니다.
//   데이터 보호는 Firestore 보안 규칙(firestore.rules)이 담당합니다.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore/lite';

// 연구실 Firebase 프로젝트 설정 (Firebase 콘솔 > 프로젝트 설정 > 내 앱에서 확인 가능)
const defaultConfig = {
  apiKey: 'AIzaSyAb7VniSBkwT1Vb-974gQr0TeXGaRgBpng',
  authDomain: 'project-8019444722717461098.firebaseapp.com',
  projectId: 'project-8019444722717461098',
  storageBucket: 'project-8019444722717461098.firebasestorage.app',
  messagingSenderId: '642714793361',
  appId: '1:642714793361:web:daeafc69c0d267c4305630',
};

// 환경변수가 있으면 그 값을, 없으면 위 기본값을 사용합니다.
const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || defaultConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || defaultConfig.appId,
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
