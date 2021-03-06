import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import {
  WrapperSignIn,
  Content,
  AnimationContainer,
  BackGround,
  Form,
} from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid email'),
          password: Yup.string().required('Password Required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Fail to Authenticate',
          description: 'Check Email, Password and try again later...',
        });
        // toast
      }
    },
    [signIn, addToast],
  );

  return (
    <WrapperSignIn>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1> Sign In</h1>
            <Input
              name="email"
              type="text"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="password"
            />

            <Button type="submit"> Enter </Button>

            <a href="/forgot-password"> Forgot Password</a>
          </Form>
          <Link to="/Sign-up">
            <FiLogIn />
            Sign Up
          </Link>
        </AnimationContainer>
      </Content>
      <BackGround />
    </WrapperSignIn>
  );
};

export default SignIn;
