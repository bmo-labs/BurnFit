# BurnFit 과제 - 김동우

## 과제 요구 사항
- [x] 탭바 네비게이터 생성 및 스크린 연결
- [x] 커스텀 캘린더 구현
- [x] 이전 / 다음 월 전환 기능  
- [x] 특정 날짜 선택 기능  
- [x] 월 ↔ 주 전환 애니메이션 구현  

<br>

## 주요 기능 시연
바텀 탭바|월 페이지 전환|날짜 선택|월<->주 전환|
|:---:|:---:|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/4ff8c0a6-9e60-4b05-bc48-72be19392886" width="200">|<img src="https://github.com/user-attachments/assets/6459547c-af4c-4a77-a692-04e629e5eeb0" width="200">|<img src="https://github.com/user-attachments/assets/248f7a8c-e2da-48a0-a450-fc980aa9502f" width="200">|<img src="https://github.com/user-attachments/assets/52d784e3-8f64-487f-8575-f0d2cdfb6abc" width="200">

<br>

## 구현 개요
#### 1.	전체 아키텍처
- 화면/컴포넌트 구조: CalendarScreen → CalendarPagerView → CalendarPageAnimatedView → (Month/WeekView)
- 로직 분리: UI(components) ↔ 상태/데이터(hooks) ↔ 유틸(utils)

#### 2. 상태 관리 & 데이터 흐름
- useCalendarState가 단일 소스(앵커/선택일/모드/페이지) 관리
- renderPages에서 Month/Week 모드별 페이지 데이터 사전 계산
- selectedDate 변화 → renderPages 재계산 → 뷰에 주입(월: 42칸, 주: 7칸)

#### 3.	페이지네이션 전략
- 항상 3페이지(prev/center/next)만 유지 → 스크롤 끝에서 앵커 갱신 → 리스트 재센터
- 월 모드: 이전/다음 월 로딩, 주 모드: 이전/다음 주 로딩

#### 4.	애니메이션 설계
- modeProgress: 0(월) → 1(주) 단일 축
- 컨테이너 높이: interpolate(modeProgress, [0,1], [cell*rows, cell])
- 월 → 주: 월 그리드 translateY로 선택 주를 상단 정렬 + opacity 페이드
- 주 → 월: 반대로 확장, 오버레이 순서/포인터 이벤트 전환으로 깜빡임 방지
- 전환 완료 시점에만 switchMode(anchor) 호출

<br> 

## 기술 스택

### Core
- **React Native 0.82**

### Animation & Gesture
- **React Native Reanimated v4.1.3**
- **React Native Gesture Handler v2.28**

### UI & Navigation
- **React Navigation (Bottom Tabs, Native Stack)**
- **React Native Vector Icons**

### Development Tools
- **TypeScript 5.8**

<br>

## 디렉토리 구조

```
📦 src
├── 📁 assets               # 이미지, 아이콘, 폰트 등 정적 리소스(내부 소스 없음)
├── 📁 features             # 기능 단위별 모듈
│   ├── 📁 calendar         # 캘린더 기능 (주요 구현)
│   │   ├── 📁 components   # 캘린더 UI 컴포넌트
│   │   ├── 📁 hooks        # 상태 및 로직 처리 훅
│   │   ├── 📁 screens      # 캘린더 화면
│   │   ├── 📁 utils        # 날짜 계산 관련 유틸 함수
│   │   └── types.ts        # 캘린더 전용 타입 정의
│   │
│   ├── 📁 home             # 홈 탭 화면
│   ├── 📁 library          # 라이브러리 화면
│   ├── 📁 mypage           # 마이페이지 화면
│   │
│   └── 📁 navigation       # 탭 네비게이션 및 스택 구조
│
└── App.tsx                 # 앱 진입점
```

<br>

## 설치 및 실행 방법

1. **레포지토리 클론**
   
```bash
git clone https://github.com/yourname/BurnFit.git
cd BurnFit
```

2. 패키지 설치
   
```bash
yarn install
```

3. 시뮬레이터 빌드

```bash
cd ios && pod install && cd ..
yarn ios
yarn android
```

4. 개발 서버 실행

```bash
yarn start
```

<br>

## 마무리

React Native는 아직 익숙하지 않은 환경이었지만,

iOS 개발자로서의 구조적 사고와 UI 디테일 설계 경험을 바탕으로  

캘린더 전환, 애니메이션, 상태 관리를 구현했습니다.  

부족한 부분은 앞으로도 지속적으로 학습하며 개선해 나가겠습니다.

긍정적으로 검토해주시면 감사하겠습니다.



