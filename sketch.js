
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

let table, table2, table3, table4;

let eje_x_1 = [100];
let eje_y_1 = [100];
let eje_z_1 = [100];

let eje_x_2 = [100];
let eje_y_2 = [100];
let eje_z_2 = [100];

let eje_x_3 = [100];
let eje_y_3 = [100];
let eje_z_3 = [100];

let eje_x_4 = [100];
let eje_y_4 = [100];
let eje_z_4 = [100];

let easycam;
let contador;


// VARIABLES MODELOS 3D ///
let monito, piedra1, test1;

// VARIABLES TEXTURAS ///
let texturaPiedra1, texturaPiedra2, texturaPiedra3, texturaPiedra4;

let estadoContador = true;


function preload() {
  video = createVideo("assets/ninfayachira.mp4");
  video.hide();
  video.volume(0);
  video.loop();

  // TABLAS ///

  table = loadTable('assets/csv/natural_1.csv', 'csv', 'header');
  table2 = loadTable('assets/csv/natural_2.csv', 'csv', 'header');
  table3 = loadTable('assets/csv/natural_3.csv', 'csv', 'header');
  table4 = loadTable('assets/csv/natural_4.csv', 'csv', 'header');


  // TEXTURAS ///

  texturaPiedra1 = loadImage('assets/materials/texturaPiedra1.jpg');
  texturaPiedra2 = loadImage('assets/materials/texturaPiedra2.jpg');
  texturaPiedra3 = loadImage('assets/materials/texturaPiedra3.jpg');
  texturaPiedra4 = loadImage('assets/materials/texturaPiedra4.jpg');
  skySphere = loadImage('assets/materials/skysphere.jpg');


  // MODELOS 3D ////

  monito = loadModel('assets/models/monito.obj', true);
  piedra1 = loadModel('assets/models/piedra1.obj', true);
  test1 = loadModel('assets/models/test1.obj', true);

}


function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x, y, WEBGL);

    smooth();
    
    //easycam = createEasyCam();
    easycam = new Dw.EasyCam(this._renderer, {distance:250});
    document.oncontextmenu = function() { return false; }

    
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
    setInterval(cadaUnSeg, 500);



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


    angleMode(DEGREES);

   


    rotX = 0;
    rotY = 0;
    rotZ = 0;


   for (let r = 0; r < table.getRowCount(); r++)
   {
     eje_x_1[r] = table.getString(r, 2);
     eje_y_1[r] = table.getString(r, 3);
     eje_z_1[r] = table.getString(r, 4);
   }

   for (let r = 0; r < table2.getRowCount(); r++)
   {
     eje_x_2[r] = table2.getString(r, 2);
     eje_y_2[r] = table2.getString(r, 3);
     eje_z_2[r] = table2.getString(r, 4);
   }

   for (let r = 0; r < table3.getRowCount(); r++)
   {
     eje_x_3[r] = table3.getString(r, 2);
     eje_y_3[r] = table3.getString(r, 3);
     eje_z_3[r] = table3.getString(r, 4);
   }

   for (let r = 0; r < table4.getRowCount(); r++)
   {
     eje_x_4[r] = table4.getString(r, 2);
     eje_y_4[r] = table4.getString(r, 3);
     eje_z_4[r] = table4.getString(r, 4);
   }

   contador = 0;
   //estadoContador = true;

}




function draw(){
    background(0);
    //video.loop();


    lights();
    //ambientLight(50);

    push();
    texture(skySphere);
    //box(2000);
    sphere(2000);
    pop();
    //-------------------------------
    //--- CUERPOS         -----------
    //---         ORBITANTES  -------
    //-------------------------------

    noStroke();

    push()
    texture(texturaPiedra1);
    rotateY(PI * frameCount / 6);
    rotateX(frameCount * 0.03);
    rotateZ(frameCount * 0.025);
    translate(300, 0, 0);
    model(monito);
    pop();

    //-------------------------------

    push()
    texture(texturaPiedra2);
    rotateY(-PI * frameCount / 8);
    rotateX(-frameCount * 0.015);
    rotateZ(-frameCount * 0.05);
    translate(300, 150, 0);
    model(monito);
    pop();

    //-------------------------------

    push()
    texture(texturaPiedra3);
    rotateY(PI * frameCount / 10);
    rotateX(frameCount * 0.035);
    rotateZ(-frameCount * 0.015);
    translate(300, -100, 0);
    model(monito);
    pop();

    //-------------------------------





    //-------------------------------
    //----- VISUALIZACIÓN       -----
    //-----               DATOS -----
    //-------------------------------
    
    push();
    translate(250,0,0);
    rotateX(frameCount / 5);
    rotateY(frameCount / 6);
    rotateZ(frameCount / 7);
    //fill(0, 250, 100);
    texture(texturaPiedra1);
    noStroke();
    for (let i = 0; i < contador; i++){
      push();
      rotateY(i+i*2);
      rotateX(i+i*3);
      rotateZ(i+i*4);
      translate(eje_x_1[i], eje_y_1[i], eje_z_1[i]);
      //sphere(5, 6, 6);
      scale(0.1);
      model(test1);
      pop();
    }
    pop();

    //-------------------------------

    push();
    translate(-250, 0, 0);
    //fill(0, 100, 250);
    texture(texturaPiedra2);
    noStroke();
    for (let i = 0; i < contador; i++){
      push();
      rotateY(i+i*2);
      rotateX(i+i*3);
      rotateZ(i+i*4);
      translate(eje_x_2[i], eje_y_2[i], eje_z_2[i]);
      sphere(5, 6, 6);
      pop();
    }
    pop();

    //-------------------------------

    push();
    //rotateY(frameCount / 3);
    //fill(250, 300, 0);
    texture(texturaPiedra3);
    noStroke();
    for (let i = 0; i < contador; i++){
      push();
      translate(eje_x_3[i], eje_y_3[i], eje_z_3[i]);
      sphere(5, 6, 6);
      pop();
    }
    pop();

    //-------------------------------

    push();
    
    //rotateY(frameCount / 3);
    //fill(250, 0, 300);
    texture(texturaPiedra4);
    noStroke();
    for (let i = 0; i < contador; i++){
      push();
      translate(eje_x_4[i], eje_y_4[i], eje_z_4[i]);
      sphere(5, 6, 6);
      pop();
    }
    pop();


    
    
    
}


function cadaUnSeg(){ 

  if (estadoContador == true)
  {
  contador++;
  }

  if (contador > eje_x_1.length ) {
    //contador = 0;
    estadoContador = false;
  }

  if (estadoContador == false){
    contador--;
  }

  if (contador == 0 & estadoContador == false) {
    estadoContador = true;
  }


  console.log(contador, eje_x_1.length);
}


//-----------------------------------
//-----------------------------------
//--------     MQTTT    -------------
//-----------------------------------
//-----------------------------------

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

