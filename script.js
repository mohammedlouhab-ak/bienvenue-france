const boxes = [...document.querySelectorAll('[data-task]')];
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const storageKey = 'bienvenue-france-checklist-v1';
function readSaved() {
  try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); }
  catch { return []; }
}
function updateProgress() {
  const done = boxes.filter(box => box.checked).length;
  progressFill.style.width = `${(done / boxes.length) * 100}%`;
  progressLabel.textContent = `${done} sur ${boxes.length} terminées`;
  try { localStorage.setItem(storageKey, JSON.stringify(boxes.filter(box => box.checked).map(box => box.dataset.task))); }
  catch { /* La checklist reste utilisable si le stockage du navigateur est indisponible. */ }
}
const saved = new Set(readSaved());
boxes.forEach(box => {
  box.checked = saved.has(box.dataset.task);
  box.addEventListener('change', updateProgress);
});
document.getElementById('reset-checklist').addEventListener('click', () => {
  boxes.forEach(box => { box.checked = false; });
  updateProgress();
});
document.getElementById('year').textContent = new Date().getFullYear();
updateProgress();
