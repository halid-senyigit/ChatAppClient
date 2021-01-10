$(function () {
    $("input#nick").keypress(function () {
        $("button#joinBtn").attr("disabled", false)
    })
})

function removeJoinView() {
    $("div#join").addClass("d-none")
}

function addConnectView(){
    $("div#join").removeClass("d-none")
}

function removeUserView() {
    $("div#disconnect").addClass("d-none")
}

function addUserView(nick){
    $("div#disconnect").removeClass("d-none")
    $("span#userNickName").empty().append(nick);
}


function addUserListView(nick) {
    let userView = $("div#usersView")
    let userElement = $(`<a href="#" class="list-group-item list-group-item-action" data-nick="${nick}">${nick}</a>`)
    userView.append(userElement)
}



function enableMessageInput(){
    $("input#messageBox").attr("disabled", false)
}

function disableMessageInput(){
    $("input#messageBox").attr("disabled", true)
}
