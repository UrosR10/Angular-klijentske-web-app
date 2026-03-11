import axios from "axios";
import { FlightModel } from "../../models/flight.model";

const client = axios.create({
    baseURL : 'https://flight.pequla.com/api',
    headers : {
        'Accept' : 'application/json' ,
        'X-name' : 'KlijentskeWEBapp'
    },
    validateStatus(status){
        return status === 200
    }

})

export class FlightService{

    static async getFlights(){
        return await client.get<FlightModel[]>('/flight/list?type=departure')
    }

    static async getFlightById(id: number){
        return await client.get<FlightModel>('/flight/' + id)
    }

    static async getDestinations(){
        return await client.get<string[]>('/flight/destination')
    }

    static async getFlightsByDestination(dest : string){
        return await client.get(`/flight/destination/${dest}?type=departure`)
    }
}