import { FillupService } from './../../services/fillup.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fillup } from 'src/app/models/fillup';


@Component({
  selector: 'app-fillup',
  templateUrl: './fillup.component.html',
  styleUrls: ['./fillup.component.css']
})
export class FillupComponent implements OnInit {
  fillups: Fillup[] = [];
  fillup: Fillup = null;
  showAdd: boolean;
  showModify: boolean;
  showDate: boolean;
  showOdo: boolean;
  showPrice: boolean;
  showGals: boolean;
  showTable: boolean;
  showEdit: boolean;
  showStats: boolean;
  newFillup: Fillup;
  editFillup: Fillup;

  constructor(private fillupService: FillupService) { }

  ngOnInit() {
  }

navAll() {
  this.showAdd = false;
  this.showDate = false;
  this.showOdo = false;
  this.showPrice = false;
  this.showGals = false;
  this.showTable = true;
  this.showEdit = false;
  this.showStats = true;
  this.showAll();
}

navAdd() {
this.showAdd = true;
this.showDate = false;
this.showOdo = false;
this.showPrice = false;
this.showGals = false;
this.showTable = false;
this.showEdit = false;
}

navDate() {
  this.showAdd = false;
  this.showDate = true;
  this.showOdo = false;
  this.showPrice = false;
  this.showGals = false;
  this.showTable = false;
  this.showStats = true;
  this.showEdit = false;
}

navOdo() {
  this.showAdd = false;
  this.showDate = false;
  this.showOdo = true;
  this.showPrice = false;
  this.showGals = false;
  this.showTable = false;
  this.showStats = true;
  this.showEdit = false;
}

navPrice() {
  this.showAdd = false;
  this.showDate = false;
  this.showOdo = false;
  this.showPrice = true;
  this.showGals = false;
  this.showTable = false;
  this.showStats = false;
  this.showEdit = false;
}

showAll() {
  this.fillupService.getAll().subscribe(
    data => {
      this.fillups = data;
    },
    err => {
      console.error('Fillup component.navAll(): Error');
      console.error(err);
    }
  );
}

searchByPrice(form: NgForm) {
  const min = form.value.min;
  const max = form.value.max;
  if(!min || !max || min >= max) {
    alert('Invalid search.  Check your search parameters and try again.')
  }
  else {
  this.fillupService.searchPrice(min, max).subscribe(
    data => {
      this.fillups = data;
      this.showTable = true;
    },
    err => {
      console.error('Fillup component.navAll(): Error');
      console.error(err);
    }
  );
  }
}

searchByOdometer(form: NgForm) {
  const min = form.value.min;
  const max = form.value.max;
  if(!min || !max || min >= max) {
    alert('Invalid search.  Check your search parameters and try again.')
  }
  else {
  this.fillupService.searchOdometer(min, max).subscribe(
    data => {
      this.fillups = data;
      this.showTable = true;
    },
    err => {
      console.error('Fillup component.navAll(): Error');
      console.error(err);
    }
  );
  }
}

searchByDate(form: NgForm) {
  const min = form.value.min;
  const max = form.value.max;
  if(!min || !max || min >= max) {
    alert('Invalid search.  Check your search parameters and try again.')
  }
  else {
  this.fillupService.searchDate(min, max).subscribe(
    data => {
      this.fillups = data;
      this.showTable = true;
    },
    err => {
      console.error('Fillup component.navAll(): Error');
      console.error(err);
    }
  );
  }
}

calcMpg() {
  let rowOdo, rowPrice, rowGals, rowMiles, rowMpg, rowDMpg, rowCpm;
  let prevOdo = 0;
  let prevMpg = 0;
  let numMiles = 0;
  let numMpg = 0;
  let numDMpg = 0;
  const body = document.getElementById('filluptablebody');
  for(let i = 0; i < body.rows.length; i++) {
    rowOdo = body.children[i].children[2];
    rowPrice = body.children[i].children[3];
    rowGals = body.children[i].children[4];
    rowMiles = body.children[i].children[5];
    rowMpg = body.children[i].children[6];
    rowDMpg = body.children[i].children[7];
    rowCpm = body.children[i].children[8];
    if (prevOdo > 0) {
      numMiles = parseInt(rowOdo.textContent) - prevOdo;
      rowMiles.textContent = numMiles.toString();
      numMpg = Math.round((numMiles / parseFloat(rowGals.textContent)) * 100) / 100;
      rowMpg.textContent = numMpg.toString();
      rowCpm.textContent = '$' + ((parseFloat(rowPrice.textContent.substring(1)) * parseFloat(rowGals.textContent)) / numMiles).toString().substring(0,5);
    }
    if (prevMpg > 0) {
      numDMpg = Math.round(((numMpg - prevMpg) / prevMpg)*10000)/100;
      if(numDMpg >= 0) {
        rowDMpg.textContent = '+' + numDMpg.toString() + '%';
      }
      else {
      rowDMpg.textContent = numDMpg.toString() + '%';
      }
    }
    prevOdo = parseInt(rowOdo.textContent);
    prevMpg = numMpg;
  }
}

submitNew(form: NgForm) {
  if(!form.value.date || !form.value.odometer || !form.value.price || !form.value.gallons) {
    alert('Invalid submission.  Complete all fields and try again.')
  }
  else {
    const fillup = new Fillup();
    fillup.date = form.value.date;
    fillup.odometer = form.value.odometer;
    fillup.pricePerGallon = form.value.price;
    fillup.gallons = form.value.gallons;
    this.fillupService.create(fillup).subscribe(
    data => {
      alert('Fillup Event Created!');
      this.navAll();
    },
    err => {
      console.error('fillup.component.submitNew(): Error');
      console.error(err);
    }
  );
    this.newFillup = new Fillup();
  }
}

launchEdit(fillup: Fillup) {
  this.editFillup = fillup;
  this.editFillup.date = this.convertDate(this.editFillup.date);
  this.showAdd = false;
  this.showDate = false;
  this.showOdo = false;
  this.showPrice = false;
  this.showGals = false;
  this.showTable = false;
  this.showEdit = true;
}

submitEdit() {
  this.fillupService.update(this.editFillup).subscribe(
    data => {
      alert('Record Successfully Updated');
      this.editFillup = null;
      this.navAll();
    },
    err => {
      console.error('TodoListComponent.updateTodo(): Error');
      console.error(err);
    }
    );
  }

submitDelete() {
  this.fillupService.delete(this.editFillup.id).subscribe(
    data => {
      alert('Record Successfully Deleted');
      this.editFillup = null;
      this.navAll();
    },
    err => {
      console.error('fillup.component.deleteTodo(): Error');
      console.error(err);
    }
  );
}

convertDate(date: string): string {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  return year + '-' + month + '-' + day;
}
}

