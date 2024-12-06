const express = require('express');
const router = express.Router();
const { getClient, getClientByid, createClient, UpdatedClient, deleteClient} = require('../Controller/ClientController');

router.get('/client', getClient);
router.get('/:id', getClientByid);
router.post('/', createClient);
router.put('/:id', UpdatedClient);
router.delete('/:id', deleteClient);





module.exports = router;