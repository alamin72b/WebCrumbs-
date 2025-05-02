// Initialize Flatpickr on the “Anytime” date input
const fp = flatpickr("#datepicker", {
    dateFormat: "d-m-y", // e.g. 30-11-25
    minDate: "today",
    clickOpens: false,
    appendTo: document.body,
    onOpen() {
      toggleChevron("up");
      adjustCalendarPosition();
    },
    onClose() {
      toggleChevron("down");
      resetFlipClasses();
    }
  });
  
  // Helper: swap chevron direction
  function toggleChevron(direction) {
    const chevron = document.querySelector(".dropdown-icon");
    chevron.classList.replace(
      direction === "up" ? "fa-chevron-down" : "fa-chevron-up",
      direction === "up" ? "fa-chevron-up" : "fa-chevron-down"
    );
  }
  
  // Helper: reposition calendar if it overflows
  function adjustCalendarPosition() {
    setTimeout(() => {
      const { left, right } = fp.calendarContainer.getBoundingClientRect();
      const dropdown = document.querySelector(".dropdown");
      dropdown.classList.toggle("flipped", right > window.innerWidth);
      dropdown.classList.toggle("flipped-left", left < 0);
    }, 0);
  }
  
  // Helper: clear flip classes
  function resetFlipClasses() {
    document
      .querySelector(".dropdown")
      .classList.remove("flipped", "flipped-left");
  }
  
  // Open/close datepicker on input or chevron click
  document.querySelector("#datepicker").addEventListener("click", () => {
    fp.isOpen ? fp.close() : fp.open();
  });
  document.querySelector(".dropdown-icon").addEventListener("click", (e) => {
    e.stopPropagation();
    fp.isOpen ? fp.close() : fp.open();
  });
  
  // Forward search-icon click to the main Search button
  document.querySelector(".search-input-icon")?.addEventListener("click", () => {
    document.querySelector(".search-btn").click();
  });
  