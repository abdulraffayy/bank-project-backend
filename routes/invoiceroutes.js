const express = require('express');
const router = express.Router();
const {getinvoice, getinvoicebyId, postInvoice, upateinvoice,  deleteInvoice  } = require('../Controller/InvoiceController');

router.get('/invoice', getinvoice);
router.get('/:id', getinvoicebyId);
router.get('/:id', getinvoicebyId);
router.post('/:id', postInvoice);
router.put('/:id', upateinvoice);
router.delete('/:id', deleteInvoice);






module.exports = router;

