const express = require('express')
const router = express.Router()


const jugadoresControllers = require('../controllers/jugadoresControllers.js')



router.get('/',jugadoresControllers.jugadores)

router.get('/:id',jugadoresControllers.unJugador)


router.get('/pais/:nombre',jugadoresControllers.jugadorDeSeleccion)



router.post('/',jugadoresControllers.agregarjugador)

module.exports = router