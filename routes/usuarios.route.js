const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, putUsuarios, deleteUsuarios, postUsuarios } = require('../controllers/usuarios.controller');
const { validarRol, existeEmail } = require('../helpers/db-validators');
const { validaCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios);

router.put('/:id', putUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'Correo no válido').isEmail(),
    check('password', 'El password debe tener 6 o más caracteres').isLength({ min: 6 }),
    // check('rol', 'Rol no válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    // Lo de abajo es lo mismo que check('rol').custom( rol => validarRol(rol) )
    check('rol').custom( validarRol ),
    check('correo').custom( existeEmail ),
    validaCampos

], postUsuarios);

router.delete('/', deleteUsuarios);








module.exports = router;