var download = function(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.click();
};
var QueryString = function() {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for(var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(typeof query_string[pair[0]] === "undefined") {
                  query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if(typeof query_string[pair[0]] === "string") {
                  var arr = [query_string[pair[0]],decodeURIComponent(pair[1])];
                  query_string[pair[0]] = arr;
            } else {
                  query_string[pair[0]].push(decodeURIComponent(pair[1]));
            };
      };
      return query_string;
}();
var screen = {
      x: 0,
      y: 0,
      width: document.getElementById("game").width,
      height: document.getElementById("game").height,
      draw: document.getElementById("game").getContext("2d"),
      keys: [],
      mouse: {
            x: 0,
            y: 0,
            click: function() {},
            up: function() {},
      },
      refresh: function() {
            document.getElementById("game").width = window.innerWidth;
            document.getElementById("game").height = window.innerHeight;
            screen.width = document.getElementById("game").width;
            screen.height = document.getElementById("game").height;
            GAMECODE();
      },
      ctrlDefault: [],
      enableDefaultCtrl: function(key) {
            screen.ctrlDefault[key.charCodeAt(0)] = true;
      },
};
screen.draw.fillEllipse = function(cx,cy,rx,ry,start,end) {
      stroke = screen.draw.strokeStyle;
      screen.draw.strokeStyle = screen.draw.fillStyle;
      screen.draw.translate(cx, cy);
      screen.draw.scale(rx, ry);
      screen.draw.beginPath();
      screen.draw.arc(0, 0, 1/2, start, end);
      screen.draw.stroke();
      screen.draw.closePath();
      screen.draw.scale(1/rx, 1/ry);
      screen.draw.translate(-1*cx, -1*cy);
      screen.draw.strokeStyle = stroke;
};
document.getElementById('game').addEventListener('mousedown',function() {
screen.mouse.click();
});
document.getElementById('game').addEventListener('mouseup',function() {
screen.mouse.up();
});
var dTOr = function(val) {
      return val/180*Math.PI;
};
setInterval(screen.refresh,40);
document.onkeydown = function(event) {
      if(event.ctrlKey) {
             var disable = true;
             for(var i = 0;i<screen.ctrlDefault.length;i++) {
                   if(screen.ctrlDefault[i] && event.keyCode == i) {
                        disable = false;
                   };
             };
             if(disable) {
                   event.preventDefault();
                   if(screen.ctrl !== undefined) {
                         screen.ctrl(event.keyCode);
                   };
             };
      } else {
             screen.keys[event.keyCode] = true;
      };
};
document.onkeyup = function(event) {
      screen.keys[event.keyCode] = false;
};
document.onmousemove = function(event) {
      screen.mouse.x = event.clientX - screen.x;
      screen.mouse.y = event.clientY - screen.y;
};
document.onclick = function(event) {
      event.preventDefault();
};
document.oncontextmenu = function(event) {
      event.preventDefault();
};
var dwlgame = document.createElement("script");
dwlgame.type = "text/javascript";
dwlgame.src = "games/pacman/core.js";
document.body.appendChild(dwlgame);
document.getElementById('icon').href="games/pacman/icon.ico";