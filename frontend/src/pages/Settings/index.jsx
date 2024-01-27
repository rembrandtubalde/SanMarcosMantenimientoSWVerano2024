import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/api/user';

import { Input } from '../../components/Input';
import { Location } from '../../components/Location';
import { Title, SubTitle } from '../../styled-components/Text';
import { StyledButton } from '../../styled-components/StyledButton';

import * as SettingsStyled from './Settings.styled';
import { Error as ErrorMessage } from '../../styled-components/Error';
import { clearMessages, setMessages } from '../../redux/state/messageSlice';
import { Notification } from '../../styled-components/Notification';

export const Settings = () => {
  const user = useSelector(state => state.auth.user);
  const [userUpdatedSuccessfull, setUserUpdatedSuccessfull] = useState(false);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages); 
  const [disabled, setDisabled] = useState({
    input1: true,
    input2: true,
    input3: true,
  });
  const [form, setForm] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);


    dispatch(clearMessages());
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
    
  }, [image, dispatch]);

  const handleChange = (input) => {
    setDisabled({
      ...disabled,
      [input]: false,
    });
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', form.name || user.name);
      formData.append('lastName', form.lastName || user.lastname);
      formData.append('email', form.email || user.email);
      formData.append('image', image || user.avatar);

      const imageExtension = image?.name?.split('.').pop();
      const validImageExtensions = ['jpg', 'png', 'gif', 'svg'];
  
      const config = {
        headers:{
          'content-type': 'multipart/form-data'
        }
      };

      if (imageExtension && !validImageExtensions.includes(imageExtension.toLowerCase())) {
        throw new Error('Fomato de imagen no válido');
      }

      if ((form.name.length <= 3 || form.name.length > 25) || form.name.match(/[^a-zA-Z]/)) {
        throw new Error('Nombre no válido');
      }

      if (!isNaN(Number(form.name))) {
        throw new Error('Nombre no válido');
      }

      if ((form.lastName?.length <= 3 || form.lastName?.length > 25) || form.lastName?.match(/[^a-zA-Z]/)) {
        throw new Error('Apellido no válido');
      }

      if (!isNaN(Number(form.lastName))) {
        throw new Error('Apellido no válido');
      }

      if (!form.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]{2,6}$/)) {
        throw new Error('Correo no válido');
      }

      await updateUser(user.id, formData, config);
      setUserUpdatedSuccessfull(true);
      dispatch(setMessages('Perfil editado'));
    } catch (error) {
      setUserUpdatedSuccessfull(false);
      dispatch(setMessages(error.message));
    }
  };

  return (
    <>
      <SettingsStyled.Container onSubmit={handleSubmit}>
        {messages && !userUpdatedSuccessfull && <ErrorMessage error={messages} />}
        {messages && userUpdatedSuccessfull && <Notification message={messages} />}
        <Title marginBottom='2rem'>Mi Información</Title>
        <SettingsStyled.ImageContainer>
          <SettingsStyled.Image src={image ? preview : user.avatar} />
          <SettingsStyled.ButtonsContainer>
            <label htmlFor='profile'>
              Cambiar Imagen
              <input id='profile' type='file' style={{ display: 'none'}} onChange={handleImage} name='image' accept='.jpg, .png' />
            </label>
            <SettingsStyled.RemoveButton
              onClick={removeImage}
            >
              Eliminar Imagen
            </SettingsStyled.RemoveButton>
          </SettingsStyled.ButtonsContainer>
        </SettingsStyled.ImageContainer>

        <div className='settings__inputs'>
          <SettingsStyled.Dates>
            <SettingsStyled.InfoInput>
              <SubTitle fontSize='1rem' style={{ marginRight: '4px' }}>Nombre: </SubTitle>
              <Input value={form.name} disabled={disabled.input1} name='name' handleChange={handleForm} />
              <StyledButton
                style={{
                  cursor: 'pointer',
                  width: '150px',
                  borderRadius: '24px',
                  padding: '11px 16px'
                }}
                onClick={() => handleChange('input1')}
              >
                Editar
              </StyledButton>
            </SettingsStyled.InfoInput>
            <SettingsStyled.InfoInput>
              <SubTitle fontSize='1rem'>Apellido: </SubTitle>
              <Input value={form.lastName} disabled={disabled.input2} name='lastName' handleChange={handleForm} />
              <StyledButton
                style={{
                  cursor: 'pointer',
                  width: '150px',
                  borderRadius: '24px',
                  padding: '11px 16px'
                }}
                onClick={() => handleChange('input2')}
              >
                Editar
              </StyledButton>
            </SettingsStyled.InfoInput>
            <SettingsStyled.InfoInput>
              <SubTitle fontSize='1rem' style={{ marginRight: '16px' }}>Correo: </SubTitle>
              <Input value={form.email} disabled={disabled.input3} name='email' handleChange={handleForm} />
              <StyledButton
                style={{
                  cursor: 'pointer',
                  width: '150px',
                  borderRadius: '24px',
                  padding: '11px 16px'
                }}
                onClick={() => handleChange('input3')}
              >
                Editar
              </StyledButton>
            </SettingsStyled.InfoInput>
            <SettingsStyled.InfoInput
              style={{ display: 'flex', alignItems: 'flex-start' }}
            >
              <SubTitle fontSize='1rem'>País: </SubTitle>
              <SettingsStyled.FlagStyled
                code={user.country}
                height='100'
                title={user.country}
              />
            </SettingsStyled.InfoInput>
          </SettingsStyled.Dates>
        </div>

        <SettingsStyled.ButtonContainer>
          <StyledButton type='submit'>
            Actualizar Información
          </StyledButton>
        </SettingsStyled.ButtonContainer>
      </SettingsStyled.Container>

      <div className='location__map'>
        <Title marginBottom='2rem'>Tu ubicación</Title>
        <Location />
      </div>
    </>
  );
};