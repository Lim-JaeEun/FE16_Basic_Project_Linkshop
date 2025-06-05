import Modal from 'react-modal';

Modal.setAppElement('#root'); //모달이 띄워져 있는 동안 스크린 리더가 모달 이외의 컨텐츠를 읽지 않도록 방지하는 접근성 향상 메서드

const BaseModal = ({
  isOpen,
  children,
  className = 'common-modal-content',
}) => {
  return (
    <Modal
      isOpen={isOpen} //모달창이 열려있는지 여부를 확인하는 boolean 변수 (state는 모달을 사용하는 상위 컴포넌트에서 관리)
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      //커스텀 버튼으로만 모달을 닫을 수 있도록 기본 닫기 동작을 막아놓음, 각종 종료 이벤트는 커스텀 모달에서 구현
      className={className} //모달 content 디자인
      overlayClassName='common-modal-overlay' //모달 overlay 디자인(프로젝트 내에서 동일한 디자인 사용이라 고정 클래스네임)
      contentLabel='Base Modal' //웹 접근성을 위한 모달 목적 설명(스크린 리더 전용)
    >
      {children}
    </Modal>
  );
};

export default BaseModal;

//주의사항: 모달을 닫을 수 있는 기본동작을 막아놨기 때문에 테스트할 때 닫는 버튼을 구현하지 않았다면 무한루프에 빠짐
