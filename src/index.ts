import {drawPage} from "./drawingFunctions";
import { from, fromEvent, of, Observable } from "rxjs";
import {takeUntil,take, debounceTime,delay, filter} from "rxjs/operators";
var niz=["element1","element2","element3","4","5","6"];
var tacno=true;
drawPage(document.body);
const content=document.getElementById("content");
var funkcija=fromEvent(content,"click");
// const value=from(niz).pipe(x=>
//     take(3)
// );
// value.subscribe(x => console.log(x));
import { interval, timer } from 'rxjs';

//emit value every 1s
const source = interval(1000);
//after 5 seconds, emit value
const timer$ = timer(5000);
const elements=Observable.create((observer)=>{
    let br=0;
    const interval=setInterval(()=>
    {
        observer.next(niz[br]);
        br++;
    },3000);
})
//elements.pipe(takeUntil(funkcija)).subscribe(vred=>console.log(vred));
//when timer emits after 5s, complete source
const example = of(niz).pipe(delay(1000),
                            takeUntil(funkcija));
from(niz).pipe(
    filter(slovca=>slovca.length<2),
    take(3)
).subscribe(val=>console.log("Predzadnja"+val));
//output: 0,1,2,3   
const subscribe = example.subscribe(val => console.log(val));
const nizic=new Array();
// function fun()
// { 
//      fetch("http://localhost:3000/events").then((res)=>res.json()).then(value=> {value.forEach(j=>{
//         console.log(j["city"]);
//         nizic.push(j["city"]);
//     })
//         //console.log(nizic);
//         return nizic})
// };
// console.log(fun());