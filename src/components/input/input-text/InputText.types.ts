import { HTML_INPUT_TYPES } from '../../../types/component.types'
import { IInputBaseProps, IInputBaseState } from "../InputBase.types";

export interface IInputTextProps extends IInputBaseProps {
    inputMask?: string;
    type: HTML_INPUT_TYPES;
    minLength?: number;
    maxLength?: number;
    groupSize?: 'sm' | 'lg';
    data?: IInputTextState;
}

export interface IInputTextState extends IInputBaseState {
    readonly placeHolderText?: string;
}