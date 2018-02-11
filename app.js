//linking firebase
  var config = {
    apiKey: "AIzaSyCkMBlMgRzeBuZjCjnvdPEeAboRuynHGNY",
    authDomain: "fir-homework-e087c.firebaseapp.com",
    databaseURL: "https://fir-homework-e087c.firebaseio.com",
    projectId: "fir-homework-e087c",
    storageBucket: "",
    messagingSenderId: "997805260000"
  };
  firebase.initializeApp(config);


var data = firebase.database();

$("#add-train-btn").on("click", function() {

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

data.ref().push(newTrain);
 
  alert( trainName + " added");


  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");


  return false;
});

data.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());

      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;

      var timeArr = tFirstTrain.split(":");
      var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), trainTime);
      var tMinutes;
      var tArrival;
      

      if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
      } else {

    
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;

        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
      }

        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
          tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
      });

  
