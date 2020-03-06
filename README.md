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


## Step 2 - Create a Dataflow job that reads from this topic subscription, and write it into bigquery table.

1. Create a dataset and table in BigQuery via google console
        
        Go console of big query, click on your project from left, then create dataset and create table
        in my case: http and requests

2. Create a storage bucket for dataflow streaming from pubsub to bigquery job

        Go to google console -> storage -> browser and add a new bucket


![Created bucket](images/7.png)

3. Create google dataflow job for streaming from pubsub to bigquery
 ![Created bucket](images/7.png)

![Created dataflow job](images/6.png)
![Created dataflow job](images/5.png)

4. Testing ETL

curl -X POST "https://us-central1-simple-etl-270310.cloudfunctions.net/publish" -H "Content-Type:application/json" --data '{"m1":"msg1"}'

curl -X POST "https://us-central1-simple-etl-270310.cloudfunctions.net/publish" -H "Content-Type:application/json" --data '{"m1":"msg1", "m2":"msg2"}'

curl -X POST "https://us-central1-simple-etl-270310.cloudfunctions.net/publish" -H "Content-Type:application/json" --data '{"m1":"msg1", "m2":"msg2", "m3":"msg3"}'

Result I see in bigquery:
        
![Big Query result](images/8.png)

