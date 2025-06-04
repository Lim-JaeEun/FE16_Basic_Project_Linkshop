import { useEffect, useState } from 'react';

import axios from 'axios';

import CardList from '../components/CardList';

const getData = async () => {
  try {
    const response = await axios.get(
      `https://linkshop-api.vercel.app/16-5/linkshops`,
    );
    return response.data;
  } catch (error) {
    console.error('상품 리스트를 받아오지 못했습니다!', error);
    throw new Error('상품 리스트를 받아오지 못했습니다!');
  }
};

const MainPage = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const Items = await getData();
      setItems(Items);
    };
    fetchData();
  }, []);

  return (
    <div>
      <CardList cardData={items} />
    </div>
  );
};

export default MainPage;
