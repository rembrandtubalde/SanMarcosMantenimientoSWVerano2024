import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function useForm({ initialValues }, handleSend, redirectTo) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { fields, messages } = useSelector((state) => state.messages);

  const [values, setValues] = useState(initialValues || {});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSelect = event => {
    const value = event.target.getAttribute('value');
    setValues({
      ...values,
      country: value
    });
  };

  const handleKeyDown = event => {
    const enter = 13;
    if(event.keyCode === enter) {
      handleSubmit(event);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    submitData({ values });
  };

  const submitData = (formValues) => {
    const dataObject = formValues.values;
    setIsLoading(true);

    dispatch(handleSend(dataObject))
      .unwrap()
      .then(() => {
        navigate(redirectTo);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const error = {
    fields,
    messages
  };

  return {
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleSelect,
    values,
    setValues,
    isLoading,
    error
  };
}