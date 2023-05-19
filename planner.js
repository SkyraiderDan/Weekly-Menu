// Array of days
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// People and their colors
const people = {
  Morgan: 'pink',
  Chandler: 'blue',
  Daniel: 'plum',
  Chris: 'red'
};

// Cats and their colors
const cats = {
  Fetty: 'pink',
  Jasmine: 'blue',
  Possum: 'plum',
  Lily: 'red',
  Other: 'orange'
};

// Get table and header elements
const plannerTable = document.getElementById('plannerTable');
const weekOfHeader = document.getElementById('weekOf');
const resetButton = document.getElementById('resetButton');

// Set weekOfHeader to current week
const now = new Date();
const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
weekOfHeader.textContent = `Week of ${now.getMonth() + 1}/${now.getDate()} - ${nextWeek.getMonth() + 1}/${nextWeek.getDate()}`;

// Add rows to planner table
days.forEach(day => {
  // Day row
  let dayRow = plannerTable.insertRow();
  let dayCell = dayRow.insertCell();
  dayCell.textContent = day;
  dayCell.colSpan = 2;

  // Reset button for the day
  let resetDayCell = dayRow.insertCell();
  let resetDayButton = document.createElement('button');
  resetDayButton.textContent = 'Reset Day';
  resetDayButton.onclick = () => {
    localStorage.removeItem(`meal-${day}`);
    localStorage.removeItem(`activity-${day}`);
    Object.keys(people).forEach(person => {
      localStorage.removeItem(`${person}-${day}`);
    });
    location.reload();
  };
  resetDayCell.appendChild(resetDayButton);

  // Meal row
  let mealRow = plannerTable.insertRow();
  let mealLabelCell = mealRow.insertCell();
  mealLabelCell.textContent = 'Dinner';
  let mealInputCell = mealRow.insertCell();
  let mealInput = document.createElement('input');
  mealInput.onchange = () => {
    localStorage.setItem(`meal-${day}`, mealInput.value);
    mealInput.disabled = true;  
  };
  mealInput.onclick = () => {
    mealInput.disabled = false;  
  };
  mealInput.value = localStorage.getItem(`meal-${day}`) || '';
  mealInputCell.appendChild(mealInput);

  // Activity row
  let activityRow = plannerTable.insertRow();
  let activityLabelCell = activityRow.insertCell();
  activityLabelCell.textContent = 'Activity';
  let activityInputCell = activityRow.insertCell();
  let activityInput = document.createElement('input');
  activityInput.onchange = () => {
    localStorage.setItem(`activity-${day}`, activityInput.value);
    activityInput.disabled = true;
  };
  activityInput.onclick = () => {
    activityInput.disabled = false;  
  };
  activityInput.value = localStorage.getItem(`activity-${day}`) || '';
  activityInputCell.appendChild(activityInput);

  // Availability row
  let availabilityRow = plannerTable.insertRow();
  let availabilityLabelCell = availabilityRow.insertCell();
  availabilityLabelCell.textContent = 'Availability';
  let availabilityCell = availabilityRow.insertCell();
  availabilityCell.colSpan = 2;
  let availabilityGrid = document.createElement('div');
  availabilityGrid.className = 'availability';

  Object.keys(people).forEach(person => {
    let square = document.createElement('div');
    square.className = 'square';
    square.textContent = person;
    square.onclick = () => {
      if (square.style.backgroundColor === people[person]) {
        square.style.backgroundColor = '';
        localStorage.setItem(`${person}-${day}`, '');
      } else {
        square.style.backgroundColor = people[person];
        localStorage.setItem(`${person}-${day}`, people[person]);
      }
    };
    square.style.backgroundColor = localStorage.getItem(`${person}-${day}`) || '';
    availabilityGrid.appendChild(square);
  });

  availabilityCell.appendChild(availabilityGrid);
});

// Add Bad Cat of the Week row
let badCatRow = plannerTable.insertRow();
let badCatLabelCell = badCatRow.insertCell();
badCatLabelCell.textContent = 'Bad Cat of the Week';
let badCatInputCell = badCatRow.insertCell();
badCatInputCell.colSpan = 2;

let badCatGrid = document.createElement('div');
badCatGrid.className = 'availability';

Object.keys(cats).forEach(cat => {
  let square = document.createElement('div');
  square.className = 'square';
  square.textContent = cat;
  square.onclick = () => {
    localStorage.setItem('badCat', square.textContent);
    square.style.backgroundColor = cats[cat];
    Array.from(square.parentNode.children).forEach(sibling => {
      if (sibling !== square) {
        sibling.style.backgroundColor = '';
      }
    });
  };
  square.style.backgroundColor = localStorage.getItem('badCat') === square.textContent ? cats[cat] : '';
  badCatGrid.appendChild(square);
});

badCatInputCell.appendChild(badCatGrid);

// Add Cat Crime row
let catCrimeRow = plannerTable.insertRow();
let catCrimeLabelCell = catCrimeRow.insertCell();
catCrimeLabelCell.textContent = 'Cat Crime';
let catCrimeInputCell = catCrimeRow.insertCell();
let catCrimeInput = document.createElement('input');
catCrimeInput.onchange = () => {
  localStorage.setItem('catCrime', catCrimeInput.value);
  catCrimeInput.disabled = true;  
};
catCrimeInput.onclick = () => {
  catCrimeInput.disabled = false;  
};
catCrimeInput.value = localStorage.getItem('catCrime') || '';
catCrimeInputCell.appendChild(catCrimeInput);

// Add Weekly Notes row
let weeklyNotesRow = plannerTable.insertRow();
let weeklyNotesLabelCell = weeklyNotesRow.insertCell();
weeklyNotesLabelCell.textContent = 'Weekly Notes';
weeklyNotesLabelCell.colSpan = 2;
let weeklyNotesInput = document.createElement('textarea');
weeklyNotesInput.onchange = () => {
  localStorage.setItem('weeklyNotes', weeklyNotesInput.value);
  weeklyNotesInput.disabled = true;  
};
weeklyNotesInput.onclick = () => {
  weeklyNotesInput.disabled = false;  
};
weeklyNotesInput.value = localStorage.getItem('weeklyNotes') || '';
weeklyNotesLabelCell.appendChild(weeklyNotesInput);

resetButton.onclick = () => {
  localStorage.clear();
  location.reload();
};
// Cats by Jinn
