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
        const query = `WITH DatosAgrupados AS (
  SELECT
  i.institucionid,
    i.institucionnombre,
    i.instituciondireccion,
    STRING_AGG(i2.inventarionombre || ' (' || d.donadocantidad || ')', ', ') AS inventario_detallado,
    SUM(d.donadocantidad) AS total_donado
  FROM
    Donado d
  INNER JOIN Institucion i ON d.institucionid = i.institucionid
  INNER JOIN Inventario i2 ON d.inventarioid = i2.inventarioid
  GROUP BY
    i.institucionnombre, i.instituciondireccion, i.institucionid
)
SELECT * FROM DatosAgrupados;` 
        const result = await pool.query(query)
        res.status(200).json(result.rows)
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