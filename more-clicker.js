document.addEventListener('DOMContentLoaded', function(){
    let looper;
    document.querySelector('#btn').addEventListener('click',function(){

        function modifyDOM() {
            let filter;
            filter = prompt("Digite o filtro desejado",localStorage["Filter"]);
            localStorage["Filter"] = filter?filter:localStorage["Filter"]; 
            let divs = document.getElementsByTagName("div");
            let found;
            for (var i = 0; i<divs.length; i++) {
                if (divs[i].textContent == filter) {
                    found = divs[i];
                    break;
                }
            }      
            if(found){
                let container = found.parentElement.parentElement.getElementsByTagName("span");
                let more;
                function interval(more){
                    looper = setTimeout(function() {
                        more.click();
                        interval(more);
                    }, 1000);
                }
                for (var i = 0; i < container.length; i++) {
                    if (container[i].textContent.trim() == "more...") {
                        more = container[i];
                        interval(more);
                        break;
                    }
                }
            }else{
                alert('Filtro não encontrado');
            }
        }
    
        chrome.tabs.executeScript({
            code: '(' + modifyDOM + ')();' 
        });
        
    });
    document.querySelector('#pause').addEventListener('click',function(){
        function pauseMore(){
            clearTimeout(looper);
        }
        chrome.tabs.executeScript({
            code: '(' + pauseMore + ')();' 
        });
    })
})

