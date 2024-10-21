import React, { useState } from 'react';
import { IInputTextProps, IInputTextState } from './InputText.types';
import composeInput from '../InputBase';
import { inputTextOnChange } from './InputText.helpers';
import './InputText.scss';


function InputText (_props: IInputTextProps) {
    const props: IInputTextProps = {
        ..._props,
        type: 'text',
        groupSize: 'lg',
    };

    const data: IInputTextState = {
        ...props?.data,
        get placeHolderText() { return props?.attrs?.placeholder ? props.attrs.placeholder : props.attrs.name },
    };
 
    const [useData, setData] = useState(data);

    const onBlur = () => {};
    const onFocus = () => {};
    const onKeyDown = () => {};

    const isRequired = () => { return false };
    return (
        <input
            className='input-text'
            autoComplete={props.attrs?.autoComplete}
            placeholder={data.placeHolderText}
            onChange={e => inputTextOnChange(e, setData, useData)}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            name={props?.attrs?.name} 
            id={props.attrs?.id}
            type={props.attrs?.type}
            value={useData?.value}
            minLength={props.attrs?.minLength}
            maxLength={props.attrs?.maxLength}
            aria-required={isRequired()}
            aria-label={props?.attrs?.['aria-label']}
            tabIndex={props.attrs?.tabIndex}
            data-testid={props.testId} />
    );
}

export default composeInput(InputText);