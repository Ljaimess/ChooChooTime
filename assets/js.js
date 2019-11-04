$(document).ready(function () {
    console.log("ready!");
    var rowId = 0;

    const firebaseConfig = {
            apiKey: "AIzaSyDUjtCN053iOpl9UJvl22CO8DinvyV0_Kw",
            authDomain: "choo-choo-c4c7d.firebaseapp.com",
            databaseURL: "https://choo-choo-c4c7d.firebaseio.com",
            projectId: "choo-choo-c4c7d",
            storageBucket: "choo-choo-c4c7d.appspot.com",
            messagingSenderId: "542490006621",
            appId: "1:542490006621:web:1d85b58ab669fddb4ba9b4",
            measurementId: "G-MDQBYG2B5C"

    };

    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database
    var database = firebase.database();
    console.log(database);


    database.ref().on("child_added", function (snapshot) {
        var train = snapshot.val();
        console.log(train);
        console.log(snapshot.key)
        var key = snapshot.key;

        var name = train.name;
        var destination = train.destination;
        var firstTrain = train.first_train;
        var frequency = train.frequency;
        var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");

        var currentTimeLive = moment().format("hh:mm A");
        console.log(currentTimeLive);

        var diffTime = moment().diff(moment(firstTime), "minutes");
 
        var tRemainder = diffTime % frequency;


        var nextTrainMinDisplay = frequency - tRemainder;

        var nextArrival = moment().add(nextTrainMinDisplay, "minutes").format("hh:mm A");

        var tBody = $("#trainDisplay");
        var tRow = $("<tr>");
        var remove = $("<button>").attr("id", key).attr("class", "material-icons").text("delete");
        var trainName = $("<td>").text(name);
        var trainDest = $("<td>").text(destination);
        var trainFreq = $("<td>").text("Every :" + frequency + " minutes");
        var trainNext = $("<td>").text(nextArrival).attr("class", "next");
        var minAway = $("<td>").text(nextTrainMinDisplay).attr("class", "minutes");
        var refresh = $("<button>").attr("class", "material-icons").text("refresh");
        rowId++;

        tRow.append(trainName, trainDest, trainFreq, trainNext, minAway, remove, refresh);

        tBody.append(tRow);
        displayRealTime();

        remove.on("click", function (event) {
            event.preventDefault();
            if ($(this).attr("id") === key) {
                console.log(key)
                database.ref(key).remove();
                $(this).closest('tr').remove();
            }

        });

        refresh.on("click", function (event) {
            event.preventDefault();
            location.reload();
        })

    });
});