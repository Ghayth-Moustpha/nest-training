import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
login() {
    return "i am signin" ; 

}
signup() {
    return "i am signup " ;

}
}