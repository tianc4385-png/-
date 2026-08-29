// ================================
// Supabase 云端配置
// ================================


const SUPABASE_URL = "https://lwwxlfdrubmrvssoakzy.supabase.co";


const SUPABASE_KEY = "sb_publishable_4_iExkXqFFQO524J_qYtiA_6eInaWkK";



// 创建连接

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);




// ================================
// 加载所有心情
// ================================


async function loadMoods(){


    const { data, error } = await supabaseClient

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



    const list = document.getElementById(
        "moodList"
    );


    const count = document.getElementById(
        "count"
    );



    list.innerHTML="";



    count.innerHTML=data.length;




    data.forEach(item=>{


        let box=document.createElement(
            "div"
        );


        box.className="mood-item";



        box.innerHTML=`

            <div class="content">

                ${item.content}

            </div>


            <div class="time">

                ${new Date(
                    item.created_at
                ).toLocaleString()}

            </div>

        `;



        list.appendChild(box);



    });



}






// ================================
// 发布心情
// ================================


async function addMood(){



    const input =
    document.getElementById(
        "moodInput"
    );



    const text =
    input.value.trim();





    if(text===""){


        alert(
            "请输入你的心情"
        );


        return;

    }






    const {error}=await supabaseClient


        .from("moods")


        .insert([

            {

                content:text

            }

        ]);






    if(error){


        console.log(error);


        alert(
            "发布失败"
        );


        return;


    }






    input.value="";



    loadMoods();



}






// 页面打开自动加载


loadMoods();
