//https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js

const WIDTH = 640;
const SCALE = WIDTH/640;
const Y = 305;         //yposition for the Calibration Detect area
const YHEIGHT = 7;     //height in pixels of Calibration Detact area
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let calibrationArray = [0,1,2,3,4,5,6,7,8,9];
let calibrationNumbers = "";


window.onload = function () {
   

    navigator.mediaDevices.getUserMedia({audio: false, video: true})
        .then(function(stream) {
            video.srcObject = stream;
            canvas.width = WIDTH;
            canvas.height = 480;
            setInterval(interval, 30);

        })
        .catch(function(err) {
        /* handle the error */
        alert ("you need to allow the webcam!")
        });
        
    const interval = () => 
      {ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
       ctx.beginPath();
       ctx.moveTo(0, Y-1);
       ctx.lineTo(WIDTH, Y-1);
       ctx.stroke();   }
}  //end of the window.onload function
  
  calibrate.onclick = () => {       // clicking mouse on calibrate button instigates the calibration
        calibrateCaptureArea();

    }

// this is the camera position calibration function
function calibrateCaptureArea() {                  //calibration routine
    for (ix = 0; ix < WIDTH; ix++) {              //ix to scan across the video window    
        blue = 0
        
        for (iy = Y; iy < Y+YHEIGHT; iy++) {       //for each ix we will measure blue value at several iy
          var imgData = ctx.getImageData(ix,iy,1,1); //read a single pixel to a four number array
          b=imgData.data[1];                         //blue is the second value of the array [1]
          blue = blue + b;                           //add up all the blue values of each iy
         // btx.putImageData(imgData, ix, iy-Y);
         }   //end of iy loop
       
        blue = parseInt(blue/YHEIGHT);             //take average value of blue for this ix
        calibrationArray[ix] = blue;               //and put it in an array
       
    }  //end of ix loop
    
    //calculate a threshold value to distinguish dark from light
        var threshold = 0;
    for (ix = 100 * SCALE; ix<499 * SCALE; ix++) {                       //going to calculate a brightness threshold for white and black
        threshold = threshold + calibrationArray[ix];    //add up lots of values
    }  
        threshold = parseInt(threshold/SCALE/400);     //and take the average
        //alert (threshold)      
        //going to convert all the blue values to ones or zeros
        //1 represents bright and 0 represents dark
    for (ix = 0; ix<WIDTH; ix++) {
        if (calibrationArray[ix] >= threshold) 
        {calibrationArray[ix] = 1;}
        else
        {calibrationArray[ix] = 0;}
    }  //end of ix loop
        
        //this is it: Lets generate some calibration numbers
  var lastfound = 0;            
  var previouslyfound = 0;
  for (ix = 30 * SCALE ; ix<638 * SCALE; ix++) 
     {      
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
       }   // end of inner if
      }   //end of outer if
       }  //end of for loop
       
       //so now we have to add one more number to the end to make 89 numbers
       // decided to just add the same distance as for the previous note
       finalNumber = lastfound * 2 - previouslyfound; //calculate what the last number needs to be
       finalNumberString = finalNumber.toString();    //convert it to a string
       calibrationNumbers = calibrationNumbers.concat(finalNumberString); //and add it to the end of the calibrationNumbers
    
      var element = document.getElementById("calibrationNumbers");
      element.innerHTML = calibrationNumbers;

    
      
        
}  //end of calibrateCaptureArea function
