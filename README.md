# AIGmailFilter
## How to use

### Step 1: Node JS backend
`git clone https://github.com/SarthakS97/AIGmailFilter.git`

`cd AIGmailFilter`

`npm install`

Replace the API key in index.js with your own from (Cohere)[https://cohere.com/]

`node index.js`

You should see "Server is running on port 3000"

Install Ngrok

`ngrok http 3000`

Copy the ngrok URL

### Step 2: Google Apps Script
Go to https://script.google.com/home and click "New project". Copy the code from AppsScript.gs and paste it. Ctrl+S. Replace YOUR_BACKEND_URL with your ngrok url.
Now in the drop down select setupTrigger function and press run. THe trigger has been setup to run every minute. 

### Step 3: Gmail
In the Gmail sidebar, scroll down to find "Labels" with a '+' sign next to it. Create appropriate labels. Find some important emails and label them. Close to 10 emails per 
label is recommended. The label icon can be found right beneath the search bar. If you followed the previous step correctly. New important unread emails will be classifed automatically. If you find
that an email is wrongly labelled just change the label manually and it will be considered by the AI model during the next classification.  
