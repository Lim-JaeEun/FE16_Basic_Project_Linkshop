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

export const validateImage = file => {
  const maxSizeInMB = 3;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      hasError: true,
      message: `\n이미지 용량은 ${maxSizeInMB}MB 이하만 업로드 가능합니다.`,
    };
  }

  const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  const validMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
  ];

  const extension = file.name.split('.').pop().toLowerCase();
  const isExtValid = validExtensions.includes(extension);
  const isMimeValid = validMimeTypes.includes(file.type);

  return {
    hasError: !(isExtValid && isMimeValid && file.type.startsWith('image/')),
    message: 'jpg, jpeg, png, webp, avif 형식의 이미지만 업로드할 수 있습니다.',
  };
};
