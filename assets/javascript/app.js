$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyATT8P12jN5iV-GSIBo35lHCp6nQJEJ3vw",
        authDomain: "train-scheduler-e689a.firebaseapp.com",
        databaseURL: "https://train-scheduler-e689a.firebaseio.com",
        projectId: "train-scheduler-e689a",
        storageBucket: "train-scheduler-e689a.appspot.com",
        messagingSenderId: "347399618930"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submitBTN").click(function (event) {
        //I want the default to occur on the submit to clear out the text boxes
        //event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destinationName = $("#destination-name").val().trim();
        var trainTime = $("#train-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim();

        database.ref().push({
            name: trainName,
            destination: destinationName,
            time: trainTime,
            frequency: trainFrequency
        });



    });

    //Displays firebase data to DOM
    database.ref().on("child_added", function (snapshot) {
        var userTrain = $("<td>").text(snapshot.val().name);
        var userDestination = $("<td>").text(snapshot.val().destination);
        var userTime = $("<td>").text(snapshot.val().time);
        var userFrequency = $("<td>").text(snapshot.val().frequency);

        var tFrequency = snapshot.val().frequency;
        var firstTime = snapshot.val().time;
        console.log("First Time: " + firstTime);

        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log("Converted First Time: " + firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        console.log("frequency: " + tFrequency);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format('LT'));


        var nextArrival = $("<td>").text(moment(nextTrain).format('LT'));
        var minutesAway = $("<td>").text(tMinutesTillTrain);

        //Appends to DOM
        var $tbody = $("tbody");
        var $tr = $("<tr>");
        $tr.append(userTrain, userDestination, userFrequency, nextArrival, minutesAway);
        $tbody.append($tr)
    });

    //Refreshes every 5 minutes
    setInterval(function () {
        location.reload();
    }, 300000);

    //Refresh button to manually refresh
    $("#refresh-button").click(function () {
        location.reload();

    })

});