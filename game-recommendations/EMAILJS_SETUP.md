# EmailJS 설정 가이드

## 📧 EmailJS란?

EmailJS는 서버 없이 클라이언트 측 JavaScript만으로 이메일을 전송할 수 있게 해주는 서비스입니다.

## 🚀 설정 방법

### 1단계: EmailJS 가입

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속
2. 무료 계정 생성 (월 200개 이메일 무료)

### 2단계: Email Service 연결

1. Dashboard에서 **"Add New Service"** 클릭
2. Gmail, Outlook 등 원하는 이메일 서비스 선택
3. 계정 연결 및 인증 완료
4. **Service ID** 복사 (예: `service_abc1234`)

### 3단계: Email Template 생성

1. Dashboard에서 **"Email Templates"** → **"Create New Template"** 클릭
2. 템플릿 내용 작성:

```
제목: [게임 추천 사이트] {{category}} - {{from_name}}님의 문의

내용:
보낸 사람: {{from_name}}
이메일: {{reply_to}}
문의 유형: {{category}}
좋아하는 장르: {{favorite_genre}}

메시지:
{{message}}

---
이 메시지는 게임 추천 사이트에서 전송되었습니다.
```

3. **Template ID** 복사 (예: `template_xyz5678`)

### 4단계: Public Key 확인

1. Dashboard → **"Account"** → **"General"** 탭
2. **Public Key** 복사 (예: `abcdefghij1234567`)

### 5단계: 코드에 적용

`contact.html` 파일에서 다음 3곳을 수정:

```javascript
// 1. Public Key 수정 (19번째 줄)
emailjs.init("YOUR_PUBLIC_KEY");
// → emailjs.init("abcdefghij1234567");

// 2. Service ID와 Template ID 수정 (82번째 줄)
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
// → emailjs.sendForm('service_abc1234', 'template_xyz5678', this)
```

## ✅ 테스트

1. 브라우저에서 `contact.html` 열기
2. 폼 작성 후 전송
3. 연결한 이메일 계정에서 메일 확인

## 🎯 폼 필드 매핑

EmailJS는 HTML input의 `name` 속성을 템플릿 변수로 사용합니다:

| HTML name | 템플릿 변수 | 설명 |
|-----------|-------------|------|
| `from_name` | `{{from_name}}` | 보낸 사람 이름 |
| `reply_to` | `{{reply_to}}` | 회신용 이메일 |
| `category` | `{{category}}` | 문의 유형 |
| `favorite_genre` | `{{favorite_genre}}` | 좋아하는 장르 |
| `message` | `{{message}}` | 메시지 내용 |

## 🔒 보안 주의사항

- Public Key는 공개되어도 괜찮습니다
- Service ID와 Template ID도 노출 가능
- reCAPTCHA 추가를 권장합니다 (스팸 방지)

## 📊 요금제

- **Free**: 월 200개 이메일 무료
- **Essential**: 월 $9 (1,000개)
- **Professional**: 월 $35 (5,000개)

## 🛠️ 문제 해결

### 에러: "The user ID is invalid"
→ Public Key가 올바르게 설정되지 않음. `emailjs.init()` 확인

### 에러: "Template or Service doesn't exist"
→ Service ID 또는 Template ID가 잘못됨

### 메일이 스팸함에 도착
→ EmailJS 설정에서 "From Name" 설정 확인

## 🔗 참고 링크

- [EmailJS 공식 문서](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [지원되는 이메일 서비스](https://www.emailjs.com/docs/user-guide/adding-email-service/)

## 💡 추가 기능

### reCAPTCHA 추가하기

스팸 방지를 위해 reCAPTCHA를 추가할 수 있습니다:

```javascript
// Google reCAPTCHA v3 추가
emailjs.sendForm('service_id', 'template_id', this, {
    captcha: grecaptcha.getResponse()
});
```

자세한 내용은 [EmailJS reCAPTCHA 가이드](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/)를 참조하세요.
