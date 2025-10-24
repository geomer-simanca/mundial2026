const supabase  = require('../database/coneccion.js')

class Seleccriones{
    constructor(){}

    async selecciones(req,res){
        try{

            const {data, error} = await supabase
                .from('selecciones')
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
    

    async unasSeleccion(req,res){
        try{
            const {id} = req.params

            const {data, error} = await supabase
                .from('selecciones')
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

    async agregarSeleccion(req,res){
        try{

            const {pais, confederacion , campeonatos_mundiales , bandera_url }  =req.body

            if (!pais || !confederacion || !campeonatos_mundiales || !bandera_url  === undefined){
                return res.status(400).json({msg:'pais, confederacion , campeonatos_mundiales , bandera_url '})
            }

            const {data,error} = await supabase
                .from('selecciones')
                .insert([
                    {pais, confederacion , campeonatos_mundiales , bandera_url }
                ])
                .select('*')
                .single()

            if (error) throw error;

            res.status(201).json({
                msg:`seleccion creada correctamente`,
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

module.exports  = new Seleccriones()