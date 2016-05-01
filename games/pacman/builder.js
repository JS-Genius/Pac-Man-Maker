//adds the build object which stores the builder data
var build =  {
      entities: {},
      wall: {},
      player: {
            x: 0.5,
            y: 0.5,
            coins: 0,
            direction: 0,
            spX: 1/500,
            spY: 1/500,
            pUp: {
                  type: "none",
                  time: 0,
            },
      },
      settings: {
            background: "#000000",
            coins: 0,
            pUp: {
            },
      },
};
//adds the variables that saves your stage
var creatingStage = null;
//adds the function that downloads your level
//adds the functions that add objects to the build
var bAdd = {};
bAdd.entity = function($) {
      build.entities[$.id] = $;
};
bAdd.wall = function($) {
      build.wall[$.id] = $;
};
//adds the function that runs when in erase mode and you click
var erasor = function(x,y,r) {
      var skip = false;
      for(var $ in build.entities) {
            if(build.entities[$].x <= x+r && build.entities[$].x >= x-r && build.entities[$].y <= y+r && build.entities[$].y >= y-r) {
                   delete build.entities[$];
                   skip = true;
                   break;
            };
      };
      if(!skip) {
      for(var $ in build.wall) {
            if(Math.abs((build.wall[$].left + (build.wall[$].width/2))-(screen.mouse.x/minLength))<=Math.abs(build.wall[$].width/2+r) && Math.abs((build.wall[$].top + (build.wall[$].height/2))-(screen.mouse.y/minLength))<=Math.abs(build.wall[$].height/2+r)) {
                  erasewall($,x,y,r);
            };
      };
      };
};
//adds the function that erases part of the wall
var erasewall = function($,x,y,r) {
      var w = {};
      w.x = build.wall[$].left;
      w.y = build.wall[$].top;
      w.w = build.wall[$].width;
      w.h = build.wall[$].height;
      w.c = build.wall[$].color;
      delete build.wall[$];
      var s = {
            t: true,
            tl: true, 
            tr: true,
            r: true,
            b: true,
            bl: true,
            br: true,
            l: true,
      };
      if(x+r>=w.x+w.w) {
            s.r = false;
            s.tr = false;
            s.br = false;
      };
      if(x-r<=w.x) {
            s.l = false;
            s.tl = false;
            s.bl = false;
      };
      if(y+r>=w.y+w.h) {
            s.b = false;
            s.bl = false;
            s.br = false;
      };
      if(y-r<=w.y) {
            s.t = false;
            s.tl = false;
            s.tr = false;
      };
      if(s.t) {
            var uL = 0;
            if(w.x <= x-r) {
                  uL = x-r;
            } else {
                  uL = w.x;
            };
            var uR = 0;
            if(w.x+w.w >= x+r) {
                  uR = x+r;
            } else {
                  uR = w.x+w.w;
            };
            bAdd.wall({
                  top: w.y,
                  left: uL,
                  width: uR-uL,
                  height: y-r-w.y,
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.tl) {
            bAdd.wall({
                  top: w.y,
                  left: w.x,
                  width: x-r-w.x,
                  height: y-r-w.y,
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.tr) {
            bAdd.wall({
                  top: w.y,
                  left: x+r,
                  width: (w.x+w.w)-(x+r),
                  height: y-r-w.y,
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.r) {
            var uT = 0;
            if(w.y <= y-r) {
                  uT = y-r;
            } else {
                  uT = w.y;
            };
            var uB = 0;
            if(w.y+w.h >= y+r) {
                  uB = y+r;
            } else {
                  uB = w.y+w.h;
            };
            bAdd.wall({
                  top: uT,
                  left: x+r,
                  width: (w.x+w.w)-(x+r),
                  height: uB-uT,
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.b) {
            var uL = 0;
            if(w.x <= x-r) {
                  uL = x-r;
            } else {
                  uL = w.x;
            };
            var uR = 0;
            if(w.x+w.w >= x+r) {
                  uR = x+r;
            } else {
                  uR = w.x+w.w;
            };
            bAdd.wall({
                  top: y+r,
                  left: uL,
                  width: uR-uL,
                  height: (w.y+w.h)-(y+r),
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.bl) {
            bAdd.wall({
                  top: y+r,
                  left: w.x,
                  width: x-r-w.x,
                  height: (w.y+w.h)-(y+r),
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.br) {
            bAdd.wall({
                  top: y+r,
                  left: x+r,
                  width: (w.x+w.w)-(x+r),
                  height: (w.y+w.h)-(y+r),
                  color: w.c,
                  id: Math.random(),
            });
      };
      if(s.l) {
            var uT = 0;
            if(w.y <= y-r) {
                  uT = y-r;
            } else {
                  uT = w.y;
            };
            var uB = 0;
            if(w.y+w.h >= y+r) {
                  uB = y+r;
            } else {
                  uB = w.y+w.h;
            };
            bAdd.wall({
                  top: uT,
                  left: w.x,
                  width: x-r-w.x,
                  height: uB-uT,
                  color: w.c,
                  id: Math.random(),
            });
      };
};
//adds the function that downloads your level
var getLevel = function(name) {
      var txt = "var level = '"+JSON.stringify(build)+"';";
      download(name+".pac",txt);
};
//adds the variables that store the mode data
var eraseMode = false;
var prevPressI = false;
//creates the variable that stores the previous build
var oldBuild = JSON.parse(JSON.stringify(build));
//creates the variable that stores the previous code
var oldCode = JSON.stringify(build);
//creates the add object variable
var addObject = "wall{}";
//creates the variable that stores points used when adding objects
var points = [];
//adds the build function
var BUILD = function() {
      screen.ctrl = function(key) {
            if(key == 'S'.charCodeAt(0)) {
                  var name = prompt('Level Name');
                  if(name == "") {
                        name = 'level';
                  };
                  if(name !== null) {
                        levels[creatingStage].level = JSON.parse(JSON.stringify(build));
                        levels[creatingStage].name = name;
                        levels[creatingStage].used = true;
                        cookie.set('levels',JSON.stringify(levels));
                  };
            };
            if(key == 'E'.charCodeAt(0)) {
                  erasor(screen.mouse.x/minLength,screen.mouse.y/minLength,10/500);
            };
      };
      //adds keyboard controlls
      if(screen.keys[37] === true) {
            screen.mouse.x -= 1;
      };
      if(screen.keys[39] === true) {
            screen.mouse.x += 1;
      };
      if(screen.keys[38] === true) {
            screen.mouse.y -= 1;
      };
      if(screen.keys[40] === true) {
            screen.mouse.y += 1;
      };
      //adds click controlls
      screen.mouse.click = function() {
            points[points.length] = {x: screen.mouse.x/minLength, y: screen.mouse.y/minLength,};
      };
      screen.mouse.up = function() {
            if(addObject.split("{")[0] == "wall") {
                  points[points.length] = {x: screen.mouse.x/minLength, y: screen.mouse.y/minLength,};
            };
      };
      //gives the space bar the same function as the mouse
      if(screen.keys[32] === true) {
            if(prevPressI === false) {
                  screen.mouse.click();
                  prevPressI = true;
            };
      } else {
            prevPressI = false;
      };
      //draws the pacman background
      screen.draw.fillStyle = build.settings.background;
      screen.draw.fillRect(0,0,minLength,minLength);
      //draws all the walls
      for(var $ in build.wall) {
            screen.draw.save();
            screen.draw.fillStyle = build.wall[$].color;
            screen.draw.fillRect(build.wall[$].left*minLength,build.wall[$].top*minLength,build.wall[$].width*minLength,build.wall[$].height*minLength);
            screen.draw.restore();
      };
      //draws all the entities
      for(var $ in build.entities) {
            game.eType[build.entities[$].type].draw(build.entities[$],minLength,minLength,"editor");
      };
      //splits the add object variable at the 1st "{" symbol
      var add = addObject.split("{");
      if(add.length > 1) {
            for(var i = 2;i<add.length;i++) {
                  add[1] += "{" + add[i];
      };
      if(add[1] == undefined) {
            add[1] = "{}";
      } else {
            add[1] = "{" + add[1];
      };
      var addData = add;
      //uses the JSON filter on add data
      var addedEData = JSON.parse(addData[1]);
      if(addData[0] === "wall") {
      if(addedEData.color === undefined) {
            addedEData.color = "#0000FF";
      };
      if(points[1] !== undefined) {
            if(points[0].x > points[1].x) {
                  var sX = points[0].x;
                  points[0].x = points[1].x;
                  points[1].x = sX;
            };
            if(points[0].y > points[1].y) {
                  var sY = points[0].y;
                  points[0].y = points[1].y;
                  points[1].y = sY;
            };
            if(points[1].x-points[0].x>=0) {
                  points[1].x+=1/1000;
            };
            if(points[1].y-points[0].y>=0) {
                  points[1].y+=1/1000;
            };
            bAdd.wall({
            id: Math.random(),
            left: points[0].x,
            top: points[0].y,
            width: points[1].x - points[0].x,
            height: points[1].y - points[0].y,
            color: addedEData.color,
      });
      points = [];
      };
      if(points[0] !== undefined) {
            screen.draw.fillStyle = addedEData.color;
            var t = points[0].y*minLength;
            var l = points[0].x*minLength;
            var w = screen.mouse.x-points[0].x*minLength;
            var h = screen.mouse.y-points[0].y*minLength;
            if(w==0) {
                  w=1/1000*minLength;
            };
            if(h==0) {
                  h=1/1000*minLength;
            };
            screen.draw.fillRect(l,t,w,h);
      };
      } else {
            if(points[0] !== undefined) {
                  for(var $ in game.eType[add[0]].default) {
                        if(addedEData[$] === undefined) {
                              addedEData[$] = game.eType[add[0]].default[$];
                        };
                  };
                  addedEData.id = Math.random();
                  addedEData.type = add[0];
                  addedEData.x = points[0].x;
                  addedEData.y = points[0].y;
                  bAdd.entity(addedEData);
                  points = [];
            };
      };
      };
      build.settings.coins = 0;
      for(var $ in build.entities) {
            if(build.entities[$].type === "coin") {
                  build.settings.coins += 1;
            };
      };
      if(JSON.stringify(oldBuild) !== JSON.stringify(build)) {
            codeInput.value = JSON.stringify(build);
      };
      if(oldCode !== codeInput.value) {
            build = JSON.parse(codeInput.value);
      };
      screen.draw.fillStyle = "#808080";
      screen.draw.fillRect(screen.mouse.x-2,screen.mouse.y-10,4,20);
      screen.draw.fillRect(screen.mouse.x-10,screen.mouse.y-2,20,4);
      //redefines the variable that stores the previous build
      oldBuild = JSON.parse(JSON.stringify(build));
      //redefines the variable that stores the previous code
      oldCode = codeInput.value
};