'use strict';

// [START functions_pubsub_setup]
const {PubSub} = require('@google-cloud/pubsub');

// Instantiates a client
const pubsub = new PubSub();
// [END functions_pubsub_setup]

// [START functions_pubsub_publish]
/**
 * Publishes a message to a Cloud Pub/Sub Topic.
 *
 * @example
 * gcloud functions call publish --data '{"topic":"[YOUR_TOPIC_NAME]","message":"Hello, world!"}'
 *
 *   - Replace `[YOUR_TOPIC_NAME]` with your Cloud Pub/Sub topic name.
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {string} req.body.topic Topic name on which to publish.
 * @param {string} req.body.message Message to publish.
 * @param {object} res Cloud Function response context.
 */
exports.publish = async (req, res) => {
  if (!req.body.m1 && !req.body.m2 && !req.body.m3) {
    res
      .status(500)
      .send(
        'Missing parameter(s); include "m1" or "m2" or "m3" properties in your request.'
      );
    return;
  }
  
  var m1 = req.body.m1 || "No text";
  var m2 = req.body.m2 || "No text";
  var m3 = req.body.m3 || "No text";
  
  console.log(`Publishing message to topic ${req.body.topic}`);

  // References an existing topic
  const topic = pubsub.topic('ALL_REQUESTS');

  const messageBuffer = Buffer.from(JSON.stringify({"m1": m1, "m2": m2, "m3": m3}), 'utf8');

  // Publishes a message
  try {
    await topic.publish(messageBuffer);
    res.status(200).send('Message published.');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
};