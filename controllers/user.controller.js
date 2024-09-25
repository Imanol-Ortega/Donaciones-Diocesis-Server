import {pool} from "../db.js";
import bcrypt from 'bcrypt'

export const login = async(req,res)=>{
    try {
        console.log(req.body)
        const rb = req.body;
        const rs = await pool.query('SELECT * FROM usuarios WHERE usernombre = $1',[rb.nombre]);
        if(rs.rows == 0){
            return  res.status(404).json({message:"No existe el usuario"});
        }

        const isValid = await bcrypt.compare(rb.password, rs.rows[0].userpassword);

        if(isValid){
            res.status(200).json({usuario:rs.rows[0].usernombre})
        }else{
            return res.status(401).json({message:"Contraseña Incorrecta"})
        }

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const register = async(req,res)=>{
    try {
        const rb = req.body;
        const find = await pool.query('SELECT usernombre FROM usuarios WHERE usernombre = $1',[rb.nombre]);

        if(find.rows != 0){
            return res.status(409).json({error:'El nombre de usuario ya existe'});
        }

        const hashedPassword = await bcrypt.hash(rb.password, 10);
        const result = await pool.query('INSERT INTO usuarios (usernombre,userpassword) VALUES($1,$2)',[rb.nombre,hashedPassword]);
        res.status(200).json({message:"Usuario creado correctamente"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

