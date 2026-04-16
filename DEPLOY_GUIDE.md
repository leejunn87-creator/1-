# 🚀 Vercel 배포 가이드 (초보자용)

## 전체 과정 요약
GitHub에 코드 올리기 → Vercel에서 자동 배포 → URL 받기
총 소요 시간: 약 15~20분

---

## 1단계: GitHub 가입 (3분)

1. https://github.com 접속
2. "Sign up" 클릭
3. 이메일, 비밀번호, 유저네임 입력
4. 이메일 인증 완료

> 이미 GitHub 계정이 있으면 이 단계 건너뛰세요.

---

## 2단계: GitHub에 새 저장소 만들기 (2분)

1. GitHub 로그인 후 우측 상단 "+" → "New repository" 클릭
2. Repository name: `my-coach-app` 입력
3. "Public" 선택
4. "Add a README file" 체크
5. "Create repository" 클릭

---

## 3단계: 파일 업로드 (5분)

### 방법 A: GitHub 웹에서 직접 업로드 (가장 쉬움)

1. 만든 저장소 페이지에서 "Add file" → "Upload files" 클릭
2. 다운받은 파일들을 드래그 앤 드롭:
   - `package.json`
   - `vite.config.js`
   - `index.html`
3. "Commit changes" 클릭

4. 다시 "Add file" → "Create new file" 클릭
5. 파일명에 `src/main.jsx` 입력 (src 폴더 자동 생성됨)
6. main.jsx 내용 붙여넣기
7. "Commit changes" 클릭

8. 같은 방법으로 `src/App.jsx` 파일 생성
9. App.jsx 내용 붙여넣기
10. "Commit changes" 클릭

### 방법 B: 전체 ZIP 업로드
1. 다운받은 `vercel_deploy.zip` 압축 풀기
2. GitHub 저장소에서 "Add file" → "Upload files"
3. 압축 푼 폴더 안의 모든 파일을 드래그 앤 드롭
   (src 폴더째로 올리기)
4. "Commit changes" 클릭

---

## 4단계: Vercel 가입 + 연결 (3분)

1. https://vercel.com 접속
2. "Sign Up" → "Continue with GitHub" 클릭
3. GitHub 계정으로 로그인
4. Vercel이 GitHub 접근 권한 요청 → "Authorize" 클릭

---

## 5단계: 배포하기 (3분)

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. "Import Git Repository" 목록에서 `my-coach-app` 찾기
3. "Import" 클릭
4. 설정 화면에서:
   - Framework Preset: `Vite` 선택 (자동 감지될 수도 있음)
   - 나머지는 기본값 그대로
5. "Deploy" 클릭
6. 1~2분 기다리면 배포 완료!

---

## 6단계: 내 앱 확인 🎉

배포가 끝나면 URL이 나와요:
```
https://my-coach-app.vercel.app
```

이 링크를:
- 폰 브라우저에서 열기 → 모바일 앱처럼 사용
- 카카오톡으로 공유 → 다른 사람도 바로 테스트
- 홈 화면에 추가 → 앱 아이콘처럼 사용

---

## 폰에서 "앱처럼" 쓰기

### iPhone
1. Safari에서 URL 접속
2. 하단 공유 버튼 (□↑) 탭
3. "홈 화면에 추가" 선택

### Android
1. Chrome에서 URL 접속
2. 메뉴 (⋮) → "홈 화면에 추가" 선택

---

## 코드 수정 후 재배포

Claude에서 코드를 수정하면:
1. GitHub 저장소에서 해당 파일 클릭
2. 연필 아이콘 (✏️) 클릭 → 수정
3. "Commit changes" 클릭
4. Vercel이 자동으로 재배포! (1~2분)

---

## 비용
- GitHub: 무료
- Vercel: 무료 (Hobby 플랜, 개인 프로젝트 충분)
- 도메인: 기본 .vercel.app 도메인 무료

---

## 문제 해결

### "빌드 실패" 오류
→ Framework Preset이 "Vite"로 되어있는지 확인

### "페이지가 비어있음"
→ src/App.jsx 파일이 정상적으로 업로드됐는지 확인

### "404 Not Found"  
→ index.html 파일이 루트에 있는지 확인 (src 안이 아닌 바깥)
