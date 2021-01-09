
/*
//setup MQTT client
client = new Paho.MQTT.Client("broker.shiftr.io", Number(443), "controlpanel");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
*/

let x, y;



function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x - 20, y - 20);

/*
    client.connect({
		onSuccess: onConnect,
		userName: "connected-object",
		password: "c784e41dd3da48d4",
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
    text("ace X: " + accelerationX, 100, 120);
    text("ace Y: " + accelerationY, 100, 140);
    text("ace Z: " + accelerationZ, 100, 160);
    text("rot X: " + rotationX, 100, 180);
    text("rot Y: " + rotationY, 100, 200);
    text("rot Z: " + rotationZ, 100, 220);
}


var client = mqtt.connect('mqtt://b9b9d1f7:860f838a013c6f86@broker.shiftr.io', {
  clientId: 'javascriptNEC'
});

client.on('connect', function(){
  console.log('client has connected!');

  client.subscribe('/example');
  // client.unsubscribe('/example');

  setInterval(function(){
    client.publish('/hello', rotationX);
  }, 1000);
});

client.on('message', function(topic, message) {
  console.log('new message:', topic, message.toString());
});