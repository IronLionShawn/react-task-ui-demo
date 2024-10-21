import restClient from "../plugins/rest";
import { TaskModel } from "../types/task.types";

export type RestTypes = 'browse' | 'read' | 'edit' | 'add' | 'delete';

export async function callApi(type: RestTypes, id?: string, data?: TaskModel) {
    let callType: any = 'get';
    let url = `/task/${id}`;

    switch (type) {
        case 'add': 
            callType = 'post';
            url = '/task';
            break;
        case 'delete':
            callType = 'delete';
            break;
        case 'browse':
            url = `/task`;
            break;
        case 'edit':
            callType = 'put'; // patch is getting an cors error after mock api's latest version
            break;
    }

    try {
        const response = await (restClient as any)[callType](url,data);
        const json = response.data;
        return json;
    } catch (error) {
        console.error(error);
    }
    return false;
};