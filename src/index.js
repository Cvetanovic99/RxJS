//location.redirect("./main.html");
function drawContent(host){
    const containerContent=document.createElement("div");
    containerContent.id="containerContent";
    host.appendChild(containerContent); 
    const content=document.createElement("div");
    containerContent.appendChild(content);
    content.id="content";
    const tekst=document.createElement("div");
    tekst.id="tekst";
    content.appendChild(tekst);
    const tekst2=document.createElement("div");
    tekst2.className="tekst2";
    tekst2.innerText="Find friends for"
    differentWord=document.createElement("span");
    differentWord.innerText=" Sports";
    differentWord.className="differentWord";
    tekst2.appendChild(differentWord);
    tekst.appendChild(tekst2);
    const icons=document.createElement("div");
    icons.className="icons";
    const icon1=document.createElement("i");
    icon1.className='fas fa-futbol';
    const icon2=document.createElement("i");
    icon2.className='fas fa-basketball-ball';
    const icon3=document.createElement("i");
    icon3.className='fas fa-volleyball-ball';
    tekst.appendChild(icons);
    icons.appendChild(icon1);
    icons.appendChild(icon2);
    icons.appendChild(icon3);
    const text3=document.createElement("div");
    text3.className="text3";
    text3.innerText="Live healthy and maintain condition";
    tekst.appendChild(text3);
    const secondContent=document.createElement("div");
    secondContent.id="secondContent";
    containerContent.appendChild(secondContent);
    const spaceCreate=document.createElement("div");
    spaceCreate.className="space";
    spaceCreate.onclick=()=>{
        drawAdd(document.body);
    };
    const linkCreate=document.createElement("div");
    linkCreate.className="link";
    spaceCreate.appendChild(linkCreate);
    const iconCreate=document.createElement("i");
    iconCreate.className='far fa-edit';
    iconCreate.id="edit";
    const textInCrete=document.createElement("div");
    textInCrete.className="textInSpace";
    textInCrete.innerText="Create new event";
    spaceCreate.appendChild(textInCrete);
    linkCreate.appendChild(iconCreate);
    const spaceSearch=document.createElement("div");
    spaceSearch.className="space";
    spaceSearch.onclick=()=>{
        drawEvents(document.body);
    };
    const linkSearch=document.createElement("div");
    linkSearch.className="link";
    spaceSearch.appendChild(linkSearch);
    const iconSearch=document.createElement("i");
    iconSearch.className="fas fa-search";
    iconSearch.id="search";
    linkSearch.appendChild(iconSearch);
    const textInSearch=document.createElement("div");
    textInSearch.className="textInSpace";
    textInSearch.innerText="Search events";
    spaceSearch.appendChild(textInSearch);
    secondContent.appendChild(spaceCreate);
    secondContent.appendChild(spaceSearch);


}
function drawFooter(host){
    console.log("draw")
    const footer=document.createElement("div");
    footer.className="footer";
    host.appendChild(footer);


}
function drawAddEvent(host){
    console.log("draw");
}
function drawSearcEvents(host){
    console.log("draw");
}
function drawPage(host){
    drawHeader(host);
    drawContent(host);
    drawFooter(host);
}
function drawEvents(host){
    host.innerHTML="";
    drawHeader(host);
    drawSearcEvents(host);
    drawFooter(host);
}
function drawAdd(host){
    host.innerHTML="";
    drawHeader(host);
    drawAddEvent(host);
    drawFooter(host);
}
function drawHeader(host){
        const container=document.createElement("div");
        host.appendChild(container);
        container.id="container";
        const header=document.createElement("div");
        header.id="header";
        container.appendChild(header);
        const navItems=["Home","Find event","Create event"];
        const nav=document.createElement("nav");
        nav.className="navbar";
        const ul=document.createElement("ul");
        nav.appendChild(ul);
        for(var i=0;i<3;i++){
            const li=document.createElement("li");
            li.className="navLi";
            const a=document.createElement("button");
            a.innerText=navItems[i];
            if(i==0){
            a.onclick=()=>{
                document.body.innerHTML="";
                drawPage(document.body);
            }
        }
        else if(i==1){
            a.onclick=()=>{
                document.body.innerHTML="";
                drawHeader(document.body);
                drawSearcEvents(document.body);
            }
        }
        else if(i==2){
            a.onclick=()=>{
                document.body.innerHTML="";
                drawHeader(document.body);
                drawAddEvent(document.body);
            }
        }
            li.appendChild(a);
            ul.appendChild(li);
        }
        const image=document.createElement("div");
        image.id="image";
        image.innerText="SPORTS";
        header.appendChild(image);
        header.appendChild(nav);
        realImageLeaters=new Image();
        realImageLeaters.src="images/slikaslovca.png";
        realImageLeaters.id="leaters";
        //image.appendChild(realImageLeaters);
        const menu=document.createElement("div");
        menu.className="menu";
        menu.addEventListener('click',()=>{
            nav.classList.toggle('active');
        });
        header.appendChild(menu);
        for(var i=0;i<3;i++){
            const span=document.createElement("span");
            span.className="spanMenu";
            menu.appendChild(span);
        }
}
//drawHeader(document.body);
drawPage(document.body);
