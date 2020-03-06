# Build a basic data "ETL" like, using GCP capabilities.

## Step 1 - HTTP server that listen to requests, get them as-is, and write them into google pubsub topic

1. Initialization of gcloud account - free tier and 'gcloud init' configuration in console.

2. Clone this repository:
  
        git clone https://github.com/warolv/simple_etl.git
        cd cloud-function

3. Create a Cloud Pub/Sub topic - 'ALL_REQUESTS':

        gcloud beta pubsub topics create ALL_REQUESTS

4. Deploy the publish function with an HTTP trigger:

        gcloud functions deploy publish --trigger-http --runtime nodejs8

5. Call the publish function: 

        gcloud functions call publish --data '{"topic":"ALL_REQUESTS","message":"Hello People!"}'

6. Send request with curl:

        curl -X POST "https://us-central1-simple-etl-270310.cloudfunctions.net/publish" -H "Content-Type:application/json" --data '{"topic":"ALL_REQUESTS","message":"Send 1st request using CURL!"}'

## Screenshots for step 1
![Created cloud function](images/1.png)

![Created pubsub topic](images/2.png)

![Created subscription to view topic messages](images/3.png)

![View first and second sent messages](images/4.png)



