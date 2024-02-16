import fs from 'node:fs/promises'

const databaseUrl = new URL('../../database.json', import.meta.url)

class Database {
  #database = {}

  constructor(){
    fs.readFile(databaseUrl, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databaseUrl, JSON.stringify(this.#database))
  }

  select(table, where = {}){
    const data = this.#database[table] ?? []

    return data
  }

  create(table, data){
    if(this.#database[table]){
       this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
  }

  update(table, data, where){
    this.#database[table].map(row => {
      var canUpdate = true

      Object.entries(where).forEach(([key, value]) => {
        if(row[key] !== value){
          canUpdate = false
        }
      })

      if (canUpdate) {
        Object.entries(data).forEach(([key, value]) => {
          row[key] = value ?? row[key]
        })
      }
    })

    this.#persist()
  }

  delete(table, where){
    const newTable = this.#database[table].filter(row => {
      var canFilter = false

      Object.entries(where).forEach(([key, value]) => {
        if(row[key] !== value){
          canFilter = true
        }
      })

      return canFilter
    })

    this.#database[table] = newTable

    this.#persist()
  }
}

export default Database