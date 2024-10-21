export type AppModalActionTypes = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface AppModalAction {
    label: string;
    value: any;
    type?: AppModalActionTypes;
}

export interface AppModalState {
    show: boolean;
    title?: string;
    content: string;
    actions?: AppModalAction[];
    response?: any;
}

export interface AppModalOptions extends Omit<AppModalState, 'show'> {}