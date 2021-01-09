
/*
//setup MQTT client
client = new Paho.MQTT.Client("broker.shiftr.io", Number(443), "controlpanel");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
*/

let x, y;
let mensajeIN;



function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x - 20, y - 20);

/*
    client.connect({
		onSuccess: onConnect,
		userName: "b9b9d1f7",
		password: "860f838a013c6f86",
		useSSL: true,
    });
*/

}

function draw(){
    background(0);
    ellipse(x / 2, y / 2, 200);

    fill(255);
    textSize(35);
    text("orientacion: " + deviceOrientation, 100, 100);
    text("ace X: " + accelerationX, 100, 130);
    text("ace Y: " + accelerationY, 100, 160);
    text("ace Z: " + accelerationZ, 100, 190);
    text("rot X: " + rotationX, 100, 220);
    text("rot Y: " + rotationY, 100, 250);
    text("rot Z: " + rotationZ, 100, 280);
}

/*
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
    console.log("Conectado a server MQTT");
    // subscribe
	client.subscribe("/namiki/mobile/rotacionX");
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
	}
}

function onMessageArrived(message) {
	console.log(message.destinationName + " -> " + message.payloadString);

    var payload = message.payloadString;
    console.log("rotacion X: " + payload);

}


function sendMessage(topic, message) {
	message = new Paho.MQTT.Message(message);
	message.destinationName = topic;
	client.send("HOLA");
}
*/


var client = mqtt.connect('mqtt://b9b9d1f7:860f838a013c6f86@broker.shiftr.io', {
  clientId: 'javascriptNEC'
});

client.on('connect', function(){
  console.log('client has connected!');

  client.subscribe('/hello');
  client.subscribe('/hello_1');
  // client.unsubscribe('/example');

  setInterval(function(){
    client.publish('/hello', String(rotationX));
    client.publish('/hello_1', String(random(0, 100)));
  }, 1000);
  
});

client.on('message', function(topic, message) {
  //console.log('new message:', topic, message.toString());
  mensajeIN = message.toString();

  if (topic == "/hello_1"){
    console.log("numero Random: " + mensajeIN);
  }

  if (topic == "/hello"){
    console.log("rotacion X: " + mensajeIN);
  }
  
});
