// Phase 1에서 사용하는 샘플(예시) 데이터입니다.
// Phase 2에서는 이 내용이 Firestore 데이터베이스로 옮겨지고, 이 파일은 더 이상 사용하지 않습니다.
// ※ 아래 이름·링크는 모두 예시입니다.

import type { Comment, CourseMaterial, Publication, Research } from '../types';

export const sampleResearch: Research[] = [
  {
    id: 'r1',
    title: '스마트 공장 작업자의 인지 부하 측정 및 경고 인터페이스 설계',
    summary: '자동화 설비를 감시하는 작업자의 인지 부하를 측정하고, 상황에 맞는 경고 화면을 설계합니다.',
    description:
      '스마트 공장에서는 작업자가 여러 대의 설비를 동시에 감시해야 하므로 주의가 분산되기 쉽습니다. ' +
      '본 연구는 시선 추적과 NASA-TLX 설문을 활용해 작업 상황별 인지 부하를 측정하고, ' +
      '부하가 높을 때 중요한 경고만 강조해 보여주는 적응형 경고 인터페이스를 설계·평가합니다.',
    tags: ['인지 인간공학', '인터페이스 설계', '스마트 공장'],
    status: 'ongoing',
    members: ['○○○ 교수', '김연구 (박사과정)', '이분석 (석사과정)'],
    links: [
      { label: '연구 계획서 (Google Drive)', url: 'https://drive.google.com/' },
      { label: '중간 발표 자료', url: 'https://drive.google.com/' },
    ],
    createdAt: '2026-09-15',
  },
  {
    id: 'r2',
    title: '건설 현장 추락 사고 데이터 기반 위험 요인 분석',
    summary: '최근 10년간 건설 현장 추락 사고 통계를 분석하여 주요 위험 요인과 예방 대책을 도출합니다.',
    description:
      '공개된 산업재해 통계 자료를 활용하여 건설 현장 추락 사고의 발생 패턴을 분석합니다. ' +
      '작업 종류, 작업 높이, 안전 장비 착용 여부 등의 요인별 위험도를 비교하고, ' +
      '현장 관리자가 활용할 수 있는 위험성 평가 체크리스트를 제안합니다.',
    tags: ['산업 안전', '사고 분석', '건설 안전'],
    status: 'ongoing',
    members: ['○○○ 교수', '박안전 (석사과정)'],
    links: [{ label: '분석 결과 요약 (Google Drive)', url: 'https://drive.google.com/' }],
    createdAt: '2026-08-20',
  },
  {
    id: 'r3',
    title: '물류센터 반복 작업의 근골격계 부담 평가',
    summary: '물류센터 피킹 작업자의 작업 자세를 평가하고, 부담을 줄이는 작업대 높이를 제안했습니다.',
    description:
      '물류센터에서 상자를 반복해서 들고 옮기는 작업자의 자세를 RULA, REBA 기법으로 평가했습니다. ' +
      '평가 결과를 바탕으로 작업대 높이와 상자 배치를 바꾸었을 때 근골격계 부담이 얼마나 줄어드는지 비교하였으며, ' +
      '결과는 국내 학술대회에서 발표되었습니다.',
    tags: ['근골격계 인간공학', '작업 자세 평가', '물류'],
    status: 'completed',
    members: ['○○○ 교수', '최자세 (석사 졸업)'],
    links: [{ label: '최종 보고서 (Google Drive)', url: 'https://drive.google.com/' }],
    createdAt: '2026-03-10',
  },
];

export const sampleCourses: CourseMaterial[] = [
  {
    id: 'c1',
    courseName: '인간공학',
    semester: '2026-2학기',
    title: '1주차: 인간공학 개론',
    description: '인간공학의 정의와 역사, 산업공학에서 인간공학이 필요한 이유를 소개합니다.',
    links: [{ label: '강의 슬라이드 (PDF)', url: 'https://drive.google.com/' }],
    createdAt: '2026-09-02',
  },
  {
    id: 'c2',
    courseName: '인간공학',
    semester: '2026-2학기',
    title: '5주차: 인체 측정과 작업 공간 설계',
    description: '인체 측정 자료를 활용해 작업대와 의자 높이를 설계하는 방법을 실습합니다.',
    links: [
      { label: '강의 슬라이드 (PDF)', url: 'https://drive.google.com/' },
      { label: '실습 데이터 (Excel)', url: 'https://drive.google.com/' },
    ],
    createdAt: '2026-09-30',
  },
  {
    id: 'c3',
    courseName: '산업안전공학',
    semester: '2026-2학기',
    title: '3주차: 위험성 평가 기법',
    description: '체크리스트, FMEA, FTA 등 대표적인 위험성 평가 기법을 비교합니다.',
    links: [{ label: '강의 슬라이드 (PPT)', url: 'https://drive.google.com/' }],
    createdAt: '2026-09-16',
  },
  {
    id: 'c4',
    courseName: '산업안전공학',
    semester: '2026-1학기',
    title: '기말 프로젝트 안내',
    description: '실제 작업장을 선정하여 위험성 평가 보고서를 작성하는 팀 프로젝트 안내 자료입니다.',
    links: [{ label: '프로젝트 안내문 (PDF)', url: 'https://drive.google.com/' }],
    createdAt: '2026-05-20',
  },
];

export const samplePublications: Publication[] = [
  {
    id: 'p1',
    title: '(예시) 물류센터 피킹 작업의 근골격계 부담 평가 및 작업대 개선 효과',
    authors: ['최자세', '○○○'],
    venue: '(예시) 대한인간공학회 추계학술대회',
    year: 2026,
    type: 'conference',
    link: 'https://drive.google.com/',
    createdAt: '2026-05-30',
  },
  {
    id: 'p2',
    title: '(예시) 적응형 경고 인터페이스가 다중 설비 감시 작업자의 반응 시간에 미치는 영향',
    authors: ['김연구', '이분석', '○○○'],
    venue: '(예시) 대한산업공학회지',
    year: 2025,
    type: 'journal',
    createdAt: '2025-11-12',
  },
  {
    id: 'p3',
    title: '(예시) 산업 현장 안전 문화 진단 도구 개발',
    authors: ['○○○'],
    venue: '(예시) 한국안전학회 초청 강연',
    year: 2025,
    type: 'presentation',
    createdAt: '2025-06-01',
  },
];

export const sampleComments: Comment[] = [
  {
    id: 'm1',
    researchId: 'r1',
    authorName: '김연구',
    content: '시선 추적 장비 보정(캘리브레이션) 절차를 정리해서 공유 드라이브에 올려두었습니다.',
    createdAt: '2026-10-20T14:30:00',
  },
  {
    id: 'm2',
    researchId: 'r1',
    authorName: '이분석',
    content: 'NASA-TLX 가중치 계산은 원래 방식과 간이 방식(Raw TLX) 중 어떤 것을 쓸지 다음 미팅에서 정하면 좋겠습니다.',
    createdAt: '2026-10-21T09:10:00',
  },
  {
    id: 'm3',
    researchId: 'r2',
    authorName: '박안전',
    content: '2019년 이전 자료는 분류 기준이 달라서 따로 전처리가 필요합니다.',
    createdAt: '2026-10-18T16:45:00',
  },
];
