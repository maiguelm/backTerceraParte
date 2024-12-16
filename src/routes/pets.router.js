import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la mascota
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         specie:
 *           type: string
 *           description: Especie de la mascota
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento de la mascota
 *         adopted:
 *           type: boolean
 *           description: Estado de adopción de la mascota
 *       required:
 *         - name
 *         - specie
 *         - birthDate
 *       example:
 *         id: "1"
 *         name: "Eddie Smith"
 *         specie: "Perro"
 *         birthDate: "2020-05-20"
 *         adopted: false
 */

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints para gestionar mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtiene la lista de mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 */
router.post('/', petsController.createPet);

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Crea una nueva mascota con una imagen
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Mascota con imagen creada exitosamente
 */
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualiza una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *       404:
 *         description: Mascota no encontrada
 */
router.put('/:pid', petsController.updatePet);

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: Mascota no encontrada
 */
router.delete('/:pid', petsController.deletePet);

export default router;
