// Supabase 配置

const SUPABASE_URL = "你的Project URL";

const SUPABASE_KEY = "你的Publishable key";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// 加载心情

async function loadMoods(){

    const {data,error} = await supabaseClient
        .from("moods")
        .select("*")
        .order(
            "created_at",
            {
                ascending:false
            }
        );


    if(error){
        console.log(error);
        return;
    }


    const list =
    document.getElementById("moodList");


    const count =
    document.getElementById("count");


    count.innerHTML=data.length;


    list.innerHTML="";


    data.forEach(item=>{


        let div=document.createElement("div");


        div.className="mood";


        div.innerHTML=`

        <p>
        ${item.content}
        </p>


        <div class="time">
        ${new Date(item.created_at)
        .toLocaleString()}
        </div>

        `;


        list.appendChild(div);


    });


}




// 发布心情

async function addMood(){


    let input =
    document.getElementById(
        "moodInput"
    );


    let text=input.value.trim();



    if(!text){

        alert("请输入心情");

        return;

    }



    const {error}=await supabaseClient
    .from("moods")
    .insert({

        content:text

    });



    if(error){

        console.log(error);

        alert("发布失败");

        return;

    }



    input.value="";


    loadMoods();


}




loadMoods();
