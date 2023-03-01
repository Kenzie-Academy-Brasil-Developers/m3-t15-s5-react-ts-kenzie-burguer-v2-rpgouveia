import { forwardRef } from "react";
import { iInputSearch } from '../../../interfaces/@types';

const InputSearch = forwardRef<HTMLInputElement, iInputSearch>(
    ({ type, placeholder, ...rest }, ref) =>
        (<input type={type} placeholder={placeholder} ref={ref} {...rest} />)
);

export default InputSearch;