const Notes = function (selector, tuner) {
  this.tuner = tuner;
  this.isAutoMode = true;
  this.$root = document.querySelector(selector);
  this.$notesList = this.$root.querySelector(".notes-list");
  this.$frequency = this.$root.querySelector(".frequency");
  this.$notes = [];
  this.$notesMap = {};
  this.createNotes();
  this.$notesList.addEventListener("touchstart", (event) =>
    event.stopPropagation()
  );
};

Notes.prototype.createNotes = function () {
  this.$notesList.innerHTML = "";
  const minOctave = 1;
  const maxOctave = 8;
  for (var octave = minOctave; octave <= maxOctave; octave += 1) {
    for (var n = 0; n < 12; n += 1) {
      const $note = document.createElement("div");
      $note.className = "note";
      $note.dataset.name = this.tuner.noteStrings[n];
      $note.dataset.value = 12 * (octave + 1) + n;
      $note.dataset.octave = octave.toString();
      $note.dataset.frequency = this.tuner.getStandardFrequency(
        $note.dataset.value
      );
      $note.innerHTML =
        $note.dataset.name[0] +
        '<span class="note-sharp">' +
        ($note.dataset.name[1] || "") +
        "</span>" +
        '<span class="note-octave">' +
        $note.dataset.octave +
        "</span>";
      this.$notesList.appendChild($note);
      this.$notes.push($note);
      this.$notesMap[$note.dataset.value] = $note;
    }
  }

  const self = this;
  this.$notes.forEach(function ($note) {
    $note.addEventListener("click", function () {
      if (self.isAutoMode) {
        return;
      }

      const $active = self.$notesList.querySelector(".active");
      if ($active === this) {
        self.tuner.stopOscillator();
        $active.classList.remove("active");
      } else {
        self.tuner.play(this.dataset.frequency);
        self.update($note.dataset);
      }
    });
  });
};

Notes.prototype.active = function ($note) {
  this.clearActive();
  $note.classList.add("active");
  this.$notesList.scrollLeft =
    $note.offsetLeft - (this.$notesList.clientWidth - $note.clientWidth) / 2;
};

Notes.prototype.clearActive = function () {
  const $active = this.$notesList.querySelector(".active");
  if ($active) {
    $active.classList.remove("active");
  }
};

let outputString = "";
let prevNote;
let noteStart;
Notes.prototype.update = function (note, amplitude) {
  let currentNote;
  if (note.octave >= 2 && note.octave <= 6 && amplitude >= 100){
    currentNote = noteMap[note.octave][note.name];
    if (currentNote != prevNote || performance.now() - noteStart > 3000){
      prevNote = currentNote;
      noteStart = performance.now();
      outputString += currentNote;
      console.log(outputString);
      document.getElementById("textareaEl");
      textareaEl.value = outputString;
    }
  }
  // console.log(`${note.name}${note.octave}: ${noteMap[note.octave][note.name]}`);

  if (note.value in this.$notesMap) {
    this.active(this.$notesMap[note.value]);
    this.$frequency.childNodes[0].textContent = parseFloat(
      note.frequency
    ).toFixed(1);
  }
};

Notes.prototype.toggleAutoMode = function () {
  if (!this.isAutoMode) {
    this.tuner.stopOscillator();
  }
  this.clearActive();
  this.isAutoMode = !this.isAutoMode;
};


