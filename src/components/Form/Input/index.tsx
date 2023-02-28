import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { iInput } from '../../../interfaces/@types';

const Input = ({ label, type, placeholder, register, errors }: iInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} placeholder={placeholder} {...register} />
    {errors ? <StyledParagraph fontColor='red'>{errors.message}</StyledParagraph> : null}
  </fieldset>
);

export default Input;
