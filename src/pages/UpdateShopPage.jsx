import { useNavigate, useParams } from 'react-router-dom';

function UpdateShopPage({ onSuccess }) {
  const navigate = useNavigate();
  const { URLid } = useParams();

  const handleUpdate = () => {
    // 1. 업데이트 로직 수행 (예: API 호출)
    // await updateShop(URLid, updatedData);

    // 2. 성공 시 토스트 띄우기
    onSuccess?.();

    // 3. 상세 페이지로 이동
    navigate(`/link/${URLid}`);
  };

  return (
    <div>
      <h2>가게 수정 페이지</h2>
      {/* 공용 버튼 컴포넌트로 수정 필요 */}
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
}

export default UpdateShopPage;
