import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //first argument on which array filter need to be done
  //second argument on bases which that is search key that is type in the input
  //third argument on based on which property
  transform(allTransactions:[],searchKey:string,propName:string): any []  {
    const result:any = []
    if(!allTransactions || searchKey=='' || propName==''){
      return allTransactions
    }
    allTransactions.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
