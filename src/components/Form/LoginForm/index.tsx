import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { iFormLoginValues } from '../../../interfaces/@types';
import { UserContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<iFormLoginValues>();
  const { userLogin } = useContext(UserContext);
  const submitForm: SubmitHandler<iFormLoginValues> = (formData) => {
    userLogin(formData);
  }

  return (
    <StyledForm onSubmit={handleSubmit(submitForm)}>
      <Input label='Email' type='email' placeholder='Email' register={register('email')} errors={errors.email} />
      <Input label='Senha' type='password' placeholder='Senha' register={register('password')} errors={errors.password} />
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
