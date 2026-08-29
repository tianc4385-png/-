let moods =
JSON.parse(localStorage.getItem("moods"))
||
[];



function save(){

localStorage.setItem(
"moods",
JSON.stringify(moods)
);

}




function addMood(){


let input =
document.getElementById(
"moodInput"
);



let text =
input.value.trim();



if(text===""){

alert("请先写一点心情");

return;

}



let mood={


content:text,


time:new Date()
.toLocaleString()



};



moods.unshift(mood);



save();



input.value="";


render();



}





function render(){


let list =
document.getElementById(
"moodList"
);



let count =
document.getElementById(
"count"
);



count.innerHTML=
moods.length;



list.innerHTML="";



moods.forEach(
(item,index)=>{


let div=
document.createElement(
"div"
);



div.className="mood";



div.innerHTML=`

<span 
class="delete"
onclick="removeMood(${index})">
删除
</span>


<p>
${item.content}
</p>


<div class="time">

${item.time}

</div>


`;



list.appendChild(div);



}

);



}



function removeMood(index){


if(confirm("确定删除这条心情吗？")){


moods.splice(index,1);


save();


render();


}


}




render();
