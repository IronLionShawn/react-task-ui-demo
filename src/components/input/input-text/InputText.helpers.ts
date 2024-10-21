import { ComponentEvent } from "../../../types/component.types";
import { IInputBaseState } from "../InputBase.types";

export const inputTextOnChange: ComponentEvent<HTMLInputElement, IInputBaseState> = (event, dispatcher, data: any) => {
    console.log('text on change: ',event);
    let updatedValue = { value: event.target.value };
    let newData = { ...data, ...updatedValue };
    console.log('new data: ',newData);
    dispatcher(newData as any);
}