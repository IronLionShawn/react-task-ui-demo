import * as React from 'react';

export interface IInputProps {
    name: string;
    id?: string;
}

export function Input (props: IInputProps) {
  const [val, setValue] = React.useState('');
  return (
    <input 
        className=''
        name={props.name}
        id={props.id}
        value={val} 
        onChange={e => setValue(e.target.value)}/>
  );
}
