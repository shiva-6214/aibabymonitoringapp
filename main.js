


video = "";
status = "";
objectDetector = "";
objects = [];
txtObjectName = "";
let song;

function preload() {
    video = createCapture(VIDEO);
    video.hide();
    song = loadSound("siren.mp3");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    
    image(video, 0, 0, 500, 450); 
  
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("statusOfObject").innerHTML = "Status : Objects Detected";
          
          stroke("red");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 2, objects[i].y + 10);
            noFill();
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == "person") {
            document.getElementById("objectName").innerHTML = "Baby" + " Found";
            song.stop();
            
          }

          else {
            document.getElementById("objectName").innerHTML = "Baby" + " Not Found";
            song.setVolume(1);
            song.play();
          }
          
            //write a code to store the speechSynthesis API in variable and write code to store the label property of "objects" which we want the system to speak in a variable "speak_data"
          
          
        
        }
        
      }
}

function startVideo() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusOfObject").innerHTML = "Status: Object Detecting";

    
}



function modelLoaded() {
    console.log("Model is Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }