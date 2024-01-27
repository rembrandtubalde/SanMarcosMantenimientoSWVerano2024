import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/state/authSlice';
import backgroundImage from '../../assets/images/fondo1.jpg';

import { Input } from '../../components/Input';
import { Button } from '../../styled-components/Button';
import { Error } from '../../styled-components/Error';

import * as LoginStyled from './Login.styled';
import { SubTitle } from '../../styled-components/Text';

import useForm from '../../hooks/useForm';
import { clearMessages } from '../../redux/state/messageSlice';

import logo from '../../assets/logo/logo.png';

export const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const initialValues = {
    email: '',
    password: ''
  };

  const {
    values,
    handleChange,
    handleKeyDown,
    handleSubmit,
    error,
    isLoading
  } = useForm({ initialValues }, login, '/inicio');

  const { fields, messages } = error;

  return (
    <LoginStyled.Container backgroundImage={backgroundImage}>
      <LoginStyled.FormWrapper>
        <form className='form_wrapper__container'>
          <div className='logo_container'>
            <img src={logo} />
          </div>
          <LoginStyled.Title>
            <h1>Iniciar Sesión</h1>
          </LoginStyled.Title>
          {messages && <Error error={messages} />}
          <LoginStyled.InputsContainer>
            <Input
              fail={fields.includes('email')}
              type='email'
              placeholder="Correo electrónico"
              name='email'
              value={values.email}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
            <Input
              fail={fields.includes('password')}
              type='password'
              placeholder="Contraseña"
              name='password'
              value={values.password}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
          </LoginStyled.InputsContainer>
          <LoginStyled.FormPrompt>
            <SubTitle fontSize='14px'>Si aún no tienes cuenta, registrate{' '}</SubTitle>
            <Link to='/registro'>aqui.</Link>
          </LoginStyled.FormPrompt>
          <Button
            type='submit'
            label='Enviar'
            handleClick={handleSubmit}
            isLoading={isLoading}
          />
        </form>
      </LoginStyled.FormWrapper>
    </LoginStyled.Container>
  );
};
