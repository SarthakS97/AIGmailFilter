function classify() {
  var labels = GmailApp.getUserLabels();
  var examples = [];

  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    var threads = label.getThreads();

    for (var j = 0; j < threads.length; j++) {
      var thread = threads[j];
      var messages = thread.getMessages();
      var firstMessage = messages[0];

      var body = firstMessage.getPlainBody(); // Change to getBody() for HTML body

      var example = {
        text: body,
        label: label.getName()
      };

      examples.push(example);
    }
  }

  var newThreads = GmailApp.search("is:important is:unread -has:userlabels");
  var inputs = [];

  newThreads.forEach(function(thread) {
    var newMessages = thread.getMessages();
    var latestMessage = newMessages[newMessages.length - 1]; // Retrieve the latest message

    var body = latestMessage.getPlainBody();
    Logger.log(body);
    inputs.push(body);

    var trainURL = "https://4f4e-49-205-129-224.ngrok-free.app/classify";
    var payload = {
      examples: examples,
      inputs: inputs
    };

    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch(trainURL, options);
    var label = response.getContentText(); // Assign response.getContentText() as the label

    // Assign the label to the latest email
    latestMessage.getThread().addLabel(GmailApp.getUserLabelByName(label));
  });
}

function createTrigger() {
  var trigger = ScriptApp.newTrigger('classify')
    .timeBased()
    .everyMinutes(1)
    .create();
}

// Function to delete the existing trigger (if needed)
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'classify') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// Run this function to set up the trigger
function setupTrigger() {
  deleteTrigger(); // Delete existing trigger (if any)
  createTrigger(); // Create a new time-based trigger
}
