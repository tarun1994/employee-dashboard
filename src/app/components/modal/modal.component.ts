import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  name: string="";
    street="";
    suite="";
    city="";
    zipcode="";
    action:string ="";
    local_data:any;
  company: string="";
  constructor(private dialogRef: MatDialogRef<ModalComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }


  ngOnInit(): void {
    this.local_data = {...this.data};
    this.action = this.local_data.action;
    console.log(this.data);
  }
  onClose() {
    console.log('close');
    this.dialogRef.close();
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}


