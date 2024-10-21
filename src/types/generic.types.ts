export interface IReactComponentProps {
    [key: string]: any;
}

export interface IReactComponentState {
    [key: string]: any;
}

export type ReactChildren = string | JSX.Element | JSX.Element[] | (() => JSX.Element);

export type CallbackFunction = (...args: any[]) => any;