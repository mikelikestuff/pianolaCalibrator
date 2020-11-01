//https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js


const Y = 305;         //yposition for the Calibration Detect area
const YHEIGHT = 7;     //height in pixels of Calibration Detact area
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var calibrationArray = [0,1,2,3,4,5,6,7,8,9];
var calibrationNumbers = "";
var b = document.getElementById("myCanvas");
var btx = b.getContext("2d");

window.onload = function () {
   

    navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then(function(stream) {
            video.srcObject = stream;
            canvas.width = 640;
            canvas.height = 480;
            setInterval(interval, 30);

        })
        .catch(function(err) {
        /* handle the error */
        alert ("poo")
        });
        
    const interval = () => {
       
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
       // drawline();
    }
}  //end of the window.onload function
  
  calibrate.onclick = () => {
    //    drawline();
    calibrateCaptureArea();
    alert ("calibrate complete") 
    }

function drawline() {
  
    ctx.fillStyle = "#FF0000";
   // alert("hey")
    for (ix = 0; ix < 639; ix+=6) {
        for (iy = 0; iy < YHEIGHT; iy++) {
        ctx.beginPath();
        ctx.rect (ix,Y + iy,1,1);
        ctx.stroke();
        btx.beginPath();
        btx.rect (ix,iy,1,1);
        btx.stroke();
    }  }  //end of for loops
}  //end of drawline function

function calibrateCaptureArea() {                  //calibration routine
    for (ix = 0; ix < 640; ix++) {                 //ix to scan across the video window    
        blue = 0
        for (iy = Y; iy < Y+YHEIGHT; iy++) {       //for each ix we will measure blue value at several iy
          var imgData = ctx.getImageData(ix,iy,1,1); //read a single pixel to a four number array
          b=imgData.data[1];                         //blue is the second value of the array [1]
          blue = blue + b;                           //add up all the blue values of each iy
          btx.putImageData(imgData, ix, iy-Y);
        }   //end of iy loop
       
        blue = parseInt(blue/YHEIGHT);             //take average value of blue for this ix
        calibrationArray[ix] = blue;               //and put it in an array
       //console.log(ix,blue,calibrationArray[ix]); //output to console for debugging
    }  //end of ix for loops
        var threshold = 0;
    for (ix = 100; ix<499; ix++) {                       //going to calculate a brightness threshold for white and black
        threshold = threshold + calibrationArray[ix]; }  //add up lots of values
        threshold = parseInt(threshold/400);             //and take the average
        //console.log("threshold",threshold);
        
        //going to convert all the blue values to ones or zeros
        //1 represents bright and 0 represents dark
    for (ix = 0; ix<640; ix++) {
        if (calibrationArray[ix] >= threshold) 
        {calibrationArray[ix] = 1;}
        else
        {calibrationArray[ix] = 0;}
      //  console.log(ix,calibrationArray[ix]);
        }  //end of ix loop
        
        //this is it: Lets generate some calibration numbers
  var lastfound = 0;            
  var previouslyfound = 0;
  for (ix = 30; ix<638; ix++) {      
   var   ixstring = ix.toString();
   var thispixel = calibrationArray[ix];
   var nextpixel = calibrationArray[ix+1];
   if (thispixel == 1)
     {
     if (nextpixel == 0)
      {
       calibrationNumbers = calibrationNumbers.concat(ixstring);
       calibrationNumbers = calibrationNumbers.concat(" ");
       previouslyfound = lastfound;
       lastfound = ix;
      } 
     }    
       }  //end of for loop
       
       //so now we have to add one more number to the end to make 89 numbers
       // decided to just add the same distance as for the previous note
       finalNumber = lastfound * 2 - previouslyfound; //calculate what the last number needs to be
       finalNumberString = finalNumber.toString();    //convert it to a string
       calibrationNumbers = calibrationNumbers.concat(finalNumberString); //and add it to the end of the calibrationNumbers
    
    
    console.log(calibrationNumbers);
 //   console.log(previouslyfound,lastfound);
       
      
        
}  //end of calibrateCaptureArea function