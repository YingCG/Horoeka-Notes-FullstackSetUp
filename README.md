# Full stack react app

##  Setting up

### Package install

```
•	npm install
•	npm install express
•	npm run webpack
•	npm run dev
•	npm init to create package.json
```
### Knex Database
```
npm install sqlite3
npx knex migrate:latest
npx knex seed:run
```
 
#
## Client
1. Components

`App.jsx` | `ListOfThings.jsx` | `SingleThing.jsx`
```
import React from 'react'
import { Route } from 'react-router-dom'

import Component from './Component'


function App() {
  return (
    <>
      <div className='title'>
        <img src='/images/imagename.gif' />
        <h1>Title</h1>
      </div>

        <Route path="/" component={Nav} />
        <Route path="/" exact component={Home} />
        <Route path="/continents/:name" component={ListOfThings} />
        <Route path="/continent/:name/:id" component={Something} />
      </div>
    </>
  )
}

export default App
```





2.	Index.js

```
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  )
})

```
3.	Webpack.config.js
```
const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}

```

#
## Rest API
1.	Api.js
```
import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

export function getSomething () {
  return request
    .get(`${serverURL}/welcome`)
    .then(res => {
      return res.body
    })
    .catch(err => {
      console.error('ERROR:', err.message)
    })
}

```

#
## Database
 Knex Database

`1. npm run knex init`

`2. knexfile.js`

```
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  }
}
```
`3. npm run knex migrate: make tablename_with_s`

* create schema at migrations folder

```
exports.up = function (knex) {
  return knex.schema.createTable('films', function (table) {
    table.increments('id').primary()
    table.string('name')
     table.integer( 'userId' ).references( 'user.id' );
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('films')
}
```
`4. npm run knex migrate: latest`

`5. npm run knex seed: make tablename_with_s`
* the parent table shall make first, good to name with number

`6. npm run knex seed: run`

#
## Server

`index.js`
```
const server = require('./server')

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
})
```

`server.js`
```
const path = require('path')
const express = require('express')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

module.exports = server
```

###  Db folder for function 
`db.js`


```
const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
    eachFuntions
}

function doSomethingById(elementID, db = connection){
  return db('TableName_s')
  .select()
  .then( ()=> { return db('')})
  .insert()
  .where('post_id', postId)
  .update
  .first()
}

```
`.where('name_in_column', alia) `

`.select('what we select') `


```
function getCommentById(commentId, db = connection) {
    return db('Comments')
        .where('id', commentId)
        .select(
            'id',
            'post_id as postId',
            'date_posted as datePosted',
            'comment',      
        )
        .first()
}

```
`.insert() `

`.then() `

```
function addPost(post, db = connection) {
    return db('Posts')
        .insert(
            {
                title: post.title,
                date_created: new Date(Date.now()),
                comment_count: 0,
                paragraphs: JSON.stringify(post.paragraphs)
            }
        )
        .then(() => {
            return {
                id: post.id,
                title: post.title,
                date_created: post.date_created,
                comment_count: post.comment_count,
                paragraphs: JSON.stringify(post.paragraphs)
            }
        }
        )
}
```
`.update() `
```
function updateComment(commentId, updatedComment, db = connection) {
    return db('Comments')
        .where('id', commentId)
        .update({
            post_id: updatedComment.postId,
            comment: updatedComment.comment
        })
}

```
`.delete() `
```
function deteleComment(commentId, db = connection){
    return db('Comments')
    .where('id', commentId)
    .delete()
}   
```

###  Routes
* GET   //  to read database
```

router.get('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)

  db.getComments(postId)
  .then((comments)=> {
    return res.json(comments)
  })
  .catch((err) => console.error(err))
})

```

* POST  // to add thing to database

```

router.post('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  const { comments } = req.body

  db.postComment(postId, comments)
    .then((comment) => {
      return res.json(comment)
    })
    .catch((err) => console.error(err))
})

```

* PATCH    //  to update piece of database
* PUT   // to update entire database or 
```

router.patch('/:id', (req, res) => {

  const id = Number(req.params.id)

  const { title, paragraphs } = req.body

  const updatedPost = {
    title: title,
    paragraphs: paragraphs
  }

  db.updatePost(id, updatedPost)
  .then(() => {
    return db.getPostById(id)
  })
    .then((post) => {
      res.json(post)
      return null
    })
    .catch((err) => console.error(err))
})

```



* DELETE to delete database
```

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
    
  db.deletePost(id)
  .then(()=> {
    return res.sendStatus(204)
  })
  .catch((err) => console.error(err))
})

```
###  Public
`images`

``` 
All images go here
```

`index.js`
```

const server = require('./server')
server.on('unhandledRejection', console.log.bind(console))


const port = process.env.PORT || 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})

```

`Bundle.js`

```
lot of things here
```

#
## Testing
```
Testing routes with SuperTest
* Separate your server from making it listen
* server.js contains the server config and the routes
* index.js imports the server and makes it listen
* npm install jest supertest -D
* touch server.test.js
* Test routes 🚀
```
