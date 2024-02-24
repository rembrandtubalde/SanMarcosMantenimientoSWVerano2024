import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaceInfo, postNewDate } from '../../services/api/places';

import * as PlanStyled from './Plan.styled';
import { Button } from '../../styled-components/Button';
import { Input } from '../../components/Input';
import { Dropdown } from '../../styled-components/Dropdown';
import { RemoveButton } from '../Settings/Settings.styled';

import './index.css';
import { Title } from '../../styled-components/Text';
import { clearMessages, setFields, setMessages } from '../../redux/state/messageSlice';
import { Error as ErrorMessage } from '../../styled-components/Error';

const Row = ({ onChange, onRemove, description, balance, handleOnAdd }) => {
  return (
    <PlanStyled.InputContent>
      <Input
        value={description}
        handleChange={e => onChange('description', e.target.value)}
        placeholder="Descripción del gasto"
      />
      <Input
        className='input__plan'
        placeholder="Gasto planeado"
        value={balance}
        handleChange={e => onChange('balance', e.target.value)}
      />
      <RemoveButton style={{ width: '200px' }} onClick={onRemove}>Eliminar</RemoveButton>
      <RemoveButton
        style={{
          width: '200px',
          backgroundColor: 'var(--primary-color)',
          borderColor: 'var(--primary-color)',
        }}
        onClick={handleOnAdd}
      >Agregar</RemoveButton>
    </PlanStyled.InputContent>
  );
};

export const Plan = () => {
  let { place_id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [placeName, setPlaceName] = useState('');
  const user = useSelector(state => state.auth.user);
  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const defaultRowsState = {
    description: '',
    balance: '',
  };

  const formState = {
    date: '',
    time: '',
    category: '',
  };

  const options = [
    { value: 'familia', label: 'Familiar' },
    { value: 'amigos', label: 'Amistades' },
    { value: 'pareja', label: 'Pareja' },
  ];

  const [rows, setRows] = useState([defaultRowsState]);
  const [form, setForm] = useState(formState);

  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value
    };
    console.log('rows', copyRows);
    console.log('name', name);
    console.log('value', value);

    setRows(copyRows);
  };

  const handleOnAdd = () => {
    setRows(rows.concat(defaultRowsState));
  };

  const handleOnChangeInputs = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleOnRemove = index => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        userId: user.id,
        placeId: place_id,
        budget: [...rows],
        category: form.category,
        expectedDate: {
          hour: form.time,
          day: form.date,
        }
      };

      if (new Date(form.date) === 'Invalid Date') {
        throw new Error('Plan sin crear: Formato de fecha no válido');
      }

      if (data.budget[0].balance === 0) {
        throw new Error('Plan sin crear: El monto no puede ser cero');
      }

      if (data.budget[0].balance < 0) {
        throw new Error('Plan sin crear: El monto no puede ser negativo');
      }

      if (data.budget[0].balance >= 1000000000) {
        throw new Error('Plan sin crear: Monto con demasiadas cifras');
      }
  
      await postNewDate(data);
      navigate('/inicio/mis-planes');
    } catch (e) {
      console.log(e.name === 'AxiosError');
      if (e.name === 'AxiosError') {
        const { fields, messages } = e.response.data;
        dispatch(setMessages(messages));
        dispatch(setFields(fields));
        return;
      }

      dispatch(setMessages(e.message));
    }
  };

  const handleSelect = (e) => {
    setForm({
      ...form,
      category: e.target.getAttribute('value')
    });
  };

  useEffect(() => {
    getPlaceInfo(place_id)
      .then(res => {
        setPlaceName(res.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  } , []);

  return (
    <>
      <PlanStyled.Container>
        <Title fontSize='48px' marginBottom='2.5rem'>Crear plan para {placeName}</Title>
        {messages && <ErrorMessage error={messages} /> }
        <Title fontSize='1.5rem' marginBottom='1.5rem'>
          Elegir categoria
        </Title>
        <div>
          <Dropdown onChange={handleOnChangeInputs} name='category' options={options} handleSelect={handleSelect}  label='Categoría' />
        </div>


        <Title fontSize='1.5rem' marginBottom='1.5rem'>
          Elegir fecha
        </Title>
        <Input type='date' name='date' handleChange={handleOnChangeInputs} />
        <Title fontSize='1.5rem' marginBottom='1.5rem'>
          Elegir hora
        </Title>
        <Input type='time' name='time' handleChange={handleOnChangeInputs} />

        <Title fontSize='1.5rem' marginBottom='1.5rem'>
          Presupuesto planeado
        </Title>

        <div>
          {rows?.map((row, index) => (
            <Row
              {...row}
              onChange={(name, value) => handleOnChange(index, name, value)}
              onRemove={() => handleOnRemove(index)}
              key={index}
              handleOnAdd={handleOnAdd}
            />
          ))}
        </div>

        <Button handleClick={handleSubmit} label='Enviar' />
      </PlanStyled.Container>
    </>
  );
};

Row.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  description: PropTypes.string,
  balance: PropTypes.string,
  handleOnAdd: PropTypes.func,
};