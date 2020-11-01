//https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/canvas/js/main.js


const Y = 302;         //yposition for the Calibration Detect area
const YHEIGHT = 7;     //height in pixels of Calibration Detact area
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//const canvas = document.getElementById('webcamCanvas');    //1
//const ctx = canvas.getContext("2d");    //1


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
        drawline();
    }
}  //end of the window.onload function
  calibrate.onclick = () => {
    //    drawline();
    alert ("lets calibrate") 
    }

function drawline() {
  
    ctx.fillStyle = "#FF0000";
   // alert("hey")
    for (ix = 0; ix < 639; ix+=6) {
        for (iy = 0; iy < YHEIGHT; iy++) {
        ctx.beginPath();
        ctx.rect (ix,Y + iy,1,1);
        ctx.stroke();
    }  }  //end of for loops
}  //end of drawline function

function calibrateCaptureArea() {
    for (ix = 0; ix < 639; ix++) {
        for (iy = 0; iy < YHEIGHT; iy++) {
        var imgData = ctx.getImageData(i);
        ctx.putImageData(imgData, 10, 70);
        console.log(imgData);
    }  }  //end of for loops
    
}  //end of calibrateCaptureArea function

