//This is for make CRUDS at the Database, allowing change from the back-end
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../database';
import { Request, Response } from 'express';
import User from './User';
import { ObjectId } from 'mongodb';

//La secret_key se usa para el tema de los token de autentificacion, puede ser cualquier adena de caracteres,
//pero hay que mantenerla segura
const SECRET_KEY = 'nBfvoJd4Qfs1bTVACHWomYcl1Vdw9ZV8';


export const registerController = async (req: Request, res: Response) => {
    //Se ingresa a la base de datos
    const db = getDatabase();
    //Se hace el request
    const { username, password, rol, rut, nombre, apellido, direccion, email, telefono } = req.body;
    //Lista de usuarios (Documentos) de la base de datos (DB)
    const Users = db.collection<User>("Users");    
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ message: 'El usuario ya existe' });
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crea el nuevo usuario con la contraseña hasheada
        const result = await Users.insertOne({
          username: username,
          password: hashedPassword,
          rut: rut,
          rol: rol,
          nombre: nombre,
          apellido: apellido,
          direccion: direccion,
          email: email,
          telefono: telefono,
          activo: true,
          fecha_registro: new Date()
        });
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        return res.status(200).json({ status: 'success'})
      } catch (e: any){
        console.log(e);
        return res.status(409).json({ status: 'error', message: String(e) })
      }
};

export const loginController = async (req: Request, res: Response) => {
    //Se ingresa a la base de datos
    const db = getDatabase();
    //Se hace el request
    const { username, password } = req.body;
    //Lista de usuarios (Documentos) de la base de datos (DB)
    const Users = db.collection<User>("Users");    

    try {
      const user = await Users.findOne({username});

      //Por si no se enuentra el usuario o este es nullo
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar la contraseña
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      // Generar un token de acceso
      const token = jwt.sign({ id: user._id }, SECRET_KEY);

      //Se envia una respuesta de que salio todo bien, junto con el token
      console.log(user);
      return res.status(200).json({ status: 'success', token: token})

    } catch (e: any){
      console.log(e);
      return res.status(409).json({ status: 'error', message: String(e) })
    }
  };

export const deleteUserController = async (req: Request, res: Response) => {
    //Se ingresa a la base de datos
    const db = getDatabase();
    //Se hace el request para obetener el id
    const { id } = req.params;
    const _oId = new ObjectId(id)
    //Lista de usuarios (Documentos) de la base de datos (DB)
    const Users = db.collection<User>("Users");

    try {  
      // Verificar si el usuario existe
      const existingUser = await Users.findOne({ _id: _oId});
      if (!existingUser) {
        console.log(`User con _id: ${_oId} no existe`)
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Eliminar el usuario
      await Users.deleteOne({ _id: _oId});
      console.log(`User con _id: ${_oId} fue eliminado`)
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.log(`Error al intentar elimnar usuario: Server error`)
      res.status(500).json({ error: 'Error en el servidor' });
    }
};