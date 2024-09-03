import {pool} from "../db.js";

export const guardarDonado = async(req,res)=>{
    try {
        const {institucionid,inventario} = req.body;

        for(let i=0; i<inventario.length;i++){
            const rs = await pool.query('INSERT INTO donado (institucionid,inventarioid,donadocantidad) VALUES($1,$2,$3)',
                                        [institucionid,inventario[i].inventarioid,inventario[i].cantidad]);

            const rp = await pool.query('SELECT inventariocantidad FROM inventario WHERE inventarioid = $1 AND inventariocantidad = $2 ',[inventario[i].inventarioid,inventario[i].cantidad])
            if(rp.rows == 0){
                const rs3 = await pool.query('UPDATE inventario SET inventariocantidad = inventariocantidad - $1 WHERE inventarioid = $2',[inventario[i].cantidad,inventario[i].inventarioid])
            }else{
                const rs2 = await pool.query('UPDATE inventario SET inventarioestado = false, inventariocantidad = 0 WHERE inventarioid = $1',[inventario[i].inventarioid]);
            }
        }
        res.json("guardado")

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerDonados = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerUnDonado = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};