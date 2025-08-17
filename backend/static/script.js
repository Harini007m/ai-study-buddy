document.addEventListener('DOMContentLoaded', () => {

    // --- Feature 1: File Upload for Study Notes ---
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const summaryResult = document.getElementById('summary-result');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        summaryResult.textContent = 'Generating... Please wait.';

        const response = await fetch('http://127.0.0.1:5000/process-material', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        summaryResult.textContent = data.summary;
    });

    // --- Feature 2: Syllabus Analysis ---
    const analyzeBtn = document.getElementById('analyze-btn');
    const syllabusInput = document.getElementById('syllabus-input');
    const analysisResult = document.getElementById('analysis-result');

    analyzeBtn.addEventListener('click', async () => {
        analysisResult.textContent = 'Analyzing... Please wait.';

        const response = await fetch('http://127.0.0.1:5000/analyze-syllabus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: syllabusInput.value }),
        });
        const data = await response.json();
        analysisResult.textContent = data.analysis;
    });

    // --- Feature 3: Daily Task List ---
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;
            li.addEventListener('click', () => {
                li.style.textDecoration = 'line-through'; // Mark as complete
            });
            taskList.appendChild(li);
            taskInput.value = ''; // Clear input
        }
    });
});