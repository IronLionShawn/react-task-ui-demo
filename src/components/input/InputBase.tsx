import React, { useState } from 'react';
import { IInputBaseProps, IInputBaseState } from './InputBase.types';

const defaultState: IInputBaseState = {
    _forceDisable: false,
    value: ''
}

export function composeInput<P=IInputBaseProps>(WrappedComponent: React.ComponentType<P>) {
  const InputBase = (props: P) => {
    const [data] = useState(defaultState);
    return <WrappedComponent {...props} data={data} />;
  };

  return InputBase;
}

export default composeInput;