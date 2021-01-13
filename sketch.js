
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

let rotX, rotY, rotZ;

let videoFondo;
let captura;

let table;

let eje_x_1 = [100];
let eje_y_1 = [100];
let eje_z_1 = [100];


function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x, y, WEBGL);
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

    let valorMinimo = -400;
    let valorMaximo = 400;

    for (let i = 0; i < 200; i++){
      randomX[i] = random(valorMinimo, valorMaximo);
      randomY[i] = random(valorMinimo, valorMaximo);
      randomZ[i] = random(valorMinimo, valorMaximo);
      randomX2[i] = random(valorMinimo, valorMaximo);
      randomY2[i] = random(valorMinimo, valorMaximo);
      randomZ2[i] = random(valorMinimo, valorMaximo);
    }

    // Camara
    camara = createCamera();
    angleMode(DEGREES);

    camara.setPosition(0, 0, 0);

    rotX = 0;
    rotY = 0;
    rotZ = 0;


    

    /*
    captura = createCapture(VIDEO);
    captura.size(x, y);
    captura.hide();
    */


   for (let r = 0; r < table.getRowCount(); r++)
   {
     eje_x_1[r] = table.getString(r, 2);
     eje_y_1[r] = table.getString(r, 3);
     eje_z_1[r] = table.getString(r, 4);
   }

}


function preload() {
  video = createVideo("assets/ninfayachira.mp4");
  video.hide();
  video.volume(0);
  video.loop();

  table = loadTable('assets/csv/natural_1.csv', 'csv', 'header');
}

function draw(){
    background(0);
    //video.loop();
    orbitControl();


    lights();

    rotX = -mouseY;
    rotY = -mouseX;


    
    //normalMaterial();
    push();
    texture(video);
    
    translate(0,0,-1000);
    noStroke();
    plane(1920,1080,1);
    pop();

    
    //rotateX(rotX);
    //rotateY(rotY);

    rotateX(rotationX);
    rotateY(rotationY);

    push();
    //rotateY(frameCount / 3);
    fill(0, 250, 100);
    noStroke();
    for (let i = 0; i < randomX2.length; i++){
      push();
      translate(eje_x_1[i], eje_y_1[i], eje_z_1[i]);
      sphere(5, 6, 6);
      pop();
    }
    pop();

    pop();

    
    
    
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

