import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IReactComponentState } from "./generic.types";

export declare type TOOLTIP_PLACEMENT_TYPES = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export declare type HTML_INPUT_TYPES = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export declare type ComponentEvent<T=Event,M=IReactComponentState> = (event: ChangeEvent<T>, dispatcher: Dispatch<SetStateAction<M>>, data: any) => void;