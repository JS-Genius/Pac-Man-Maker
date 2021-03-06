var NEXTFRAME = undefined;
var disableCookies = (typeof(Storage) == undefined);
var cookieSet = "";
var cookie = {
            set: function(name,value) {
                  if(disableCookies) {
                        cookieSet[name] = value;
                  } else {
                        //document.cookie = name+"="+value;
                        localStorage.setItem(name,value);
                  };
            },
            get: function(name) {
                  if(disableCookies) {
                        return cookieSet[name];
                  } else {
                        /*name += "=";
                        var ca = document.cookie.split(';');
                        for(var i = 0;i<ca.length;i++) {
                              var c = ca[i];
                              while(c.charAt(0)==' ') {
                                    c = c.substring(1);
                              };
                              if(c.indexOf(name) == 0) {
                                    return c.substring(name.length,c.length);
                              };
                        };
                        return "";*/
                        return localStorage.getItem(name);
                  };
            },
};
if(!disableCookies) {
      cookie.set('test','true');
      if(cookie.get('test') !== 'true') {
            disableCookies = true;
            console.error('Cannot access local storage');
      };
};
if(disableCookies) {
      cookieSet = prompt('Input a JSON Cookie String');
      if(cookieSet == null || cookieSet == undefined || cookieSet == "") {
            cookieSet = "{}";
      };
      cookieSet = JSON.parse(cookieSet);
};
var levels = cookie.get('levels');
if(levels == "" || levels == undefined) {
      cookie.set('levels','[]');
      levels = cookie.get('levels');
};
levels = JSON.parse(levels);
var rlBeat = cookie.get('rlbeat');
if(rlBeat == "" || rlBeat == undefined) {
      cookie.set('rlbeat','0');
      rlBeat = cookie.get('rlbeat');
};
rlBeat = Number(rlBeat);
var unlocked = cookie.get('use');
if(unlocked == "" || unlocked == undefined) {
      cookie.set('use','{}');
      unlocked = cookie.get('use');
};
unlocked = JSON.parse(unlocked);
var gameSquareButtons = {};
var menu = "main";
var OPENRLMENU = function() {
      console.log("RANDOM LEVEL");
      menu = "RL";
};
var OPENCHMENU = function() {
      console.log("CHALLENGES");
      menu = "CH";
};
var OPENGFMENU = function() {
      console.log("GET FROM FILE");
      menu = "GF";
};
var OPENPWMENU = function() {
      console.log("PASSWORD");
      menu = "PW";
};
var BACKMENU = function() {
      console.log("BACK");
      menu = "main";
};
var level = "";
var GETFROMFILESEND = function() {
      var dwlscript = document.createElement("script");
      dwlscript.type = "text/javascript";
      dwlscript.src = codeInput.value;
      document.body.appendChild(dwlscript);
      NEXTFRAME = function() {
            game.player = JSON.parse(level).player;
            game.entities = JSON.parse(level).entities;
            game.wall = JSON.parse(level).wall;
            game.settings = JSON.parse(level).settings;
            style = "game";
            document.body.removeChild(dwlscript);
      };
};
var n = document.createElement("input");
n.type = "file";
n.accept = ".pac"
n.addEventListener('change', function(event) {
      var temp = URL.createObjectURL(event.target.files[0]);
      var s = document.createElement("script");
      s.src = temp;
      document.body.appendChild(s);
      NEXTFRAME = function() {
            game.player = JSON.parse(level).player;
            game.entities = JSON.parse(level).entities;
            game.wall = JSON.parse(level).wall;
            game.settings = JSON.parse(level).settings;
            style = "game";
            document.body.removeChild(s);
      };
});
var selectedL = {
      levelNo: null,
      menu: false,
      created: null,
};
var SIDEMENU = function() {
      gameSquareButtons = {};
      screen.draw.fillStyle = "#F0D000";
      screen.draw.fillRect(screen.width*3/4,0,screen.width/4,screen.height);
      if(selectedL.created) {
            screen.draw.fillStyle = "#D0F000";
            screen.draw.fillRect(screen.width*13/16,screen.height*8/20,screen.width/8,screen.height/20);
            screen.draw.fillStyle = "#2F0FFF";
            screen.draw.font = screen.width*1/16+"px Impact, Charcoal, sans-serif";
            screen.draw.fillText('EDIT',screen.width*13/16,screen.height*9/20);
            gameSquareButtons.ed = {
                 left: 13/16,
                 top: 8/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runCreatedCMD('edit');
                 },
            };
            screen.draw.fillStyle = "#D0F000";
            screen.draw.fillRect(screen.width*13/16,screen.height*11/20,screen.width/8,screen.height/20);
            screen.draw.fillStyle = "#2F0FFF";
            screen.draw.font = screen.width*1/16+"px Impact, Charcoal, sans-serif";
            screen.draw.fillText('PLAY',screen.width*13/16,screen.height*12/20);
            gameSquareButtons.pl = {
                 left: 13/16,
                 top: 11/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runCreatedCMD('play');
                 },
            };
            screen.draw.fillStyle = "#FF0000";
            screen.draw.fillRect(screen.width*13/16,screen.height*14/20,screen.width/8,screen.height/20);
            screen.draw.fillStyle = "#00FFFF";
            screen.draw.font = screen.width*1/22+"px Impact, Charcoal, sans-serif";
            screen.draw.fillText('DELETE',screen.width*13/16,screen.height*15/20);
            gameSquareButtons.del = {
                 left: 13/16,
                 top: 14/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runCreatedCMD('delete');
                 },
            };
            gameSquareButtons.back = {
                 left: 13/16,
                 top: 18/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runCreatedCMD('exit');
                 },
            };
      } else {
            screen.draw.fillStyle = "#D0F000";
            screen.draw.fillRect(screen.width*13/16,screen.height*10/20,screen.width/8,screen.height/20);
            screen.draw.fillStyle = "#2F0FFF";
            screen.draw.font = screen.width*1/24+"px Impact, Charcoal, sans-serif";
            screen.draw.fillText('CREATE',screen.width*13/16,screen.height*11/20);
            gameSquareButtons.c = {
                 left: 13/16,
                 top: 10/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runUnCMD('create');
                 },
            };
            gameSquareButtons.back = {
                 left: 13/16,
                 top: 18/20,
                 width: 1/8,
                 height: 1/20,
                 click: function() {
                       runUnCMD('exit');
                 },
            };
      };
      screen.draw.fillStyle = "#00D0F0";
      screen.draw.fillRect(screen.width*13/16,screen.height*18/20,screen.width/8,screen.height/20);
      screen.draw.fillStyle = "#FF2F0F";
      screen.draw.font = screen.width*1/16+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText('BACK',screen.width*13/16,screen.height*19/20);
};
var runCreatedCMD = function(cmd) {
      if(cmd == 'delete') {
            levels[selectedL.levelNo].name = '';
            levels[selectedL.levelNo].level = {};
            levels[selectedL.levelNo].used = false;
            cookie.set('levels',JSON.stringify(levels));
      } else if(cmd == 'edit') {
            build=levels[selectedL.levelNo].level;
            creatingStage = selectedL.levelNo;
            style='buildtest';
            NEXTFRAME = function() {
                  points = [];
                  NEXTFRAME = function() {
                        points = [];
                        NEXTFRAME = function() {
                              points = [];
                              NEXTFRAME = function() {
                                          points = [];
                                    NEXTFRAME = function() {
                                                points = [];
                                          NEXTFRAME = function() {
                                                      points = [];
                                          };
                                    };
                              };
                        };
                  };
            };
      } else if(cmd == 'play') {
            game.player = levels[selectedL.levelNo].level.player;
            game.entities = levels[selectedL.levelNo].level.entities;
            game.wall = levels[selectedL.levelNo].level.wall;
            game.settings = levels[selectedL.levelNo].level.settings;
            style='game';
      } else if(cmd == 'exit') {
      };
      selectedL = {
            levelNo: null,
            menu: false,
            created: null,
      };
};
var popUpCreatedMenu = function(l) {
      selectedL = {
            levelNo: l,
            menu: true,
            created: true,
      };
};
var runUnCMD = function(cmd) {
      if(cmd == 'create') {
            levels[selectedL.levelNo].name = '';
            levels[selectedL.levelNo].level = {"entities":{},"wall":{},"player":{"x":0.5,"y":0.5,"coins":0,"direction":0,"spX":0.002,"spY":0.002,"pUp":{"type":"none","time":0}},"settings":{"background":"#000000","coins":0,"pUp":{}}};
            style = 'buildtest';
            creatingStage = selectedL.levelNo;
            build=JSON.parse(JSON.stringify(levels[selectedL.levelNo].level));
            cookie.set('levels',JSON.stringify(levels));
            NEXTFRAME = function() {
                  points = [];
                  NEXTFRAME = function() {
                        points = [];
                        NEXTFRAME = function() {
                              points = [];
                              NEXTFRAME = function() {
                                          points = [];
                                    NEXTFRAME = function() {
                                                points = [];
                                          NEXTFRAME = function() {
                                                      points = [];
                                          };
                                    };
                              };
                        };
                  };
            };
      } else if(cmd == 'exit') {
      };
      selectedL = {
            levelNo: null,
            menu: false,
            created: null,
      };
};
var popUpNotCreatedMenu = function(l) {
      selectedL = {
            levelNo: l,
            menu: true,
            created: false,
      };
};
var stagePressed = function(l) {
      if(levels[l].used) {
            popUpCreatedMenu(l);
      } else {
            popUpNotCreatedMenu(l);
      };
};
var drawLevels = function(i) {
            if(levels[i*4] == undefined) {
                  levels[i*4] = {used: false, level: {}, name: "",};
                  cookie.set('levels',JSON.stringify(levels));
            };
            gameSquareButtons['l'+(i*4+0)] = {
                  left: 3/20,
                  top: 40/screen.height+((7/40+(i*4/20))),
                  width: 1/10,
                  height: 1/10,
                  click: function() {
                        stagePressed(i*4+0);
                  },
            };
            if(levels[i*4].used) {
                  screen.draw.fillStyle = "#FF0000";
            } else {
                  screen.draw.fillStyle = "#808080";
            };
            screen.draw.fillEllipse(4/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/20*screen.width,1/20*screen.height,0,Math.PI*2);
            screen.draw.fillRect(3/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/10*screen.width,1/20*screen.height);
            if(levels[i*4+1] == undefined) {
                  levels[i*4+1] = {used: false, level: {}, name: "",};
                  cookie.set('levels',JSON.stringify(levels));
            };
            gameSquareButtons['l'+(i*4+1)] = {
                  left: 7/20,
                  top: 40/screen.height+((7/40+(i*4/20))),
                  width: 1/10,
                  height: 1/10,
                  click: function() {
                        stagePressed(i*4+1);
                  },
            };
            if(levels[i*4+1].used) {
                  screen.draw.fillStyle = "#FF00FF";
            } else {
                  screen.draw.fillStyle = "#808080";
            };
            screen.draw.fillEllipse(8/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/20*screen.width,1/20*screen.height,0,Math.PI*2);
            screen.draw.fillRect(7/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/10*screen.width,1/20*screen.height);
            if(levels[i*4+2] == undefined) {
                  levels[i*4+2] = {used: false, level: {}, name: "",};
                  cookie.set('levels',JSON.stringify(levels));
            };
            gameSquareButtons['l'+(i*4+2)] = {
                  left: 11/20,
                  top: 40/screen.height+((7/40+(i*4/20))),
                  width: 1/10,
                  height: 1/10,
                  click: function() {
                        stagePressed(i*4+2);
                  },
            };
            if(levels[i*4+2].used) {
                  screen.draw.fillStyle = "#00FFFF";
            } else {
                  screen.draw.fillStyle = "#808080";
            };
            screen.draw.fillEllipse(12/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/20*screen.width,1/20*screen.height,0,Math.PI*2);
            screen.draw.fillRect(11/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/10*screen.width,1/20*screen.height);
            if(levels[i*4+3] == undefined) {
                  levels[i*4+3] = {used: false, level: {}, name: "",};
                  cookie.set('levels',JSON.stringify(levels));
            };
            gameSquareButtons['l'+(i*4+3)] = {
                  left: 15/20,
                  top: 40/screen.height+((7/40+(i*4/20))),
                  width: 1/10,
                  height: 1/10,
                  click: function() {
                        stagePressed(i*4+3);
                  },
            };
            if(levels[i*4+3].used) {
                  screen.draw.fillStyle = "#FF8000";
            } else {
                  screen.draw.fillStyle = "#808080";
            };
            screen.draw.fillEllipse(16/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/20*screen.width,1/20*screen.height,0,Math.PI*2);
            screen.draw.fillRect(15/20*screen.width,40+((9/40+(i*4/20))*screen.height),1/10*screen.width,1/20*screen.height);
};
gameSquareButtons.rl = {
     left: 13/40,
     top: 0,
     width: 1/20,
     height: 1/10,
     click: function() {
           OPENRLMENU();
     },
};
gameSquareButtons.ch = {
     left: 17/40,
     top: 0,
     width: 1/20,
     height: 1/10,
     click: function() {
           OPENCHMENU();
     },
};
gameSquareButtons.gf = {
     left: 21/40,
     top: 0,
     width: 1/20,
     height: 1/10,
     click: function() {
           OPENGFMENU();
     },
};
gameSquareButtons.pw = {
     left: 25/40,
     top: 0,
     width: 1/20,
     height: 1/10,
     click: function() {
           OPENPWMENU();
     },
};
var point = {};
var SAVEMENU = function() {
      if(NEXTFRAME !== undefined) {
            NEXTFRAME();
            NEXTFRAME = undefined;
      };
      gameSquareButtons = {};
      screen.mouse.click = function() {
            point.x = screen.mouse.x;
            point.y = screen.mouse.y;
            if(point.x !== undefined) {
                  for(var $ in gameSquareButtons) {
                        if(point.x/screen.width >= gameSquareButtons[$].left && point.y/screen.height >= gameSquareButtons[$].top && point.x/screen.width <= gameSquareButtons[$].left + gameSquareButtons[$].width && point.y/screen.height <= gameSquareButtons[$].top + gameSquareButtons[$].height) {
                              gameSquareButtons[$].click();
                        };
                  };
                  point = {};
            };
      };
      if(menu === "main") {
      codeDiv.style.zIndex = 0;
      codeDiv.style.top = "0px";
      codeDiv.style.left = "0px";
      gameSquareButtons.rl = {
            left: 13/40,
            top: 40/screen.height,
            width: 1/20,
            height: 1/10,
            click: function() {
                  OPENRLMENU();
            },
      };
      gameSquareButtons.ch = {
            left: 17/40,
            top: 40/screen.height,
            width: 1/20,
            height: 1/10,
            click: function() {
                  OPENCHMENU();
            },
      };
      gameSquareButtons.gf = {
            left: 21/40,
            top: 40/screen.height,
            width: 1/20,
            height: 1/10,
            click: function() {
                  OPENGFMENU();
            },
      };
      gameSquareButtons.pw = {
            left: 25/40,
            top: 40/screen.height,
            width: 1/20,
            height: 1/10,
            click: function() {
                  OPENPWMENU();
            },
      };
      screen.draw.fillRect(0,0,document.getElementById("game").width,document.getElementById("game").height);
      screen.draw.font = "36px Impact, Charcoal, sans-serif";
      screen.draw.fillStyle = "#0000FF";
      screen.draw.fillText("PACMAN LEVEL MENU", screen.width/2-(18*17/2),36);
      screen.draw.fillStyle = "#0080FF";
      screen.draw.fillEllipse(7/20*screen.width,40+(1/20*screen.height),1/40*screen.width,1/40*screen.height,0,Math.PI*2);
      screen.draw.fillRect(13/40*screen.width,40+(1/20*screen.height),1/20*screen.width,1/40*screen.height);
      screen.draw.fillStyle = "#FF8000";
      screen.draw.font = (1/10)/11.25*screen.width+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("RANDOM LEVEL",13/40*screen.width,40+(3/40*screen.height));
      screen.draw.fillStyle = "#FF0000";
      screen.draw.fillEllipse(9/20*screen.width,40+(1/20*screen.height),1/40*screen.width,1/40*screen.height,0,Math.PI*2);
      screen.draw.fillRect(17/40*screen.width,40+(1/20*screen.height),1/20*screen.width,1/40*screen.height);
      screen.draw.fillStyle = "#00FFFF";
      screen.draw.font = (1/9)/11*screen.width+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("CHALLENGES",17/40*screen.width,40+(3/40*screen.height));
      screen.draw.fillStyle = "#00FF00";
      screen.draw.fillEllipse(11/20*screen.width,40+(1/20*screen.height),1/40*screen.width,1/40*screen.height,0,Math.PI*2);
      screen.draw.fillRect(21/40*screen.width,40+(1/20*screen.height),1/20*screen.width,1/40*screen.height);
      screen.draw.fillStyle = "#FF00FF";
      screen.draw.font = (1/10)/11*screen.width+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("GET FROM FILE",21/40*screen.width,40+(3/40*screen.height));
      screen.draw.fillStyle = "#00FFFF";
      screen.draw.fillEllipse(13/20*screen.width,40+(1/20*screen.height),1/40*screen.width,1/40*screen.height,0,Math.PI*2);
      screen.draw.fillRect(25/40*screen.width,40+(1/20*screen.height),1/20*screen.width,1/40*screen.height);
      screen.draw.fillStyle = "#FF0000";
      screen.draw.font = (1/10)/9*screen.width+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("PASSWORD",25/40*screen.width,40+(3/40*screen.height));
      for(var i = 0;i<=Math.floor(rlBeat/4);i++) {
            if(1<(40/screen.height+(9/40+(i*4/20)))) {
                  document.getElementById("game").height = 40+((9/40+(i*4/20))*screen.height);
                  document.getElementById("game").width = window.innerWidth;
            };
            drawLevels(i);
      };
      if(selectedL.menu) {
            SIDEMENU();
      };
      };
      if(menu === "RL") {
            screen.draw.fillStyle = "#000000";
            screen.draw.fillRect(0,0,screen.width,screen.height);
      };
      if(menu === "GF") {
      codeInput.onkeydown=function(event) {
            if(event.keyCode==13) {
                  GETFROMFILESEND()
            };
      };
      codeDiv.style.zIndex = 2;
      codeDiv.style.top = screen.height/2-(screen.height/100)+"px";
      codeDiv.style.left = screen.width/2-((screen.width+2)/10)+"px";
      codeInput.style.width = screen.width/5+"px";
      codeInput.style.height = screen.height/50+"px";
      codeInput.style.margin = "0px";
      codeInput.style.border = "1px solid #000000";
      codeInput.style.padding = "0px";
      gameSquareButtons.back = {
            left: 0,
            top: 19/20,
            width: 1/20,
            height: 1/20,
            click: function() {
                  BACKMENU();
            },
      };
      gameSquareButtons.get = {
            left: 19/40,
            top: 14/40,
            width: 1/20,
            height: 1/40,
            click: function() {
                  n.click();
            },
      };
      gameSquareButtons.send = {
            left: 19/40,
            top: 25/40,
            width: 1/20,
            height: 1/40,
            click: function() {
                  GETFROMFILESEND();
            },
      };
      screen.draw.fillStyle = "#00FF00";
      screen.draw.fillRect(0,0,screen.width,screen.height);
      screen.draw.font = screen.height/20+"px Impact, Charcoal, sans-serif";
      screen.draw.fillStyle = "#FF00FF";
      screen.draw.fillText("GET FROM FILE", screen.width/2-((screen.height/40)*13/2),screen.height/20);
      screen.draw.fillStyle = "#FF00FF";
      screen.draw.fillRect(0,screen.height*19/20,screen.width/20,screen.height/20);
      screen.draw.fillStyle = "#00FF00";
      screen.draw.font = screen.width/50+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("BACK", 0, screen.height);
      screen.draw.fillStyle = "#0000FF";
      screen.draw.fillRect(screen.width*19/40,screen.height*14/40,screen.width/20,screen.height/40);
      screen.draw.fillStyle = "#FF0000";
      screen.draw.font = screen.width/160+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("GET FROM LOCAL FILE", screen.width*19/40, screen.height*15/40);
      screen.draw.fillStyle = "#0000FF";
      screen.draw.fillRect(screen.width*19/40,screen.height*25/40,screen.width/20,screen.height/40);
      screen.draw.fillStyle = "#FF0000";
      screen.draw.font = screen.width/60+"px Impact, Charcoal, sans-serif";
      screen.draw.fillText("OBTAIN", screen.width*19/40, screen.height*13/20);
      };
};