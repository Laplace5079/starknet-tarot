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
  const url = `https://starknet-mainnet.infura.io/v3/${apiKey}`;

  const requestData = {
    jsonrpc: '2.0',
    method: 'starknet_blockNumber',
    params: [{}, 'latest'],
    id: 1,
  };

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
