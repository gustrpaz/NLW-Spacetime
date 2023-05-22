import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

// Criando uma API, precisa de um servidor HTTP
const app = fastify()

app.register(multipart)

// Para deixar as Imagens Estáticas
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // Todas URLs de front-end poderão acessar o nosso back-end
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

// Para que fique ouvindo requisições em uma porta
// Uma Promise no JS pode ser algo que irá demorar para acontecer
// Toda Promisse permite concatenar um método then()
// Quando o servidor estiver no ar, e quero executar uma função
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
