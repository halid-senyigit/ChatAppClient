$(function () {
    var connection = $.hubConnection("https://localhost:5001");
    var hub = connection.createHubProxy("chathub");
    hub.on("AddMessage", Method);
    connection.start()
        .done(function () {
            console.log('connected');
        })
        .fail(function (a) {
            console.log('not connected' + a);
        });
});

function Method(messageFromHub) {
    alert(messageFromHub);
}
