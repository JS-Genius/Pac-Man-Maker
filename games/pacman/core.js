//changes the title to pacman
document.getElementById('title').innerHTML="Pacman";
//adds the game js file
var dwlgamecode = document.createElement("script");
dwlgamecode.type = "text/javascript";
dwlgamecode.src = "games/pacman/code.js";
document.body.appendChild(dwlgamecode);
//adds the builder js file
var dwlbuildcode = document.createElement("script");
dwlbuildcode.type = "text/javascript";
dwlbuildcode.src = "games/pacman/builder.js";
document.body.appendChild(dwlbuildcode);
//adds the savemenu js file
var dwlsavemenucode = document.createElement("script");
dwlsavemenucode.type = "text/javascript";
dwlsavemenucode.src = "games/pacman/savemenu.js";
document.body.appendChild(dwlsavemenucode);
//adds the interface js file
var dwlinterfacecode = document.createElement("script");
dwlinterfacecode.type = "text/javascript";
dwlinterfacecode.src = "games/pacman/interface.js";
document.body.appendChild(dwlinterfacecode);