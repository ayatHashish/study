////////////////////

let uploadedFilesCount = 0;
let uploadedFileNames = [];
var uploadedFiles = [];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("transfersForm");
  if (!form) return;

  form.addEventListener("reset", () => {
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const fileItems = document.querySelectorAll(".file-item");
    const label = document.getElementById("lable");

    if (fileInput) fileInput.value = "";

    fileItems.forEach((item) => item.remove());

    if (label) label.style.display = "none";

    uploadedFilesCount = 0;
    uploadedFileNames = [];
    uploadedFiles = [];
  });
});

function handleFiles(files) {
  const fileList = document.getElementById("fileList");
  const newFiles = Array.from(files);
  const filteredFiles = newFiles.filter((file) => !uploadedFileNames.includes(file.name));

  if (uploadedFilesCount + newFiles.length > 5) {
    showErrorMessage("لا يمكنك رفع أكثر من 5 ملفات.");
    return;
  }

  filteredFiles.forEach((file) => {
    if (uploadedFileNames.includes(file.name)) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      showErrorMessage(`الملف "${file.name}" يجب أن يكون صورة أو PDF فقط.`);
      return;
    }

    if (file.size >= 5 * 1024 * 1024) {
      showErrorMessage(`الملف "${file.name}"  يجب ان يكون اقل  او يساوى 5 ميجا .`);
      return;
    }

    uploadedFilesCount++;
    uploadedFileNames.push(file.name);
    uploadedFiles.push(file);

    const labalAttachment = document.getElementById("lable");
    labalAttachment.style.display = "block";

    const fileItem = document.createElement("div");
    fileItem.className = "file-item";

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
      // PDF → عرض أيقونة ثابتة
      previewIcon.src = "/images/pdf.png";
    } else if (file.type.startsWith("image/")) {
      // صورة → عرض صورة مصغرة حقيقية من الملف
      previewIcon.src = URL.createObjectURL(file);
    }

    const fileName = document.createElement("div");
    fileName.innerText = file.name;
    fileName.style.marginInlineStart = "10px";

    fileNameSection.appendChild(previewIcon);
    fileNameSection.appendChild(fileName);

    const actions = document.createElement("div");
    actions.className = "file-actions";

    // زر المعاينة
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

    // زر الحذف
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

    deleteBtn.onclick = () => {
      fileItem.remove();
      uploadedFilesCount--;
      uploadedFileNames = uploadedFileNames.filter((f) => f !== file.name);
      uploadedFiles = uploadedFiles.filter((f) => f.name !== file.name);

      if (uploadedFilesCount === 0) {
        document.getElementById("lable").style.display = "none";
      }
    };

    // زر الإلغاء (مؤقت)
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

    cancelBtn.onclick = () => {
      fileItem.remove();
      uploadedFilesCount--;
      uploadedFileNames = uploadedFileNames.filter((f) => f !== file.name);
      uploadedFiles = uploadedFiles.filter((f) => f.name !== file.name);
    };

    actions.appendChild(cancelBtn);

    header.appendChild(fileNameSection);
    header.appendChild(actions);

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
    fileList.appendChild(fileItem);

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

        viewBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, "_blank");
        });
      } else {
        progress += 10;
        progressInner.style.width = progress + "%";
        progressText.innerText = progress + "%";
      }
    }, 200);
  });
}

// التعامل مع السحب والإفلات
const dropArea = document.getElementById("dropArea");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  dropArea.classList.remove("dragover");
  if (e.dataTransfer.files.length) {
    handleFiles(e.dataTransfer.files);
  }
});

// عند اختيار ملفات من input
document.getElementById("fileInput").addEventListener("change", (e) => {
  handleFiles(e.target.files);
});
