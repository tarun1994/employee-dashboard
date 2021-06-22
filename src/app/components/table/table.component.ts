import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() empData: any;
  @Input() deleteStatus: any;
  @Output() emitDelete = new EventEmitter();
  @Output() emitRestore = new EventEmitter();
  @Output() emitEdit = new EventEmitter();
  public filteredNames: any;
  public filteredAddress: any;
  public filteredCompanies: any;
  public enteredCompany: any;
  public enteredName: any;
  public enteredAddress: any;
  public storedData: any;
  public sortedData: any;
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() {
    if (this.empData !== undefined) {
      this.storedData = this.empData.slice();
    }
  }

  onDelete(id: Number): void {
    this.enteredName = "";
    this.enteredName = "";
    this.enteredCompany = "";
    this.emitDelete.emit(id);
  }
  onRestore(id: Number): void {
    this.emitRestore.emit(id);
  }
  onEdit(id: Number): void {
    this.emitEdit.emit(id);
  }
  filterData(value: any) {
    if (this.enteredName && this.enteredAddress && this.enteredCompany) {
      this.empData = this.empData.filter((data: any) => {
        return data.name.toLowerCase() === this.enteredName.toLowerCase() && data.newaddress.toLowerCase() === this.enteredAddress.toLowerCase() && data.company.name.toLowerCase() === this.enteredCompany.toLowerCase()
      })
    } else if ((this.enteredName && this.enteredAddress) || (this.enteredName && this.enteredCompany) ||
      (this.enteredAddress && this.enteredCompany)) {
      this.empData = this.empData.filter((data: any) => {
        if (this.enteredName && this.enteredAddress) {
          return data.name.toLowerCase() === this.enteredName.toLowerCase() && data.newaddress.toLowerCase() === this.enteredAddress.toLowerCase();
        } else if (this.enteredName && this.enteredCompany) {
          return data.name.toLowerCase() === this.enteredName.toLowerCase() && data.company.name.toLowerCase() === this.enteredCompany.toLowerCase();
        } else {
          return data.newaddress.toLowerCase() === this.enteredAddress.toLowerCase() && data.company.name.toLowerCase() === this.enteredCompany.toLowerCase();
        }
      })
    } else if (this.enteredName) {
      this.empData = this.empData.filter((data: any) => {
        if (data.name.toLowerCase() == value.toLowerCase()) {
          return data.name;
        }
      });
    } else if (this.enteredAddress) {
      this.filteredAddress = this.empData.filter((data: any) => {
        if (data.newaddress.toLowerCase() == value.toLowerCase()) {
          return data.newaddress;
        }
      });
      this.empData = this.filteredAddress;
    } else if (this.enteredCompany) {
      this.filteredCompanies = this.empData.filter((data: any) => {
        if (data.company.name.toLowerCase() == value.toLowerCase()) {
          return data.company.name;
        }
      });
      this.empData = this.filteredCompanies;
    }
    if (this.empData.length == 0) {
      this.empData = this.storedData.slice();
      console.log(this.empData);
    }

  }
  showSuggestions(type: any, event: any) {
    if (!this.enteredName && !this.enteredAddress && !this.enteredCompany) {
      this.empData = this.storedData.slice();
    }
    const value = event.target.value;
    if (type === 'name') {
      this.filteredNames = this.empData.filter((data: any) => {
        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          return data.name;
        }
      });
      console.log("asdasd", this.filteredNames);
    } else if (type === 'address') {
      this.filteredAddress = this.empData.filter((data: any) => {
        if (data.newaddress.toLowerCase().includes(value.toLowerCase())) {
          return data.newaddress;
        }
      });
    } else {
      this.filteredCompanies = this.empData.filter((data: any) => {
        if (data.company.name.toLowerCase().includes(value.toLowerCase())) {
          return data.company.name;
        }
      });
    }
    console.log(this.filteredCompanies);
  }
  sortData(event: any) {
    this.sortedData = this.empData.slice();
    const point = { lat: 0, lng: 0 }
    let geo: any = []
    this.sortedData.forEach((data: any) => {
      let obj = { lat: data.address.geo.lat, lng: data.address.geo.lng };
      geo.push(obj);
    });
    this.sortedData.sort((a: any, b: any) => {
      if (event.direction === 'asc') {
        return Math.abs((a.address.geo.lat - point.lat) * (a.address.geo.lng - point.lng)) - Math.abs((b.address.geo.lat - point.lat) * (b.address.geo.lng - point.lng))
      } else {
        return Math.abs((b.address.geo.lat - point.lat) * (b.address.geo.lng - point.lng)) - Math.abs((a.address.geo.lat - point.lat) * (a.address.geo.lng - point.lng))
      }
    });
    this.empData = this.sortedData.slice();
  }
}
