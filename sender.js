const express = require('express');
const app = express();
const port = 3000;
// Import AWS SDK v3
const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge');
console.log(process.env.AWS_ACCESS_KEY_ID)
// Create an EventBridge client
const eventBridge = new EventBridgeClient({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
});

// Define the event
const event = {
  Entries: [
    {
      EventBusName: 'eks-pod-event',
      Source: 'eks.pod', // Replace with your source
      DetailType: 'your.detailType', // Replace with your detail type
      Detail: JSON.stringify({
        key1: 'value1', // Replace with your event details
        key2: 'value2',
      }),
      Time: new Date(),
    },
  ],
};

// Put the event to EventBridge


app.get('/', async (req, res) => {
  try {
    const data = await eventBridge.send(new PutEventsCommand(event));
    console.log('Event put successfully:', data);
    res.send('Event put successfully');
  } catch (err) {
    console.error('Error putting event:', err);
    res.status(500).send('Error putting event');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.info("Interrupted");
  process.exit(0);
})
