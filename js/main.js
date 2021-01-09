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
});