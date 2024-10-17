export class Reservation
{
    firstName: string;
    lastName: string;
    emailAddress: string;
    dateTime: string;
    viewers: number;
    constructor(firstName: string, lastName: string, emailAddress: string, dateTime: string, viewers: number)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.dateTime = dateTime;
        this.viewers = viewers;
    }
}