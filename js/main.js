
$(function () {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chathub")
        .build();

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
    $("button#joinBtn").click(() => {
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
    });

    // joined room
    connection.on("JoinedRoom", (nick) => JoinedRoom(nick));

    connection.on("ShowError", (errorMsg) => ShowError(errorMsg));

});


// connection callbacks =>

// connectionId will be removed // test purpuse
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

function ShowError(errorMsg) {
    toastr.error(`Hi, ${errorMsg}`);
    console.log(`Connection ID: ${connectionId}`);
}


