window.addEventListener('load', function(e) {
  init();
});

function init() {
  document.addform.style.display='none';
  document.modifyform.style.display='none';
  document.searchform.style.display='block';
  showNavButtons();
  let getAllButton = document.getElementById('getallbutton');
  let modifyButton = document.getElementById('modifybutton');
  let deleteButton = document.getElementById('deletebutton');
  let switchSearchButton = document.getElementById('switchsearch');
  let switchAddButton = document.getElementById('switchadd');
  let searchDateButton = document.getElementById('searchdate');
  let searchOdoButton = document.getElementById('searchodo');
  let searchPriceButton = document.getElementById('searchprice');
  let searchGalsButton = document.getElementById('searchgals');
  let addButton = document.getElementById('addbutton');
  let modSubmit = document.getElementById('modsubmit');

  switchSearchButton.addEventListener('click', function(e) {
    e.preventDefault();
    switchSearch();
  });

  switchAddButton.addEventListener('click', function(e) {
    e.preventDefault();
    switchAdd();
  });

  searchDateButton.addEventListener('click', function(e) {
    e.preventDefault();
    searchDate();
  });

  searchOdoButton.addEventListener('click', function(e) {
    e.preventDefault();
    searchOdo();
  });

  searchPriceButton.addEventListener('click', function(e) {
    e.preventDefault();
    searchPrice();
  });

  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    addFillup();
  });

  getAllButton.addEventListener('click', function(e) {
    e.preventDefault();
    getAll(null, null, null);
  });

  modifyButton.addEventListener('click', function(e) {
    e.preventDefault();
    switchModify();
  });

  deleteButton.addEventListener('click', function(e) {
    e.preventDefault();
    deleteFillup();
  });

  modSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    modifyFillup();
  });

  setDefaultDates();
}

function switchSearch() {
  console.log('switch search clicked');
  document.modifyform.style.display = 'none';
  document.addform.style.display='none';
  document.searchform.style.display='block';
  showNavButtons();
  showHideables();
  showSelectButtons();
  getAll(null, null, null);
}

function switchModify() {
  console.log('switch modify clicked');
  document.searchform.style.display = 'none';
  document.modifyform.style.display = 'block';
  document.addform.style.display='none';
  hideNavButtons();
  hideHideables();
  showSelectButtons();
}

function switchAdd() {
  console.log('switch add clicked');
  document.searchform.style.display = 'none';
  document.modifyform.style.display = 'none';
  document.addform.style.display='block';
  hideNavButtons();
  hideHideables();
  hideSelectButtons();
}

function searchDate() {
  console.log('search date clicked');
  let min = document.getElementById('mindate').value;
  let max = document.getElementById('maxdate').value;
  getAll('date', min, max);
  showHideables();
}

function searchOdo() {
  console.log('search odo clicked');
  let min = document.getElementById('minodo').value;
  let max = document.getElementById('maxodo').value;
  getAll('odometer', min, max);
  hideHideables();
}

function searchPrice() {
  console.log('search price clicked');
  let min = document.getElementById('minprice').value;
  let max = document.getElementById('maxprice').value;
  getAll('price', min, max);
  hideHideables();
}

function addFillup() {
  console.log('add fillup clicked');
  let dateBox = document.getElementById('fillupdate');
  let odoBox = document.getElementById('odo');
  let priceBox = document.getElementById('price');
  let galsBox = document.getElementById('gals');
  let id = 0;
  let date = dateBox.value;
  let odo = odoBox.value;
  let price = priceBox.value;
  let gals = galsBox.value;
  let newFillup = {id: id, date: date, odometer: odo, pricePerGallon: price, gallons: gals};
  console.log('newFillup: ' + newFillup);
  let xhr = new XMLHttpRequest();
  let requestUrl = 'api/fillups';
  xhr.open('POST', requestUrl);
  xhr.setRequestHeader("Content-type", "application/json");
  let newFillupString = JSON.stringify(newFillup);
  console.log('JSON string: ' + newFillupString);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      if(xhr.status === 201) {
         alert('Fillup Successfully Added!');
         var fillup = JSON.parse(xhr.responseText);
         console.log(fillup);
       }
       else {
         alert('Error: Fillup Not Added')
       }
     }
    }
  xhr.send(newFillupString);
}

function modifyFillup() {
  console.log('modify submit clicked');
  modId = document.getElementById('modid').value;
  let dateBox = document.getElementById('moddate');
  let odoBox = document.getElementById('mododo');
  let priceBox = document.getElementById('modprice');
  let galsBox = document.getElementById('modgals');
  let date = dateBox.value;
  let odo = odoBox.value;
  let price = priceBox.value;
  let gals = galsBox.value;
  let newFillup = {id: modId, date: date, odometer: odo, pricePerGallon: price, gallons: gals};
  console.log('newFillup: ' + newFillup);
  let xhr = new XMLHttpRequest();
  let requestUrl = 'api/fillups/' + modId;
  xhr.open('PUT', requestUrl);
  xhr.setRequestHeader("Content-type", "application/json");
  let newFillupString = JSON.stringify(newFillup);
  console.log('JSON string: ' + newFillupString);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      console.log(xhr.status);
      if(xhr.status === 200) {
         alert('Fillup Successfully Modified!');
         var fillup = JSON.parse(xhr.responseText);
         console.log(fillup);
       }
       else {
         alert('Error: Fillup Not Modified')
       }
     }
    }
  xhr.send(newFillupString);
}

function deleteFillup() {
  console.log('delete fillup clicked');
  delId = document.getElementById('modid').value;
  let xhr = new XMLHttpRequest();
  let requestUrl = 'api/fillups/' + delId;
  xhr.open('DELETE', requestUrl);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4) {
      if(xhr.status === 204) {
         alert('Fillup Successfully Deleted!');
       }
       else {
         alert('Error: Fillup Not Deleted')
       }
     }
    }
  xhr.send(null);
}

function setDefaultDates() {
  let maxDate = document.getElementById('maxdate');
  let fillupDate = document.getElementById('fillupdate');
  let trimmed = new Date().toISOString().slice(0,10);
  maxDate.value = trimmed;
  fillupDate.value = trimmed;
}

function hideNavButtons() {
  let navButtons = document.getElementById('navbuttons');
  navButtons.style.display = 'none';
  let returnButton = document.getElementById('returnbutton');
  returnButton.style.display = 'block';
}

function showNavButtons() {
  let navButtons = document.getElementById('navbuttons');
  navButtons.style.display = 'block';
  let returnButton = document.getElementById('returnbutton');
  returnButton.style.display = 'none';
}

function hideHideables() {
  let hideables = document.getElementsByClassName('hideable');
  let hideable;
    for(let i = 0; i < hideables.length; i++) {
    hideable = hideables[i];
    hideable.style.display='none';
  }
}

function showHideables() {
  let hideables = document.getElementsByClassName('hideable');
  let hideable;
  for(let i = 0; i < hideables.length; i++) {
    hideable = hideables[i]
    hideable.style.display='table-cell';
  }
}

function hideSelectButtons() {
  console.log('hide select buttons');
  let selectButtons = document.getElementsByClassName('selectbutton');
  let selectButton;
    for(let i = 0; i < selectButtons.length; i++) {
    selectButton = selectButtons[i];
    selectButton.style.display='none';
  }
}

function showSelectButtons() {
  console.log('show select buttons');
  let selectButtons = document.getElementsByClassName('selectbutton');
  let selectButton;
    for(let i = 0; i < selectButtons.length; i++) {
    selectButton = selectButtons[i];
    selectButton.style.display='table-cell';
  }
}

function isoToAmDate(isoDate){
  let trimmed = isoDate.slice(0,10);
  let  year = trimmed.slice(0,4);
  let month = trimmed.slice(5,7);
  let day = trimmed.slice(8,10);
  let amDate = month + '/' + day + '/' + year;
  return amDate;
}

function amToIsoDate(amDate){
  let year = amDate.slice(6,10);
  let month = amDate.slice(0,2);
  let day = amDate.slice(3,5);
  let isoDate = year + '-' + month + '-' + day;
  return isoDate;
}

function setModValues(modId) {
  let modIdBox = document.getElementById('modid');
  let modDate;
  let modDateBox = document.getElementById('moddate');
  let modOdo;
  let modOdoBox = document.getElementById('mododo');
  let modPrice;
  let modPriceBox = document.getElementById('modprice');
  let modGals;
  let ModGalsBox = document.getElementById('modgals');
  let table = document.getElementById('filluptable');
  let targetRow;
  console.log(table.rows.length);
  for(let i = 0; i < table.rows.length; i++) {
    if(table.rows[i].children[1].textContent === modId) {
        targetRow = table.rows[i];
        console.log(targetRow);
        modDate = amToIsoDate(targetRow.children[2].textContent);
        modOdo = targetRow.children[3].textContent;
        modPrice = targetRow.children[4].textContent.slice(1);
        modGals = targetRow.children[5].textContent;
    }
  }
  modIdBox.value = modId;
  modDateBox.value = modDate;
  modOdoBox.value = modOdo;
  modPriceBox.value = modPrice;
  ModGalsBox.value = modGals;
}

function getAll(type, min, max) {
  let requestUrl;
  if(type === null && min === null && max === null){
	  requestUrl = 'api/fillups'
  }
  else {
    requestUrl = 'api/fillups/' + type + '/' + min + '/' + max;
    if(type === 'price') {
      var hide = true;
    }
  }
	let xhr = new XMLHttpRequest();
	xhr.open('GET', requestUrl);
	xhr.onreadystatechange = function() {
		console.log('xhr state: ' + xhr.readyState)
		if(xhr.readyState === 4) {
      if(xhr.status === 200) {
			console.log('response text: ' + xhr.responseText);
			let fillups = JSON.parse(xhr.responseText);
      let fillupTable = document.getElementById('filluptable');
      fillupTable.innerHTML = '';
      let fillup, newRow, radButTd, radBut, id, date, odometer, price, gallons, mpg, Δmpg, ΔmpgVal, cpm, thSelect, thId, thDate, thOdometer, thPrice, thGallons, thMpg, thΔMpg, thCpm;
      let  prevOdo = 0;
      let prevMpg = 0;
      var modId;
      newRow = document.createElement('tr');
      thSelect = document.createElement('th');
      thSelect.className = 'selectbutton'
      thSelect.textContent = 'Select';
      newRow.appendChild(thSelect);
      thId = document.createElement('th');
      thId.textContent = 'Id';
      newRow.appendChild(thId);
      thDate = document.createElement('th');
      thDate.textContent = 'Date';
      newRow.appendChild(thDate);
      thOdometer = document.createElement('th');
      thOdometer.textContent = 'Odometer';
      newRow.appendChild(thOdometer);
      thPrice = document.createElement('th');
      thPrice.textContent = 'Price/Gallon';
      newRow.appendChild(thPrice);
      thGallons = document.createElement('th');
      thGallons.textContent = 'Gallons';
      newRow.appendChild(thGallons);
      thMpg = document.createElement('th');
      thMpg.className = "hideable";
      thMpg.textContent = 'MPG';
      newRow.appendChild(thMpg);
      thΔMpg = document.createElement('th');
      thΔMpg.className = 'hideable';
      thΔMpg.textContent = 'ΔMPG';
      newRow.appendChild(thΔMpg);
      thCpm = document.createElement('th');
      thCpm.className = 'hideable';
      thCpm.textContent = 'Cost/Mile';
      newRow.appendChild(thCpm);
      fillupTable.appendChild(newRow);
      for(let i = 0; i < fillups.length; i++) {
        fillup = fillups[i];
        newRow = document.createElement('tr');
        radButTd = document.createElement('td');
        radButTd.className = 'selectbutton'
        radBut = document.createElement('input');
        radBut.type = 'radio';
        radBut.name = 'radbut';
        radBut.addEventListener('click', function(e) {
          modId = e.target.parentElement.nextElementSibling.textContent;
          console.log(modId);
          setModValues(modId);
        });
        radButTd.appendChild(radBut);
        newRow.appendChild(radButTd);
        id = document.createElement('td');
        id.textContent = fillup.id;
        newRow.appendChild(id);
        date = document.createElement('td');
        date.textContent = isoToAmDate(fillup.date);
        newRow.appendChild(date);
        odometer = document.createElement('td');
        odometer.textContent = fillup.odometer;
        newRow.appendChild(odometer);
        price = document.createElement('td');
        price.textContent = '$' + fillup.pricePerGallon;
        newRow.appendChild(price);
        gallons = document.createElement('td');
        gallons.textContent = fillup.gallons;
        newRow.appendChild(gallons);
        mpg = document.createElement('td');
        mpg.className = 'hideable';
        if(prevOdo > 0) {
          mpg.textContent = ((fillup.odometer - prevOdo) / fillup.gallons).toFixed(2);
        }
        else {
          mpg.textContent = '-';
        }
        newRow.appendChild(mpg);
        Δmpg = document.createElement('td');
        Δmpg.className = 'hideable';
        if(prevMpg > 0) {
          ΔmpgVal = (((mpg.textContent - prevMpg) / prevMpg) * 100).toFixed(2);
          if(ΔmpgVal > 0) {
            ΔmpgVal = '+' + ΔmpgVal;
          }
          Δmpg.textContent = ΔmpgVal  + '%';
        }
        else {
          Δmpg.textContent = '-';
        }
        newRow.appendChild(Δmpg);
        cpm = document.createElement('td');
        cpm.className = 'hideable';
        if(prevOdo > 0) {
          cpm.textContent = '$' + ((fillup.pricePerGallon * fillup.gallons) / (fillup.odometer - prevOdo)).toFixed(4);
        }
        else {
          cpm.textContent = '-';
        }
        prevMpg = mpg.textContent;
        prevOdo = fillup.odometer;
        newRow.appendChild(cpm);
        fillupTable.appendChild(newRow);
      }
      if(hide === true) {
        hideHideables();
      }
		}
		else {
      alert('Unable to retrieve fillup data!')
    }
		}
	}
	xhr.send(null);
	};
