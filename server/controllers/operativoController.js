import operativo_model from "../models/Operativo_model.js"

// FUNCIONALIDADES
// consulta de todos los registros
const listar_operativo = async (req, res) => {
    try {
        const operativos = await operativo_model.findAll();
        return res.status(200).json(operativos);
    } catch (error) {
        console.log(error);
        const mensaje_error = 'Ocurrió un error al obtener los registros de operativos';
        return res.status(500).json({ error: mensaje_error });
    }
};

// consulta por un registro (por id)
const obtener_operativo = async (req, res) => {
    const operativo_id = req.params.id;

    try {
        const operativo = await operativo_model.findByPk(operativo_id);

        if (!operativo) {
            const mensaje = 'No se encontró el registro solicitado';
            return res.status(404).send(mensaje);
        }

        return res.status(200).json(operativo);
    } catch (error) {
        console.log(error);
        const mensaje_error = 'Ocurrió un error al obtener el registro de operativo';
        return res.status(500).json({ error: mensaje_error });
    }
};

// registro de operativo
const registrar_operativo = async (req, res) => {
    try {
        const operativo_body = req.body;
        const operativo_almacenado = await operativo_model.create(operativo_body);
        return res.status(200).json({ message: 'Registro creado!', operativo_almacenado });
    } catch (error) {
        console.log(error);
        const mensaje_error = 'Ocurrió un error al registrar el operativo';
        return res.status(500).json({ error: mensaje_error });
    }
};

// modifica los datos buscando por id
const modificar_operativo = async (req, res) => {
    const operativo_id = req.params.id;

    try {
        const operativo = await operativo_model.findByPk(operativo_id);

        if (!operativo) {
            return res.status(404).send('El operativo no se encuentra');
        }

        await operativo.update(req.body);
        return res.status(200).json({ message: 'Registro modificado', operativo });
    } catch (error) {
        console.log(error);
        const mensaje_error = 'Ocurrió un error al modificar el operativo';
        return res.status(500).json({ error: mensaje_error });
    }
};

// elimina por id
const eliminar_operativo = async (req, res) => {
    const operativo_id = req.params.id;

    try {
        const operativo = await operativo_model.findByPk(operativo_id);

        if (!operativo) {
            const mensaje = 'No se encontró el operativo solicitado';
            return res.status(404).send(mensaje);
        }

        await operativo.destroy();
        return res.status(200).send('Operativo eliminado');
    } catch (error) {
        console.log(error);
        const mensaje_error = 'Ocurrió un error al eliminar el operativo';
        return res.status(500).json({ error: mensaje_error });
    }
};

// exports
export {
    listar_operativo,
    obtener_operativo,
    registrar_operativo,
    modificar_operativo,
    eliminar_operativo
};
