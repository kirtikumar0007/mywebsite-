(function () {
  "use strict";

  var STORAGE_KEY = "issueRegister.entries";
  var INVENTORY_KEY = "issueRegister.inventory";

  var seedData = [
    { id: "0001", date: "2026-08-18T09:00", name: "R. Menon", studentId: "24CS001", mobile: "9876543210", email: "",
      item: "Dell Latitude 5440 Laptop", quantity: "1", issuedBy: "A. Sharma", issuedTo: "R. Menon",
      purpose: "Client site visit — Pune", dueDate: "2026-08-28", returnDate: "2026-08-27",
      receivedBy: "A. Sharma", status: "Returned" },
    { id: "0002", date: "2026-08-22T10:30", name: "P. Nair", studentId: "24CS002", mobile: "9876543211", email: "",
      item: "Canon EOS R6 Camera", quantity: "1", issuedBy: "A. Sharma", issuedTo: "P. Nair",
      purpose: "Product photo shoot", dueDate: "2026-08-26", returnDate: "",
      receivedBy: "", status: "Overdue" },
    { id: "0003", date: "2026-08-25T14:15", name: "S. Verma", studentId: "24CS003", mobile: "9876543212", email: "",
      item: "Epson EB-X06 Projector", quantity: "2", issuedBy: "V. Kulkarni", issuedTo: "S. Verma",
      purpose: "Training session, Hall B", dueDate: "2026-08-30", returnDate: "2026-08-29",
      receivedBy: "V. Kulkarni", status: "Returned" },
    { id: "0004", date: "2026-08-29T08:45", name: "D. Anand", studentId: "24CS004", mobile: "9876543213", email: "",
      item: "Fluke 117 Digital Multimeter", quantity: "1", issuedBy: "A. Sharma", issuedTo: "D. Anand",
      purpose: "Panel maintenance, Block 3", dueDate: "2026-09-05", returnDate: "",
      receivedBy: "", status: "Issued" },
    { id: "0005", date: "2026-08-31T11:00", name: "K. Iyer", studentId: "24CS005", mobile: "9876543214", email: "",
      item: "Bosch GSB 13 RE Drill Kit", quantity: "3", issuedBy: "V. Kulkarni", issuedTo: "K. Iyer",
      purpose: "Office fixture installation", dueDate: "2026-09-04", returnDate: "",
      receivedBy: "", status: "Issued" },
    { id: "0006", date: "2026-09-01T09:15", name: "Raj", studentId: "24cs002", mobile: "9876543215", email: "",
      item: "Jetson", quantity: "1", issuedBy: "kirti", issuedTo: "AV",
      purpose: "lab use", dueDate: "2026-09-30", returnDate: "",
      receivedBy: "kirti", status: "Issued" },
    { id: "0007", date: "2026-09-02T16:20", name: "raj", studentId: "23cs023", mobile: "9876543216", email: "",
      item: "keyboard", quantity: "5", issuedBy: "kirti", issuedTo: "raj",
      purpose: "lab", dueDate: "2026-09-03", returnDate: "",
      receivedBy: "bk", status: "Returned" }
  ];

  var entries = loadEntries();
  var inventory = loadInventory();

  var appShell = document.getElementById("appShell");
  var dashboardHome = document.getElementById("dashboardHome");
  var registerView = document.getElementById("registerView");
  var inventoryView = document.getElementById("inventoryView");
  var entryPage = document.getElementById("entryPage");
  var dashboardNewEntryBtn = document.getElementById("dashboardNewEntryBtn");
  var dashboardViewBtn = document.getElementById("dashboardViewBtn");
  var brandHomeBtn = document.getElementById("brandHomeBtn");
  var brandMenu = document.getElementById("brandMenu");
  var inventoryMenuBtn = document.getElementById("inventoryMenuBtn");
  var darkModeMenuBtn = document.getElementById("darkModeMenuBtn");
  var logoutMenuBtn = document.getElementById("logoutMenuBtn");
  var backToDashboardBtn = document.getElementById("backToDashboardBtn");
  var cancelEntryPageBtn = document.getElementById("cancelEntryPageBtn");
  var entryPageForm = document.getElementById("entryPageForm");
  var loginOverlay = document.getElementById("loginOverlay");
  var loginForm = document.getElementById("loginForm");
  var loginUsername = document.getElementById("loginUsername");
  var loginPassword = document.getElementById("loginPassword");
  var loginError = document.getElementById("loginError");
  var closeLoginBtn = document.getElementById("closeLoginBtn");
  var cancelLoginBtn = document.getElementById("cancelLoginBtn");
  var tableBody = document.getElementById("tableBody");
  var searchInput = document.getElementById("searchInput");
  var showingCount = document.getElementById("showingCount");
  var toast = document.getElementById("toast");

  var modalOverlay = document.getElementById("modalOverlay");
  var modalTitle = document.getElementById("modalTitle");
  var entryForm = document.getElementById("entryForm");
  var backFromRegisterBtn = document.getElementById("backFromRegisterBtn");
  var backFromInventoryBtn = document.getElementById("backFromInventoryBtn");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var cancelBtn = document.getElementById("cancelBtn");

  var fEntryId = document.getElementById("entryId");
  var fDate = document.getElementById("fDate");
  var fName = document.getElementById("fName");
  var fStudentId = document.getElementById("fStudentId");
  var fMobile = document.getElementById("fMobile");
  var fEmail = document.getElementById("fEmail");
  var fItem = document.getElementById("fItem");
  var fQuantity = document.getElementById("fQuantity");
  var fIssuedBy = document.getElementById("fIssuedBy");
  var fIssuedTo = document.getElementById("fIssuedTo");
  var fPurpose = document.getElementById("fPurpose");
  var fDueDate = document.getElementById("fDueDate");
  var pageFMobile = document.getElementById("pageFMobile");
  var pageFDueDate = document.getElementById("pageFDueDate");
  var pageFQuantity = document.getElementById("pageFQuantity");
  var inventoryForm = document.getElementById("inventoryForm");
  var inventoryItemName = document.getElementById("inventoryItemName");
  var inventoryItemQuantity = document.getElementById("inventoryItemQuantity");
  var inventoryList = document.getElementById("inventoryList");
  var exportCsvBtn = document.getElementById("exportCsvBtn");
  var adminAuthenticated = false;
  var inventoryRequested = false;

  init();

  function init() {
    [fMobile, pageFMobile].forEach(function (input) {
      input.addEventListener("input", function () {
        input.value = input.value.replace(/\D/g, "").slice(0, 10);
        input.setCustomValidity("");
      });
    });
    [fDueDate, pageFDueDate].forEach(function (input) {
      input.addEventListener("input", function () {
        input.setCustomValidity("");
      });
    });
    setDueDateMinimums();
    dashboardNewEntryBtn.addEventListener("click", openNewEntryFromDashboard);
    dashboardViewBtn.addEventListener("click", openLogin);
    brandHomeBtn.addEventListener("click", toggleBrandMenu);
    inventoryMenuBtn.addEventListener("click", openInventoryFromMenu);
    darkModeMenuBtn.addEventListener("click", toggleDarkMode);
    logoutMenuBtn.addEventListener("click", logout);
    backToDashboardBtn.addEventListener("click", showDashboardHome);
    cancelEntryPageBtn.addEventListener("click", showDashboardHome);
    entryPageForm.addEventListener("submit", handleEntryPageSave);
    loginForm.addEventListener("submit", handleLogin);
    closeLoginBtn.addEventListener("click", closeLogin);
    cancelLoginBtn.addEventListener("click", closeLogin);
    loginOverlay.addEventListener("click", function (e) {
      if (e.target === loginOverlay) closeLogin();
    });
    backFromRegisterBtn.addEventListener("click", showDashboardHome);
    backFromInventoryBtn.addEventListener("click", showDashboardHome);
    closeModalBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
      if (e.key === "Escape" && loginOverlay.classList.contains("open")) closeLogin();
    });
    entryForm.addEventListener("submit", handleSaveEntry);
    inventoryForm.addEventListener("submit", handleInventorySave);
    searchInput.addEventListener("input", render);
    pageFItem.addEventListener("change", updateQuantityLimit);
    fItem.addEventListener("change", updateQuantityLimit);
    exportCsvBtn.addEventListener("click", exportCsv);
    document.addEventListener("click", closeBrandMenuOutside);
    if (window.localStorage.getItem("issueRegister.darkMode") === "true") {
      document.body.classList.add("dark-mode");
      darkModeMenuBtn.textContent = "Light Mode";
    }

    renderInventory();
    populateItemSelects();
    render();
    showAppShell();
  }

  function showAppShell() {
    appShell.hidden = false;
    showDashboardHome();
  }

  function showDashboardHome() {
    brandMenu.hidden = true;
    dashboardHome.hidden = false;
    registerView.hidden = true;
    entryPage.hidden = true;
    inventoryView.hidden = true;
  }

  function showRegisterView() {
    brandMenu.hidden = true;
    dashboardHome.hidden = true;
    registerView.hidden = false;
    entryPage.hidden = true;
    inventoryView.hidden = true;
  }

  function toggleBrandMenu(e) {
    e.stopPropagation();
    brandMenu.hidden = !brandMenu.hidden;
  }

  function closeBrandMenuOutside(e) {
    if (!brandMenu.hidden && !brandMenu.contains(e.target) && e.target !== brandHomeBtn && !brandHomeBtn.contains(e.target)) {
      brandMenu.hidden = true;
    }
  }

  function openInventoryFromMenu() {
    brandMenu.hidden = true;
    if (!adminAuthenticated) {
      inventoryRequested = true;
      openLogin();
      return;
    }
    showInventoryView();
  }

  function showInventoryView() {
    brandMenu.hidden = true;
    dashboardHome.hidden = true;
    registerView.hidden = true;
    entryPage.hidden = true;
    inventoryView.hidden = false;
    window.setTimeout(function () {
      document.querySelector(".inventory-panel").scrollIntoView({ behavior: "smooth", block: "start" });
      inventoryItemName.focus();
    }, 0);
  }

  function toggleDarkMode() {
    brandMenu.hidden = true;
    document.body.classList.toggle("dark-mode");
    window.localStorage.setItem("issueRegister.darkMode", document.body.classList.contains("dark-mode"));
    darkModeMenuBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
  }

  function logout() {
    brandMenu.hidden = true;
    adminAuthenticated = false;
    inventoryRequested = false;
    closeLogin();
    showDashboardHome();
    showToast("Logged out");
  }

  function openLogin() {
    loginForm.reset();
    loginError.textContent = "";
    loginOverlay.classList.add("open");
    loginUsername.focus();
  }

  function closeLogin() {
    loginOverlay.classList.remove("open");
  }

  function handleLogin(e) {
    e.preventDefault();
    if (loginUsername.value.trim().toLowerCase() !== "admin" || loginPassword.value !== "admin123") {
      loginError.textContent = "Invalid administrator username or password.";
      loginPassword.select();
      return;
    }

    closeLogin();
    adminAuthenticated = true;
    if (inventoryRequested) {
      inventoryRequested = false;
      showInventoryView();
    } else {
      showRegisterView();
    }
  }

  function openNewEntryFromDashboard() {
    dashboardHome.hidden = true;
    registerView.hidden = true;
    inventoryView.hidden = true;
    entryPage.hidden = false;
    entryPageForm.reset();
    pageFMobile.setCustomValidity("");
    pageFDueDate.setCustomValidity("");
    setDueDateMinimums();
    document.getElementById("pageFDate").value = todayISO();
    document.getElementById("pageFQuantity").value = "1";
    document.getElementById("pageFName").focus();
  }

  function handleEntryPageSave(e) {
    e.preventDefault();
    if (!validateEntryFields(pageFMobile, pageFDueDate)) return;
    var item = getInventoryItem(pageFItem.value);
    var quantity = parseInt(document.getElementById("pageFQuantity").value, 10);
    if (!item || quantity > item.quantity) {
      pageFQuantity.setCustomValidity("Quantity cannot exceed available stock.");
      pageFQuantity.reportValidity();
      return;
    }
    pageFQuantity.setCustomValidity("");
    entries.unshift({
      id: nextSrNo(),
      date: document.getElementById("pageFDate").value,
      name: document.getElementById("pageFName").value.trim(),
      studentId: document.getElementById("pageFStudentId").value.trim(),
      mobile: document.getElementById("pageFMobile").value.trim(),
      email: document.getElementById("pageFEmail").value.trim(),
      item: document.getElementById("pageFItem").value.trim(),
      quantity: String(quantity),
      issuedBy: document.getElementById("pageFIssuedBy").value.trim(),
      issuedTo: document.getElementById("pageFIssuedTo").value.trim(),
      purpose: document.getElementById("pageFPurpose").value.trim(),
      dueDate: document.getElementById("pageFDueDate").value,
      returnDate: "",
      receivedBy: "",
      status: "Issued"
    });
    item.quantity -= quantity;
    saveInventory();
    saveEntries();
    render();
    showToast("Entry successfully added");
    showDashboardHome();
  }

  function loadEntries() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read saved register, starting fresh.", err);
    }
    return seedData.slice();
  }

  function saveEntries() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      console.warn("Could not save register locally.", err);
    }
  }

  function loadInventory() {
    try {
      var raw = window.localStorage.getItem(INVENTORY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn("Could not read saved inventory, starting fresh.", err);
    }
    var items = [];
    seedData.forEach(function (entry) {
      if (!items.some(function (item) { return item.name.toLowerCase() === entry.item.toLowerCase(); })) {
        items.push({ name: entry.item, quantity: 10 });
      }
    });
    return items;
  }

  function saveInventory() {
    try {
      window.localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    } catch (err) {
      console.warn("Could not save inventory locally.", err);
    }
  }

  function getInventoryItem(name) {
    return inventory.find(function (item) { return item.name === name; });
  }

  function populateItemSelects() {
    [pageFItem, fItem].forEach(function (select) {
      var selected = select.value;
      select.innerHTML = '<option value="">Select an item</option>';
      inventory.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name + " (available: " + item.quantity + ")";
        select.appendChild(option);
      });
      if (getInventoryItem(selected)) select.value = selected;
    });
    updateQuantityLimit.call(pageFItem);
  }

  function updateQuantityLimit() {
    var select = this.id === "fItem" ? fItem : pageFItem;
    var quantityInput = select === fItem ? fQuantity : pageFQuantity;
    var item = getInventoryItem(select.value);
    quantityInput.max = item ? item.quantity : "";
    if (item && parseInt(quantityInput.value || "0", 10) > item.quantity) quantityInput.value = item.quantity;
  }

  function handleInventorySave(e) {
    e.preventDefault();
    var name = inventoryItemName.value.trim();
    var quantity = parseInt(inventoryItemQuantity.value, 10);
    var existing = inventory.find(function (item) { return item.name.toLowerCase() === name.toLowerCase(); });
    if (existing) existing.quantity = quantity;
    else inventory.push({ name: name, quantity: quantity });
    saveInventory();
    renderInventory();
    populateItemSelects();
    inventoryForm.reset();
    showToast("Inventory updated");
  }

  function renderInventory() {
    inventoryList.innerHTML = "";
    inventory.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "inventory-row";
      row.innerHTML = '<span>' + escapeHtml(item.name) + '</span><strong>' + item.quantity + ' available</strong>' +
        '<button type="button" class="icon-btn danger remove-item-btn" title="Remove item">✕</button>';
      row.querySelector(".remove-item-btn").addEventListener("click", function () {
        inventory = inventory.filter(function (candidate) { return candidate.name !== item.name; });
        saveInventory();
        renderInventory();
        populateItemSelects();
      });
      inventoryList.appendChild(row);
    });
  }

  function exportCsv() {
    var headers = ["Sr No.", "Date", "Name", "Student / Employee ID", "Mobile No.", "Email ID", "Item Name", "Quantity", "Issued By", "Issued To", "Purpose", "Due Date", "Return Date", "Received By", "Status"];
    var rows = entries.map(function (entry) {
      return [entry.id, entry.date, entry.name, entry.studentId, entry.mobile, entry.email, entry.item, entry.quantity, entry.issuedBy, entry.issuedTo, entry.purpose, entry.dueDate, entry.returnDate, entry.receivedBy, effectiveStatus(entry)];
    });
    var csv = [headers].concat(rows).map(function (row) {
      return row.map(function (value) { return '"' + String(value || "").replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
    downloadFile("item-issue-register.csv", "text/csv;charset=utf-8", csv);
    showToast("CSV downloaded");
  }

  function downloadFile(filename, type, content) {
    var blob = new Blob([content], { type: type });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  function todayISO() {
    var d = new Date();
    var offset = d.getTimezoneOffset();
    var local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }

  function todayDateISO() {
    return todayISO().slice(0, 10);
  }

  function setDueDateMinimums() {
    var minimum = todayDateISO();
    pageFDueDate.min = minimum;
    fDueDate.min = minimum;
  }

  function validateEntryFields(mobileInput, dueDateInput) {
    var mobile = mobileInput.value.trim();
    var minimum = todayDateISO();
    mobileInput.setCustomValidity(/^[0-9]{10}$/.test(mobile) ? "" : "Enter exactly 10 digits.");
    dueDateInput.setCustomValidity(dueDateInput.value && dueDateInput.value >= minimum ? "" : "Select today or a future date.");
    if (!mobileInput.checkValidity() || !dueDateInput.checkValidity()) {
      (mobileInput.checkValidity() ? dueDateInput : mobileInput).reportValidity();
      return false;
    }
    return true;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    if (iso.includes("T")) {
      var dt = new Date(iso);
      if (!isNaN(dt.getTime())) {
        return dt.toLocaleString([], { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
      }
      return iso;
    }
    var parts = iso.split("-");
    if (parts.length !== 3) return iso;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var y = parts[0], m = parseInt(parts[1], 10) - 1, d = parts[2];
    return d + " " + months[m] + " " + y;
  }

  function nextSrNo() {
    var max = 0;
    entries.forEach(function (e) {
      var n = parseInt(e.id, 10);
      if (!isNaN(n) && n > max) max = n;
    });
    var next = max + 1;
    return String(next).padStart(4, "0");
  }

  function effectiveStatus(entry) {
    // Manual "Returned" always wins. Otherwise derive Overdue vs Issued from due date.
    if (entry.status === "Returned") return "Returned";
    if (entry.dueDate && entry.dueDate < todayISO()) return "Overdue";
    return "Issued";
  }

  function computeStats(list) {
    var stats = { total: list.length, issued: 0, returned: 0, overdue: 0 };
    list.forEach(function (e) {
      var s = effectiveStatus(e);
      if (s === "Issued") stats.issued++;
      else if (s === "Returned") stats.returned++;
      else if (s === "Overdue") stats.overdue++;
    });
    return stats;
  }

  function matchesSearch(entry, query) {
    if (!query) return true;
    var haystack = [
      entry.item, entry.quantity, entry.name, entry.issuedTo, entry.issuedBy, entry.purpose, entry.studentId
    ].join(" ").toLowerCase();
    return haystack.indexOf(query.toLowerCase()) !== -1;
  }

  function render() {
    var query = searchInput.value.trim();
    var allStats = computeStats(entries);
    document.getElementById("statTotal").textContent = allStats.total;
    document.getElementById("statIssued").textContent = allStats.issued;
    document.getElementById("statReturned").textContent = allStats.returned;
    document.getElementById("statOverdue").textContent = allStats.overdue;

    var visible = entries.filter(function (e) { return matchesSearch(e, query); });

    tableBody.innerHTML = "";

    if (visible.length === 0) {
      var emptyRow = document.createElement("tr");
      emptyRow.className = "empty-row";
      emptyRow.innerHTML = '<td colspan="16">No entries match your search.</td>';
      tableBody.appendChild(emptyRow);
    } else {
      visible.forEach(function (entry) {
        tableBody.appendChild(buildRow(entry));
      });
    }

    showingCount.textContent = "Showing " + visible.length + " of " + entries.length + " entries";
  }

  function buildRow(entry) {
    var status = effectiveStatus(entry);
    var tr = document.createElement("tr");
    tr.dataset.id = entry.id;

    tr.innerHTML =
      '<td class="col-sr">' + escapeHtml(entry.id) + '</td>' +
      '<td class="col-date">' + escapeHtml(fmtDate(entry.date)) + '</td>' +
      '<td>' + escapeHtml(entry.name) + '</td>' +
      '<td class="cell-muted">' + (escapeHtml(entry.studentId) || "—") + '</td>' +
      '<td class="cell-muted">' + (escapeHtml(entry.mobile) || "—") + '</td>' +
      '<td class="cell-muted">' + (escapeHtml(entry.email) || "—") + '</td>' +
      '<td class="cell-item">' + escapeHtml(entry.item) + '</td>' +
      '<td class="cell-muted">' + (escapeHtml(entry.quantity) || "1") + '</td>' +
      '<td>' + escapeHtml(entry.issuedBy) + '</td>' +
      '<td>' + escapeHtml(entry.issuedTo) + '</td>' +
      '<td>' + escapeHtml(entry.purpose) + '</td>' +
      '<td class="col-date">' + escapeHtml(fmtDate(entry.dueDate)) + '</td>' +
      '<td class="col-date"></td>' +
      '<td class="received-cell"></td>' +
      '<td class="status-cell"></td>' +
      '<td class="col-actions"><div class="row-actions">' +
        '<button class="icon-btn email-btn" type="button" title="Send email"' + (entry.email ? "" : " disabled") + '>✉</button>' +
        '<button class="icon-btn edit-btn" type="button" title="Edit entry">✎</button>' +
        '<button class="icon-btn danger delete-btn" type="button" title="Delete entry">🗑</button>' +
      '</div></td>';

    // Return date input
    var returnCell = tr.children[12];
    var returnInput = document.createElement("input");
    returnInput.type = "date";
    returnInput.className = "date-input";
    returnInput.value = entry.returnDate || "";
    returnInput.addEventListener("change", function () {
      entry.returnDate = returnInput.value;
      if (returnInput.value) {
        entry.status = "Returned";
      } else if (entry.status === "Returned") {
        entry.status = "Issued";
      }
      persistAndRender();
    });
    returnCell.appendChild(returnInput);

    // Received by input
    var receivedCell = tr.children[13];
    var receivedInput = document.createElement("input");
    receivedInput.type = "text";
    receivedInput.className = "received-input";
    receivedInput.placeholder = "Received by";
    receivedInput.value = entry.receivedBy || "";
    receivedInput.disabled = status !== "Returned";
    receivedInput.addEventListener("change", function () {
      entry.receivedBy = receivedInput.value;
      persistAndRender();
    });
    receivedCell.appendChild(receivedInput);

    // Status select
    var statusCell = tr.children[14];
    var statusSelect = document.createElement("select");
    statusSelect.className = "status-select status-" + status;
    ["Issued", "Returned", "Overdue"].forEach(function (opt) {
      var o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      if (opt === status) o.selected = true;
      statusSelect.appendChild(o);
    });
    statusSelect.addEventListener("change", function () {
      entry.status = statusSelect.value;
      if (entry.status === "Returned" && !entry.returnDate) {
        entry.returnDate = todayISO();
      }
      if (entry.status !== "Returned") {
        entry.returnDate = "";
      }
      persistAndRender();
    });
    statusCell.appendChild(statusSelect);

    tr.querySelector(".edit-btn").addEventListener("click", function () {
      openEditEntryModal(entry);
    });
    if (entry.email) {
      tr.querySelector(".email-btn").addEventListener("click", function () {
        var subject = "Item issue register: " + entry.item;
        var body = "Hello " + entry.name + ",\r\n\r\nThis is a message about your issued item: " + entry.item + ".\r\nQuantity: " + entry.quantity + "\r\nDue date: " + entry.dueDate + "\r\n\r\nRegards";
        window.location.href = "mailto:" + encodeURIComponent(entry.email) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      });
    }
    tr.querySelector(".delete-btn").addEventListener("click", function () {
      if (window.confirm('Delete the entry for "' + entry.item + '"? This cannot be undone.')) {
        entries = entries.filter(function (e) { return e.id !== entry.id; });
        persistAndRender();
        showToast("Entry deleted");
      }
    });

    return tr;
  }

  function persistAndRender() {
    saveEntries();
    render();
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Modal ---------- */

  function openNewEntryModal() {
    modalTitle.textContent = "New Issue Entry";
    entryForm.reset();
    fEntryId.value = "";
    fMobile.setCustomValidity("");
    fDueDate.setCustomValidity("");
    setDueDateMinimums();
    fDate.value = todayISO();
    fQuantity.value = "1";
    modalOverlay.classList.add("open");
    fName.focus();
  }

  function openEditEntryModal(entry) {
    modalTitle.textContent = "Edit Issue Entry";
    fEntryId.value = entry.id;
    fMobile.setCustomValidity("");
    fDueDate.setCustomValidity("");
    fDate.value = entry.date;
    fName.value = entry.name;
    fStudentId.value = entry.studentId;
    fMobile.value = entry.mobile;
    fEmail.value = entry.email;
    fItem.value = entry.item;
    fQuantity.value = entry.quantity || "1";
    fIssuedBy.value = entry.issuedBy;
    fIssuedTo.value = entry.issuedTo;
    fPurpose.value = entry.purpose;
    setDueDateMinimums();
    fDueDate.value = entry.dueDate;
    modalOverlay.classList.add("open");
    fName.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
  }

  function handleSaveEntry(e) {
    e.preventDefault();
    if (!validateEntryFields(fMobile, fDueDate)) return;

    var id = fEntryId.value;
    var isEdit = !!id;
    var selectedItem = getInventoryItem(fItem.value);
    var requestedQuantity = parseInt(fQuantity.value, 10);
    if (!isEdit && (!selectedItem || requestedQuantity > selectedItem.quantity)) {
      fQuantity.setCustomValidity("Quantity cannot exceed available stock.");
      fQuantity.reportValidity();
      return;
    }
    fQuantity.setCustomValidity("");

    var record = {
      id: isEdit ? id : nextSrNo(),
      date: fDate.value,
      name: fName.value.trim(),
      studentId: fStudentId.value.trim(),
      mobile: fMobile.value.trim(),
      email: fEmail.value.trim(),
      item: fItem.value.trim(),
      quantity: fQuantity.value || "1",
      issuedBy: fIssuedBy.value.trim(),
      issuedTo: fIssuedTo.value.trim(),
      purpose: fPurpose.value.trim(),
      dueDate: fDueDate.value,
      returnDate: isEdit ? undefined : "",
      receivedBy: isEdit ? undefined : "",
      status: isEdit ? undefined : "Issued"
    };

    if (isEdit) {
      var existing = entries.find(function (en) { return en.id === id; });
      if (existing) {
        Object.assign(existing, record);
      }
      showToast("Entry updated");
    } else {
      entries.unshift(record);
      selectedItem.quantity -= requestedQuantity;
      saveInventory();
      renderInventory();
      populateItemSelects();
      showToast("New issue entry added");
    }

    saveEntries();
    render();
    closeModal();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2400);
  }

})();
