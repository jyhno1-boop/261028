// 연구실 기본 정보입니다. 연구실 이름·교수명·소개 문구는 이 파일만 고치면 사이트 전체에 반영됩니다.

export const siteInfo = {
  labName: '인간공학·안전공학 연구실',
  labNameEn: 'Human Factors & Safety Engineering Lab',
  /** 로고 자리에 표시되는 짧은 영문 약자 */
  labShortName: 'HFSE',
  university: '○○대학교 산업공학과',
  universityEn: 'Department of Industrial Engineering, ○○ University',
  professor: '○○○ 교수',
  email: 'professor@university.ac.kr',
  address: '○○시 ○○구 ○○로 00, 공학관 000호',
  intro:
    '사람이 더 안전하고 편리하게 일할 수 있는 시스템을 연구합니다. ' +
    '작업자의 신체적·인지적 특성을 측정하고 분석하여, 산업 현장의 사고를 예방하고 작업 환경을 개선하는 방법을 찾습니다.',
  /** 대학원생 모집 안내 (비워 두면 홈 화면에 표시되지 않습니다) */
  recruitment: '석사·박사 과정 대학원생과 학부 연구생을 모집합니다. 관심 있는 학생은 이메일로 연락 바랍니다.',
  researchAreas: [
    {
      name: '인지 인간공학',
      nameEn: 'Cognitive Ergonomics',
      description: '작업자의 주의, 작업 부하, 의사결정 과정을 분석하여 오류를 줄이는 인터페이스를 설계합니다.',
    },
    {
      name: '산업 안전',
      nameEn: 'Industrial Safety',
      description: '사고 데이터와 현장 관찰을 바탕으로 위험 요인을 찾아내고 예방 대책을 제시합니다.',
    },
    {
      name: '근골격계 인간공학',
      nameEn: 'Physical Ergonomics',
      description: '작업 자세와 동작을 측정하여 근골격계 질환 위험을 평가하고 작업 방식을 개선합니다.',
    },
  ],
};
