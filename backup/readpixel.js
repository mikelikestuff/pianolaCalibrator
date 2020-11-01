<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 50, 50);

function copy() {
  var imgData = ctx.getImageData(10, 10, 2, 3);
  ctx.putImageData(imgData, 10, 70);
  console.log(imgData);
}
</script>

<button onclick="copy()">Copy</button>

</body>
</html>
