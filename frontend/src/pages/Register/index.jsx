/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { register } from '../../redux/state/authSlice';
import { Input } from '../../components/Input';
import { Button } from '../../styled-components/Button';
import { LoginGoogle } from '../../styled-components/LoginGoogle';
import { Error as ErrorMessage } from '../../styled-components/Error';
import { PasswordInput } from '../../styled-components/PasswordInput';
import { SubTitle } from '../../styled-components/Text';

import useForm from '../../hooks/useForm';
import { clearMessages } from '../../redux/state/messageSlice';
import * as RegisterStyled from './Register.styled';

import logo from '../../assets/logo/logo.png';
import backgroundImage from '../../assets/images/fondo1.jpg';

export const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const initialValues = {
    name: '',
    email: '',
    lastName: '',
    password: '',
    avatar: '',
    passwordConfirm: ''
  };

  const {
    values,
    handleChange,
    handleKeyDown,
    handleSubmit,
    setValues,
    error,
    isLoading
  } = useForm({ initialValues }, register, '/inicio');

  const { fields, messages } = error;

  console.error('from Register page', error);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      console.log(user.data);

      const { given_name, family_name, email, picture } = user.data;

      if (user.data) {
        setValues({
          ...values,
          name: given_name,
          lastName: family_name,
          email,
          avatar: picture
        });
      }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  // Obtener la ubicación geográfica del usuario a través de la API de geolocalización del navegador
  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const country = response.data.country_name; // Obtener el nombre del país desde la respuesta
        setValues(prevValues => ({
          ...prevValues,
          country
        }));
      } catch (error) {
        console.error('Error al obtener la ubicación del usuario:', error);
      }
    };

    getUserCountry();
  }, []);

  return (
    <RegisterStyled.Container backgroundImage={backgroundImage}>
      <RegisterStyled.FormWrapper>
        <form className='form_wrapper__container'>
          <div className='logo_container'>
            <img src={logo} alt="Logo" />
          </div>
          <RegisterStyled.TitleContainer>
            <h1>Registrarse</h1>
          </RegisterStyled.TitleContainer>
          {messages && <ErrorMessage error={messages} />}
          <RegisterStyled.InputsContainer>
            <Input
              fail={fields.includes('name')}
              type='text'
              placeholder="Nombre"
              name='name'
              value={values.name}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
            <Input
              fail={fields.includes('lastName')}
              type='text'
              placeholder="Apellido"
              name='lastName'
              value={values.lastName}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
            <Input
              type='email'
              fail={fields.includes('email')}
              placeholder="Correo electrónico"
              name='email'
              value={values.email}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
            <PasswordInput
              type={'password'}
              fail={fields.some(el => el === 'password' || 'passwordConfirm')}
              placeholder={'Contraseña'}
              placeholderConfirm={'Confirmar contraseña'}
              name={'password'}
              nameConfirm={'passwordConfirm'}
              value={values.password}
              valueConfirm={values.passwordConfirm}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
            />
          </RegisterStyled.InputsContainer>
          <RegisterStyled.FormPrompt>
            <SubTitle fontSize='14px'>Si aún no tienes cuenta, regístrate{' '}</SubTitle>
            <Link to='/'>aquí.</Link>
          </RegisterStyled.FormPrompt>
          <Button
            type='submit'
            label='Enviar'
            handleClick={handleSubmit}
            isLoading={isLoading}
          />
        </form>
        <RegisterStyled.Separator>
          o regístrate con
        </RegisterStyled.Separator>
        <LoginGoogle handleGoogleLogin={googleLogin} />
      </RegisterStyled.FormWrapper>
    </RegisterStyled.Container>
  );
};
