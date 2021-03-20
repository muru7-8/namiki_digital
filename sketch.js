
// Programado por Nic Motta _ nicmotta.github.io 
// NAMIKI - MURU7.8 
// 2021


// MQTT client details:
let broker = {
  hostname: 'data-nec.cloud.shiftr.io',
  port: 443
};
// MQTT client:
let client;
// client credentials:
let creds = {
  clientID: 'Namiki-Espacio-Digital',
  userName: 'data-nec',
  password: 'd9ltoA25VeCmJ7n5'
}


/////////////////////
/// VARIABLES ///////
/////////////////////

let AchiraX = [100];
let AchiraY = [100];
let AchiraZ = [100];

let SemillasX = [100];
let SemillasY = [100];
let SemillasZ = [100];

let FatsiaX = [100];
let FatsiaY = [100];
let FatsiaZ = [100];

let BrusX = [100];
let BrusY = [100];
let BrusZ = [100];

let LombricesX = [100];
let LombricesY = [100];
let LombricesZ = [100];

let PajarosX = [100];
let PajarosY = [100];
let PajarosZ = [100];

let TortugaX = [100];
let TortugaY = [100];
let TortugaZ = [100];

let MQTTx = [30];
let MQTTy = [30];
let MQTTz = [30];
let MQTTContador = 0;


let x, y;
let easycam;
let contadorUno, contadorDos, contadorTres;
let estadoContadorUno = true;
let estadoContadorDos = true;
let estadoContadorTres = true;

let botonAchira, botonSemilla, botonFatsia, botonBrus, botonLombrices, botonPajaros, botonTortuga, botonBailarina, botonContinuar;
let table, table2, table3, table4;
let tablaAchira, tablaSemillas, tablaFatsia, tablaBrus, tablaLombrices, tablaPajaros, tablaTortuga;
let sonidoAchira;

let loading = true;
let botonActivo = true;

let videoAchiraActivo = false;
let videoSemillaActivo = false;
let videoFatsiaActivo = false;
let videoBrusActivo = false;
let videoLombricesActivo = false;
let videoPajarosActivo = false;
let videoTortugaActivo = false;
let videoBailarinaActivo = false;


let textoRespira = 1;

let col;

let MQTTValorX;
let MQTTValorY;
let MQTTValorZ;

function preload() {

  // IMAGENES ///

  PantallaInicioTest = loadImage('assets/images/PortadaNamiki.png');
  PantallaInicio = createImg('assets/images/PantallaInicioAnimada.gif');
  PantallaInicio.hide();

  // VIDEOS ///

  videoAchira = createVideo("assets/videos/videoAchira.mp4");
  videoAchira.hide();
  videoAchira.volume(0);
  videoAchira.loop();

  videoSemilla = createVideo("assets/videos/videoSemilla.mp4");
  videoSemilla.hide();
  videoSemilla.volume(0);
  videoSemilla.loop();

  videoFatsia = createVideo("assets/videos/videoFatsia.mp4");
  videoFatsia.hide();
  videoFatsia.volume(0);
  videoFatsia.loop();

  videoBrus = createVideo("assets/videos/videoBrus.mp4");
  videoBrus.hide();
  videoBrus.volume(0);
  videoBrus.loop();

  videoPajaros = createVideo("assets/videos/videoPajaros.mp4");
  videoPajaros.hide();
  videoPajaros.volume(0);
  videoPajaros.loop();

  videoTortuga = createVideo("assets/videos/videoTortuga.mp4");
  videoTortuga.hide();
  videoTortuga.volume(0);
  videoTortuga.loop();

  videoBailarina = createVideo("assets/videos/videoBailarina.mp4");
  videoBailarina.hide();
  videoBailarina.volume(0);
  videoBailarina.loop();

  // SONIDOS ///
  sonidoAchira = loadSound("assets/sounds/sonidoAchira.mp3");


  // TABLAS ///

  //table = loadTable('assets/csv/natural_1.csv', 'csv', 'header');
  //table2 = loadTable('assets/csv/natural_2.csv', 'csv', 'header');
  //table3 = loadTable('assets/csv/natural_3.csv', 'csv', 'header');
 // table4 = loadTable('assets/csv/natural_4.csv', 'csv', 'header');

  tablaAchira = loadTable('assets/csv/achira.csv', 'csv', 'header');
  tablaSemillas = loadTable('assets/csv/semillas.csv', 'csv', 'header');
  tablaFatsia = loadTable('assets/csv/fatsia.csv', 'csv', 'header');
  tablaBrus = loadTable('assets/csv/brus.csv', 'csv', 'header');
  tablaLombrices = loadTable('assets/csv/lombrices.csv', 'csv', 'header');
  tablaPajaros = loadTable('assets/csv/pajaros.csv', 'csv', 'header');
  tablaTortuga = loadTable('assets/csv/tortuga.csv', 'csv', 'header');


  // TEXTURAS ///

  texturaPiedra1 = loadImage('assets/materials/texturaPiedra1.jpg');
  texturaPiedra2 = loadImage('assets/materials/texturaPiedra2.jpg');
  texturaPiedra3 = loadImage('assets/materials/texturaPiedra3.jpg');
  texturaPiedra4 = loadImage('assets/materials/texturaPiedra4.jpg');
  skySphere = loadImage('assets/materials/skySphere.jpg');
 


  // MODELOS 3D ////

  modeloPiedra1 = loadModel('assets/models/modeloPiedras1.obj', true);
  modeloPiedra2 = loadModel('assets/models/modeloPiedras2.obj', true);
  modeloPiedra3 = loadModel('assets/models/modeloPiedras3.obj', true);
  modeloPiedra4 = loadModel('assets/models/modeloPiedras4.obj', true);
  modeloPiedra5 = loadModel('assets/models/modeloPiedras5.obj', true);
  modeloPiedra6 = loadModel('assets/models/modeloPiedras6.obj', true);
  modeloPiedra7 = loadModel('assets/models/modeloPiedras7.obj', true);
  modeloPiedra8 = loadModel('assets/models/modeloPiedras8.obj', true);
  modeloPiedraPantalla = loadModel('assets/models/modeloPiedraPantalla2.obj', true);



}


function setup(){

    x = windowWidth;
    y = windowHeight;

    createCanvas(x, y, WEBGL);
    smooth();
    angleMode(DEGREES);
    
    easycam = new Dw.EasyCam(this._renderer, {distance:250});
    document.oncontextmenu = function() { return false; }


    // SETEOS INICIALES


    /// ---------------------------------
    /// --- BOTONES ---------------------
    /// ---------------------------------

    botonContinuar = createButton("Toque aquí para continuar y navegar por el espacio virtual.");
    botonAchira = createButton("Recuerdas las sensaciones al oler  la tierra mojada...");
    botonSemilla = createButton("Sientes como la vida y el tiempo se acarician...");
    botonFatsia = createButton("Puedes cantar el sonido del viento...");
    botonBrus = createButton("Lo que comunica una mirada...");
    botonLombrices = createButton("Puedes revivir tus pisadas en la arena mojada...");
    botonPajaros = createButton("Mirar los gestos simples para reunir esas partes tuyas que has dejado en el camino...");
    botonTortuga = createButton("El tiempo interno...");
    botonBailarina = createButton("Vibra en el diálogo con la materia viva...");


    
    botonContinuar.size(50,50);
    botonContinuar.style('background-color', 'Transparent');
    botonContinuar.style('color', 'gray');
    botonContinuar.style('border', 'none');
    botonContinuar.style('width', '100%');
    botonContinuar.position(0,windowHeight - 80);
    botonContinuar.style("font-family", "Bodoni");
    botonContinuar.style("font-size", "24px");
    botonContinuar.mouseClicked(afterLoad);
    

    botonAchira.size(50,50);
    botonAchira.style('background-color', 'Transparent');
    botonAchira.style('color', 'gray');
    botonAchira.style('border', 'none');
    botonAchira.style('width', '100%');
    botonAchira.position(0,windowHeight - 80);
    botonAchira.style("font-family", "Bodoni");
    botonAchira.style("font-size", "24px");
    botonAchira.mouseClicked(moverAchira);

    botonSemilla.size(50,50);
    botonSemilla.style('background-color', 'Transparent');
    botonSemilla.style('color', 'gray');
    botonSemilla.style('border', 'none');
    botonSemilla.style('width', '100%');
    botonSemilla.position(0,windowHeight - 80);
    botonSemilla.style("font-family", "Bodoni");
    botonSemilla.style("font-size", "24px");
    botonSemilla.mouseClicked(moverSemilla);

    botonFatsia.size(50,50);
    botonFatsia.style('background-color', 'Transparent');
    botonFatsia.style('color', 'gray');
    botonFatsia.style('border', 'none');
    botonFatsia.style('width', '100%');
    botonFatsia.position(0,windowHeight - 80);
    botonFatsia.style("font-family", "Bodoni");
    botonFatsia.style("font-size", "24px");
    botonFatsia.mouseClicked(moverFatsia);

    botonBrus.size(50,50);
    botonBrus.style('background-color', 'Transparent');
    botonBrus.style('color', 'gray');
    botonBrus.style('border', 'none');
    botonBrus.style('width', '100%');
    botonBrus.position(0,windowHeight - 80);
    botonBrus.style("font-family", "Bodoni");
    botonBrus.style("font-size", "24px");
    botonBrus.mouseClicked(moverBrus);

    botonLombrices.size(50,50);
    botonLombrices.style('background-color', 'Transparent');
    botonLombrices.style('color', 'gray');
    botonLombrices.style('border', 'none');
    botonLombrices.style('width', '100%');
    botonLombrices.position(0,windowHeight - 80);
    botonLombrices.style("font-family", "Bodoni");
    botonLombrices.style("font-size", "24px");
    botonLombrices.mouseClicked(moverLombrices);

    botonPajaros.size(50,50);
    botonPajaros.style('background-color', 'Transparent');
    botonPajaros.style('color', 'gray');
    botonPajaros.style('border', 'none');
    botonPajaros.style('width', '100%');
    botonPajaros.position(0,windowHeight - 80);
    botonPajaros.style("font-family", "Bodoni");
    botonPajaros.style("font-size", "24px");
    botonPajaros.mouseClicked(moverPajaros);

    botonTortuga.size(50,50);
    botonTortuga.style('background-color', 'Transparent');
    botonTortuga.style('color', 'gray');
    botonTortuga.style('border', 'none');
    botonTortuga.style('width', '100%');
    botonTortuga.position(0,windowHeight - 80);
    botonTortuga.style("font-family", "Bodoni");
    botonTortuga.style("font-size", "24px");
    botonTortuga.mouseClicked(moverTortuga);

    botonBailarina.size(50,50);
    botonBailarina.style('background-color', 'Transparent');
    botonBailarina.style('color', 'gray');
    botonBailarina.style('border', 'none');
    botonBailarina.style('width', '100%');
    botonBailarina.position(0,windowHeight - 80);
    botonBailarina.style("font-family", "Bodoni");
    botonBailarina.style("font-size", "24px");
    botonBailarina.mouseClicked(moverBailarina);


    col = color(100, 100, 100);


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
    setInterval(loopRespira, 20);

    // INIT DE CONTADORES ///

    contadorUno = 0;
    contadorDos = 0;
    contadorTres = 0;


   
   for (let r = 0; r < tablaAchira.getRowCount(); r++)
   {
     AchiraX[r] = tablaAchira.getString(r, 0);
     AchiraY[r] = tablaAchira.getString(r, 1);
     AchiraZ[r] = tablaAchira.getString(r, 2);
   }

   for (let r = 0; r < tablaSemillas.getRowCount(); r++)
   {
    SemillasX[r] = tablaSemillas.getString(r, 0);
    SemillasY[r] = tablaSemillas.getString(r, 1);
    SemillasZ[r] = tablaSemillas.getString(r, 2);
   }

   for (let r = 0; r < tablaFatsia.getRowCount(); r++)
   {
    FatsiaX[r] = tablaFatsia.getString(r, 0);
    FatsiaY[r] = tablaFatsia.getString(r, 1);
    FatsiaZ[r] = tablaFatsia.getString(r, 2);
   }

   for (let r = 0; r < tablaBrus.getRowCount(); r++)
   {
    BrusX[r] = tablaBrus.getString(r, 0);
    BrusY[r] = tablaBrus.getString(r, 1);
    BrusZ[r] = tablaBrus.getString(r, 2);
   }

   for (let r = 0; r < tablaLombrices.getRowCount(); r++)
   {
    LombricesX[r] = tablaLombrices.getString(r, 0);
    LombricesY[r] = tablaLombrices.getString(r, 1);
    LombricesZ[r] = tablaLombrices.getString(r, 2);
   }

   for (let r = 0; r < tablaPajaros.getRowCount(); r++)
   {
    PajarosX[r] = tablaPajaros.getString(r, 0);
    PajarosY[r] = tablaPajaros.getString(r, 1);
    PajarosZ[r] = tablaPajaros.getString(r, 2);
   }

   for (let r = 0; r < tablaTortuga.getRowCount(); r++)
   {
    TortugaX[r] = tablaTortuga.getString(r, 0);
    TortugaY[r] = tablaTortuga.getString(r, 1);
    TortugaZ[r] = tablaTortuga.getString(r, 2);
   }
   
}




function draw(){


  botonContinuar.style('color', col);
  botonAchira.style('color', col);
  botonSemilla.style('color', col);
  botonFatsia.style('color', col);
  botonBrus.style('color', col);
  botonLombrices.style('color', col);
  botonPajaros.style('color', col);
  botonTortuga.style('color', col);
  botonBailarina.style('color', col);



  // BOTONES

  if (loading == true){
    background(0);
    botonContinuar.show();
    botonAchira.hide()
    botonSemilla.hide();
    botonFatsia.hide();
    botonBrus.hide();
    botonLombrices.hide();
    botonPajaros.hide();
    botonTortuga.hide();
    botonBailarina.hide();
    easycam.removeMouseListeners();
    imageMode(CENTER);
    image(PantallaInicioTest, 0, 0, 600, 300);

  }

  if (loading == false)
  {

    easycam.attachMouseListeners();

    if (botonActivo == true)
    {
      botonAchira.show();
      botonContinuar.hide();
    }
    
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

    /*
    push()
    texture(texturaPiedra4);
    //translate(0, 0, 0);
    rotateX(frameCount / 20);
    rotateY(frameCount / 22);
    rotateZ(frameCount / 30);
    scale(0.5);
    model(modeloPiedra7);
    pop();
    */



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

        // PIEDRA DEL CENTRO
        push();
        translate(0,0,0);
        rotateX(frameCount / 15);
        rotateY(frameCount / 16);
        rotateZ(frameCount / 17);
        texture(texturaPiedra4);
        noStroke();
        for (let i = 0; i < contadorUno; i++){
          push();
          rotateY(i*2);
          rotateX(i*3);
          rotateZ(i*4);
          translate(MQTTx[i], MQTTy[i], MQTTz[i]);
          scale(0.05);
          model(modeloPiedra2);
          pop();
        }
    
        pop();
    
    // ACHIRA EN LA TORMENTA
    push();
    translate(350,0,150);
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
      translate(AchiraX[i], AchiraY[i], AchiraZ[i]);
      scale(0.1);
      model(modeloPiedra4);
      pop();
    }

    pop();

    if (videoAchiraActivo == true) {
    push()
    //texture(videoAchira);
    texture(videoAchira);
    translate(350+150, 0, 150);
    rotateY(160);
    rotateZ(180);
    scale(0.75);
    model(modeloPiedraPantalla);
    pop();
    }
    

    //-------------------------------
    // SEMILLA

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
      translate(SemillasX[i], SemillasY[i], SemillasZ[i]);
      scale(0.1);
      model(modeloPiedra5);
      pop();
    }
    pop();

    if (videoSemillaActivo == true) {
      push()
      //texture(videoSemilla);
      texture(videoSemilla);
      //translate(-250, 0, 100);
      translate(200, -200, -150);
      scale(0.75);
      model(modeloPiedraPantalla);
      pop();
      }

    //-------------------------------
    // FATSIA

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
      translate(FatsiaX[i], FatsiaY[i], FatsiaZ[i]);
      scale(0.1);
      model(modeloPiedra6);
      pop();
    }
    pop();

    if (videoFatsiaActivo == true) {
      push()
      texture(videoFatsia);
      translate(-430, -70, 70);
      scale(0.75);
      model(modeloPiedraPantalla);
      pop();
      }

    //-------------------------------
    // BRUS

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
      translate(BrusX[i], BrusY[i], BrusZ[i]);
      scale(0.1);
      model(modeloPiedra7);
      pop();
    }
    pop(); 
    
    if (videoBrusActivo == true) {
      push()
      texture(videoBrus);
      rotateY(60);
      translate(300, 400, -120);
      scale(1);
      model(modeloPiedraPantalla);
      pop();
      }


    //-------------------------------
    // LOMBRICES

    push();
    translate(-150, 100, -300);
    rotateX(-frameCount / 5);
    rotateY(-frameCount / 8);
    rotateZ(frameCount / 5);
    texture(texturaPiedra1);
    noStroke();
    for (let i = 0; i < contadorTres; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(LombricesX[i], LombricesY[i], LombricesZ[i]);
      scale(0.1);
      model(modeloPiedra5);
      pop();
    }
    pop();

    if (videoLombricesActivo == true) {
      push()
      texture(videoBailarina);
      translate(500, 0, 100);
      scale(0.75);
      model(modeloPiedraPantalla);
      pop();
      }

    //-------------------------------
    // PAJAROS

    push();
    translate(-150, -300, 300);
    rotateX(-frameCount / 5);
    rotateY(-frameCount / 8);
    rotateZ(frameCount / 5);
    texture(texturaPiedra1);
    noStroke();
    for (let i = 0; i < contadorTres; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(PajarosX[i], PajarosY[i], PajarosZ[i]);
      scale(0.1);
      model(modeloPiedra5);
      pop();
    }
    pop();

    if (videoPajarosActivo == true) {
      push()
      texture(videoPajaros);
      translate(-150, -500, 600);
      rotateX(15);
      rotateY(90);
      scale(1.5);
      model(modeloPiedraPantalla);
      pop();
      }

    //-------------------------------
    // TORTUGA

    push();
    translate(300, -100, -200);
    rotateX(-frameCount / 5);
    rotateY(-frameCount / 8);
    rotateZ(frameCount / 5);
    texture(texturaPiedra2);
    noStroke();
    for (let i = 0; i < contadorTres; i++){
      push();
      rotateY(i*2);
      rotateX(i*3);
      rotateZ(i*4);
      translate(TortugaX[i], TortugaY[i], TortugaZ[i]);
      scale(0.1);
      model(modeloPiedra5);
      pop();
    }
    pop();

    if (videoTortugaActivo == true) {
      push()
      texture(videoTortuga);
      translate(500, -100, -50);
      scale(1);
      model(modeloPiedraPantalla);
      pop();
      }
    
 
  }

}


function cadaUnSeg(){ 

  if (estadoContadorUno == true)
  {
  contadorUno++;
  }

  if (contadorUno > AchiraX.length ) {
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

  if (contadorDos > AchiraX.length ) {
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

  if (contadorTres > AchiraX.length ) {
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


function loopRespira(){

  col = color(textoRespira, textoRespira, textoRespira);

  textoRespira++;

  if (textoRespira == 255){
    textoRespira = 0;
  }

  //console.log(col);

}


//-----------------------------------
//-----------------------------------
//--------     MQTTT    -------------
//-----------------------------------
//-----------------------------------

// called when the client connects
function onConnect() {
  console.log('client is connected');
  client.subscribe("MPU9250/namiki-digital");

}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
      console.log('onConnectionLost:' + response.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {

  let llegaMensaje = split(message.payloadString, ',');

  MQTTValorX = parseFloat(llegaMensaje[0]);
  MQTTValorY = parseFloat(llegaMensaje[1]);
  MQTTValorZ = parseFloat(llegaMensaje[2]);

  MQTTContador = MQTTContador + 1;
  
  if (MQTTContador == 29) {
    MQTTContador = 0;
  }

  MQTTx[MQTTContador] =  MQTTValorX;
  MQTTy[MQTTContador] =  MQTTValorY;
  MQTTz[MQTTContador] =  MQTTValorZ;

  console.log(MQTTx.length);

}


// called when you want to send a message:
function sendMqttMessage() {

  /*
  // if the client is connected to the MQTT broker:
  if (client.isConnected()) {
      rotacionX = new Paho.MQTT.Message(String(rotationX));
      rotacionX.destinationName = "MPU9250/namiki-digital/giroscopio-x";
      client.send(rotacionX);

      rotacionY = new Paho.MQTT.Message(String(rotationY));
      rotacionY.destinationName = "MPU9250/namiki-digital/giroscopio-y";
      client.send(rotacionY);

      rotacionZ = new Paho.MQTT.Message(String(rotationZ));
      rotacionZ.destinationName = "MPU9250/namiki-digital/giroscopio-z";
      client.send(rotacionZ);
  }
  */
}


var state;

estadoAchira = {
  distance : 113.4,                 // scalar
  center   : [388.43259181909866, -13.774992481535978, 245.31093773456763],         // vector
  rotation : [0.9892567634210506, -0.049120598116837416, 0.1376421802140396, 0],  // quaternion
}

estadoSemilla = {
  distance : 75.18,                 // scalar
  center   : [203.2, -231.3, 36.92],         // vector
  rotation : [0.949, -0.148, -0.27, 0],  // quaternion
}

estadoFatsia = {
  distance : 336.35,                 // scalar
  center   : [-340.11, -31.74, 131.63],         // vector
  rotation : [0.16, -0.08, 0.97, 0],  // quaternion
}

estadoBrus = {
  distance : 228,                 // scalar
  center   : [126.32, 380.18, -219.44],         // vector
  rotation : [0.72, -0.16, -0.67, 0],  // quaternion
}

estadoLombrices = {
  distance : 724,                 // scalar
  center   : [400, 249, -351],         // vector
  rotation : [0.97, -0.22, -0.01, 0],  // quaternion
}

estadoPajaros = {
  distance : 1119,                 // scalar
  center   : [488, -149.8, 767.25],         // vector
  rotation : [0.57, -0.36, 0.73, 0],  // quaternion
}

estadoTortuga = {
  distance : 545,                 // scalar
  center   : [471.37, -40.83, -260.12],         // vector
  rotation : [0.97, -0.14, 0.13, 0],  // quaternion
}

estadoBailarina = {
  distance : 250,                 // scalar
  center   : [0, 0, 0],         // vector
  rotation : [-1, 0, 0, 0],  // quaternion
}

function keyReleased(){
  if(key == 's') state = easycam.getState();
  console.log(state);
}

function afterLoad(){
  loading = false;

  
  sonidoAchira.loop();
  sonidoAchira.volume(0.5);
  sonidoAchira.play();
  
}

function moverAchira(){
  easycam.setState(estadoAchira, 2000);
  botonAchira.hide()
  botonSemilla.show();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  botonActivo = false;
  videoAchiraActivo = true;
  //videoBailarinaActivo = false;
  
}

function moverSemilla(){
  easycam.setState(estadoSemilla, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.show();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  videoAchiraActivo = false;
  videoSemillaActivo = true;
}

function moverFatsia(){
  easycam.setState(estadoFatsia, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.show();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  videoSemillaActivo = false;
  videoFatsiaActivo = true;
}

function moverBrus(){
  easycam.setState(estadoBrus, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.show();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  videoFatsiaActivo = false;
  videoBrusActivo = true;
}

function moverLombrices(){
  easycam.setState(estadoLombrices, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.show();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  videoBrusActivo = false;
  videoLombricesActivo = true;
}

function moverPajaros(){
  easycam.setState(estadoPajaros, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.show();
  botonBailarina.hide();
  botonContinuar.hide();

  videoLombricesActivo = false;
  videoPajarosActivo = true;
}

function moverTortuga(){
  easycam.setState(estadoTortuga, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.show();
  botonContinuar.hide();

  videoPajarosActivo = false;
  videoTortugaActivo = true;
}

function moverBailarina(){
  easycam.setState(estadoBailarina, 2000);
  botonAchira.hide()
  botonSemilla.hide();
  botonFatsia.hide();
  botonBrus.hide();
  botonLombrices.hide();
  botonPajaros.hide();
  botonTortuga.hide();
  botonBailarina.hide();
  botonContinuar.hide();

  botonActivo = true;

  videoTortugaActivo = false;
  videoBailarinaActivo = true;
}

// Programado por Nic Motta / nicmotta.github.io 
// NAMIKI - MURU7.8 
// 2021