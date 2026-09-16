(function () {
  "use strict";

  var STORAGE_KEY = "issueRegister.entries";

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

  var appShell = document.getElementById("appShell");
  var dashboardHome = document.getElementById("dashboardHome");
  var registerView = document.getElementById("registerView");
  var entryPage = document.getElementById("entryPage");
  var dashboardNewEntryBtn = document.getElementById("dashboardNewEntryBtn");
  var dashboardViewBtn = document.getElementById("dashboardViewBtn");
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

  init();

  function init() {
    dashboardNewEntryBtn.addEventListener("click", openNewEntryFromDashboard);
    dashboardViewBtn.addEventListener("click", openLogin);
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
    searchInput.addEventListener("input", render);

    render();
    showAppShell();
  }

  function showAppShell() {
    appShell.hidden = false;
    showDashboardHome();
  }

  function showDashboardHome() {
    dashboardHome.hidden = false;
    registerView.hidden = true;
    entryPage.hidden = true;
  }

  function showRegisterView() {
    dashboardHome.hidden = true;
    registerView.hidden = false;
    entryPage.hidden = true;
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
    showRegisterView();
  }

  function openNewEntryFromDashboard() {
    dashboardHome.hidden = true;
    registerView.hidden = true;
    entryPage.hidden = false;
    entryPageForm.reset();
    document.getElementById("pageFDate").value = todayISO();
    document.getElementById("pageFQuantity").value = "1";
    document.getElementById("pageFName").focus();
  }

  function handleEntryPageSave(e) {
    e.preventDefault();
    entries.unshift({
      id: nextSrNo(),
      date: document.getElementById("pageFDate").value,
      name: document.getElementById("pageFName").value.trim(),
      studentId: document.getElementById("pageFStudentId").value.trim(),
      mobile: document.getElementById("pageFMobile").value.trim(),
      email: document.getElementById("pageFEmail").value.trim(),
      item: document.getElementById("pageFItem").value.trim(),
      quantity: document.getElementById("pageFQuantity").value,
      issuedBy: document.getElementById("pageFIssuedBy").value.trim(),
      issuedTo: document.getElementById("pageFIssuedTo").value.trim(),
      purpose: document.getElementById("pageFPurpose").value.trim(),
      dueDate: document.getElementById("pageFDueDate").value,
      returnDate: "",
      receivedBy: "",
      status: "Issued"
    });
    saveEntries();
    render();
    showToast("New issue entry added");
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

  function todayISO() {
    var d = new Date();
    var offset = d.getTimezoneOffset();
    var local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
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
        '<button class="icon-btn edit-btn" type="button" title="Edit entry">✎</button>' +
        '<button class="icon-btn danger delete-btn" type="button" title="Delete entry">🗑</button>' +
      '</div></td>';

    // Return date input
    var returnCell = tr.children[11];
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
    var receivedCell = tr.children[12];
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
    var statusCell = tr.children[13];
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
    fDate.value = todayISO();
    fQuantity.value = "1";
    modalOverlay.classList.add("open");
    fName.focus();
  }

  function openEditEntryModal(entry) {
    modalTitle.textContent = "Edit Issue Entry";
    fEntryId.value = entry.id;
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
    fDueDate.value = entry.dueDate;
    modalOverlay.classList.add("open");
    fName.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
  }

  function handleSaveEntry(e) {
    e.preventDefault();

    var id = fEntryId.value;
    var isEdit = !!id;

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
