const {Invoice} = require('../models/invoice.model');

const getinvoice = async (req, res) => {
    try {
        const invoiceData = await Invoice.find({});
        res.json(invoiceData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getinvoicebyId = async (req, res) => {
    try{
        const invoiceData = await Invoice.findById(req.params.id);
        if(!invoiceData) return res.status(404).json({message: 'Invoice not found'});
        res.json(invoiceData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const postInvoice = async (req, res) => {
    const { invoice_number, date_of_issue, due_date, clientId, organizationId, subtotal, total } = req.body;
  
    // Validate required fields
    if (!invoice_number || !date_of_issue || !due_date || !clientId || !organizationId || !subtotal || !total) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
  
      const newInvoice = new Invoice({ invoice_number, date_of_issue, due_date, clientId, organizationId, subtotal, total } );
 
      const savedInvoice = await newInvoice.save();
  
      res.status(201).json(savedInvoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const upateinvoice = async (req, res) => {
   const invoiceId = req.params.id;
     const { invoice_number, date_of_issue, due_date, clientId, organizationId, subtotal, total } = req.body;
    try{
        const invoiceData = await Invoice.findByIdAndUpdate(invoiceId, { invoice_number, date_of_issue, due_date, clientId, organizationId, subtotal, total }, { new: true });
        if(!invoiceData) return res.status(404).json({message: 'Invoice not found'});
        res.json(invoiceData);
        
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

  }

   const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    try {
        const invoiceData = await Invoice.findByIdAndDelete(invoiceId);
        if(!invoiceData) return res.status(404).json({message: 'Invoice not found'});
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  
module.exports = {getinvoice, getinvoicebyId, postInvoice, upateinvoice,  deleteInvoice};
