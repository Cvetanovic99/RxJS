
export class SportEvent
{
    id:number; location:string; description:string; userName:string; userSurname:string; type:string; email:string; phoneNumber:string; date:string; city:string; timeHours:number; timeMinutes:number;
    constructor(id,userName,location,description,userSurname,type,email,phoneNumber,date,city,timeHours,timeMinutes)
    {
        this.id=id,
        //this.coments=[];
        this.location=location;
        this.description=description;
        this.userName=userName;
        this.userSurname=userSurname;
        this.type=type;
        this.email=email;
        this.phoneNumber=phoneNumber;
        this.date=date;
        this.city=city;
        this.timeHours=timeHours;
        this.timeMinutes=timeMinutes;

    }
    // addComents(coment)
    // {
    //     this.coments.push(coment);
    // }
}