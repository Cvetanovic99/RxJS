import { from, fromEvent, Observable,of, zip } from "rxjs";
import {filter,take, sampleTime,map,switchMap,takeUntil, delay} from "rxjs/operators";
import {Comment} from "../classes/Comment.js"
import {SportEvent} from "../classes/SportEvent.js"
import { drawComents, drawOneEvent, drawNotFound,drawCity,drawTypeOfEvent } from "./drawingFunctions.js";



export function FetchAllEvents(url)
{
    return from(fetch(url).then((res)=>res.json()));
}
export function FetchComents(url,eventId,div)
{   
    const array=new Array();
    from(fetch(url).then((res)=>res.json()))    
            .subscribe((data)=>{
                                data.forEach(element=>{
                                array.push(new Comment(element["id"],element["userName"],element["userSurname"],element["date"],element["email"],element["phoneNumber"],element["eventId"],element["text"],element["time"]));
                                //console.log(com);
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
                                )
                                
            });
}
export function FetchSomeEvents(city,timeFrom,timeFromM,timeTo,timeToM,type)
{
    const eventsDiv=document.getElementsByClassName("eventsContainer")[0];
}
export function FetchByCity(cityName)
{
    return from(
        fetch("http://localhost:3000/events?city="+cityName)
            .then(response=>{
                if(!response.ok){
                    throw new Error();
                }
                else if(response.ok){
                    return response.json();
                }
            })
    )
}
export function subscribeSearchToInput()
{
    const eventsContainer=document.getElementsByClassName("eventsContainer")[0];
    var cityInput=document.getElementById("byCity");
    fromEvent(cityInput,'input').pipe(
        sampleTime(1000),
        map(ev=>ev.target.value),
        filter(text=>text.length>=3),
        switchMap(text=>FetchByCity(text))
    ).subscribe(
        (text)=>{
            eventsContainer.innerHTML="";
            text.forEach(data=>{
                const event=new SportEvent(data["id"],data["userName"],data["location"],data["description"],data["userSurname"],data["type"],data["email"],data["phoneNumber"],data["date"],data["city"],data["timeHours"],data["timeMinutes"]);
                drawOneEvent(eventsContainer,event);
            });
        }
    )

}
export function FetchOneByOne(buttonStop,url)
{   
    const eventsContainer=document.getElementsByClassName("eventsContainer")[0];
    eventsContainer.innerHTML="";
    const functionStop=fromEvent(buttonStop,'click');
    const array=new Array();
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
export function FetchCitiesAndTypes(cities,types,URL)
{
     const unique = (value, index, self) => {
         return self.indexOf(value) === index
       };
    const arrayCities=new Array();
    const arrayTypesOfEvents=new Array();
    const data=zip(
        FetchAllEvents(URL).pipe(delay(1000)),
        FetchAllEvents(URL));
    data.subscribe(
        (val)=>{
            val[0].forEach(element=>{
                arrayCities.push(element["city"]);
            });
            const filteredCities=arrayCities.filter(unique);
            filteredCities.forEach(city=>drawCity(cities,city));

            val[1].forEach(element=>{
                arrayTypesOfEvents.push(element["type"]);
            });
            const filteredTypes=arrayTypesOfEvents.filter(unique);
            filteredTypes.forEach(type=>drawTypeOfEvent(types,type));
        }
    )
}