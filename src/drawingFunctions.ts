import {FetchAllEvents, FetchComents,FetchSomeEvents,subscribeSearchToInput,FetchOneByOne,FetchCitiesAndTypes,addEvent,addComment} from "./RxjsFunctions";
import {SportEvent} from "../classes/SportEvent";
import {Comment} from "../classes/Comment";
import { readBuilderProgram } from "typescript";
import { fromEvent } from "rxjs";
import {take} from "rxjs/operators";
let URLEvents = "http://localhost:3000/events";
let URLComments = "http://localhost:3000/comments";
var commentTrue=false;
var add=false;


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
    const differentWord=document.createElement("span");
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
    const contactEMail=document.createElement("span");
    contactEMail.className="contact";
    contactEMail.innerText="EMail: cvetanovicgoran99@gmail.com";
    footer.appendChild(contactEMail);
    const contactPhone=document.createElement("span");
    contactPhone.className="contact";
    contactPhone.innerText="Phone: 065354354";
    footer.appendChild(contactPhone);
    const copyright=document.createElement("span");
    copyright.className="contact";
    copyright.innerText="Copyright: Goran Cvetanovic razvoj web aplikacija";
    footer.appendChild(copyright);


}
function drawAddEvent(host){
    const addContainer=document.createElement("div");
    addContainer.className="addContainer";
    host.appendChild(addContainer);
    const addInnerContainer=document.createElement("div");
    addInnerContainer.className="addInnerContainer";
    addContainer.appendChild(addInnerContainer);
    const textType=document.createElement("label");
    textType.className="text";
    textType.innerText="Type of sport:";
    addInnerContainer.appendChild(textType);
    const inputType=document.createElement("select");
    const types=["Football","Basketball","Volleyball"];
    types.forEach(element => {
        const type=document.createElement("option");
        type.value=element;
        type.innerText=element;
        inputType.add(type);
    });

    inputType.className="inputType";
    addInnerContainer.appendChild(inputType);
    const textDescription=document.createElement("label");
    textDescription.className="text";
    textDescription.innerText="Description:";
    addInnerContainer.appendChild(textDescription);
    const inputDescription=document.createElement("textarea");
    inputDescription.className="inputDescription";
    inputDescription.style.resize="none";
    inputDescription.style.height="3cm"
    addInnerContainer.appendChild(inputDescription);
    const divPersonalData=document.createElement("div");
    divPersonalData.className="divPersonalData";
    addInnerContainer.appendChild(divPersonalData);
    const divNameSurname=document.createElement("div");
    divNameSurname.className="divNameSurname";
    divPersonalData.appendChild(divNameSurname);
    const textName=document.createElement("label");
    textName.className="text";
    textName.innerText="Name:"
    divNameSurname.appendChild(textName);
    const inputName=document.createElement("input");
    inputName.className="inputName";
    divNameSurname.appendChild(inputName);
    const textSurname=document.createElement("label");
    textSurname.className="text";
    textSurname.innerText="Surname:"
    divNameSurname.appendChild(textSurname);
    const inputSurname=document.createElement("input");
    inputSurname.className="inputSurname";
    divNameSurname.appendChild(inputSurname);
    const divPhoneEmail=document.createElement("div");
    divPhoneEmail.className="divNameSurname";
    divPersonalData.appendChild(divPhoneEmail);
    const textPhone=document.createElement("label");
    textPhone.className="text";
    textPhone.innerText="Phone number:"
    divPhoneEmail.appendChild(textPhone);
    const inputPhone=document.createElement("input");
    inputPhone.className="inputPhone";
    divPhoneEmail.appendChild(inputPhone);
    const textEMail=document.createElement("label");
    textEMail.className="text";
    textEMail.innerText="EMail:"
    divPhoneEmail.appendChild(textEMail);
    const inputEMail=document.createElement("input");
    inputEMail.className="inputEMail";
    divPhoneEmail.appendChild(inputEMail);
    const textCity=document.createElement("label");
    textCity.className="text";
    textCity.innerText="City:";
    addInnerContainer.appendChild(textCity);
    const inputCity=document.createElement("input");
    inputCity.className="inputCity";
    addInnerContainer.appendChild(inputCity);
    const textLocation=document.createElement("label");
    textLocation.className="text";
    textLocation.innerText="Location:"
    addInnerContainer.appendChild(textLocation);
    const inputLocation=document.createElement("input");
    inputLocation.className="inputLocation";
    addInnerContainer.appendChild(inputLocation);
    const timeDiv=document.createElement("div");
    timeDiv.className="timeDiv";
    addInnerContainer.appendChild(timeDiv);
    const textTime=document.createElement("label");
    textTime.className="text";
    textTime.innerText="Start time:"
    timeDiv.appendChild(textTime);
    const timeH=document.createElement("input");
    timeH.type="number";
    timeH.min="0";
    timeH.max="23";
    timeDiv.appendChild(timeH);
    const points=document.createElement("label");
    points.className="text";
    points.innerText=":";
    timeDiv.appendChild(points);
    const timeM=document.createElement("input");
    timeM.type="number";
    timeM.min="0";
    timeM.max="59";
    timeDiv.appendChild(timeM);
    const addButton=document.createElement("button");
    addButton.className="addEventButton";
    addButton.innerText="Add event";
    addInnerContainer.appendChild(addButton);
    addButton.onclick=()=>{
        const date=new Date();
        const today=date.getFullYear()+"."+date.getMonth()+"."+date.getDate();
        const timeHInt: number=parseInt(timeH.value);
        const timeMInt:number=parseInt(timeM.value);
        const sportEvent=new SportEvent(null,inputName.value,inputLocation.value,inputDescription.value,inputSurname.value,inputType.value,inputEMail.value,inputPhone.value,today,inputCity.value,timeHInt,timeMInt);
        addEvent(URLEvents,sportEvent);
        setTimeout(()=>{drawEvents(document.body)},1000);
    }
}
function drawSearcEvents(host){
    const events=new Array();
    const eventsContainer=document.createElement("div");
    eventsContainer.className="eventsContainer";
    host.appendChild(eventsContainer);
    const niz=new Array();
    FetchAllEvents(URLEvents).subscribe(
        (val)=>{
            val.forEach(data=>{
                events.push(new SportEvent(data["id"],data["userName"],data["location"],data["description"],data["userSurname"],data["type"],data["email"],data["phoneNumber"],data["date"],data["city"],data["timeHours"],data["timeMinutes"]));
                //drawOneEvent(eventsContainer,event);
                //console.log(event);
            });
            for(let i=events.length-1;i>=0;i--)
            {
                drawOneEvent(eventsContainer,events[i]);
            }
        }
    )
    
}
export function drawOneEvent(host,sportEvent)
{
   const oneEvent=document.createElement("div");
   oneEvent.className="oneEvent";
   host.appendChild(oneEvent);
   const eventType=document.createElement("div");
   eventType.className="eventType";
   eventType.innerText=sportEvent.type;
   oneEvent.appendChild(eventType);
   const eventDescription=document.createElement("div");
   eventDescription.className="eventDescription";
   eventDescription.innerText=sportEvent.description;
   oneEvent.appendChild(eventDescription);
   const eventCity=document.createElement("div");
   eventCity.className="eventCity";
   eventCity.innerText=sportEvent.city;
   oneEvent.appendChild(eventCity);
   const eventLocation=document.createElement("div");
   eventLocation.className="eventLocation";
   eventLocation.innerText=sportEvent.location;
   oneEvent.appendChild(eventLocation);
   const eventStart=document.createElement("div");
   eventStart.className="eventStart";
   eventStart.innerText="Start time: "+sportEvent.timeHours+":"+sportEvent.timeMinutes;
   oneEvent.appendChild(eventStart);
   const nameAndContact=document.createElement("div");
   nameAndContact.className="nameAndContact";
   oneEvent.appendChild(nameAndContact);
   const name=document.createElement("div");
   name.className="name";
   nameAndContact.appendChild(name);
   name.innerText="Posted by: "+sportEvent.userName+" "+sportEvent.userSurname;
   const contact=document.createElement("div");
   contact.className="contact";
   contact.innerText="Contact - EMail: "+sportEvent.email+"-Phone: "+sportEvent.phoneNumber;
   nameAndContact.appendChild(contact);
   const date=document.createElement("div");
   date.className="date";
   date.innerText="Created: "+sportEvent.date;
   nameAndContact.appendChild(date);
   const seeComents=document.createElement("button");
   seeComents.className="CommentsButton";
   seeComents.innerText="See comments"
   const commentsSection=document.createElement("div");
   const addComentSection=document.createElement("div");
   commentsSection.className="commentsSection";
   addComentSection.className="addComent";
   seeComents.onclick=()=>{
       if(commentTrue==true){
        commentsSection.innerHTML="";
        commentTrue=false;
       }
       else {
        //commentsSection.innerHTML="";
        FetchComents(URLComments,sportEvent.id,commentsSection);
        commentTrue=true;
       }
   };
   oneEvent.appendChild(seeComents);
   const addComent=document.createElement("button");
   addComent.className="CommentsButton";
   addComent.innerText="Add comment";
   addComent.onclick=()=>{
       if(add==true){
           addComentSection.innerHTML="";
           add=false;
        }
        else 
        {   
            //addComentSection.innerHTML="";
            drawAddComent(addComentSection,sportEvent.id,commentsSection);
            add=true;
        }
   }
   oneEvent.appendChild(addComent);
   oneEvent.appendChild(commentsSection);
   oneEvent.appendChild(addComentSection);
   const id=document.createElement("div");
   id.innerText=sportEvent.id;
   oneEvent.appendChild(id);
   id.style.display="none";

}
export function drawComents(comment,host)
{
      const commentSection=document.createElement("div");
      commentSection.className="comentSection";
      host.appendChild(commentSection);
      const commentText=document.createElement("div");
      commentText.className="commentText";
      commentText.innerText=comment.text;
      commentSection.appendChild(commentText);
      const commentNameAndContact=document.createElement("div");
      commentNameAndContact.className="nameAndContact";
      commentSection.appendChild(commentNameAndContact);
      const name=document.createElement("div");
      name.className="name";
      name.innerText="Posted by: "+comment.userName+" "+comment.userSurname;
      commentNameAndContact.appendChild(name);
      const contact=document.createElement("div");
      contact.className="contact";
      contact.innerText="Contact: "+comment.email+"-Phone: "+comment.phoneNumber;
      commentNameAndContact.appendChild(contact);
      const tameAndDate=document.createElement("div");
      tameAndDate.className="tameAndDate";
      tameAndDate.innerText="Created: "+comment.date +" at: "+comment.time;
      commentSection.appendChild(tameAndDate);

}
export function drawNotFound(host)
{
    const notFound=document.createElement("div");
    notFound.className="NotFound";
    notFound.innerText="NOT FOUND";
    host.appendChild(notFound);
}
function drawAddComent(host,eventId,eventsContainer)
{
    const addComentSection=document.createElement("div");
    addComentSection.className="addComentSection";
    host.appendChild(addComentSection);
    const textText=document.createElement("label");
    textText.className="text"
    textText.innerText="Text:"
    addComentSection.appendChild(textText);
    const inputText=document.createElement("textarea");
    inputText.className="inputText";
    inputText.style.resize="none";
    inputText.style.height="1.5cm";
    inputText.autofocus=true;
    addComentSection.appendChild(inputText);
    const textName=document.createElement("label");
    textName.innerText="Name:";
    addComentSection.appendChild(textName);
    const inputName=document.createElement("input");
    addComentSection.appendChild(inputName);
    const textSurname=document.createElement("label");
    textSurname.innerHTML="Surname:";
    addComentSection.appendChild(textSurname);
    const inputSurname=document.createElement("input");
    addComentSection.appendChild(inputSurname);
    const textPhone=document.createElement("label");
    textPhone.innerText="Phone number:";
    addComentSection.appendChild(textPhone);
    const inputPhone=document.createElement("input");
    addComentSection.appendChild(inputPhone);
    const textEMail=document.createElement("label");
    textEMail.innerText="EMail:";
    addComentSection.appendChild(textEMail);
    const inputEMail=document.createElement("input");
    addComentSection.appendChild(inputEMail);
    const addCommentButton=document.createElement("button");
    addCommentButton.className="addCommentButton";
    addCommentButton.innerText="Add comment";
    addComentSection.appendChild(addCommentButton);
    addCommentButton.onclick=()=>{
        const date=new Date();
        const today=date.getFullYear()+"."+date.getMonth()+"."+date.getDate();
        const currentTime=date.getHours()+":"+date.getMinutes();
        const commentToAdd=new Comment(null,inputName.value,inputSurname.value,today,inputEMail.value,inputPhone.value,eventId,inputText.value,currentTime);
        console.log(commentToAdd);
        addComment(URLComments,commentToAdd);
        host.innerHTML="";
        setTimeout(()=>{
            eventsContainer.innerHTML="";
            FetchComents(URLComments,eventId,eventsContainer);
        },500);
    }
}
export function drawPage(host){
    drawHeader(host);
    drawContent(host);
    drawFooter(host);
}
function drawEvents(host){
    host.innerHTML="";
    drawHeader(host);
    drawSearchSection(host);
    drawSearcEvents(host);
    drawFooter(host);
}
function drawAdd(host){
    host.innerHTML="";
    drawHeader(host);
    drawAddEvent(host);
    drawFooter(host);
}
function drawSearchSection(host){
    const searchSection=document.createElement("div");
    searchSection.className="searchSection";
    host.appendChild(searchSection);
    const byCityDiv=document.createElement("div");
    byCityDiv.className="searchDivs";
    const byCityText=document.createElement("label");
    byCityText.innerText="City:";
    const byCity=document.createElement("input");
    byCity.id="byCity";
    const onlyByCity=document.createElement("input");
    onlyByCity.type="checkbox";
    onlyByCity.id="onlyBySity";
    //onlyByCity.checked=false;
    onlyByCity.onchange=()=>{
        if(onlyByCity.checked==true){
            const div=document.getElementsByClassName("eventsContainer")[0];
            div.innerHTML="";
            drawNotFound(div);
            subscribeSearchToInput();
        }
        else{
            drawEvents(document.body);
        }
    }
    const onlyByCityText=document.createElement("label");
    onlyByCityText.innerText="-Only by city name";
    byCityDiv.appendChild(byCityText);
    byCityDiv.appendChild(byCity);
    byCityDiv.appendChild(onlyByCity);
    byCityDiv.appendChild(onlyByCityText);
    searchSection.appendChild(byCityDiv);
    const byTimeDiv=document.createElement("text");
    byTimeDiv.className="searchDivsTime";
    searchSection.appendChild(byTimeDiv);
    const timeFrom=document.createElement("div");
    timeFrom.className="TimeDiv";
    byTimeDiv.appendChild(timeFrom);
    const byTimeTextFrom=document.createElement("label");
    byTimeTextFrom.innerText="Time fom:";
    timeFrom.appendChild(byTimeTextFrom);
    const byTimeFrom=document.createElement("input");
    byTimeFrom.type="number";
    byTimeFrom.id="byTimeH"
    byTimeFrom.min="0";
    byTimeFrom.max="23";
    timeFrom.appendChild(byTimeFrom);
    const byTimeFromPoints=document.createElement("label");
    byTimeFromPoints.innerText=":";
    timeFrom.appendChild(byTimeFromPoints);
    const byTimeFromM=document.createElement("input");
    byTimeFromM.type="number";
    byTimeFromM.id="byTimeM";
    byTimeFromM.min="0";
    byTimeFromM.max="60";
    timeFrom.appendChild(byTimeFromM);
    const timeTo=document.createElement("div");
    timeTo.className="TimeDiv";
    byTimeDiv.appendChild(timeTo);
    const byTimeTextTo=document.createElement("label");
    byTimeTextTo.innerText="Time to:";
    timeTo.appendChild(byTimeTextTo);
    const byTimeTo=document.createElement("input");
    byTimeTo.type="number";
    byTimeTo.id="byTimeH";
    byTimeTo.min="0";
    byTimeTo.max="23";
    timeTo.appendChild(byTimeTo);
    const byTimeToPoints=document.createElement("label");
    byTimeToPoints.innerText=":";
    timeTo.appendChild(byTimeToPoints);
    const byTimeToM=document.createElement("input");
    byTimeToM.type="number";
    byTimeToM.id="byTimeM";
    byTimeToM.min="0";
    byTimeToM.max="59";
    timeTo.appendChild(byTimeToM);
    const byTypeDiv=document.createElement("div");
    byTypeDiv.className="searchDivs"
    searchSection.appendChild(byTypeDiv);
    const byTypeText=document.createElement("label");
    byTypeText.innerText="Type of sport event:";
    byTypeDiv.appendChild(byTypeText);
    const byType=document.createElement("select");
    byType.id="byType";
    const types=["All","Football","Basketball","Volleyball"];
    types.forEach(element => {
        const type=document.createElement("option");
        type.value=element;
        type.innerText=element;
        byType.add(type);
    });
    byTypeDiv.appendChild(byType);
    const searchButton=document.createElement("button");
    searchButton.className="searcButton";
    searchButton.innerText="Search";
    searchSection.appendChild(searchButton);
    searchButton.onclick=()=>{
        //FetchSomeEvents()
        // if(byCity.value==""){
        // console.log("stringic");
        // }
        // if(byTimeTo.value==""){
        //     console.log("stringic");
        // }
        // else {
        //     console.log(byTimeTo.value);
        // }
        // if(byType.value=="Football"){
        // console.log("tacno");
        // }
        FetchSomeEvents(byCity.value,byTimeFrom.value,byTimeFromM.value,byTimeTo.value,byTimeToM.value,byType.value);

    }
    const oneByOneDiv=document.createElement("div");
    oneByOneDiv.className="oneByOneDiv";
    searchSection.appendChild(oneByOneDiv);
    const oneByOneStart=document.createElement("button");
    oneByOneStart.innerHTML="Draw one by one event";
    oneByOneStart.className="searcButton";
    oneByOneDiv.appendChild(oneByOneStart);
    const oneByOneStop=document.createElement("button");
    oneByOneStop.innerHTML="Stop";
    oneByOneStop.className="searcButton";
    oneByOneDiv.appendChild(oneByOneStop);
    oneByOneStart.onclick=()=>{
        FetchOneByOne(oneByOneStop,URLEvents);
    }
    const buttonCitiesAndTypeOfEvents=document.createElement("button");
    buttonCitiesAndTypeOfEvents.className="searcButton";
    buttonCitiesAndTypeOfEvents.innerHTML="Get all cities and types of events";
    searchSection.appendChild(buttonCitiesAndTypeOfEvents);
    buttonCitiesAndTypeOfEvents.onclick=()=>{
        drawCitiesAndTypesOfEvents();
    }


}
export function drawCity(host,city)
{
    const cityDiv=document.createElement("div");
    cityDiv.innerText=city;
    cityDiv.className="cityAndTypeDiv";
    host.appendChild(cityDiv);

}
export function drawTypeOfEvent(host,typeOfEvent)
{
    const typeOfEventDiv=document.createElement("div");
    typeOfEventDiv.innerText=typeOfEvent;
    typeOfEventDiv.className="cityAndTypeDiv";
    host.appendChild(typeOfEventDiv);
}
function drawCitiesAndTypesOfEvents()
{
    const section=document.getElementsByClassName("eventsContainer")[0];
    section.innerHTML="";
    const citiesAndTypes=document.createElement("div");
    citiesAndTypes.className="citiesAndTypes";
    section.appendChild(citiesAndTypes);
    const cities=document.createElement("div");
    cities.className="cityAndType";
    const textCity=document.createElement("label");
    textCity.innerText="Cities: ";
    textCity.className="cityAndTypeDiv";
    cities.appendChild(textCity);
    citiesAndTypes.appendChild(cities);
    const types=document.createElement("div");
    types.className="cityAndType";
    const textTypes=document.createElement("label");
    textTypes.innerText="Type of sport events:";
    textTypes.className="cityAndTypeDiv"
    types.appendChild(textTypes);
    citiesAndTypes.appendChild(types);
    FetchCitiesAndTypes(cities,types,URLEvents);
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
                drawEvents(document.body);
            }
        }
        else if(i==2){
            a.onclick=()=>{
                document.body.innerHTML="";
                drawAdd(document.body);
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
        //const realImageLeaters=new Image();
        //realImageLeaters.src="images/slikaslovca.png";
        //realImageLeaters.id="leaters";
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
