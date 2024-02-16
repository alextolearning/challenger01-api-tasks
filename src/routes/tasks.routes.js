import { handlePath } from '../utils/handlePath.js'
import taskController from '../controllers/taskController.js'

const routes = [
  {
    method: 'POST',
    url: handlePath('/tasks'),
    handle: taskController.create
  },
  {
    method: 'GET',
    url: handlePath('/tasks'),
    handle: taskController.read
  },
  {
    method: 'PUT',
    url: handlePath('/tasks/:taskId'),
    handle: taskController.update
  },
  {
    method: 'DELETE',
    url: handlePath('/tasks/:taskId'),
    handle: taskController.delete
  },
  {
    method: 'PATCH',
    url: handlePath('/tasks/:taskId'),
    handle: taskController.completedTask
  },
]

export default routes
