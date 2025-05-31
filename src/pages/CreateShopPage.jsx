import { useNavigate } from 'react-router-dom';

function CreateShopPage({ onSuccess }) {
  const navigate = useNavigate();

  const handleCreate = () => {
    // 1. 데이터 저장 로직 수행 (예: API 호출)
    // await createShop(data);

    // 2. 성공 시 토스트 띄우기
    onSuccess?.();

    // 3. 리스트 페이지로 이동
    navigate('/list');
  };

  return (
    <div>
      <h2>가게 생성 페이지</h2>
      {/* 공용 버튼 컴포넌트로 수정 필요 */}
      <button onClick={handleCreate}>생성</button>
    </div>
  );
}

export default CreateShopPage;
