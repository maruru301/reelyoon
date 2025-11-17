# ReelYoon

### TMDB API를 활용해 영화 · TV 정보를 조회할 수 있는 토이 프로젝트.


> TMDB API 기반으로 영화 · TV 정보 검색, 상세조회, 정렬, 필터링 기능을 제공하는 반응형 콘텐츠 탐색 서비스입니다.

> 프로젝트 기간 : 2025.10.03 ~ 2025.11.17 

> URL : https://reelyoon-app.vercel.app/


## 🎯 구현 목표

- React를 활용한 반응형 웹 제작
- TMDB API를 활용해 영화/TV 콘텐츠를 탐색할 수 있는 웹 서비스 구현
- Skeleton UI와 반응형 레이아웃을 통한 사용자 경험(UX) 개선


## ⚒️ Skill

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)
<br/>
![TMDB API](https://img.shields.io/badge/TMDB_API-1ED5A9?style=for-the-badge&logo=themoviedatabase&logoColor=white)
<br/>
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
![react-loading-skeleton](https://img.shields.io/badge/react--loading--skeleton-61DAFB?logo=react&logoColor=white&style=for-the-badge)


## 🗂️ 파일 구조
<img width="281" height="625" alt="image" src="https://github.com/user-attachments/assets/e03a937d-e344-4668-bace-51328302e1d1" />


## 📋구현 기능 & 화면
| 🏠 홈 화면 - 배너 | 🏠 홈 화면 - 콘텐츠 리스트 |
|------------|------------|
| ![BannerSlide](https://github.com/user-attachments/assets/350c8ba0-975e-49dd-a4e2-e23afe4a180c) | ![ContentList](https://github.com/user-attachments/assets/06cc5650-abd5-40f8-804a-265337ebf53c) |
| - 영화 정보 (Popular)  | - 영화/tv 프로그램 정보 (Trending, Top Rated, Popular) |

| 🔍 검색 결과 화면 | 🔍 콘텐츠 상세 화면 |
|------------|------------|
| ![SearchResults_pc](https://github.com/user-attachments/assets/57995fb0-7759-4d72-be22-050d1f677cf8) | ![ContentDetail](https://github.com/user-attachments/assets/b91f4460-8d70-4eda-a262-13d4fb94606c) |
| - 페이지네이션 (모바일 5 단위, pc 10 단위)<br>- 탭 전환 (전체, 영화, tv)<br>- 인기/최신/오래된/평점순 정렬 | - 감독 및 출연진 정보 (Credits)<br>- 컬렉션 정보 (Collection)<br>- 추천 콘텐츠 정보 (Recommendations) |

| 🗃️ 장르 콘텐츠 화면 | 📁 전체보기 화면 |
|------------|------------|
| ![GenreContents](https://github.com/user-attachments/assets/0a9a3f0c-262b-435c-abe1-f02565439697) | ![ViewAll](https://github.com/user-attachments/assets/38eca54b-c092-4c47-8692-851b1f4cb44f) |
| - 페이지네이션 (모바일 5 단위, pc 10 단위)<br>- 탭 전환 (영화, tv)<br>- 인기/최신/오래된/평점순 정렬 | - 페이지네이션 (모바일 5 단위, pc 10 단위)<br>- 탭 전환 (영화, tv) |

| 📺 미디어 화면 | 📐 반응형 화면 |
|------------|------------|
| ![Media](https://github.com/user-attachments/assets/da03dc8e-4aae-40df-9d45-f5af098e7041) | ![responsive_ui](https://github.com/user-attachments/assets/9bb7a9fb-8792-46f2-998e-63268bb44d08) |
| - 해당 탭 미디어 타입의 리스트 렌더링 (Trending, Top Rated, Popular) | - 반응형 UI |


| ▶️ 트레일러 모달창 | ⬆️ 맨 위로 이동 |
|------------|------------|
| ![ContentInfoSection_trailer](https://github.com/user-attachments/assets/ec2f998d-5378-4206-a350-ce29f9c87d6a) | ![ScrollTopButton](https://github.com/user-attachments/assets/401b112d-2c41-40c0-81bf-3d94237477b2) |
| - 자동재생 & 음소거 | - 모든 화면에 적용 |

