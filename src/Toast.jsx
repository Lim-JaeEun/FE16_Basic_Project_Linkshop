import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__close-button {
    display: none;
  }

  .Toastify__toast {
    background-color: #6166e9 !important;
    color: #ffffff !important;
    width: 96px !important;
    height: 46px !important;
    min-height: 0 !important;
    min-width: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 !important;
  }
`;

function Toast({ message }) {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message]);

  return (
    <StyledToastContainer
      position='bottom-center'
      autoClose={3000}
      hideProgressBar={true}
      pauseOnHover
      pauseOnFocusLoss
      closeOnClick
      theme='light'
      limit={1}
    />
  );
}

export default Toast;
