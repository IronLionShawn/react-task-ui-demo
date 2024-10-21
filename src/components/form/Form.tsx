import * as React from 'react';
import './Form.scss';

export interface FormProps {
    name?: string;
}

function Form (props: React.PropsWithChildren<FormProps>) {
  return (
    <form className='form'>
        {props.children}
    </form>
  );
}

export default Form;