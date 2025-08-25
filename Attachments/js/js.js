// ====== الإعدادات العامة ======
const MAX_OTHERS = 20; // الحد الأقصى لباقي الملفات

let mainContractFile = null; // ملف التعاقد (واحد فقط)
let otherFiles = []; // باقي الملفات
let otherFileNames = []; // أسماء باقي الملفات (لمنع التكرار)

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("transfersForm");
  if (!form) return;

  form.addEventListener("reset", () => resetAll());
});

// ====== أدوات مساعدة ======
function showErrorMessage(msg) {
  // استخدم Alert البسيط؛ بدّليها بتوست لو عندك
  alert(msg);
}

function resetAll() {
  const fileInput = document.getElementById("fileInput");
  const contractFile = document.getElementById("contractFile");
  const othersList = document.getElementById("fileList");
  const contractLabel = document.getElementById("contractLabel");
  const othersLabel = document.getElementById("othersLabel");

  if (fileInput) fileInput.value = "";
  if (contractFile) contractFile.innerHTML = "";
  if (othersList) othersList.innerHTML = "";
  if (contractLabel) contractLabel.style.display = "none";
  if (othersLabel) othersLabel.style.display = "none";

  mainContractFile = null;
  otherFiles = [];
  otherFileNames = [];
}

function validateFile(file) {
  if (!file) return false;
  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    // showErrorMessage(`الملف "${file.name}" يجب أن يكون صورة أو PDF فقط.`);
    return false;
  }
  if (file.size >= 5 * 1024 * 1024) {
    showErrorMessage(`الملف "${file.name}" يجب أن يكون أقل أو يساوي 5 ميجا.`);
    return false;
  }
  return true;
}

function updateSectionLabels() {
  const contractLabel = document.getElementById("contractLabel");
  const othersLabel = document.getElementById("othersLabel");
  const contractFile = document.getElementById("contractFile");
  const othersList = document.getElementById("fileList");

  contractLabel.style.display = contractFile.children.length ? "block" : "none";
  othersLabel.style.display = othersList.children.length ? "block" : "none";
}

// ====== عرض العناصر (مشترك مع اختلافات بسيطة) ======
function createFileItemDOM(file, { isMain }) {
  const fileItem = document.createElement("div");
  fileItem.className = "file-item";

  // Header
  const header = document.createElement("div");
  header.className = "file-header";

  const fileNameSection = document.createElement("div");
  fileNameSection.className = "file-name-section";

  const previewIcon = document.createElement("img");
  previewIcon.style.width = "2rem";
  previewIcon.style.height = "2rem";
  previewIcon.style.objectFit = "cover";
  previewIcon.style.borderRadius = "4px";

  if (file.type === "application/pdf") {
    previewIcon.src = "/images/pdf.png";
  } else {
    previewIcon.src = URL.createObjectURL(file);
  }

  const fileName = document.createElement("div");
  fileName.style.marginInlineStart = "10px";
  fileName.innerText = isMain ? `📌 المستند الرئيسي: ${file.name}` : file.name;

  fileNameSection.appendChild(previewIcon);
  fileNameSection.appendChild(fileName);

  const actions = document.createElement("div");
  actions.className = "file-actions";

  // أزرار (تظهر بعد اكتمال التحميل)
  const viewBtn = document.createElement("button");
  viewBtn.title = "معاينة";
  viewBtn.style.display = "none";
  viewBtn.style.border = "none";
  viewBtn.style.background = "none";
  viewBtn.style.cursor = "pointer";
  const viewIcon = document.createElement("img");
  viewIcon.src = "/images/eye.svg";
  viewIcon.alt = "معاينة";
  viewIcon.style.width = "2rem";
  viewIcon.style.height = "2rem";
  viewBtn.appendChild(viewIcon);

  const deleteBtn = document.createElement("button");
  deleteBtn.title = "حذف";
  deleteBtn.style.display = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "none";
  deleteBtn.style.cursor = "pointer";
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "/images/trash.svg";
  deleteIcon.alt = "حذف";
  deleteIcon.style.width = "2rem";
  deleteIcon.style.height = "2rem";
  deleteBtn.appendChild(deleteIcon);

  // زر إلغاء مؤقت أثناء التحميل
  const cancelBtn = document.createElement("button");
  cancelBtn.title = "جارٍ التحميل...";
  cancelBtn.style.border = "none";
  cancelBtn.style.background = "none";
  cancelBtn.style.cursor = "wait";
  const cancelIcon = document.createElement("img");
  cancelIcon.src = "/images/Vector.png";
  cancelIcon.alt = "إلغاء";
  cancelIcon.style.width = "2rem";
  cancelIcon.style.height = "2rem";
  cancelBtn.appendChild(cancelIcon);

  actions.appendChild(cancelBtn);

  header.appendChild(fileNameSection);
  header.appendChild(actions);

  // Progress
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  const progressInner = document.createElement("div");
  progressInner.className = "progress-bar-inner";
  progressBar.appendChild(progressInner);

  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.innerText = "0%";

  const checkIcon = document.createElement("img");
  checkIcon.src = "/images/Check.svg";
  checkIcon.alt = "تم";
  checkIcon.style.width = "1.375rem";
  checkIcon.style.height = "1.375rem";
  checkIcon.style.marginRight = "5px";

  fileItem.appendChild(header);
  fileItem.appendChild(progressBar);
  fileItem.appendChild(progressText);

  // منطق الحذف حسب النوع
  deleteBtn.onclick = () => {
    fileItem.remove();
    if (isMain) {
      mainContractFile = null;
    } else {
      otherFiles = otherFiles.filter((f) => f.name !== file.name);
      otherFileNames = otherFileNames.filter((n) => n !== file.name);
    }
    updateSectionLabels();
  };

  // إلغاء أثناء التحميل
  cancelBtn.onclick = () => {
    fileItem.remove();
    if (isMain) {
      mainContractFile = null;
    } else {
      otherFiles = otherFiles.filter((f) => f.name !== file.name);
      otherFileNames = otherFileNames.filter((n) => n !== file.name);
    }
    updateSectionLabels();
  };

  // محاكاة التحميل
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);

      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      progressText.innerText = `${sizeInMB} MB`;
      progressText.appendChild(checkIcon);
      progressBar.style.display = "none";

      actions.innerHTML = "";
      viewBtn.style.display = "inline";
      deleteBtn.style.display = "inline";
      actions.appendChild(viewBtn);
      actions.appendChild(deleteBtn);

      // viewBtn.addEventListener("click", (e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   const fileURL = URL.createObjectURL(file);
      //   window.open(fileURL, "_blank");
      // });
      viewBtn.addEventListener("click", () => {
        if (isMain) {
          openModal(file, -1, true); // ملف رئيسي → بدون تنقل
        } else {
          const index = otherFiles.findIndex((f) => f.name === file.name);
          openModal(file, index, false); // ملف من باقي الملفات → مع تنقل
        }
      });
    } else {
      progress += 10;
      progressInner.style.width = progress + "%";
      progressText.innerText = progress + "%";
    }
  }, 200);

  return fileItem;
}

// ====== رندرة العناصر للأقسام ======
function renderMainContract(file) {
  const container = document.getElementById("contractFile");
  const label = document.getElementById("contractLabel");

  container.innerHTML = ""; // دايمًا واحد فقط
  const item = createFileItemDOM(file, { isMain: true });
  container.appendChild(item);

  label.style.display = "block";
  updateSectionLabels();
}

function renderOtherFile(file) {
  const list = document.getElementById("fileList");
  const label = document.getElementById("othersLabel");

  const item = createFileItemDOM(file, { isMain: false });
  list.appendChild(item);

  label.style.display = "block";
  updateSectionLabels();
}

// ====== الاستلام من الدروب أو الـ input ======
function handleFiles(files) {
  const mainContractCheck = document.getElementById("mainContractCheck");
  const newFiles = Array.from(files);

  // لو متعلم → نرفع أول ملف فقط كمستند التعاقد (ونستبدل إن وُجد)
  if (mainContractCheck.checked) {
    const file = newFiles[0];
    if (!file) return;
    if (!validateFile(file)) return;

    mainContractFile = file; // نخزّنه
    renderMainContract(file);
    return;
  }

  // غير متعلم → أضف كـ "باقي الملفات"
  // فلترة التكرار بالاسم داخل باقي الملفات فقط (الأسهل)
  const filtered = newFiles.filter((f) => !otherFileNames.includes(f.name));

  if (otherFiles.length + filtered.length > MAX_OTHERS) {
    showErrorMessage(`لا يمكنك رفع أكثر من ${MAX_OTHERS} ملفات في قسم "باقي الملفات".`);
    return;
  }

  filtered.forEach((file) => {
    if (!validateFile(file)) return;

    otherFiles.push(file);
    otherFileNames.push(file.name);
    renderOtherFile(file);
  });
}

// ====== Drag & Drop ======
const dropArea = document.getElementById("dropArea");
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});
dropArea.addEventListener("dragover", () => dropArea.classList.add("dragover"));
dropArea.addEventListener("dragleave", () => dropArea.classList.remove("dragover"));
dropArea.addEventListener("drop", (e) => {
  dropArea.classList.remove("dragover");
  if (e.dataTransfer.files.length) {
    handleFiles(e.dataTransfer.files);
  }
});

// ====== اختيار من input ======
document.getElementById("fileInput").addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

let pdfDoc = null,
  pageNum = 1,
  scale = 1;
const pdfCanvas = document.getElementById("pdfCanvas");
const imgPreview = document.getElementById("imgPreview");
const ctx = pdfCanvas.getContext("2d");
let currentFileIndex = -1; // -1 يعني مش في قائمة otherFiles

function openModal(file, index = -1, isMain = false) {
  document.getElementById("previewModal").style.display = "flex";
  scale = 1;
  pageNum = 1;
  currentFileIndex = index;

  // إظهار/إخفاء أزرار التنقل
  document.getElementById("prevFileBtn").style.display = isMain ? "none" : "block";
  document.getElementById("nextFileBtn").style.display = isMain ? "none" : "block";

  if (file.type === "application/pdf") {
    imgPreview.style.display = "none";
    pdfCanvas.style.display = "block";
    const fileURL = URL.createObjectURL(file);
    pdfjsLib.getDocument(fileURL).promise.then(function (pdf) {
      pdfDoc = pdf;
      renderPage(pageNum);
    });
  } else if (file.type.startsWith("image/")) {
    pdfCanvas.style.display = "none";
    imgPreview.style.display = "block";
    imgPreview.src = URL.createObjectURL(file);
  }
}

function closeModal() {
  document.getElementById("previewModal").style.display = "none";
}

// ====== PDF تحكم ======
function renderPage(num) {
  pdfDoc.getPage(num).then(function (page) {
    let viewport = page.getViewport({ scale: scale });
    pdfCanvas.height = viewport.height;
    pdfCanvas.width = viewport.width;
    let renderContext = { canvasContext: ctx, viewport: viewport };
    page.render(renderContext);
  });
}

function prevFile() {
  if (currentFileIndex > 0) {
    currentFileIndex--;
    openModal(otherFiles[currentFileIndex], currentFileIndex);
  }
}

function nextFile() {
  if (currentFileIndex < otherFiles.length - 1) {
    currentFileIndex++;
    openModal(otherFiles[currentFileIndex], currentFileIndex);
  }
}

function nextPage() {
  if (pdfDoc && pageNum < pdfDoc.numPages) {
    pageNum++;
    renderPage(pageNum);
  }
}
function prevPage() {
  if (pdfDoc && pageNum > 1) {
    pageNum--;
    renderPage(pageNum);
  }
}
function zoomIn() {
  if (pdfDoc) {
    scale += 0.2;
    renderPage(pageNum);
  }
}
function zoomOut() {
  if (pdfDoc && scale > 0.4) {
    scale -= 0.2;
    renderPage(pageNum);
  }
}
