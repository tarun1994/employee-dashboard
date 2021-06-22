import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpService, public dialog: MatDialog) { }
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public url: string = 'https://jsonplaceholder.typicode.com/users';
  public empData:any;
  public deletedData:any =[];
  public deleteStatus: boolean = false;
  public showModal:boolean = false;
  ngOnInit(): void {
    this.http.get(this.url).subscribe(res =>{
      this.empData = res;
      this.empData.map((data:any)=>{
      data.newaddress = data['address'].street +','+data['address'].suite+','+data['address'].city+','+data['address'].zipcode;
    })
    console.log(this.empData);
    })
  }
  onDelete(event:any){
    this.empData = this.empData.filter((data:any)=>{
      return data.id !== event.id;
    });
    this.deletedData.push(event);
    this.deleteStatus = true;
  }
  onRestore(event:any){
   this.empData.push(event);
   this.deletedData = this.deletedData.filter((data:any) => {
     return data.id !== event.id;
   })
  }
 

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px', height: '500px', 
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }
    });
  }
  onEdit(event:any){
    const data = {
      header:"Edit Employee Details",
      id:event.id,
      name: event.name,
      street: event['address'].street,
      suite: event['address'].suite,
      city: event['address'].city,
      zipcode: event['address'].zipcode,
      company: event['company'].name,
    }
    this.openDialog('Update',data);
  }
  addRowData(row_obj:any){
    
    this.empData.push({
      id:this.empData.length,
      "name": row_obj.name,
      "username": "",
      "email": "",
      "address": {
        "street": row_obj.street,
        "suite": row_obj.suite,
        "city": row_obj.city,
        "zipcode": row_obj.zipcode,
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "",
      "website": "",
      "company": {
        "name": row_obj.company,
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      },
      newaddress: row_obj.street +','+row_obj.suite+','+row_obj.city+','+row_obj.zipcode
    });
    this.empData = [...this.empData];
    
  }
  updateRowData(row_obj:any){
    this.empData = this.empData.filter((value:any)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.street = row_obj.street;
        value.city = row_obj.city;
        value.zipcode = row_obj.zipcode;
        value.suite = row_obj.suite;
        value.company.name= row_obj.company;
        value.newaddress = row_obj.street +','+row_obj.suite+','+row_obj.city+','+row_obj.zipcode;
      }
      return true;
    });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
