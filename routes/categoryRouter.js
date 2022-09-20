const express = require('express')
const CategoriesService = require('./../services/categoryService')
const router = express.Router();
const service = new CategoriesService;

router.get('/', async(req, res) => {
    const categories = await service.find()
    res.json(categories)
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error)
  }
});

// router.get('/:categoryId/productos/:productId', async(req, res) => {
//     const {categoryId, productId} = req.params
//     const category = await service.findOne(categoryId);
//     const product = await service2.findOne(productId);
//     res.json(category);
//     res.json(product);
//     // res.json([{
//     //     categoryId,
//     //     productId,
//     // }])
// })

router.post('/', async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body)
    res.status(201).json(newCategory)
})

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const category = await service.update(id, body);
        res.json(category)
    } catch (error) {
        next(error)
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta)
})

module.exports = router;
