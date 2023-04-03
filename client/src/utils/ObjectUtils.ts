import * as moment from 'moment';

export class ObjectUtils {
    public static copyArray(array : Array<any> , copy : Array<any>){
        copy.length = 0;
        array.forEach(element => copy.push(element));
    }

    public static filterArray(array : Array<any> , copy : Array<any>, filterTerm : string, field : string){
        let filter = copy.filter((element) => {
            return element[field].toUpperCase().includes(filterTerm.toUpperCase());
        });

        array.length = 0;
        filter.forEach(element => array.push(element));
    }

    public static dateToInput(date : any) : string {
        return moment(date).format('YYYY-MM-DD');        
    }
}