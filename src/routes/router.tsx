import { createBrowserRouter } from "react-router-dom";
import Home from '../views/home/Home';
import TaskList from '../views/task-list/TaskList';
import Task from "../views/task/Task";

const router = createBrowserRouter([
    {
        path: '',
        element: <Home />
    },
    {
        path: 'tasks',
        element: <TaskList />
    },
    {
        path: 'tasks/add',
        element: <Task type='add' key={'add'} />
    },
    {
        path: 'tasks/:taskId',
        element: <Task type='read' key={'view'} />
    },
    {
        path: 'tasks/:taskId/edit',
        element: <Task type='edit' key={'edit'} />,
    }
  
]);

export default router;