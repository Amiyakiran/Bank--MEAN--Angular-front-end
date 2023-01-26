import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-conform',
  templateUrl: './delete-conform.component.html',
  styleUrls: ['./delete-conform.component.css']
})
export class DeleteConformComponent {

  //to get a value from parent to child use @input decorator
  @Input() item:string|undefined
  //to create a event onCancel--user defined event
  //to get a value from child to parent use @output decorator
  @Output() onCancel = new EventEmitter()
//to create a event onDelete --user defined event
  @Output() onDelete = new EventEmitter()

  cancel(){
    //emit() is used to occur user defined events
    this.onCancel.emit()
  }

  deleteAcc(){
 this.onDelete.emit(this.item)
  }
}
