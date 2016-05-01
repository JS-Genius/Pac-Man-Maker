var minLength;
var game = {
      eType: {},
      pUp: {},
};
var count;
var onload = function() {
      game.player = {
            x: 0.5,
            y: 0.5,
            coins: 0,
            direction: 0,
            spX: 1/500,
            spY: 1/500,
            lose: false,
            win: false,
            pUp: {
                  type: "none",
                  time: 0,
            },
      };
      game.settings = {
            background: "#000000",
            pUp: {},
      };
      game.entities = {};
      game.wall = {};
      count = 0;
};
onload();
var add = {};
add.entity = function($) {
      game.entities[$.id] = $;
};
add.wall = function($) {
      game.wall[$.id] = $;
};
add.eType = function($) {
      game.eType[$.name] = $;
};
add.pUp = function($) {
      game.pUp[$.name] = $;
};
add.eType({
      name: "ghost",
      default: {
            color: "red",
            spX: 1/500,
            spY: 1/500,
            width: 0.1,
            height: 0.1,
      },
      width: 0.1,
      height: 0.1,
      draw: function($,width,height,drawer) {
            screen.draw.save();
            if(drawer === "builder") {
                  screen.draw.fillStyle = $.color;
            } else {
                  if(game.pUp[game.player.pUp.type].killGhost === true) {
                        screen.draw.fillStyle = "#0000FF";
                  } else {
                        screen.draw.fillStyle = $.color;
                  };
            };
            screen.draw.fillEllipse($.x*width,$.y*height,$.width/2*width,$.height/2*height,0,Math.PI*2);
            screen.draw.fillRect(($.x - $.width/2)*width,($.y)*height,$.width*width,$.height/2*height);
            screen.draw.restore();
      },
      AI: function($) {
            game.eType.ghost.draw(game.entities[$],screen.width,screen.height);
            var mX = 0;
            var mY = 0;
            if(game.pUp[game.player.pUp.type].killGhost === true) {
            if(game.player.x<game.entities[$].x) {
                  mX = 1;
            };
            if(game.player.x>game.entities[$].x) {
                  mX = -1;
            };
            if(game.player.y<game.entities[$].y) {
                  mY = 1;
            };
            if(game.player.y>game.entities[$].y) {
                  mY = -1;
            };
            } else {
            if(game.player.x>game.entities[$].x) {
                  mX = 1;
            };
            if(game.player.x<game.entities[$].x) {
                  mX = -1;
            };
            if(game.player.y>game.entities[$].y) {
                  mY = 1;
            };
            if(game.player.y<game.entities[$].y) {
                  mY = -1;
            };
            };
            game.entities[$].x += mX*game.entities[$].spX;
            var notColide = true;
            for(var wall in game.wall) {
                  if(Math.abs((game.entities[$].x) - (game.wall[wall].left + game.wall[wall].width/2)) <= game.wall[wall].width/2 + game.entities[$].width/2 && Math.abs((game.entities[$].y) - (game.wall[wall].top + game.wall[wall].height/2)) <= game.wall[wall].height/2 + game.entities[$].height/2) {
                        notColide = false;
                  };
            };
            if(notColide) {
                  game.entities[$].sX = game.entities[$].x;
                  game.entities[$].sY = game.entities[$].y;
            } else {
                  game.entities[$].x = game.entities[$].sX;
                  game.entities[$].y = game.entities[$].sY;
            };
            game.entities[$].y += mY*game.entities[$].spY;
            var notColide = true;
            for(var wall in game.wall) {
                  if(Math.abs((game.entities[$].x) - (game.wall[wall].left + game.wall[wall].width/2)) <= game.wall[wall].width/2 + game.entities[$].width/2 && Math.abs((game.entities[$].y) - (game.wall[wall].top + game.wall[wall].height/2)) <= game.wall[wall].height/2 + game.entities[$].height/2) {
                        notColide = false;
                  };
            };
            if(notColide) {
                  game.entities[$].sX = game.entities[$].x;
                  game.entities[$].sY = game.entities[$].y;
            } else {
                  game.entities[$].x = game.entities[$].sX;
                  game.entities[$].y = game.entities[$].sY;
            };
            if(Math.abs((game.entities[$].x) - (game.player.x)) <= game.pUp[game.player.pUp.type].width/2 + game.entities[$].width/2 && Math.abs((game.entities[$].y) - game.player.y) <= game.pUp[game.player.pUp.type].height/2 + game.entities[$].width/2) {
                  if(game.pUp[game.player.pUp.type].killGhost === true) {
                        delete game.entities[$];
                  } else {
                        game.player.lose = true;
                  };
            };
      },
});
add.eType({
      name: "pUp",
      default: {
            spX: 0,
            spY: 0,
            pUp: {
                  type: "lime",
                  time: 100,
            },
      },
      width: 0.05,
      height: 0.05,
      draw: function($,width,height) {
            game.pUp[$.pUp.type].draw($,$.x,$.y,width,height);
      },
      AI: function($) {
            game.eType.pUp.draw(game.entities[$],screen.width,screen.height);
            game.entities[$].x += game.entities[$].spX;
            game.entities[$].y += game.entities[$].spY;
            if(Math.abs((game.player.x + 0.01) - (game.entities[$].x - game.eType.pUp.width)) <= game.pUp[game.player.pUp.type].width + game.eType.pUp.width && Math.abs((game.entities[$].x + game.eType.pUp.width) - (game.player.x - 0.01)) <= game.pUp[game.player.pUp.type].width + game.eType.pUp.width && Math.abs((game.player.y + 0.01) - (game.entities[$].y - game.eType.pUp.height)) <= game.pUp[game.player.pUp.type].width + game.eType.pUp.height && Math.abs((game.entities[$].y + game.eType.pUp.height) - (game.player.y - 0.01)) <= game.pUp[game.player.pUp.type].width + game.eType.pUp.height) {
                  game.player.pUp.type = game.entities[$].pUp.type;
                  game.player.pUp.time = game.entities[$].pUp.time;
                  delete game.entities[$];
            };
      },
});
add.eType({
      name: "coin",
      default: {
            spX: 0,
            spY: 0,
      },
      width: 0.05,
      height: 0.05,
      draw: function($,width,height) {
            screen.draw.save();
            screen.draw.fillStyle = "#FFFF00";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.coin.width/2*width,game.eType.coin.height/2*height,0,Math.PI*2);
            screen.draw.restore();
      },
      AI: function($) {
            game.eType.coin.draw(game.entities[$],screen.width,screen.height);
            game.entities[$].x += game.entities[$].spX;
            game.entities[$].y += game.entities[$].spY;
            if(Math.abs((game.player.x) - (game.entities[$].x)) <= game.pUp[game.player.pUp.type].width/2 + game.eType.coin.width/2 && Math.abs((game.player.y) - (game.entities[$].y)) <= game.pUp[game.player.pUp.type].height/2 + game.eType.coin.height/2) {
                  game.player.coins += 1;
                  delete game.entities[$];
            };
      },
});
add.eType({
      name: "ghostSpawn",
      default: {
            spX: 0,
            spY: 0,
            width: 0.1,
            height: 0.1,
            count: 0,
      },
      width: 0.1,
      height: 0.1,
      draw: function($,width,height,drawer) {
            if(drawer === "editor") {
            screen.draw.save();
            screen.draw.fillStyle = "#808080";
            screen.draw.fillEllipse($.x*width,$.y*height,$.width/2*width,$.height/2*height,0,Math.PI*2);
            screen.draw.fillRect(($.x - $.width/2)*width,($.y)*height,$.width*width,$.height/2*height);
            screen.draw.restore();
            };
      },
      AI: function($) {
      game.entities[$].x += game.entities[$].spX;
      game.entities[$].y += game.entities[$].spY;
      game.eType.ghostSpawn.draw(game.entities[$],screen.width,screen.height,"game");
      if(game.entities[$].count === undefined) {
            game.entities[$].count = 0;
      };
      game.entities[$].count++;
      if(game.entities[$].count % (5*25) === 0) {
      if(game.entities[$+"blinky"] === undefined) {
            add.entity({
            id: $+"blinky",
            type: "ghost",
            color: "#FF0000",
            x: game.entities[$].x,
            y: game.entities[$].y,
            width: game.entities[$].width,
            height: game.entities[$].height,
            spX: 1/250,
            spY: 1/250,
            });
      } else if(game.entities[$+"pinky"] === undefined) {
            add.entity({
            id: $+"pinky",
            type: "ghost",
            color: "#FF00FF",
            x: game.entities[$].x,
            y: game.entities[$].y,
            width: game.entities[$].width,
            height: game.entities[$].height,
            spX: 3/1000,
            spY: 3/1000,
            });
      } else if(game.entities[$+"inky"] === undefined) {
            add.entity({
            id: $+"inky",
            type: "ghost",
            color: "#00FFFF",
            x: game.entities[$].x,
            y: game.entities[$].y,
            width: game.entities[$].width,
            height: game.entities[$].height,
            spX: 1/500,
            spY: 1/500,
            });
      } else if(game.entities[$+"clyde"] === undefined) {
            add.entity({
            id: $+"clyde",
            type: "ghost",
            color: "#FF8000",
            x: game.entities[$].x,
            y: game.entities[$].y,
            width: game.entities[$].width,
            height: game.entities[$].height,
            spX: 1/1000,
            spY: 1/1000,
            });
      };
      };
},
});
add.pUp({
      name: "none",
      width: 0.1,
      height: 0.1,
      restricted: true,
      killGhost: false,
      smaller: false,
      effect: function() {
            game.player.spX = 1/500;
            game.player.spY = 1/500;
            screen.draw.save();
            screen.draw.fillStyle = "#FFFF00";
            screen.draw.fillEllipse(game.player.x*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x+1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x-1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y+1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y-1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.restore();
      },
});
add.pUp({
      name: "purple",
      width: 0.1,
      height: 0.1,
      restricted: false,
      killGhost: false,
      smaller: false,
      effect: function() {
            game.player.spX = 2/500;
            game.player.spY = 2/500;
            screen.draw.save();
            screen.draw.fillStyle = "#800080";
            screen.draw.fillEllipse(game.player.x*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x+1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x-1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y+1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y-1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.restore();
      },
      draw: function($,x,y,width,height) {
            screen.draw.save();
            screen.draw.fillStyle = "#800080";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.pUp.width/2*width,game.eType.pUp.height/2*height,0,Math.PI*2);
            screen.draw.restore();
      },
});
add.pUp({
      name: "cyan",
      width: 0.1,
      height: 0.1,
      killGhost: false,
      smaller: false,
      restricted: false,
      effect: function() {
            game.player.spX = 3/500;
            game.player.spY = 3/500;
            screen.draw.save();
            screen.draw.fillStyle = "#008080";
            screen.draw.fillEllipse(game.player.x*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x+1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x-1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y+1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y-1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.restore();
      },
      draw: function($,x,y,width,height) {
            screen.draw.save();
            screen.draw.fillStyle = "#008080";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.pUp.width/2*width,game.eType.pUp.height/2*height,0,Math.PI*2);
            screen.draw.restore();
      },
});
add.pUp({
      name: "lime",
      width: 0.1,
      height: 0.1,
      restricted: false,
      killGhost: true,
      smaller: false,
      effect: function() {
            game.player.spX = 2/500;
            game.player.spY = 2/500;
            screen.draw.save();
            screen.draw.fillStyle = "#80FF00";
            screen.draw.fillEllipse(game.player.x*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x+1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x-1)*screen.width,game.player.y*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y+1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y-1)*screen.height,0.1*screen.width/2,0.1*screen.height/2,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.restore();
      },
      draw: function($,x,y,width,height) {
            screen.draw.save();
            screen.draw.fillStyle = "#80FF00";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.pUp.width/2*width,game.eType.pUp.height/2*height,0,Math.PI*2);
            screen.draw.restore();
      },
});
add.pUp({
      name: "mini",
      width: 0.01,
      height: 0.01,
      restricted: false,
      killGhost: false,
      smaller: true,
      effect: function() {
            game.player.spX = 1/500;
            game.player.spY = 1/500;
            screen.draw.save();
            screen.draw.fillStyle = "#FFFF00";
            screen.draw.fillEllipse(game.player.x*screen.width,game.player.y*screen.height,0.1*screen.width/20,0.1*screen.height/20,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x+1)*screen.width,game.player.y*screen.height,0.1*screen.width/20,0.1*screen.height/20,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse((game.player.x-1)*screen.width,game.player.y*screen.height,0.1*screen.width/20,0.1*screen.height/20,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y+1)*screen.height,0.1*screen.width/20,0.1*screen.height/20,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.fillEllipse(game.player.x*screen.width,(game.player.y-1)*screen.height,0.1*screen.width/20,0.1*screen.height/20,dTOr(45+game.player.direction),dTOr(-45+game.player.direction));
            screen.draw.restore();
      },
      draw: function($,x,y,width,height) {
            screen.draw.save();
            screen.draw.fillStyle = "#FFFF00";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.pUp.width/2*width,game.eType.pUp.height/2*height,0,Math.PI*2);
            screen.draw.fillStyle = "#808000";
            screen.draw.fillEllipse($.x*width,$.y*height,game.eType.pUp.width/20*width,game.eType.pUp.height/20*height,0,Math.PI*2);
            screen.draw.restore();
      },
});
var playAI = function($) {
      game.eType[game.entities[$].type].AI($);
};
var playerAI = function() {
      game.pUp[game.player.pUp.type].effect();
      var mX = 0;
      var mY = 0;
      if(screen.keys[38] === true) {
            mY--;
            game.player.direction = -90;
      };
      if(screen.keys[40] === true) {
            mY++;
            game.player.direction = 90;
      };
      if(screen.keys[37] === true) {
            mX--;
            game.player.direction = 180;
      };
      if(screen.keys[39] === true) {
            mX++;
            game.player.direction = 0;
      };
            game.player.x += mX*game.player.spX;
            var notColide = true;
            for(var wall in game.wall) {
                  if(Math.abs((game.player.x) - (game.wall[wall].left + game.wall[wall].width/2)) <= game.wall[wall].width/2 + game.pUp[game.player.pUp.type].width/2 && Math.abs((game.player.y) - (game.wall[wall].top + game.wall[wall].height/2)) <= game.wall[wall].height/2 + game.pUp[game.player.pUp.type].height/2) {
                        notColide = false;
                  };
            };
            if(notColide) {
                  game.player.sX = game.player.x;
                  game.player.sY = game.player.y;
            } else {
                  game.player.x = game.player.sX;
                  game.player.y = game.player.sY;
            };
            game.player.y += mY*game.player.spY;
            var notColide = true;
            for(var wall in game.wall) {
                  if(Math.abs((game.player.x) - (game.wall[wall].left + game.wall[wall].width/2)) <= game.wall[wall].width/2 + game.pUp[game.player.pUp.type].width/2 && Math.abs((game.player.y) - (game.wall[wall].top + game.wall[wall].height/2)) <= game.wall[wall].height/2 + game.pUp[game.player.pUp.type].height/2) {
                        notColide = false;
                  };
            };
            if(notColide) {
                  game.player.sX = game.player.x;
                  game.player.sY = game.player.y;
            } else {
                  game.player.x = game.player.sX;
                  game.player.y = game.player.sY;
            };
      if(game.player.pUp.time === 0) {
            if(game.pUp[game.player.pUp.type].smaller) {
            var notColide = true;
            for(var wall in game.wall) {
                  if(Math.abs((game.player.x) - (game.wall[wall].left + game.wall[wall].width/2)) <= game.wall[wall].width/2 + game.pUp.none.width/2 && Math.abs((game.player.y) - (game.wall[wall].top + game.wall[wall].height/2)) <= game.wall[wall].height/2 + game.pUp.none.height/2) {
                        notColide = false;
                  };
            };
            if(notColide) {
                  game.player.pUp.type = "none";
            };
            } else {
                  game.player.pUp.type = "none";
            };
      } else {
            game.player.pUp.time -= 1;
      };
      var notColide = true;
      if(game.player.x < 0) {
            game.player.x += 1;
      };
      if(game.player.x > 1) {
            game.player.x -= 1;
      };
      if(game.player.y < 0) {
            game.player.y += 1;
      };
      if(game.player.y > 1) {
            game.player.y -= 1;
      };
};
var playWall = function($) {
      screen.draw.save();
      screen.draw.fillStyle = game.wall[$].color;
      screen.draw.fillRect(game.wall[$].left*screen.width,game.wall[$].top*screen.height,game.wall[$].width*screen.width,game.wall[$].height*screen.height);
      screen.draw.restore();
};
var choose = {};
choose.pUp = function(list) {
var name = list[Math.floor(Math.random()*(list.length))];
if(game.pUp[name].restricted === true || game.settings.pUp[name] !== true) {
      name = choose.pUp(list);
};
return name;
};
var lose = function() {
      screen.draw.save();
      screen.draw.fillStyle = "#FF8000";
      screen.draw.fillRect(0,0,screen.width,screen.height);
      screen.draw.restore();
};
var win = function() {
      screen.draw.save();
      screen.draw.fillStyle = "#00FF80";
      screen.draw.fillRect(0,0,screen.width,screen.height);
      screen.draw.restore();
};
var PACMAN = function() {
      screen.mouse.click = function() {};
      if(game.player.coins === game.settings.coins) {
            game.player.win = true;
      };
      if(game.player.win === true) {
            win();
      } else if(game.player.lose === true) {
            lose();
      } else {
      screen.draw.fillStyle = game.settings.background;
      screen.draw.fillRect(0,0,screen.width,screen.height);
      for(var $ in game.wall) {
            playWall($);
      };
      for(var $ in game.entities) {
            playAI($);
      }; 
      playerAI();
      var pUpCount = -1;
      var pUpList = [];
      var pUA = false;
      for(var $ in game.pUp) {
            pUpCount++;
            pUpList[pUpCount] = $;
            if(game.pUp[$].restricted !== true && game.settings.pUp[$] === true) {
                  pUA = true;
            };
      };
      count += 1;
      if(pUA === true) {
      if(count % (25*30) === 0) {
            pUp = choose.pUp(pUpList);
            console.log(pUp);
            add.entity({
            id: Math.random(),
            type: "pUp",
            x: Math.random(),
            y: Math.random(),
            spX: 0,
            spY: 0,
            pUp: {
                  type: pUp,
                  time: 100,
            },
            });
      };
      };
      };
      screen.draw.save();
      screen.draw.fillStyle = "#FFFF00";
      screen.draw.font = "30px Calibri";
      screen.draw.fillText("Coins: " + game.player.coins,0.2 *screen.width,1*screen.height);
      screen.draw.restore();
};