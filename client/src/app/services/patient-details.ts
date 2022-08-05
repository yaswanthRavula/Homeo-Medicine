import { Description } from "./description";

export class PatientDetails {
    firstname:string;
    lastname: String;
    age:number;
    gender:string;
    phoneNumber:number;
    city:string;
    comment: string;
    joinedDate:Date;
    description: Description[];
}
