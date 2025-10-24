const supabase  = require('../database/coneccion.js')

class Jugadores{
    constructor(){}

    async jugadores(req,res){
        try{

            const {data, error} = await supabase
                .from('jugadores')
                .select('*');

            if (error) throw error;


            res.json(data);

        }catch(error){

            res.status(500).json({
                msg:'error al intentar consultar todas las selecciones',
                error:error.message
            })

        }
    }
    

    async unJugador(req,res){
        try{
            const {id} = req.params

            const {data, error} = await supabase
                .from('jugadores')
                .select(`*`)
                .eq('id',id)
                .single()

                if (error) throw error;


                res.json( data );





        }catch(error){

            res.status(500).json({
                msg:`error al intentar consultar la seleccion ${req.params.id}`,
                error:error.message
            })

        }
    }

    async jugadorDeSeleccion(req,res){
        try{
            const {nombre} = req.params

            const {data:seleccion , error:errorseleccion} = await supabase
                .from('selecciones')
                .select(`id`)
                .ilike('pais',nombre)
                .single()

            
            if (errorseleccion || !seleccion) {
                return res.status(404).json({
                    msg:`no se puedo encontrar la seleccion de ${nombre}`,
                    error:errorseleccion.message
                })
            }


            const {data:jugadores , error:errorjugadores} = await supabase
                .from('jugadores')
                .select('*')
                .eq('equipo_id',seleccion.id)
                .order('nombre',{ascending:true})

            if (errorjugadores) throw errorjugadores

            res.json({
                seleccion:nombre,
                tottal_jugadores:jugadores.length,
                jugadores
            })






        }catch(errorjugadores){

            res.status(500).json({
                msg:`error al intentar consultar los jugadores de la seleccion de ${req.params.nombre}`,
                error:errorjugadores.message
            })

        }
    }

    async agregarjugador(req,res){
        try{

            const {nombre, edad , equipo_id , url_imagen,dribling, velocidad, regate }  =req.body

            if (!nombre || !edad || !equipo_id || !url_imagen  || !dribling || !velocidad || !regate === undefined){
                return res.status(400).json({msg:'nombre, edad , equipo_id , url_imagen,dribling, velocidad, regate '})
            }

            const {data,error} = await supabase
                .from('jugadores')
                .insert([
                    {nombre, edad , equipo_id , url_imagen,dribling, velocidad, regate }
                ])
                .select('*')
                .single()

            if (error) throw error;

            res.status(201).json({
                msg:`jugador  creada correctamente`,
                seleccion : data
            })


        }catch (error){

            res.status(500).json({
                msg:`error al intentar agregar una seleccion`,
                error: error.message
            })

        }
    
    }
}

module.exports  = new Jugadores()