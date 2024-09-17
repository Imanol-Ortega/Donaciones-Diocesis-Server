import {pool} from "../db.js";

export const guardarDonado = async(req,res)=>{
    try {
        const {institucionid,inventario} = req.body;

        const resp = await pool.query('INSERT INTO cabecera_donado (institucionid) VALUES($1) RETURNING cabecera_donadoid',[institucionid])

        for(let i=0; i<inventario.length;i++){
            const rs = await pool.query('INSERT INTO donado (cabecera_donadoid,inventarioid,donadocantidad) VALUES($1,$2,$3)',
                                        [resp.rows[0].cabecera_donadoid,inventario[i].inventarioid,inventario[i].cantidad]);

            const rp = await pool.query('SELECT inventariocantidad FROM inventario WHERE inventarioid = $1 AND inventariocantidad = $2 ',[inventario[i].inventarioid,inventario[i].cantidad])
            if(rp.rows == 0){
                const rs3 = await pool.query('UPDATE inventario SET inventariocantidad = inventariocantidad - $1 WHERE inventarioid = $2',[inventario[i].cantidad,inventario[i].inventarioid])
            }else{
                const rs2 = await pool.query('UPDATE inventario SET inventarioestado = false, inventariocantidad = 0 WHERE inventarioid = $1',[inventario[i].inventarioid]);
            }
        }
        res.status(200).json({message:"guardado"})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerDonados = async(req,res)=>{
    try {
        const query = `WITH DonacionesDetalle AS (
                            SELECT 
                                cd.cabecera_donadoid,
                                i.inventarionombre,
                                d.donadocantidad
                            FROM 
                                Donado d
                            INNER JOIN Inventario i ON d.inventarioid = i.inventarioid
                            INNER JOIN Cabecera_Donado cd ON d.cabecera_donadoid = cd.cabecera_donadoid
                        )
                        SELECT 
                            cd.cabecera_donadoid,
                            i.institucionnombre,
                            i.instituciondireccion,
                            STRING_AGG(dd.inventarionombre || ' (' || dd.donadocantidad || ')', ', ') AS inventario_donado,
                            SUM(dd.donadocantidad) AS total_donado
                        FROM 
                            Cabecera_Donado cd
                        INNER JOIN Institucion i ON cd.institucionid = i.institucionid
                        INNER JOIN DonacionesDetalle dd ON cd.cabecera_donadoid = dd.cabecera_donadoid
                        GROUP BY 
                            cd.cabecera_donadoid, i.institucionnombre, i.instituciondireccion;`

        const result = await pool.query(query)
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};



export const eliminarDonado = async(req,res)=>{
    try {
        const rp = await pool.query('DELETE FROM donado WHERE cabecera_donadoid = $1',[req.params.id]);
        const rp2 = await pool.query('DELETE FROM cabecera_donado WHERE cabecera_donadoid = $1',[req.params.id]);
        res.status(200).json({message:"Eliminado Correctamente"});
    } catch (error) {
        console.log(error)
    }
}