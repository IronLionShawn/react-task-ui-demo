import { AllHTMLAttributes, FormEventHandler } from "react";
import { IReactComponentProps, IReactComponentState } from "../../types/generic.types";

export interface IInputBaseAttrs extends Omit<AllHTMLAttributes<HTMLInputElement>,'name'> {
    name: string;
}

export interface IInputBaseProps extends IReactComponentProps {
    attrs: IInputBaseAttrs;
}

export interface IInputBaseState extends IReactComponentState {
    _labelText?: string;
    _highlight?: string;
    _labelledby?: string;
    _forceDisable?: boolean;
}

export interface HTMLElementEvents<T> {
    onChange?: FormEventHandler<T>;
    onBlur?: FormEventHandler<T>
    onFocus?: FormEventHandler<T>
    onKeyDown?: FormEventHandler<T>;
    onClick?: FormEventHandler<T>;
}