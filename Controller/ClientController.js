const {Client} = require('../models/client.model');


const getClient = async (req, res) => {
    try {
      const clients = await Client.find({});
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };
 

 const getClientByid = async (req, res) => {
    try {
      const clients = await Client.findById(req.params.id);
      if (!clients) return res.status(404).json({ message: 'Client not found' });
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };

 const createClient = async (req, res) => {
  const { name, guardian, address } = req.body;


  if (!name || !guardian || !address) {
      return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
      const newClient = new Client({ name, guardian, address });
      const savedClient = await newClient.save();
      res.status(201).json(savedClient); 
  } catch (error) {
      console.error('Error creating client:', error.message);
      res.status(500).json({ error: error.message });
  }
};




const UpdatedClient = async (req, res) => {
  const ClientId = req.params.id;
  const { name, guardian, address } = req.body;
  try {
    const updatedclient = await Client.findByIdAndUpdate(
      ClientId,
      { name, guardian, address }
      , { new: true });    
    if (!updatedclient) return res.status(404).json({ message: 'Client not found' });
    res.json(updatedclient);
  }
  catch (err)  {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

const deleteClient = async (req, res) => {
  try {
    const ClientId = req.params.id;
    const deletedClient = await Client.findByIdAndDelete(ClientId);
    if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
    res.json(deletedClient);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  } 
}



    

module.exports = {getClient, getClientByid, createClient, UpdatedClient, deleteClient,};