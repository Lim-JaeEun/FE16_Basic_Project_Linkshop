const renameFile = file => {
  const extension = file.name.split('.').pop();
  const newFileName = `${crypto.randomUUID()}.${extension}`;

  return new File([file], newFileName, { type: file.type });
};

export default renameFile;
//한글등의 파일명을 고유 식별자인 UUID로 변환해주는 함수
