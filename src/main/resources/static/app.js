var stompClient = null;

var uname=null;

function setConnected(content){
	$("#sub-content").hide();
}
function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		// setConnected(true);
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/conversation', function(message) {
			console.log(message);
			let u = JSON.parse(message.body);
			console.log(u);
		
			$("#msg-conversation").append(`
		 <h6>message arrived ${u.msgdate}</h6>
  <div class="panel panel-primary medium">
    <div class="panel-body card-text">${u.msg}</div>
  </div>
  <h6><i>sent by ${u.username}</i></h6>
  
					`);
		});
		
		stompClient.subscribe('/topic/messages', function(message) {
			console.log(message);
			// parse it as json
			let u = JSON.parse(message.body);	
			// user list add user html
			$("#user-list").append(`
			 <h6>User Online ${u.msgdate}</h6>
  <div class="panel panel-primary medium">
    <div class="panel-body card-text">${u.username}</div>
  </div>
			`);
		});
	});
}

function disconnect() {
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	setConnected(false);
	console.log("Disconnected");
}

function signIn() {

	var date=new Date();
	let months=["JAN","FEB","MAR","APR","MAY","JUN","JUL",
		"AUG","SEP","OCT","NOV","DEC"];
		let val=date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		uname= $("#name").val();
		console.log(uname);
	stompClient.send("/app/message", {}, JSON.stringify({
		'username' : $("#name").val(),
		'msgdate' :val
	}));
}

function conversation() {
	var date=new Date();
	let months=["JAN","FEB","MAR","APR","MAY","JUN","JUL",
		"AUG","SEP","OCT","NOV","DEC"];
		let val=date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		
	stompClient.send("/topic/conversation", {}, JSON.stringify({
		'msg' : $("#message").val(),
		'msgdate' :val,
		'username': uname,
	}));
}


function sendName() {
	stompClient.send("/app/hello", {}, JSON.stringify({
		'name' : $("#name").val()
	}));
}


$(function() {
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#disconnect").click(function() {
		disconnect();
		$("#main-content").show();
	});
	
	
	connect();
	
	$("#connect").click(()=> {
		$("#main-content").hide();
		signIn();
		$("#name").val('');
		$("#sub-content").show();
		 
	});
	$("#send").click(()=> {
		conversation();
		$("#message").val('');
	});
});