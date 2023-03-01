import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext';
import { iInputSearchValue } from '../../../interfaces/@types';
import InputSearch from '../InputSearch';

function SearchForm() {
  const { setSearch } = useContext(CartContext);
  const { register, handleSubmit, reset } = useForm<iInputSearchValue>();

  const submitForm: SubmitHandler<iInputSearchValue> = (formData) => {
    setSearch(formData.search);
    reset();
  }

  return (
    <StyledSearchForm onSubmit={handleSubmit(submitForm)}>
      <InputSearch type='search' placeholder='Digitar pesquisa' {...register('search')} />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  )
};

export default SearchForm;