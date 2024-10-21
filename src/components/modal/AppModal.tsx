import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@mui/material';
import * as React from 'react';
import { AppModalAction } from '../../types/modal.types';
import { closeModal } from '../../store/slices/modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function AppModal () {
    const dispatch = useAppDispatch();
    const show = useAppSelector(state => state.modal.show);
    const title = useAppSelector(state => state.modal.title);
    const content = useAppSelector(state => state.modal.content);
    const _actions = useAppSelector(state => state.modal.actions);
    const defaultAction: AppModalAction = { label: 'Ok', value: 'ok' };
    const actions = ((!!_actions && _actions.length > 0) ? _actions : [defaultAction]);
    const handleAction = (value: any) => {
        dispatch(closeModal(value));
    }

  return (
    <Dialog open={show} >
        {title && <DialogTitle variant='h4' component='h4'>{title}</DialogTitle>}
        <DialogContent>
            {content && 
            <DialogContentText>
                {content}
            </DialogContentText>}
        </DialogContent>
        <DialogActions>
           {actions.map((action: AppModalAction, index: number) =><Button key={index} color={action?.type} onClick={e => handleAction(action.value)}>{action.label}</Button>)}
        </DialogActions>
    </Dialog>
  );
}
