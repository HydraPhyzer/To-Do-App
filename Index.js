function GetValue() {
    let Text = document.querySelector('input').value;
    return Text
}

let AllStore=()=>
{
    AllArray=[];
    let AllTodo=document.querySelectorAll('.Todo label');
    let AllTodoChk=document.querySelectorAll('.Todo input');

    AllTodo.forEach((Elem , Ind)=>
    {
        let Obj=
        {
            Status:AllTodoChk[Ind].value,
            Text:Elem.innerText,
        }
        AllArray.push(Obj);
    });

    localStorage.setItem("All-Notes" , JSON.stringify(AllArray));
}
let CompletedStore=()=>
{
    AllArray=[];
    let AllTodo=document.querySelectorAll('.Todo label');
    let AllTodoChk=document.querySelectorAll('.Todo input');

    AllTodo.forEach((Elem , Ind)=>
    {
        let Obj=
        {
            Status:AllTodoChk[Ind].value,
            Text:Elem.innerText,
        }
        if(AllTodoChk[Ind].value=="true")
        AllArray.push(Obj);
    });

    localStorage.setItem("Completed-Notes" , JSON.stringify(AllArray));
}

let Todos = () => {
    let NewTodo = document.createElement('div');
    NewTodo.classList.add('Todo');


    let NoteText = GetValue();
    if (NoteText == '') {
        alert("Note Cannot Be Empty !!");
        return;
    }
    let HTMLData =
    `
    <input type="checkbox" class="Box">
    <label class="Lab">${NoteText}</label>
    `
    NewTodo.insertAdjacentHTML("afterbegin", HTMLData);
    document.querySelector('#A').prepend(NewTodo);

    localStorage.clear();
    AllStore();
}
document.querySelector('.fa-circle-plus').addEventListener("click", () => {
    Todos();
});


function Checker()
{
    let Arr1 = document.querySelectorAll('.Box');
    
    Arr1.forEach((Elem, Ind) => {
        let Arr2 = document.querySelectorAll('.Lab');
        Elem.addEventListener("change", () => {
            Arr1[Ind].value="true";
            Arr2[Ind].style.textDecoration = "line-through";
            Arr2[Ind].style.textDecorationColor = "black";

            localStorage.clear();
            AllStore();
        });
    });
}


let DisplayAllTodo=(Para='' , Ind)=>
{
    let NewTodo = document.createElement('div');
    NewTodo.classList.add('Todo');

    let HTMLData =
    `
    <input type="checkbox" class="Box" value=${Para.Status}>
    <label class="Lab">${Para.Text}</label>
    `
    
    NewTodo.insertAdjacentHTML("afterbegin", HTMLData);

    document.querySelector('#A').append(NewTodo);
    
    let Box=document.querySelectorAll('.Box');
    let Labels=document.querySelectorAll('.Lab');

    Box.forEach((Elem , Inde)=>
    {
        if(Box[Inde].value=="true")
        {
            Labels[Inde].style.textDecoration="line-through"
            Labels[Inde].style.textDecorationColor="black"
        }
    })
    CompletedStore();
}

let Getter=()=>
{
    let GetAllTodo=JSON.parse(localStorage.getItem('All-Notes'));
    if(GetAllTodo)
    {
        document.querySelector('.Todos').innerHTML='';
        GetAllTodo.forEach((Elem , Ind)=>
        {
            DisplayAllTodo(Elem , Ind);
        });
    }
}
Getter();
CompletedStore()
Checker();