let pipets = {

pipetA:{kapasitas:0,cairan:null},
pipetB:{kapasitas:0,cairan:null}

}

let labu = {

kapasitas:0,
a:0,
b:0,
indikator:false

}

function dekat(a,b){

let ar=a.getBoundingClientRect()
let br=b.getBoundingClientRect()

return Math.abs(ar.x-br.x)<80 && Math.abs(ar.y-br.y)<80

}

function updatePipet(id){

let p=pipets[id]

document.getElementById(id).src="assets/pv"+p.kapasitas+".png"

}

function updateLabu(){

let img="l"

let a=labu.a
let b=labu.b

if(a==0 && b==0) img="l"

else if(a==1 && b==0) img="la"

else if(a==2 && b==0) img="laa"

else if(a==1 && b==1) img="lab"

else if(a==0 && b==2) img="lbb"

document.getElementById("labu").src="assets/"+img+".png"

}

function tekanBulb(id){

let pipet=pipets[id]

let el=document.getElementById(id)

let botolA=document.getElementById("botolA")
let botolB=document.getElementById("botolB")
let labuEl=document.getElementById("labu")

if(dekat(el,botolA)){

if(pipet.cairan && pipet.cairan!="A") return

if(pipet.kapasitas<5){

pipet.kapasitas++
pipet.cairan="A"

updatePipet(id)

}

}

else if(dekat(el,botolB)){

if(pipet.cairan && pipet.cairan!="B") return

if(pipet.kapasitas<5){

pipet.kapasitas++
pipet.cairan="B"

updatePipet(id)

}

}

else if(dekat(el,labuEl)){

if(pipet.kapasitas>0 && labu.kapasitas<4){

pipet.kapasitas--

if(pipet.cairan=="A") labu.a++
if(pipet.cairan=="B") labu.b++

labu.kapasitas++

updatePipet(id)

updateLabu()

}

}

}

function drag(el,id){

let offsetX
let offsetY

el.onmousedown=e=>{

offsetX=e.offsetX
offsetY=e.offsetY

document.onmousemove=e=>{

el.style.left=e.pageX-offsetX+"px"
el.style.top=e.pageY-offsetY+"px"

}

document.onmouseup=()=>{

document.onmousemove=null

}

}

el.ondblclick=()=>tekanBulb(id)

}

drag(document.getElementById("pipetA"),"pipetA")
drag(document.getElementById("pipetB"),"pipetB")

document.getElementById("menuBtn").onclick=()=>{

document.getElementById("overlay").style.display="flex"

}

function closeMenu(){

document.getElementById("overlay").style.display="none"

}

function resetGame(){

location.reload()

}
