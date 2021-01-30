
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


/////////////////////
/// VARIABLES ///////
/////////////////////

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

let x, y;
let easycam;
let contadorUno, contadorDos, contadorTres;
let estadoContadorUno = true;
let estadoContadorDos = true;
let estadoContadorTres = true;

let botonAchira, botonSemilla, botonFatsia, botonBrus, botonLombrices, botonPajaros, botonTortuga, botonBailarina;

let loading = true;

function preload() {

  // VIDEOS ///

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
  skySphere = loadImage('assets/materials/FondoOffsetDifusoDos.jpg');


  // MODELOS 3D ////

  modeloPiedra1 = loadModel('assets/models/modeloPiedras1.obj', true);
  modeloPiedra2 = loadModel('assets/models/modeloPiedras2.obj', true);
  modeloPiedra3 = loadModel('assets/models/modeloPiedras3.obj', true);
  modeloPiedra4 = loadModel('assets/models/modeloPiedras4.obj', true);
  modeloPiedra5 = loadModel('assets/models/modeloPiedras5.obj', true);
  modeloPiedra6 = loadModel('assets/models/modeloPiedras6.obj', true);
  modeloPiedra7 = loadModel('assets/models/modeloPiedras7.obj', true);
  modeloPiedra8 = loadModel('assets/models/modeloPiedras8.obj', true);
  modeloPiedraPantalla = loadModel('assets/models/modeloPiedraPantalla.obj', true);


}


function setup(){

    x = windowWidth;
    y = windowHeight;

    createCanvas(x, y, WEBGL);
    smooth();
    angleMode(DEGREES);
    
    easycam = new Dw.EasyCam(this._renderer, {distance:250});
    document.oncontextmenu = function() { return false; }


    /// ---------------------------------
    /// --- BOTONES ---------------------
    /// ---------------------------------

    botonAchira = createButton("Recuerdas las sensaciones al oler  la tierra mojada.");
    botonSemilla = createButton("Sientes como la vida y el tiempo se acarician.");
    botonFatsia = createButton("Puedes cantar el sonido del viento.");
    botonBrus = createButton("Lo que comunica una mirada.");
    //botonLombrices = createButton("Puedes revivir tus pisadas en la arena mojada.");
    //botonPajaros = createButton("Mirar los gestos simples para reunir esas partes tuyas que has dejado en el camino.");
    //botonTortuga = createButton("El tiempo interno.");
    //botonBailarina = createButton("Vibra en el diálogo con la materia viva.");


    botonAchira.size(50,50);
    botonAchira.style('background-color', 'black');
    botonAchira.style('color', 'white');
    botonAchira.style('border', 'none');
    botonAchira.style('width', '100%');
    botonAchira.position(0,windowHeight - 50);
    botonAchira.style("font-family", "Bodoni");
    botonAchira.style("font-size", "24px");
    botonAchira.mouseClicked(moverAchira);

    botonSemilla.size(50,50);
    botonSemilla.style('background-color', 'black');
    botonSemilla.style('color', 'white');
    botonSemilla.style('border', 'none');
    botonSemilla.style('width', '100%');
    botonSemilla.position(0,windowHeight - 50);
    botonSemilla.style("font-family", "Bodoni");
    botonSemilla.style("font-size", "24px");
    botonSemilla.mouseClicked(moverSemilla);

    botonFatsia.size(50,50);
    botonFatsia.style('background-color', 'black');
    botonFatsia.style('color', 'white');
    botonFatsia.style('border', 'none');
    botonFatsia.style('width', '100%');
    botonFatsia.position(0,windowHeight - 50);
    botonFatsia.style("font-family", "Bodoni");
    botonFatsia.style("font-size", "24px");
    botonFatsia.mouseClicked(moverFatsia);

    botonBrus.size(50,50);
    botonBrus.style('background-color', 'black');
    botonBrus.style('color', 'white');
    botonBrus.style('border', 'none');
    botonBrus.style('width', '100%');
    botonBrus.position(0,windowHeight - 50);
    botonBrus.style("font-family", "Bodoni");
    botonBrus.style("font-size", "24px");
    botonBrus.mouseClicked(moverBrus);

    ///////////////////
    // MQTT  
    ///////////////////

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


    /// INTERVALOS  //////

    setInterval(sendMqttMessage, 500);
    setInterval(cadaUnSeg, 1000);
    setInterval(cadaUnSegYMedio, 1500);
    setInterval(cadaDosSeg, 2000);
    setInterval(afterLoad, 2000);

    // INIT DE CONTADORES ///

    contadorUno = 0;
    contadorDos = 0;
    contadorTres = 0;


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

}




function draw(){

  if (loading == true){
    background(0);
    botonAchira.hide();
    botonSemilla.hide();
    botonFatsia.hide();
    botonBrus.hide();
    easycam.removeMouseListeners();
    imageMode(CENTER);
    image(texturaPiedra3, 0, 0, 200, 100);

  }

  if (loading == false)
  {

    easycam.attachMouseListeners();
    botonAchira.show();
    background(0);
    noStroke();
    //video.loop();


    // LUCES ////
    lights();
    ambientLight(20);


    //SKYSPHERE ///
    push();
    rotateX(-frameCount / 45);
    rotateY(frameCount / 50);
    rotateZ(frameCount / 50);
    texture(skySphere);
    sphere(2000);
    pop();


    // -----------------------------
    // --- PIEDRA CENTRAL INICIO  --
    // -----------------------------

    push()
    texture(texturaPiedra4);
    //translate(0, 0, 0);
    rotateX(frameCount / 20);
    rotateY(frameCount / 22);
    rotateZ(frameCount / 30);
    scale(0.5);
    model(modeloPiedra7);
    pop();




    //-------------------------------
    //--- CUERPOS         -----------
    //---         ORBITANTES  -------
    //-------------------------------

    push()
    texture(texturaPiedra1);
    rotateY(PI * frameCount / 10);
    rotateX(frameCount * 0.03);
    rotateZ(frameCount * 0.025);
    translate(800, 0, 0);
    model(modeloPiedra1);
    pop();

    //-------------------------------

    push()
    texture(texturaPiedra2);
    rotateY(-PI * frameCount / 15);
    rotateX(-frameCount * 0.015);
    rotateZ(-frameCount * 0.05);
    translate(800, 150, 0);
    model(modeloPiedra2);
    pop();

    //-------------------------------

    push()
    texture(texturaPiedra3);
    rotateY(PI * frameCount / 20);
    rotateX(frameCount * 0.035);
    rotateZ(-frameCount * 0.015);
    translate(800, -100, 0);
    model(modeloPiedra3);
    pop();

    //-------------------------------





    //-------------------------------
    //----- VISUALIZACIÓN       -----
    //-----               DATOS -----
    //-------------------------------
    
    push();
    translate(250,0,100);
    rotateX(frameCount / 15);
    rotateY(frameCount / 16);
    rotateZ(frameCount / 17);
    texture(texturaPiedra1);
    noStroke();
    for (let i = 0; i < contadorUno; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(eje_x_1[i], eje_y_1[i], eje_z_1[i]);
      scale(0.1);
      model(modeloPiedra4);
      pop();
    }

    pop();

    push()
    texture(video);
    translate(250+150, 0, 100);
    scale(0.75);
    model(modeloPiedraPantalla);
    pop();

    

    //-------------------------------

    push();
    translate(-250, 0, 100);
    rotateX(frameCount / 8);
    rotateY(frameCount / 6);
    rotateZ(frameCount / 9);
    texture(texturaPiedra2);
    noStroke();
    for (let i = 0; i < contadorDos; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(eje_x_2[i], eje_y_2[i], eje_z_2[i]);
      scale(0.1);
      model(modeloPiedra5);
      pop();
    }
    pop();

    //-------------------------------

    push();
    translate(0, 250, -100);
    rotateX(-frameCount / 5);
    rotateY(-frameCount / 6);
    rotateZ(frameCount / 7);
    texture(texturaPiedra3);
    noStroke();
    for (let i = 0; i < contadorTres; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(eje_x_3[i], eje_y_3[i], eje_z_3[i]);
      scale(0.1);
      model(modeloPiedra6);
      pop();
    }
    pop();

    //-------------------------------

    push();
    translate(0, -250, -100);
    rotateX(frameCount / 5);
    rotateY(frameCount / 6);
    rotateZ(frameCount / 7);
    texture(texturaPiedra4);
    noStroke();
    for (let i = 0; i < contadorUno; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(eje_x_4[i], eje_y_4[i], eje_z_4[i]);
      scale(0.1);
      model(modeloPiedra7);
      pop();
    }
    pop();  
    
 
  }

}

function afterLoad(){
  loading = false;
}


function cadaUnSeg(){ 

  if (estadoContadorUno == true)
  {
  contadorUno++;
  }

  if (contadorUno > eje_x_1.length ) {
    //contador = 0;
    estadoContadorUno = false;
  }

  if (estadoContadorUno == false){
    contadorUno--;
  }

  if (contadorUno == 0 & estadoContadorUno == false) {
    estadoContadorUno = true;
  }
}

function cadaUnSegYMedio(){ 

  if (estadoContadorDos == true)
  {
  contadorDos++;
  }

  if (contadorDos > eje_x_1.length ) {
    //contador = 0;
    estadoContadorDos = false;
  }

  if (estadoContadorDos == false){
    contadorDos--;
  }

  if (contadorDos == 0 & estadoContadorDos == false) {
    estadoContadorDos = true;
  }
}

function cadaDosSeg(){ 

  if (estadoContadorTres == true)
  {
  contadorTres++;
  }

  if (contadorTres > eje_x_1.length ) {
    //contador = 0;
    estadoContadorTres = false;
  }

  if (estadoContadorTres == false){
    contadorTres--;
  }

  if (contadorTres == 0 & estadoContadorTres == false) {
    estadoContadorTres = true;
  }
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


var state;

estadoAchira = {
  distance : 102.65,                 // scalar
  center   : [280.2, -19.05, 212.89],         // vector
  rotation : [-0.988, 0.054, -0.142, 0],  // quaternion
}

estadoSemilla = {
  distance : 75.18,                 // scalar
  center   : [203.2, -231.3, 36.92],         // vector
  rotation : [0.949, -0.148, -0.27, 0],  // quaternion
}

estadoFatsia = {
  distance : 336.35,                 // scalar
  center   : [-298.8, 9.31, 97],         // vector
  rotation : [0.40, -0.05, 0.91, 0],  // quaternion
}

function keyReleased(){
  if(key == 's') state = easycam.getState();
  console.log(state);
}


function moverAchira(){
  easycam.setState(estadoAchira, 2000);
  botonAchira.hide()
  botonSemilla.show();
}

function moverSemilla(){
  easycam.setState(estadoSemilla, 2000);
  botonSemilla.hide()
  botonFatsia.show();
}

function moverFatsia(){
  easycam.setState(estadoFatsia, 2000);
  botonFatsia.hide();
  botonBrus.show();
}

function moverBrus(){
  //easycam.setState(estadoFatsia, 2000);
  botonBrus.hide();
}
