const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, Binary, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'Recordings';

// Route to handle audio submission
app.post('/saveAudio', async (req, res) => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Audio_Binary');
    console.log(req.body);
    // Decode base64-encoded audio data
    const audioBuffer = Buffer.from(req.body.audioData, 'base64');

    
    const audioBinary = new Binary(audioBuffer);

    // Insert binary data into MongoDB
    await collection.insertOne({ audio: audioBinary });

    client.close();
    
    res.status(200).send('Audio saved successfully');
  } catch (error) {
    console.error('Error saving audio:', error);
    res.status(500).send('Error saving audio');
  }
});

// Route to handle playing the audio
app.get('/playAudio', async (req, res) => {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Audio_Binary');
    const objectid = new ObjectId("65e6e48e96bab0931fe7eb06")

    // Fetch the audio data from MongoDB
    const audioData = await collection.findOne({_id: objectid});

    client.close();

    if (!audioData) {
      res.status(404).send('No audio data found');
      return;
    }

    // Send the audio data back to the client
    res.status(200).send(audioData.audio.buffer);
  } catch (error) {
    console.error('Error playing audio:', error);
    res.status(500).send('Error playing audio');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
