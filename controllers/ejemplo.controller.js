import Ejemplo from "../models/ejemplo.model.js";
import mongoose from "mongoose";
import express from 'express';

export const getAllEjemplos = async(_req, res) =>{
    console.log('obtiene todos los ejemplos');
    try{
        const ejemplos = await Ejemplo.find({},{__v:0});
        if(ejemplos.length === 0){
            return res.status(404).json({
                msg: 'no se encontraron ejemplos'
            });
        }
        return res.status(200).json({
            ejemplos
        });
    } catch (error){
        res.status(500).json({
            msg: 'error al obtener ejemplos'
        });
    }
};

export const getEjemploByid = async (req, res) => {
    console.log('EJEMPLO POR ID');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return req.status(400).json({
                msg: 'ID no valido jaja'
            });
        }

        const ejemplo = await Ejemplo.findById(id);
        if(!ejemplo){
            return res.status(404).json({
                msg: 'ejemplo no encontrado causa'
            });
        }

        return req.status(200).json({
            ejemplo
        });

    } catch (error){
        return res.status(500).json({
            msg: 'error al obtener el ejemplo'
        });
    }

}

export const postEjemplo = async (req, res) => {
    console.log('POST EJEMPLO');
    const body = req.body;
    const ejemplo = new Ejemplo (body);
    try{
        const validationError = ejemplo.validateSync();
        if (validationError){
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await ejemplo.save(); 
        return res.status(201).json({
            ejemplo
        });
} catch (error) {
    return res.status(500).json({
        msg: 'error al guardar el ejemplo'
    });
}
};


export const putEjemeplo = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no valido'
            });
        
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id,body,{new:true, runValidators:true});
        if(ejemplo){
            return res.status(404).json({
                msg: 'ejemplo no encontrado'
            });
        }
        return res.status(200).json({
            ejemplo
        });


    } catch (error) {
        return res.status(500).json({
            msg: 'error al actualizar el ejemplo'

        });
        
    }
}

export const deleteEjemplo = async(req,res) =>{
    console.log('DELETE EJEMPLO');
    const id = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg:'ID NO VALIDO'
            });
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if(!ejemplo){
            return res.status(404).json({
                msg: 'ejemplo no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'ejemplo eliminado',
            ejemplo
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'error al eliminar el ejemplo'
        });
    }
};