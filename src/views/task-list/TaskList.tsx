import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { 
    Button, 
    Card,
    CardActions, 
    CardContent, 
    IconButton, 
    Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import router from '../../routes/router';
import { callApi } from '../../api/tasks';

export interface TaskListProps {}

function TaskList (props: TaskListProps) {
    const initialTasks: any[] = [];
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [paginationModel] = React.useState({ page: 0, pageSize: 10 });
    const [tasks, setTasks] = React.useState(initialTasks);

    const updateTaskList = (id: number, list?: any) => {
        let taskList = (list) ? list : tasks;
        const updatedList = taskList.filter((task: any) => task.id !== id);
        setTasks(updatedList);
    };

    const getTasks = async () => {
        setDataLoaded(false);
        const response = await callApi('browse');
        if(!!response) {
            setTasks(response);
            setDataLoaded(true);
        }
    };

    const headers: GridColDef[] = [
        { field: 'id', headerName: '#', width: 20 },
        { field: 'task', headerName: 'Task', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'status', headerName: 'Status', width: 80 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 200,
            filterable: false,
            renderCell: (params) => {
              const deleteRecord = async (params: any) => {
                const response = await callApi('delete',params.id);
                if(!response) {
    
                } else {
                    updateTaskList(params.id);
                }
                setDataLoaded(true);
              };
    
              const goToRecord = (params: any, type: 'view' | 'edit') => {
                router.navigate(`/tasks/${params.id}${type === 'edit' ? '/edit' : ''}`);
              };
        
              return (
                <>
                    <IconButton color='primary' edge='end' onClick={e => goToRecord(params,'view')}><SearchIcon /></IconButton>
                    <IconButton color='secondary' edge='end' onClick={e => goToRecord(params,'edit')}><EditIcon /></IconButton>
                    <IconButton color='error' edge='end' onClick={e => deleteRecord(params)}><DeleteIcon /></IconButton>
                </>
              );
            }
        },
    ];

    React.useEffect(() => {
        getTasks();
    },[]); // Component will mount
  return (
    <Grid className='Home' sx={{ height: '100%' }} container justifyContent='center' alignContent='center'>
        <Card sx={{ width: '35%' }}>
            <CardContent>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>Task List</Typography>
                <DataGrid
                    loading={!dataLoaded}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'linear-progress',
                            noRowsVariant: 'linear-progress'
                        }
                    }}
                    sx={{ minWidth: '30%', minHeight: '20%' }}
                    disableColumnResize={true}
                    columns={headers}
                    rows={tasks}
                    initialState={{ pagination: {  paginationModel: paginationModel }}}
                    pageSizeOptions={[5, 10, 15]}/>
            </CardContent>
            <CardActions>
                <Button href='/tasks/add'>Add</Button>
            </CardActions>
        </Card>
   </Grid>
  );
}

export default TaskList;