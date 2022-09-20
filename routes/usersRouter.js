const express = require('express')
const UsersService = require('./../services/usersService')
const router = express.Router();
const service = new UsersService;

// router.get('/perfils', (req, res) => {
//     res.json([{
//             id: 1025524153,
//             nombre: 'Josepe',
//             correo: 'jsbarreto351@gmail.com'
//         },
//         {
//             id: 1648795412,
//             nombre: 'Juanito Alcachofa',
//             correo: 'noseasapo@gmil.com'
//         },
//         {
//             id: 1658876865,
//             nombre: 'el pepe',
//             correo: 'etesech@gmil.com'
//         }
//     ])
// })

router.get('/', async(req, res) => {
    const users = await service.find()
    res.json(users);
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await service.findOne(id)
    res.json(user);
  } catch (error) {
    next (error)
  }

});

router.post('/', async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser)
})

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);
        res.json(user)
    } catch (error) {
      next(error)
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta)
})

module.exports = router;
