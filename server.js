const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/starknet-tarot-lambda.html');
});


app.get('/api', async (req, res) => {
  const apiKey = process.env.MyKey;
  const url = `https://starknet-goerli.infura.io/v3/${apiKey}`;

  const requestData = {
    "jsonrpc": "2.0",
    "method": "starknet_call",
    "params": [{

    "contract_address": "0x0093c0834371ffa3af62286e3ed6d506285b215bcc66a92cd3201186dccc0ba0", 
    "entry_point_selector":"0x38aa22aca071def6953f1718e451a1231aecc90408a457ec516d0e62622e9ce",
    
    "calldata":[]
    
    },

  
    "latest"],
    
    "id": 1
}





  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const jsonResponse = await response.json();

    res.send(jsonResponse);
  } catch (error) {
    console.error('Error sending JSON-RPC request:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
