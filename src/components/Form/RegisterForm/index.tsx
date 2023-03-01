import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { iFormRegisterValues } from '../../../interfaces/@types';
import { UserContext } from '../../../providers/UserContext';

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<iFormRegisterValues>();
  const { userRegister } = useContext(UserContext)
  const submitForm: SubmitHandler<iFormRegisterValues> = (formData) => {
    userRegister(formData);
  }

  return (
    <StyledForm onSubmit={handleSubmit(submitForm)}>
      <Input label='Nome' type='text' placeholder='Nome' register={register('name')} errors={errors.name} />
      <Input label='Email' type='email' placeholder='Email' register={register('email')} errors={errors.email} />
      <Input label='Senha' type='password' placeholder='Senha' register={register('password')} errors={errors.password} />
      <Input label='Confirmar Senha' type='password' placeholder='Confirmar Senha' register={register('confirmPassword')} errors={errors.confirmPassword} />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
