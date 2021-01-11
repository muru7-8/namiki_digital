
// MQTT client details:
let broker = {
  hostname: 'broker.shiftr.io',
  port: 443
};
// MQTT client:
let client;
// client credentials:
let creds = {
  clientID: 'p5ClientNEC',
  userName: 'b9b9d1f7',
  password: '860f838a013c6f86'
}


let x, y;
let camara;
let randomX = [200];
let randomY = [200];
let randomZ = [200];

let randomX2 = [200];
let randomY2 = [200];
let randomZ2 = [200];

let delta = 0.01;


function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x - 20, y - 20, WEBGL);
    //createARCanvas();

    // MQTT

    client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
    // set callback handlers for the client:
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: onConnect,       // callback function for when you connect
            userName: creds.userName,   // username
            password: creds.password,   // password
            useSSL: true                // use SSL
        }
    );

    setInterval(sendMqttMessage, 500);



    // array

    for (let i = 0; i < 200; i++){
      randomX[i] = random(-200,200);
      randomY[i] = random(-200,200);
      randomZ[i] = random(-200,200);
    }

    for (let i = 0; i < 200; i++){
      randomX2[i] = random(-200,200);
      randomY2[i] = random(-200,200);
      randomZ2[i] = random(-200,200);
    }

    // Camara
    camara = createCamera();
    angleMode(DEGREES);

    camara.setPosition(0, 0, 0);

}

function draw(){
    background(0);
    //orbitControl();


    rotateX(rotationX);
    rotateY(rotationY);
    rotateZ(rotationZ);
    
    push();

    //rotateY(frameCount / 3);
    fill(255);
    stroke(255, 0, 0);
    strokeWeight(5)
    for (let i = 0; i < randomX.length; i++){
      point(randomX[i], randomY[i], randomZ[i]);
    }

    pop();

    stroke(0, 255, 0);
    strokeWeight(5)
    for (let i = 0; i < randomX2.length; i++){
      point(randomX2[i], randomY2[i], randomZ2[i]);
    }

    push();
    //translate(mouseX/2, mouseY/2, 0);
    //rotateX(frameCount / 5);
    //rotateY(frameCount / 5);
    //rotateZ(frameCount / 5);
    noFill()
    stroke(255);
    strokeWeight(1);
    box(400);
    pop();


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

// called when the client connects
function onConnect() {
  console.log('client is connected');
  client.subscribe("/namiki/rotacionX");
  client.subscribe("/namiki/rotacionY");
  client.subscribe("/namiki/rotacionZ");

}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
      console.log('onConnectionLost:' + response.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  let  incomingNumber = parseInt(message.payloadString);
}

// called when you want to send a message:
function sendMqttMessage() {
  // if the client is connected to the MQTT broker:
  if (client.isConnected()) {
      rotacionX = new Paho.MQTT.Message(String(rotationX));
      rotacionX.destinationName = "namiki/rotacionX";
      client.send(rotacionX);

      rotacionY = new Paho.MQTT.Message(String(rotationY));
      rotacionY.destinationName = "namiki/rotacionY";
      client.send(rotacionY);

      rotacionZ = new Paho.MQTT.Message(String(rotationZ));
      rotacionZ.destinationName = "namiki/rotacionZ";
      client.send(rotacionZ);

      aceX = new Paho.MQTT.Message(String(accelerationX));
      aceX.destinationName = "namiki/aceX";
      client.send(aceX);

      aceY = new Paho.MQTT.Message(String(accelerationY));
      aceY.destinationName = "namiki/aceY";
      client.send(aceY);

      aceZ = new Paho.MQTT.Message(String(accelerationZ));
      aceZ.destinationName = "namiki/aceZ";
      client.send(aceZ);
  }
}
