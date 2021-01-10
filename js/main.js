const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chathub")
        .build();

$(function () {

    async function start() {
        try {
            await connection.start({
                jsonp: true
            });
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 10000);
        }
    };

    connection.onclose(start);

    // Start the connection.
    start();


    // join button
    $("button#joinBtn").click(() => JoinBtn());
    $("input#nick").on('keypress', function (e) {
        if (e.which == 13) {
            JoinBtn()
        }
    });


    $("#messageBox").on('keypress', function (e) {
        if (e.which == 13) {
            connection.invoke("SendMessage", $("#messageBox").val())
            console.log($("#messageBox").val())
        }
    });

    // joined room
    connection.on("JoinedRoom", (nick) => JoinedRoom(nick));

    connection.on("ShowError", (errorMsg) => ShowError(errorMsg));

    connection.on("ReceiveMessage", (nick, message) => AddMessageListView(nick, message))

});


// connection callbacks =>

function JoinedRoom(nick) {
    toastr.success(`Hi, ${nick}, you have joined to room`);
    // add user list
    addUserListView(nick)
    // join btn removed
    removeJoinView()
    addUserView(nick)
    enableMessageInput()
    console.log(`Connection ID: ${connectionId}`);
}

function JoinBtn() {
    let nick = $("input#nick").val();
    if (nick != "") {
        $("button#joinBtn").attr("disabled", true);
        connection.invoke("JoinRoom", nick)
            .catch((error) => {
                console.log(error)
            });
    } else {
        toastr.warning("give me a nick please!");
    }
}

function ShowError(errorMsg) {
    toastr.error(`Hi, ${errorMsg}`);
    console.log(`Connection ID: ${connectionId}`);
}