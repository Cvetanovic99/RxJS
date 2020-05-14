import { from, fromEvent, Observable, zip, merge } from "rxjs";
import {filter,take, sampleTime,map,switchMap,takeUntil, delay} from "rxjs/operators";
import {Comment} from "../classes/Comment"
import {SportEvent} from "../classes/SportEvent"
import { drawComents, drawOneEvent, drawNotFound,drawCity,drawTypeOfEvent } from "./drawingFunctions";



export function FetchAllEvents(url:string)
{
    return from(fetch(url).then((res)=>res.json()));
}
export function FetchComents(url:string,eventId:number,div:any)
{   
    const array:Array<Comment>=new Array();
    from(fetch(url).then((res)=>res.json()))    
            .subscribe((data)=>{
                                data.forEach(element=>
                                {
                                array.push(new Comment(element["id"],element["userName"],element["userSurname"],element["date"],element["email"],element["phoneNumber"],element["eventId"],element["text"],element["time"]));
                                });
                                console.log(array);
                                from(array).pipe(
                                    filter(comment=>comment.eventId==eventId),
                                    take(5)
                                ).subscribe(
                                    d=>
                                        {
                                            drawComents(d,div);
                                        }
                                );
                                
            });
}
export function FetchSomeEvents(city:string,timeFrom:string,timeFromM:string,timeTo:string,timeToM:string,type:string)
{
    const eventsDiv=document.getElementsByClassName("eventsContainer")[0];
    const arrayOfEvents:Array<SportEvent>=new Array();
    const arrayOfFilteredEvents:Array<SportEvent>=new Array();
    const arrayOfFilteredEventsSecond:Array<SportEvent>=new Array();
    const timeFromInt:number=parseInt(timeFrom,10);
    const timeFromMInt:number=parseInt(timeFromM,10);
    const timeToInt:number=parseInt(timeTo,10);
    const timeToMInt:number=parseInt(timeToM,10);
    //console.log(timeFromInt,timeFromMInt,timeToInt,timeToMInt);
    fetch("http://localhost:3000/events?city="+city)
            .then(response=>response.json())
            .then(data=>{
                data.forEach(element=>
                {
                    arrayOfEvents.push(new SportEvent(element["id"],element["userName"],element["location"],element["description"],element["userSurname"],element["type"],element["email"],element["phoneNumber"],element["date"],element["city"],element["timeHours"],element["timeMinutes"]));
                });
                if(arrayOfEvents.length==0)
                {
                    eventsDiv.innerHTML="";
                    drawNotFound(eventsDiv);
                }
                else
                {
                    arrayOfEvents.forEach(element=>{
                        if(element.type==type){
                            arrayOfFilteredEvents.push(element);
                        }
                    });
                    if(arrayOfFilteredEvents.length==0)
                    {
                        eventsDiv.innerHTML="";
                        drawNotFound(eventsDiv);
                    }
                    else 
                    {
                        //console.log(arrayOfFilteredEvents);
                        arrayOfFilteredEvents.forEach(element=>{
                            if((element.timeHours>=timeFromInt && element.timeMinutes>=timeFromMInt)&&(element.timeHours<=timeToInt))
                            {
                                //console.log(element);
                                arrayOfFilteredEventsSecond.push(element);
                            }
                        });
                        //console.log(arrayOfFilteredEventsSecond);
                        if(arrayOfFilteredEventsSecond.length==0)
                        {
                            eventsDiv.innerHTML="";
                            drawNotFound(eventsDiv);
                        }
                        else
                        {
                            eventsDiv.innerHTML="";
                            arrayOfFilteredEventsSecond.forEach(element=>{
                                drawOneEvent(eventsDiv,element);
                            });
                        }
                    }
                }

            })

}
export function FetchByCity(cityName:string)
{
    return from(
        fetch("http://localhost:3000/events?city="+cityName)
            .then(response=>{
                if(!response.ok)
                {
                    throw new Error();
                }
                else if(response.ok)
                {
                    return response.json();
                }
            })
    )
}
export function subscribeSearchToInput()
{
    const eventsContainer=document.getElementsByClassName("eventsContainer")[0];
    const cityInput=document.getElementById("byCity");
    fromEvent(cityInput,'input').pipe(
        sampleTime(1000),
        map(ev=>(<HTMLTextAreaElement>ev.target).value),
        filter(text=>text.length>=3),
        switchMap(text=>FetchByCity(text))
    ).subscribe(
        (text)=>{
            eventsContainer.innerHTML="";
            text.forEach(data=>
            {
                const event=new SportEvent(data["id"],data["userName"],data["location"],data["description"],data["userSurname"],data["type"],data["email"],data["phoneNumber"],data["date"],data["city"],data["timeHours"],data["timeMinutes"]);
                drawOneEvent(eventsContainer,event);
            });
        }
    )

}
export function FetchOneByOne(buttonStop:any,url:string)
{   
    const eventsContainer=document.getElementsByClassName("eventsContainer")[0];
    eventsContainer.innerHTML="";
    const functionStop=fromEvent(buttonStop,'click');
    const array:Array<SportEvent>=new Array();
    from(fetch(url).then((res)=>res.json()))    
            .subscribe((data)=>{
                                data.forEach(element=>{
                                array.push(new SportEvent(element["id"],element["userName"],element["location"],element["description"],element["userSurname"],element["type"],element["email"],element["phoneNumber"],element["date"],element["city"],element["timeHours"],element["timeMinutes"]));
                                //console.log(com);
                                });
                                const interval$=Observable.create((observer)=>{
                                    let i=0;
                                    const timer=setInterval(()=>{
                                         if(array.length==i){
                                             buttonStop.click();
                                         }
                                        observer.next(array[i]);
                                        i++;
                                    },1000);
                                });


                                interval$.pipe(takeUntil(functionStop))
                                .subscribe(
                                    (val)=>{
                                        eventsContainer.innerHTML="";
                                        drawOneEvent(eventsContainer,val);
                                        //document.body.scrollBy(0,300);
                                    }
                                )


                                
            });
}
export function FetchCitiesAndTypes(citiesSection:any,typesSection:any,URL:string)
{
     const unique = (value, index, self) => {
         return self.indexOf(value) === index
       };
    const arrayCities:Array<string>=new Array();
    const arrayTypesOfEvents:Array<String>=new Array();
    const data=zip(
        FetchAllEvents(URL).pipe(delay(1000)),
        FetchAllEvents(URL));
    data.subscribe(
        (val)=>{
            val[0].forEach(element=>{
                arrayCities.push(element["city"]);
            });
            const filteredCities=arrayCities.filter(unique);
            filteredCities.forEach(city=>drawCity(citiesSection,city));

            val[1].forEach(element=>{
                arrayTypesOfEvents.push(element["type"]);
            });
            const filteredTypes=arrayTypesOfEvents.filter(unique);
            filteredTypes.forEach(type=>drawTypeOfEvent(typesSection,type));
        }
    )
}
export function addEvent(url:string,event:SportEvent)
{
    fetch(url,{method:"POST",
               headers:{"Content-Type":"application/json"},
               body: JSON.stringify({"userName":event.userName,"location":event.location,"description":event.description,"userSurname":event.userSurname,"type":event.type,"email":event.email,"phoneNumber":event.phoneNumber,"date":event.date,"city":event.city,"timeHours":event.timeHours,"timeMinutes":event.timeMinutes})})
}
export function addComment(url:string,comment:Comment)
{
    //console.log(comment);
     fetch(url,{method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({"userName":comment.userName,"text":comment.text,"userSurname":comment.userSurname,"email":comment.email,"phoneNumber":comment.phoneNumber,"date":comment.date,"time":comment.time,"eventId":comment.eventId})});
}
export function deleteEvent(url:string,eventId:number)
{
    //console.log("Delete events");
    return from(fetch(url+"/"+eventId,{method:"DELETE"}));
}
export function deleteComments(url:string,eventId:number)
{
    //console.log("Delete comments");
    const array:Array<number>=new Array();
    return from(fetch(url).then(response=>response.json()).then
                    ((data)=>
                    {
                        data.forEach(element=>
                            {
                                if(element["eventId"]==eventId)
                                {
                                    array.push(element["id"]);
                                };
                            });
                        array.forEach(commentId=>
                            {
                                //console.log(commentId);
                                fetch(url+"/"+commentId,{method:"DELETE"});
                            });
                    })
                )
}
export function deleteEventAndComments(urlComments:string,urlEvents:string,eventId:number)
{
    const subscribe=merge(
              deleteComments(urlComments,eventId),
              deleteEvent(urlEvents,eventId));
}