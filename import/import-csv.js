import fs from 'node:fs';
import { parse } from 'csv-parse'

const csvPath = new URL('tasks.csv', import.meta.url)

const parser = parse()

fs.createReadStream(csvPath).pipe(parser)

for await (const chunk of parser) {
  if (chunk[0] !== 'title') {
    const task = {
      title: chunk[0],
      description: chunk[1],
    }

    fetch('http://localhost:3334/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }
}
