# Next-Chat

![icon-256x256](https://github.com/tokkissi/Next-Chat/assets/53216523/a7ea4dd2-e9f5-4412-8e2c-3d6e721b1ea8)

  
> 배포 URL: [https://next-chat-tokkissi.koyeb.app/](https://next-chat-tokkissi.koyeb.app/)

---

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [기능 설명](#기능-설명)
4. [시연 영상](#시연-영상)
5. [프로젝트 설치 방법](#프로젝트-설치-방법)
6. [PWA 설치 방법](#PWA-설치-방법)
7. [사용 방법](#사용-방법)
8. [개발자 정보](#개발자-정보)

<br />

---

## 프로젝트 소개

Next-Chat은 TypeScript와 Next.js를 사용하여 구현된 웹소켓 기반의 실시간 채팅 어플리케이션입니다.  
사용자는 닉네임을 설정한 후 채팅방에 참여하여 여러 유저들과 실시간으로 소통할 수 있습니다.  
PWA를 지원하므로 다운받아서 앱처럼 사용가능합니다.


<br />

---

## 기술 스택

- Next.js 13
- TypeScript
- WebSocket
- PWA

<br />

---

## 기능 설명

- **PWA 지원**: 이 애플리케이션은 PWA로 제공되어, 웹사이트를 브라우저에 설치하여 앱처럼 사용할 수 있습니다. 
- **닉네임 설정** : 사용자가 채팅을 시작하기 전에 원하는 닉네임을 설정할 수 있습니다. 이 닉네임은 채팅방에서 사용자를 식별하는 데 사용됩니다
- **실시간 메시지 교환** : 사용자들은 실시간으로 메시지를 주고받을 수 있습니다. 채팅방에 참여한 모든 사용자들이 서로의 메시지를 볼 수 있습니다.
- **자동 스크롤**: 새로운 메시지가 생성될 때마다 채팅창은 자동으로 최신 메시지가 보이도록 맨 아래로 스크롤됩니다. 이를 통해 사용자는 항상 최신 대화를 쉽게 확인할 수 있습니다.

<br />

---

## 시연 영상

- PWA 지원
![웹소켓-PWA](https://github.com/tokkissi/Next-Chat/assets/53216523/cbe56a7e-e223-4d06-8816-f57166959329)

- 닉네임 설정 및 실시간 메시지 교환
![웹소켓-실시간채팅](https://github.com/tokkissi/Next-Chat/assets/53216523/ca711675-aa7a-426c-bcdf-34c00991c334)

- 자동 스크롤
![웹소켓-새메시지스크롤](https://github.com/tokkissi/Next-Chat/assets/53216523/c044d054-d61f-420a-bdc8-ee73ccb0735e)

---


## 프로젝트 설치 방법

```bash
# 저장소를 클론합니다.
git clone https://github.com/tokkissi/Next-Chat.git

# 프로젝트 폴더로 이동합니다.
cd Next-Chat

# 의존성을 설치합니다.
yarn install

# 로컬 개발 서버를 실행합니다.
yarn start
```
<br />

---

## PWA 설치 방법

이 애플리케이션은 PWA로 제공되어, 웹사이트를 브라우저에 설치하여 앱처럼 사용할 수 있습니다. 설치 방법은 다음과 같습니다:

- **웹사이트 접속** : 브라우저를 사용하여 애플리케이션 주소로 이동합니다.  
- **설치 팝업** : 사이트를 방문하면 홈 화면에 추가 또는 앱 설치를 권하는 팝업이 나타날 수 있습니다. 이 팝업의 지시를 따라 설치를 진행합니다.  
- **수동 설치** : 팝업이 나타나지 않는 경우, 브라우저 주소 표시줄 오른쪽에 있는 설치 아이콘(+)을 클릭하여 설치를 진행합니다.

<br />

---

## 사용 방법

1. [https://next-chat-tokkissi.koyeb.app](https://next-chat-tokkissi.koyeb.app)에 접속합니다. PWA를 설치하면 웹앱처럼 사용 가능합니다.
2. 채팅에 사용할 닉네임을 정합니다.
3. 채팅에 참여중인 유저들과 실시간 대화가 가능합니다. 새 창에서 해당 앱에 접속하여 다른 닉네임으로 채팅에 동시 참여도 가능합니다.


---

## 개발자 정보

- 개발자: tokkissi
- 이메일: alal4674@gmail.com
- GitHub: https://github.com/tokkissi
---

채팅 페이지의 배경 및 앱의 아이콘 이미지는 AI 이미지 생성을 통해서 직접 제작하였습니다.  
해당 프로젝트는 vercel 에서 웹소켓을 지원하지 않아서(참고 : https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections) **koyeb**을 통해 빌드 및 배포 하였습니다
