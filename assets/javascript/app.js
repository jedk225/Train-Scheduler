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

    database.ref().on("child_added", function (snapshot) {
        var userTrain = $("<td>").text(snapshot.val().name);
        var userDestination = $("<td>").text(snapshot.val().destination);
        var userTime = $("<td>").text(snapshot.val().time);
        var userFrequency = $("<td>").text(snapshot.val().frequency);

        var $tbody = $("tbody");
        var $tr = $("<tr>");
        $tr.append(userTrain, userDestination, userFrequency, /*MoreStuff*/);
        $tbody.append($tr)
    });

});