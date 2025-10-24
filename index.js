const express = require('express')
const path = require("path");

const app = express()
const seleccionesRouter = require('./routes/seleccionesRouter.js')
const jugadoresRouter = require('./routes/jugadoresRouter.js')

app.use(express.json())

app.use('/selecciones',seleccionesRouter)
app.use('/jugadores',jugadoresRouter)

app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'components', 'index.html'));
})




PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`la aplicacion esta corriendo por el puerto ${PORT}`)
})