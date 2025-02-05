// HTML-Elemente referenzieren
const moodRange = document.getElementById('mood-range');
const moodValue = document.getElementById('mood-value');
const saveMoodBtn = document.getElementById('save-mood');
const moodList = document.getElementById('mood-list');

// Beim Verschieben des Sliders aktuellen Wert anzeigen
moodRange.addEventListener('input', () => {
  moodValue.textContent = moodRange.value;
});

// Beim Klicken auf "Speichern" -> Stimmung speichern
saveMoodBtn.addEventListener('click', () => {
  const currentMood = moodRange.value;
  saveMood(currentMood);
  displayMoods();
});

// Lokale Speicherung (Local Storage) nutzen
function saveMood(mood) {
  // Aktuelles Datum + Uhrzeit
  const now = new Date().toLocaleString();

  // Einträge aus Local Storage laden (oder leeres Array, wenn noch nichts existiert)
  let moods = JSON.parse(localStorage.getItem('moods')) || [];

  // Neuen Eintrag hinzufügen
  moods.push({ mood: mood, date: now });

  // Wieder in Local Storage speichern
  localStorage.setItem('moods', JSON.stringify(moods));
}

function displayMoods() {
  // Vorhandene Liste leeren
  moodList.innerHTML = '';

  // Einträge aus Local Storage holen
  let moods = JSON.parse(localStorage.getItem('moods')) || [];

  // Liste erstellen
  moods.forEach((moodObj) => {
    const li = document.createElement('li');
    li.textContent = `Stimmung: ${moodObj.mood}, Zeit: ${moodObj.date}`;
    moodList.appendChild(li);
  });
}

// Initial beim Laden Stimmungen anzeigen
window.addEventListener('load', displayMoods);
