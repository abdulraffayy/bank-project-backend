const express = require('express');
const connectDb = require('./db/index.js')();
const cors = require('cors');
const { Client } = require('./models/client.model.js');
const { Organization } = require('./models/organization.model.js');
const { Service } = require('./models/service.model.js');
const { Invoice } = require('./models/invoice.model.js');
const { InvoiceLineItem } = require('./models/invoiceLineItems.model.js');
const { PaymentDetails } = require('./models/paymentdetails.model.js');
const app = express();
const PopulateData = require('./populateDb/index.js');

const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const clientRoutes = require('./routes/userroutes.js');
const invoiceroutes = require('./routes/invoiceroutes.js'); 


const port = process.env.PORT || 3003;
app.use(express.json());
app.use(cors());
app.use(express.json());
// client routes 
app.use('/api', clientRoutes);
// end client routes 




//invoice routes
app.use('/invoice', invoiceroutes);
//end invoice routes
  
app.get('/get-data', async (req, res) => {
    try {
      // await PopulateData();
  
      const clients = await Client.find();
      const organizations = await Organization.find();
      const services = await Service.find();
      const invoices = await Invoice.find().populate('clientId').populate('organizationId');
      const invoiceLineItems = await InvoiceLineItem.find()
        .populate('invoiceNumber')
        .populate('serviceId');
      const paymentDetails = await PaymentDetails.find(); 
    
      const result = {
        clients,
        organizations,
        services,
        paymentDetails,
        invoices: invoices.map(invoice => ({
          ...invoice.toObject(),
          client: invoice.clientId,
          organization: invoice.organizationId,
        })),
        invoiceLineItems: invoiceLineItems.map(lineItem => ({
          ...lineItem.toObject(),
          invoice: lineItem.invoiceNumber,
          service: lineItem.serviceId,
        })),
      };
    
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    }
  });
  
  


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));










































