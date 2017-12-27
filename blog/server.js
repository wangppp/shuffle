const express = require('express')
const next = require('next')

const dev = process.env.APP_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then( () => {
        const server = express()

        server.get('/', (req, res) => {
            const page = '/index'
            // next render method: 传的第四个参数是作为url.query传进组件的。
            const params = {
                // testParam: "lorem"
            }
            app.render(req, res, page, params)
        })



        server.get('*', (req, res) => {
            return handle(req, res)
        })
        const port = dev ? 4000 : 3000
        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.err(err.stack)
        process.exit(1)
    })
