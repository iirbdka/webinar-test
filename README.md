# Asset Management SaaS

자산 관리 SaaS 애플리케이션

## 기술 스택

- **Next.js 16** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Supabase** - 백엔드 및 인증
- **Tailwind CSS** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증

## 주요 기능

- ✅ 사용자 인증 (이메일/비밀번호)
- ✅ 회사별 데이터 분리 (RLS)
- ✅ 자산 관리 (유형/무형 자산)
- ✅ 티켓 관리
- ✅ 대시보드 및 통계
- ✅ 조직 관리

## 시작하기

### 필수 요구사항

- Node.js 18+ 
- pnpm (또는 npm/yarn)

### 설치

```bash
# 의존성 설치
pnpm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

`.env.example` 파일을 참고하세요.

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── assets/            # 자산 관리 페이지
│   ├── tickets/           # 티켓 관리 페이지
│   └── admin/             # 관리자 페이지
├── components/            # React 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   ├── assets/            # 자산 관련 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── lib/                   # 유틸리티 및 API
│   ├── api/               # Supabase API 함수
│   ├── schemas/           # Zod 스키마
│   └── supabase/          # Supabase 클라이언트
└── middleware.ts          # Next.js 미들웨어 (인증)

```

## 데이터베이스

이 프로젝트는 Supabase를 사용합니다. 데이터베이스 스키마는 Supabase MCP를 통해 관리됩니다.

### 주요 테이블

- `users` - 사용자 정보
- `companies` - 회사 정보
- `assets` - 자산 정보
- `tickets` - 티켓 정보
- `categories` - 카테고리
- `org_units` - 조직 단위

## 보안

- Row Level Security (RLS) 정책으로 회사별 데이터 분리
- 인증된 사용자만 접근 가능
- 환경 변수로 민감한 정보 보호

## 라이선스

MIT

