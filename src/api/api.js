import axios from 'axios';

import { ORDER_OPTIONS } from '../constants/orderOptions';

const TEAM_ID = '16-5';

const instance = axios.create({
  baseURL: `https://linkshop-api.vercel.app/${TEAM_ID}`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * LinkshopList를 가져오는 함수
 *
 * @param {string} [keyword = ''] 키워드 기반 검색
 * @param {string} [orderBy = 'recent'] 리스트 정렬 기준 (Available values : recent || likes || productsCount)
 * @param {number} [cursor = 0] 페이징을 위한 커서
 * @returns { list: Array<Linkshop>, nextCursor: number }
 */
export const getLinkshops = async ({
  keyword = '',
  orderBy = 'recent',
  cursor = 0,
}) => {
  if (cursor < 0) {
    throw new Error('cursor의 값이 잘못 입력되었습니다.(cursor >= 0)');
  }

  if (!Object.keys(ORDER_OPTIONS).find(e => e === orderBy)) {
    throw new Error(
      `orderBy의 값이 잘못 입력되었습니다.(입력된 값: ${orderBy})`,
    );
  }

  try {
    const res = await instance.get('/linkshops', {
      params: {
        keyword: keyword,
        orderBy: orderBy,
        cursor: cursor,
      },
    });
    return res.data;
  } catch (error) {
    console.log('링크샵 조회 중 오류 발생: ', error.message);
    throw error;
  }
};

/**
 * 좋아요를 생성하는 함수
 *
 * @param {number} linkShopId 대상 링크샵 ID
 * @returns { message: string } 처리 결과 메세지
 */
export const createLike = async linkShopId => {
  try {
    const res = await instance.post(`/linkshops/${linkShopId}/like`, {});
    return res.data;
  } catch (error) {
    console.log('좋아요 생성 중 오류 발생: ', error.message);
    throw error;
  }
};

/**
 * 좋아요를 삭제(취소)하는 함수
 *
 * @param {number} linkShopId 대상 링크샵 ID
 * @returns { message: string } 처리 결과 메세지
 */
export const deleteLike = async linkShopId => {
  try {
    const res = await instance.delete(`/linkshops/${linkShopId}/like`, {});
    return res.data;
  } catch (error) {
    console.log('좋아요 삭제 중 오류 발생: ', error.message);
    throw error;
  }
};
