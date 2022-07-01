function GetValue() {
    let Text = document.querySelector('input').value;
    return Text
}

let AllStore=()=>
{
    AllArray=[];
    let AllTodo=document.querySelectorAll('#A .Todo label');
    let AllTodoChk=document.querySelectorAll('#A .Todo input');

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
    let AllTodo=document.querySelectorAll('#A .Todo label');
    let AllTodoChk=document.querySelectorAll('#A .Todo input');

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

    localStorage.removeItem('All-Notes');
    AllStore();
}
document.querySelector('.fa-circle-plus').addEventListener("click", () => {
    Todos();
    Checker();
});


function Checker()
{
    let Arr1 = document.querySelectorAll('#A .Box');
    
    Arr1.forEach((Elem, Ind) => {
        let Arr2 = document.querySelectorAll('#A .Lab');
        Elem.addEventListener("change", () => {
            Arr2[Ind].style.textDecoration = "line-through";
            Arr2[Ind].style.textDecorationColor = "black";
            Arr1[Ind].value="true";
            
            localStorage.removeItem('All-Notes');
            localStorage.removeItem('Completed-Notes');
            CompletedStore();
            DGetter();
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
}
let DisplayAllCompletedTodo=(Para='' , Ind)=>
{
    let NewTodo = document.createElement('div');
    NewTodo.classList.add('Todo');

    let HTMLData =
    `
    <input type="checkbox" class="Box" value=${Para.Status}>
    <label class="Lab">${Para.Text}</label>
    `
    
    NewTodo.insertAdjacentHTML("afterbegin", HTMLData);

    document.querySelector('#C').append(NewTodo);
    
    let Box=document.querySelectorAll('#C .Box');
    let Labels=document.querySelectorAll('#C .Lab');

    Box.forEach((Elem , Inde)=>
    {
        if(Box[Inde].value=="true")
        {
            Labels[Inde].style.textDecoration="line-through"
            Labels[Inde].style.textDecorationColor="black"
        }
    })
}

let Getter=()=>
{
    let GetAllTodo=JSON.parse(localStorage.getItem('All-Notes'));
    if(GetAllTodo)
    {
        document.querySelector('#A').innerHTML='';
        GetAllTodo.forEach((Elem , Ind)=>
        {
            DisplayAllTodo(Elem , Ind);
        });
    }
}
let DGetter=()=>
{
    let GetAllTodo=JSON.parse(localStorage.getItem('Completed-Notes'));
    if(GetAllTodo)
    {
        document.querySelector('#C').innerHTML='';
        GetAllTodo.forEach((Elem , Ind)=>
        {
            DisplayAllCompletedTodo(Elem , Ind);
        });
    }
}
Getter();
DGetter();
Checker();