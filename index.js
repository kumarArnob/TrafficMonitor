document.addEventListener('DOMContentLoaded',()=>{
    loadHtml([]);
});

function loadHtml(data){

    const loc = document.getElementsByClassName(".card-body");
    let locHtml = "";

        if(data.length===0){
            loc.innerHTML = "<li> No data </li>";
        }
}
