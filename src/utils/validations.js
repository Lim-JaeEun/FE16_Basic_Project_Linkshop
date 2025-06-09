const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const urlRegex = /^https?:\/\/?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
const userIdRegex = /^[A-Za-z0-9]+$/;

export const validateUrl = value => {
  if (!urlRegex.test(value)) {
    return 'http:// 또는 https://로 시작한 주소를 사용해 주세요.';
  }
  return 'valid';
};

export const validateUserId = value => {
  if (!userIdRegex.test(value)) {
    return '아이디에 한글, 띄어쓰기, 특수기호를 사용할 수 없습니다.';
  }
  return 'valid';
};

export const validatePassword = value => {
  if (!passwordRegex.test(value)) {
    return '비밀번호는 영문+숫자 6자 이상을 입력해야 합니다.';
  }
  return 'valid';
};
