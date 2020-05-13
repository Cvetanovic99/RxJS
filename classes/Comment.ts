export class Comment
{
    id:number; userName:string; date:string; email:string; phoneNumber:string; eventId:number; text:string; userSurname:string; time:string;
    constructor(id,userName,userSurname,date,EMail,phoneNumber,eventId,text,time)
    {
        this.id=id;
        this.userName=userName;
        this.userSurname=userSurname;
        this.date=date;
        this.time=time;
        this.email=EMail;
        this.phoneNumber=phoneNumber;
        this.eventId=eventId;
        this.text=text;
    }
}