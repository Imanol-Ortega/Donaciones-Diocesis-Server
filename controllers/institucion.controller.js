import {pool} from "../db.js";


export const obtenerInstituciones = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM institucion WHERE institucionestado = true');
        res.json(result.rows);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const guardarInstituciones = async(req,res)=>{
    try {
        const {nombre,telefono,direccion} = req.body;
        const result = await pool.query('INSERT INTO institucion (institucionnombre,instituciontelefono,instituciondireccion) VALUES($1,$2,$3)',[nombre,telefono,direccion]);
        res.status(200).json({message:"Se guardo Correctamente"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const eliminarInstitucion = async(req,res)=>{
    try {
        const result = await pool.query('UPDATE institucion SET institucionestado = $1 WHERE institucionid = $2',[false,req.params.id]);

        res.status(200).json({message:"Se borro Correctamente"});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}