import axios from 'axios';

const BASE_URL = 'https://linkshop-api.vercel.app';

const TEAM_ID = '16-5';

const instance = axios.create({
  baseURL: `https://linkshop-api.vercel.app/${TEAM_ID}`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 링크샵을 생성하는 함수
 * @param {Object} dataForSubmit - 생성할 링크샵 데이터
 * @returns {JSON} 생성한 링크샵의 데이터
 */
export const createLinkshop = async dataForSubmit => {
  try {
    const res = await instance.post(`/linkshops`, dataForSubmit, {
      headers: {},
    });
    return res.data;
  } catch (error) {
    console.error('링크샵 생성 실패', error);
    throw error;
  }
};

// export const createLinkshop = async dataForSubmit => {
//   return axios
//     .post(`${BASE_URL}/16-5/linkshops`, dataForSubmit)
//     .then(response => response.data)
//     .catch(error => {
//       if (error.response) {
//         throw new Error(
//           '프로필 생성에 실패했습니다.',
//           error.response.status,
//           error.response.data,
//         );
//       } else if (error.request) {
//         throw new Error('프로필 생성에 실패했습니다.', error.message);
//       } else {
//         throw new Error('프로필 생성에 실패했습니다.', error.message);
//       }
//     });
// };

export const uploadImg = async formData => {
  return axios
    .post(`${BASE_URL}/images/upload`, formData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// const handleError = error => {
//   if (error.response) {
//     throw new Error(
//       '프로필 생성에 실패했습니다.',
//       error.response.status,
//       error.response.data,
//     );
//   } else if (error.request) {
//     throw new Error('프로필 생성에 실패했습니다.', error.message);
//   } else {
//     throw new Error('프로필 생성에 실패했습니다.', error.message);
//   }
// };
