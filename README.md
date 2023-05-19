# Tabski task

# How to run

The easiest way to run app is to have Docker installed on your machine and just run _docker-compose up_ in your terminal. It will create Postgres and Express app containers.
The second way is to have a Postgres container running on your machine, and then just create an .env file and populate it with these fields: **PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT**

# Endpoints

- /users
  - POST / _body_: { name, email, password }
  - GET /
  - GET /:id
  - PATCH /:id _body:_ { _name_, _password_ }
  - DELETE /:id
- /posts
  - POST / _body_: { title, content, authorId }
  - GET /
  - GET /:id
  - PATCH /:id _body_: { _title, content_ }
  - DELETE /:id
- /likes
  - POST / _body_: { userId, postId }
  - GET /
  - GET /:id
  - DELETE /:id
