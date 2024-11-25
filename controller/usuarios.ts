import { isEmail } from './../node_modules/@types/validator/index.d';
import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });
}


export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: 'No existe un usuario con el id: ' + id
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (!existeEmail) {
            const usuario = await Usuario.create(body);
            await usuario.save();

            return res.json(usuario)
        } else {

            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email
            })

        }



    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'no existe un usuario con el id: ' + id
            });
        }

        await usuario.update(body);

        res.json({ usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: 'El usuario no fue encontrado'
        });
    }

    // Destruccion logica
    await usuario.update({ estado: 0 });

    // destruccion fisica
    // await usuario.destroy();

    res.json({ usuario })

}

