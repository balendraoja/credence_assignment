const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'moviesData.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.get('/movies/', async (request, respose) => {
  const getMoviesQuery = `SELECT * FROM movies ORDER BY name;`
  const moviesArray = await db.all(getMoviesQuery)
  response.send(moviesArray)
})

app.post('/movies/', async (request, response) => {
  const movieDetails = request.body
  const {name, img, summary} = movieDetails
  const addMovieQuery = `INSERT INTO movies (name, img, summary) VALUES ("${name}", "${img}" "${summary}");`
  const dbResponse = await db.run(addMovieQuery)
  response.send('Added successfully')
})

app.put('/movies/:name', async (request, response) => {
  const {name} = request.params
  const {title, img, summary} = movieDetails
  const updateQuery = `UPDATE movies SET name = "${title}", "${img}" "${summary}" WHERE name = "${name}";`
  await db.run(updateQuery)
  response.send('Updated Successfully')
})

app.delete('/movies/:name', async (request, response) => {
  const {name} = request.params
  const deleteMovieQuery = `DELETE FROM movies WHERE name = "${name}";`
  await db.run(deleteMovieQuery)
  response.send('Movie deleted successfully')
})
