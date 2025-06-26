function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function addBusinessDays(startDate, businessDays) {
  const resultDate = new Date(startDate.getTime());
  let addedDays = 0;
  while (addedDays < businessDays) {
    resultDate.setDate(resultDate.getDate() + 1);
    const day = resultDate.getDay();
    if (day !== 0 && day !== 6) {
      addedDays++;
    }
  }
  return resultDate;
}

function clearSelected() {
  document.getElementById("availityBtn").classList.remove("selected");
  document.getElementById("eligibleBtn").classList.remove("selected");
}

document.getElementById("availityBtn").addEventListener("click", () => {
  clearSelected();
  document.getElementById("availityBtn").classList.add("selected");
  document.getElementById("weeksInput").style.display = "none";
  document.getElementById("calculateBtn").onclick = () => {
    const dateInput = document.getElementById("submittedDate").value;
    if (!dateInput) return alert("Please select a date.");
    const startDate = new Date(dateInput + "T00:00:00");
    const resultDate = addBusinessDays(startDate, 30);
    document.getElementById("result").innerHTML =
      `📅 30 business days after <strong>${formatDate(startDate)}</strong> is <strong>${formatDate(resultDate)}</strong>`;
  };
});

document.getElementById("eligibleBtn").addEventListener("click", () => {
  clearSelected();
  document.getElementById("eligibleBtn").classList.add("selected");
  document.getElementById("weeksInput").style.display = "block";
  document.getElementById("calculateBtn").onclick = () => {
    const dateInput = document.getElementById("submittedDate").value;
    const weeks = parseInt(document.getElementById("calendarWeeks").value);
    if (!dateInput || isNaN(weeks)) return alert("Please fill out all fields.");
    const startDate = new Date(dateInput + "T00:00:00");
    const resultDate = new Date(startDate);
    resultDate.setDate(resultDate.getDate() + weeks * 7);
    document.getElementById("result").innerHTML =
      `📅 ${weeks} calendar week(s) after <strong>${formatDate(startDate)}</strong> is <strong>${formatDate(resultDate)}</strong>`;
  };
});
