document.addEventListener("DOMContentLoaded", function () {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints;
  var isDragging = false;
  var selectedCells = [];
  var count = 0;
  var words = [
    "MOHAMUDGAARA",
    "ARSIMANADNAM",
    "SRINGERI",
    "TOTAKA",
    "SANKARA",
    "DWARAKA",
    "PURNA",
    "SIVAGURU",
    "GOVINDAPADA",
    "ARYAMBA",
    "BHAJAGOVINDAM",
    "MUTTS",
    "PURI",
    "BADRI",
    "ADVAITA",
    "ARAAGDUMAHOM",
    "MANDANAMISRA",
    "IREGNIRS",
    "AKATOT",
    "ARAKNAS",
    "AKARAWD",
    "ANRUP",
    "URUGAVIS",
    "ADAPADNIVOG",
    "ABMAYRA",
    "MADNIVOGAJAHB",
    "STTUM",
    "IRUP",
    "IRDAB",
    "ATIAVDA",
  ];
  const WordMatrix = [
    ["K", "T", "M", "N", "Z", "Q", "S", "O", "M", "T", "V", "L", "R", "T", "C"],
    ["A", "A", "A", "R", "A", "A", "G", "D", "U", "M", "A", "H", "O", "M", "D"],
    ["O", "O", "R", "M", "V", "T", "K", "P", "J", "U", "L", "L", "B", "A", "C"],
    ["Z", "Q", "S", "P", "T", "V", "D", "I", "V", "S", "J", "L", "T", "R", "R"],
    ["S", "R", "I", "N", "G", "E", "R", "I", "T", "M", "O", "I", "U", "N", "T"],
    ["J", "H", "M", "T", "S", "P", "G", "O", "P", "I", "A", "N", "R", "U", "P"],
    ["I", "R", "A", "L", "P", "K", "T", "G", "O", "V", "V", "W", "U", "K", "J"],
    ["J", "S", "N", "M", "K", "A", "R", "I", "D", "V", "S", "N", "G", "M", "U"],
    ["K", "S", "A", "N", "K", "A", "R", "A", "W", "T", "K", "L", "A", "K", "J"],
    ["O", "Q", "D", "A", "A", "D", "A", "P", "A", "D", "N", "I", "V", "O", "G"],
    ["P", "O", "N", "T", "A", "A", "V", "M", "R", "V", "L", "R", "I", "J", "S"],
    ["N", "O", "A", "B", "M", "A", "Y", "R", "A", "D", "S", "U", "S", "R", "T"],
    ["L", "M", "M", "K", "M", "D", "X", "G", "K", "R", "K", "P", "T", "V", "T"],
    ["T", "V", "K", "J", "J", "P", "Z", "Z", "A", "N", "P", "U", "M", "K", "U"],
    ["M", "A", "D", "N", "I", "V", "O", "G", "A", "J", "A", "H", "B", "N", "M"],
  ];

  const parentContainer = document.getElementById("root");

  function handleMouseDown(event) {
    const cell = event.target;
    if (!selectedCells.includes(cell)) {
      isDragging = true;
      selectCell(event.target);
    }
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const cell = event.target;
      if (!selectedCells.includes(cell)) {
        selectCell(event.target);
      }
    }
  }

  function handleMouseUp() {
    isDragging = false;
    var selectedWord = selectedCells
      .map(function (cell) {
        return cell.innerText;
      })
      .join("");
    console.log(selectedWord);
    if (words.includes(selectedWord)) {
      console.log("word matched", selectedWord);
      count = count + 1;
      highlightWord(selectedWord);
      if (count === 15) alert("Game over!");
    }
    selectedCells.forEach(function (cell) {
      cell.classList.remove("selected");
    });
    selectedCells = [];
  }

  function handleTouchStart(event) {
    event.preventDefault(); 
    const cell = event.target;
    if (!selectedCells.includes(cell)) {
      isDragging = true;
      selectCell(event.target);
    }
  }

  function handleTouchMove(event) {
    event.preventDefault()
//     const touch =event.touches[0];
//     const touchX = touch.clientX;
//   const touchY = touch.clientY;
//   const element = parentContainer.elementFromPoint(touchX, touchY);
//   const cell = element.elementFromPoint(touchX,touchY);
//   if (!selectedCells.includes(cell)) {
//       selectCell(cell);
//     }
  if (isDragging) {
    //   const cell = event.target
    //   console.log(cell)
    const touch = event.touches[0];
        const cell = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!selectedCells.includes(cell) && cell.classList.contains("childClass")) {
        selectCell(cell);
      }
    }
    // console.log(isDragging)
  }

  function handleTouchEnd() {
    isDragging = false;
    var selectedWord = selectedCells
      .map(function (cell) {
        return cell.innerText;
      })
      .join("");
    console.log(selectedWord);
    if (words.includes(selectedWord)) {
      console.log("word matched", selectedWord);
      count = count + 1;
      highlightWord();
      if (count === 15) alert("Game over!");
    }
    selectedCells.forEach((cell) => {
      cell.classList.remove("selected");
    });
    selectedCells = [];
  }

  function selectCell(cell) {
    cell.classList.add("selected");
    selectedCells.push(cell); 
  }

  function highlightWord() {
    selectedCells.forEach(function (cell) {
      cell.classList.add("matched");
    });
  }

  for (let i = 0; i < WordMatrix.length; i++) {
    const firstChild = document.createElement("div");
    firstChild.id = "container";
    firstChild.className="containerClass";
    firstChild.style.display = "flex";
    for (let j = 0; j < WordMatrix[0].length; j++) {
      const realChild = document.createElement("div");
      realChild.id = "child";
      realChild.className="childClass";
      realChild.style.width = "2rem";
      realChild.style.display = "flex";
      realChild.textContent = WordMatrix[i][j];
      realChild.style.outline = "1px solid black";
      realChild.style.alignItems = "center";
      realChild.style.justifyContent = "center";

      if (isTouchDevice) {
        realChild.addEventListener("touchstart", handleTouchStart);
        realChild.addEventListener("touchmove", handleTouchMove);
        realChild.addEventListener("touchend", handleTouchEnd);
      } else {
        realChild.addEventListener("mousedown", handleMouseDown);
        realChild.addEventListener("mousemove", handleMouseMove);
        realChild.addEventListener("mouseup", handleMouseUp);
      }
      firstChild.appendChild(realChild);
    }
    parentContainer.appendChild(firstChild);
  }
});
