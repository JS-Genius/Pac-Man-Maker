// creates var editP to store when the player is pressing the edit togle ('=') button
var editP = false;
//creates a <div> tag to store a <input> tag so you can input the item that you will place
var dwlcodediv = document.createElement("div");
dwlcodediv.style.zIndex = 2;
dwlcodediv.style.margin = "0px";
dwlcodediv.style.border = "0px";
dwlcodediv.style.padding = "0px";
dwlcodediv.style.position = "absolute";
dwlcodediv.style.top = "0px";
dwlcodediv.style.left = "0px";
dwlcodediv.style.draggable = "false";
dwlcodediv.id = "codeDiv";
dwlcodediv.innerHTML = '<input type="text" id="codeInput" width="0px" height="0px" value="">';
document.body.appendChild(dwlcodediv);
//creates a way to access the <div> and <input> tags
var codeInput = document.getElementById("codeInput");
var codeDiv = document.getElementById("codeDiv");
//creates a <div> tag to store a <input> tag so you can input and take the code that stores the level
var dwladddiv = document.createElement("div");
dwladddiv.style.zIndex = 2;
dwladddiv.style.position = "absolute";
dwladddiv.style.top = "0px";
dwladddiv.style.left = "0px";
dwladddiv.style.draggable = "false";
dwladddiv.id = "addDiv";
dwladddiv.innerHTML = '<input type="text" id="codeAdd" width="0px" height="0px" value="wall{}">';
document.body.appendChild(dwladddiv);
//creates a way to access the <div> and <input> tags
var codeAdd = document.getElementById("codeAdd");
var addDiv = document.getElementById("addDiv");
//creates a function to add the player values to the game.
var setPlayer = function(name,val) {
      game.player[name] = val;
};
//creates a function to add the settings values to the game.
var setSettings = function(name,val) {
      game.settings[name] = val;
};
//creates a variable that stores which mode you are on
var building = true;
//creates a variable that stores the previous level code
var oldCode = "";
//allows selecting all, copying, cutting and pasting
screen.enableDefaultCtrl('A');
screen.enableDefaultCtrl('C');
screen.enableDefaultCtrl('X');
screen.enableDefaultCtrl('V');
//creates a function that runs when the player is in building mode
var BUILDER = function() {
      //runs NEXTFRAME function
      if(NEXTFRAME !== undefined) {
            var f = NEXTFRAME;
            NEXTFRAME = undefined;
            f();
      };
      //sets addObject to the object input
      addObject = codeAdd.value
      codeInput.style.width = screen.width/5-2 + "px";
      codeInput.style.height = screen.height/50 + "px";
      codeInput.style.margin = "0px";
      codeInput.style.border = "1px solid #000000";
      codeInput.style.padding = "0px";
      codeDiv.style.top = "0px";
      codeDiv.style.left = screen.width*4/5+"px";
      codeAdd.style.width = screen.width/5 + "px";
      codeAdd.style.height = screen.height/50 + "px";
      codeAdd.style.margin = "0px";
      codeAdd.style.border = "1px solid #000000";
      codeAdd.style.padding = "0px";
      addDiv.style.top = "0px";
      addDiv.style.left = screen.width*3/5+"px";
      //runs the function that has the building code in it
      BUILD();
      codeDiv.style.zIndex = 2;
      addDiv.style.zIndex = 2;
};
//creates a function that runs when the player is in playing mode
var GAME = function() {
      codeInput.style.width = "0px";
      codeInput.style.height = "0px";
      codeDiv.style.top = "0px";
      codeDiv.style.left = screen.width*4/5+"px";
      codeAdd.style.width = screen.width/5 + "px";
      codeAdd.style.height = screen.height/20 + "px";
      addDiv.style.top = "0px";
      addDiv.style.left = screen.width*3/5+"px";
      //runs the pacman code
      PACMAN();
      codeDiv.style.zIndex = 0;
      addDiv.style.zIndex = 0;
};
//creates the function that runs the build-testing
var BUILDTEST = function() {
      //sets the minLength value to the minimum length
      if(screen.width >= screen.height) {
            minLength = screen.height;
      } else {
            minLength = screen.width;
      };
      //toggles the mode if the "=" key is pressed
      if(screen.keys[187] === true) {
            if(editP === false) {
                  onload();
                  if(building) {
                        for(var $ in build.entities) {
                              game.entities[$] = {};
                              for(var $$ in build.entities[$]) {
                                    game.entities[$][$$] = build.entities[$][$$];
                              };
                        };
                        for(var $ in build.wall) {
                              game.wall[$] = {};
                              for(var $$ in build.wall[$]) {
                                    game.wall[$][$$] = build.wall[$][$$];
                              };
                        };
                        for(var $ in build.player) {
                              setPlayer($,build.player[$]);
                        };
                        for(var $ in build.settings) {
                              setSettings($,build.settings[$]);
                        };
                        building = false;
                  } else {
                        building = true;
                  };
                  editP = true;
            };
      } else {
            editP = false;
      };
      if(building) {
            //runs the BUILDER function
            BUILDER();
      oldCode = codeInput.value;
      } else {
            //runs the GAME function
            GAME();
      };
};
//creates the variable that stores the style
var style = "savemenu";
//creates the function that runs the game
var GAMECODE =  function() {
      screen.ctrl=function() {};
      codeInput.onkeydown=function() {};
      var mouse = "none";
      if(style === "buildtest") {
            BUILDTEST();
      } else if(style === "game") {
            PACMAN();
            codeDiv.style.zIndex = 0;
            addDiv.style.zIndex = 0;
            codeDiv.style.top = "0px";
            codeDiv.style.left = "0px";
            addDiv.style.top = "0px";
            addDiv.style.left = "0px";
      } else if(style === "savemenu") {
            mouse = "default";
            SAVEMENU();
            addDiv.style.zIndex = 0;
            addDiv.style.top = "0px";
            addDiv.style.left = "0px";
      };
      document.getElementById('game').style.cursor = mouse;
};