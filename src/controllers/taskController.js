import Database from "../database/index.js"
import { randomUUID } from 'node:crypto'

const dateNow = new Date()
const db = new Database()

const taskController = {
  create: function(req, res) {
    try {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(404).end(JSON.stringify('Titulo e descrição são obrigatórios'))
      }

      const uid = randomUUID()

      db.create('tasks', {
        id: uid,
        title,
        description,
        completed_at: null,
        created_at: dateNow,
        updated_at: dateNow,
      })

      const tasks = db.select('tasks')

      const task = tasks.find(task => task.id === uid)

      return res.writeHead(201).end(JSON.stringify(task))
    } catch (error) {
      console.error(error)

      return res.writeHead(400).end()
    }
  },
  read: function(req, res) {
    try {
      const tasks = db.select('tasks')

      return res.end(JSON.stringify(tasks))
    } catch (error) {
      console.log(error)
      return res.writeHead(400).end()
    }
  },
  update: function(req, res) {
    const { taskId } = req.params
    const { title, description } = req.body

    if (!title && !description) {
      return res.writeHead(404).end(JSON.stringify('Titulo e descrição são obrigatórios'))
    }

    const tasks = db.select('tasks')

    const task = tasks.find(task => task.id === taskId)

    if (!task) {
      return res.writeHead(404).end('Id de tarefa inválido!')
    }

    db.update('tasks', {
      title,
      description,
      updated_at: dateNow
    }, {
      id: taskId
    })

    return res.end('Update realizado com sucesso!')
  },
  delete: function(req, res) {
    const { taskId } = req.params

    const tasks = db.select('tasks')

    const task = tasks.find(task => task.id === taskId)

    if (!task) {
      return res.writeHead(404).end('Id de tarefa inexistente!')
    }

    db.delete('tasks', {
      id: taskId
    })

    return res.end()
  },
  completedTask: function(req, res) {
    const { taskId } = req.params

    const tasks = db.select('tasks')

    const task = tasks.find(task => task.id === taskId)

    if (!task) {
      return res.writeHead(404).end('Id de tarefa inválido!')
    }
    console.log(dateNow)

    db.update('tasks', {
      completed_at: dateNow,
      updated_at: dateNow
    }, {
      id: taskId
    })

    return res.end('Tarefa completada com sucesso!')
  }
}

export default taskController