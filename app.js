// ==========================================
// FEATURE 1: SIDEBAR DATE
// ==========================================
const dateEl = document.getElementById('current-date');
if (dateEl) {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateEl.innerText = new Date().toLocaleDateString('en-US', options);
}

// ==========================================
// FEATURE 2: TASK LIST WITH LOCALSTORAGE
// ==========================================
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

let savedTasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = ""; 
    savedTasks.forEach((taskText, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" data-index="${index}"> 
            <span>${taskText}</span>
        `;
        taskList.appendChild(li);
    });
}

if (addTaskBtn && newTaskInput) {
    addTaskBtn.addEventListener('click', () => {
        const text = newTaskInput.value.trim();
        if (text !== "") {
            savedTasks.push(text);
            localStorage.setItem('dashboardTasks', JSON.stringify(savedTasks));
            renderTasks();
            newTaskInput.value = "";
        }
    });
}

if (taskList) {
    taskList.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const indexToRemove = e.target.getAttribute('data-index');
            setTimeout(() => {
                savedTasks.splice(indexToRemove, 1);
                localStorage.setItem('dashboardTasks', JSON.stringify(savedTasks));
                renderTasks();
            }, 300);
        }
    });
}

// Initialize tasks
renderTasks();

// ==========================================
// FEATURE 3: WATER TRACKER WITH LOCALSTORAGE
// ==========================================
const waterCountEl = document.getElementById('water-count');
const drinkBtn = document.getElementById('drink-btn');
const resetWaterBtn = document.getElementById('reset-water-btn');

let waterCount = parseInt(localStorage.getItem('dashboardWater')) || 0;
if (waterCountEl) {
    waterCountEl.innerText = waterCount;
}

if (drinkBtn) {
    drinkBtn.addEventListener('click', () => {
        if (waterCount < 8) {
            waterCount++;
            if (waterCountEl) waterCountEl.innerText = waterCount;
            localStorage.setItem('dashboardWater', waterCount);
        }
    });
}

if (resetWaterBtn) {
    resetWaterBtn.addEventListener('click', () => {
        waterCount = 0;
        if (waterCountEl) waterCountEl.innerText = waterCount;
        localStorage.setItem('dashboardWater', waterCount);
    });
}

// ==========================================
// FEATURE 4: CUTE PHOTO CAROUSEL
// ==========================================
const nextPhotoBtn = document.getElementById('next-photo-btn');
const galleryImg = document.getElementById('gallery-img');

const photoUrls = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVqczB1eW52N2l4ZGlxNHlycjFxdWNkMnRyOXNqYmJwY29zbnpqMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUNd9YbZxUobLqOKhW/giphy.gif", 
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVqczB1eW52N2l4ZGlxNHlycjFxdWNkMnRyOXNqYmJwY29zbnpqMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WnCE8LI1PsOc09M6Sn/giphy.gif", 
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVqczB1eW52N2l4ZGlxNHlycjFxdWNkMnRyOXNqYmJwY29zbnpqMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hpFw3GdaLxi5zwCWpy/giphy.gif" 
];
let currentPhotoIndex = 0;

if (nextPhotoBtn && galleryImg) {
    nextPhotoBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoUrls.length;
        galleryImg.src = photoUrls[currentPhotoIndex];
    });
}

// ==========================================
// FEATURE 5: MOUSE-TRACKING DYNAMIC GRADIENT (OPTION 2)
// ==========================================
window.addEventListener('mousemove', (e) => {
    const x = ((e.clientX / window.innerWidth) * 100).toFixed(2);
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(2);
    
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});