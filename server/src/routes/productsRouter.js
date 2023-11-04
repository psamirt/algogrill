import { Router } from 'express';
const router = Router();
import {
  postProduct,
  getProducts,
  getById,
  deleteById,
  updateProduct
} from '../controllers/productsController.js'; // Asegúrate de que la ruta sea correcta

// Rutas para el controlador de productos
router.post('/newProduct', postProduct);
router.get('/getAllProducts', getProducts);
router.get('/productId', getById);
router.delete('/deleteId', deleteById); // Cambiado de GET a DELETE para eliminar un producto
router.put('/updateProduct/:id', updateProduct); // Corregido el nombre de la ruta y el parámetro :id

export default router;
