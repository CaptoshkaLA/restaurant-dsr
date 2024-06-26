import express from 'express';
import { createReservation, getReservations, updateReservationStatus, updateReservationDateTime } from '../controllers/reservationController';
import { verifyAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReservationDTO'
 *     responses:
 *       201:
 *         description: Reservation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReservationDTO'
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Failed to create reservation
 */
router.post('/', createReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateReservationDTO'
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Failed to fetch reservations
 */
router.get('/', verifyAdmin, getReservations);

/**
 * @swagger
 * /reservations/{id}/status:
 *   put:
 *     summary: Update reservation status
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservationStatusDTO'
 *     responses:
 *       200:
 *         description: Reservation status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReservationDTO'
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Failed to update reservation status
 */
router.put('/:id/status', verifyAdmin, updateReservationStatus);

/**
 * @swagger
 * /reservations/{id}/datetime:
 *   put:
 *     summary: Update reservation date and time
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservationDateTimeDTO'
 *     responses:
 *       200:
 *         description: Reservation date and time updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReservationDTO'
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Failed to update reservation date and time
 */
router.put('/:id/datetime', verifyAdmin, updateReservationDateTime);

export default router;
