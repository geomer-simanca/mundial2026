const express = require('express')
const router = express.Router()

const seleccionesControllers = require('../controllers/seleccionesControllers.js')


router.get('/',seleccionesControllers.selecciones)


router.get('/:id',seleccionesControllers.unasSeleccion)



router.post('/',seleccionesControllers.agregarSeleccion)

module.exports = router