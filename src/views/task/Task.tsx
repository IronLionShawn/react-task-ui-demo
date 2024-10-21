import * as React from 'react';
import { 
    Button, 
    Card, 
    CardActions, 
    CardContent,  
    CircularProgress,  
    FormControl,  
    FormHelperText,  
    MenuItem,  
    Select,  
    Stack,  
    TextField,  
    TextFieldVariants,  
    Typography 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import router from '../../routes/router';
import { useParams } from 'react-router-dom';
import { callApi } from '../../api/tasks';
import { TaskModel } from '../../types/task.types';
import { Controller, useForm } from 'react-hook-form';
import { openModal, resetResponse } from '../../store/slices/modal';
import { AppModalOptions } from '../../types/modal.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export interface ITaskProps {
    type: 'add' | 'read' | 'edit';
}

let gettingRecord = false; // prevents dual calls in dev mode due to strict mode
let modalCallback: (value?: any) => any;

function Task (props: ITaskProps) {
    let _title = ' Task';
    let _dataRequired = true;
    let _editButton = '';
    let variant: TextFieldVariants = 'outlined';
    if(props.type === 'add') {
        _title = 'Add' + _title;
        _dataRequired = false;
    } else if(props.type === 'edit') {
        _title = 'Edit' + _title;
        _editButton = 'Update';
    } else {
        _title = 'View' + _title;
        _editButton = 'Edit';
        variant = 'standard';
    }
    const statusOptions = [{ label: '', value: -1, },{ label: '0', value: 0, }, { label: '1', value: 1 }];
    const initialTask: TaskModel = { id: '', task: '', description: '', status: -1 };
    const { taskId } = useParams();
    const [title] = React.useState(_title);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [editButton] = React.useState(_editButton);
    const [editMode] = React.useState((props.type && props.type !== 'read'));
    const hideSelectIcon = !editMode ? { IconComponent: () => null } : {};
    const modalResponse = useAppSelector((state: any) => state.modal.response);
    
    const { 
        control, 
        formState: { errors }, 
        getValues,
        register, 
        reset, 
        trigger 
    } = useForm<TaskModel>({
        mode: 'onBlur',
        defaultValues: initialTask
    });
    const dispatch = useAppDispatch();

    const viewTask = (id: string) => {
        router.navigate(`/tasks/${id}`);
    };

    const editTask = (id: string) => {
        router.navigate(`/tasks/${id}/edit`);
    };

    const updateTask = async(id: string) => {
        await saveRecord('edit');
    };

    const edit = (type: any) => {
        if(type === 'read' && taskId) {
            editTask(taskId);
        } else {
            updateTask((taskId as any));
        }
    };

    const cancel = () => {
        router.navigate('/tasks/');
    };

    const deleteTask = async (id: string) => {
        setDataLoaded(false);
        try {
            const record = await callApi('delete',id);
            reset(record);
            setDataLoaded(true);
            cancel();
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDeleteTask = async() => {
        const modalOptions: AppModalOptions = {
            title: 'Delete?',
            content: 'Are you sure you want to delete this task?',
            actions: [
                { label: 'Delete Task', value: 'delete', type: 'error' },
                { label: 'Cancel', value: false },
            ]
        };
        modalCallback = (value: any) => {
            if(value === 'delete') {
                deleteTask(taskId!);
            }
        }
        dispatch(openModal(modalOptions));
    };

    async function getRecord(id: string) {
        setDataLoaded(false);
        const response = await callApi('read',id);
        if(!!response) {
            reset(response);
            setDataLoaded(true);
        } else {
            const errorModal: AppModalOptions = {
                title: 'Error!',
                content: 'Unable to retrieve data.',
            }
            modalCallback = (value: any) => {
                if(value === 'ok') {
                    cancel();
                }
            };
            dispatch(openModal(errorModal));
        }
        gettingRecord = false;
    }

    const saveRecord = async (type: 'add' | 'edit') => {
        const isValid = await trigger();
        if(isValid) {
            setDataLoaded(false);
            try {
                const data: TaskModel = getValues();
                const record = await callApi(type,taskId,data);
                if(!!record) {
                    viewTask(record.id);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    React.useEffect(() => {
        const triggerGetRecord = (id: string) => {
            getRecord(id);
        };
        if(_dataRequired && taskId && !gettingRecord) {
            triggerGetRecord(taskId);
            gettingRecord = true;
        }
    // Todo: look into best way to resolve missing dependency, memoize call or modify call with callback and move it outside component
    },[_dataRequired,taskId]);

    React.useEffect(() => {
        const triggerModalCallback = (value: any) => {
            if(!!modalCallback) {
                modalCallback(value);
            }
        }
        if(!!modalResponse) {
           triggerModalCallback(modalResponse);
        }
    },[modalResponse]);

    React.useEffect(() => {
        //Component will unmount 
        return () => {
            reset();
            resetResponse();
        }
    },[]);
    
  return (
    <Grid className='Home' sx={{ height: '100%' }} container justifyContent='center' alignContent='center'>
        <Card sx={{ width: '35%' }}>
            <form>
                <CardContent>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>{title}</Typography>
                    { (_dataRequired && !dataLoaded) && <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress size='4rem' /></div> }
                    { (!_dataRequired || (_dataRequired && dataLoaded)) &&
                            <Stack spacing={2}>
                                {props.type !== 'add' && <TextField disabled variant={variant} {...register('id')}  />}
                                <TextField disabled={!editMode} variant={variant} error={!!errors?.task} helperText={errors.task?.message} {...register('task', { required: { value: true, message: 'Task name is required' } })} />
                                <TextField disabled={!editMode} variant={variant} error={!!errors?.description} helperText={errors?.description?.message} { ...register('description', { required: { value: true, message: 'Description is required' }})} />
                                
                                <Controller
                                    control={control}
                                    name='status'
                                    defaultValue={-1}
                                    rules={{ 
                                        required: { value: true, message: 'Status is required' },
                                        min: { value: 0, message: 'Select an option' }, 
                                        max: { value: 1, message: 'Select an option' }
                                    }}
                                    render={({ field }) => (
                                        <FormControl disabled={!editMode} variant={variant} error={!!errors?.status}>
                                            <Select {...field} inputProps={hideSelectIcon}>
                                                {statusOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                            </Select>
                                            {!!errors.status &&<FormHelperText>{ errors?.status?.message }</FormHelperText>}
                                        </FormControl>
                                    )}/>
                            </Stack>
                    }
                    
                </CardContent>
                <CardActions>
                    {(props.type === 'add') && <Button onClick={e => saveRecord('add')}>Add</Button>}
                    {(props.type !== 'add' && taskId) && 
                        <>
                            <Button onClick={e => edit(props.type)}>{editButton}</Button> 
                            <Button onClick={confirmDeleteTask}>Delete</Button>
                        </>
                    }
                    <Button onClick={cancel}>Cancel</Button>
                </CardActions>
            </form>
        </Card>
    </Grid>
  );
}

export default Task;
