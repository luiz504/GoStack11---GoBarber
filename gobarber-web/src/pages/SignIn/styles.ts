import styled, { keyframes } from 'styled-components';
import { Form as FormUnform } from '@unform/web';
import { shade } from 'polished';

import SignInBGImg from '../../assets/sign-in-background.png';

export const WrapperSignIn = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
`;

const apperfromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  animation: ${apperfromLeft} 1s;

  > a {
    display: flex;
    align-items: center;
    margin-top: 24px;

    color: #ff9000;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    > svg {
      margin-right: 16px;
    }
  }
`;

export const BackGround = styled.div`
  flex: 1;
  background: url(${SignInBGImg}) no-repeat center;
  background-size: cover;
`;

export const Form = styled(FormUnform)`
  margin: 80px 0;
  width: 340px;
  text-align: center;

  > h1 {
    margin-bottom: 24px;
  }

  > a {
    display: block;
    margin-top: 24px;

    color: #f4efe8;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4efe8')};
    }
  }
`;
