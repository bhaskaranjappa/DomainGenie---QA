// LLM Fine-Tuning Platform - Dashboard JavaScript (Fixed)

// Application data
const appData = {
  "projects": [
    {
      "id": "proj-001",
      "name": "Healthcare Q&A System",
      "domain": "Healthcare",
      "status": "training",
      "progress": 78,
      "model": "LLaMA-2-7B",
      "technique": "QLoRA",
      "accuracy": 94.2,
      "cost": "$1,247.50",
      "startDate": "2025-01-15",
      "estimatedCompletion": "2025-01-29"
    },
    {
      "id": "proj-002", 
      "name": "Legal Document Analysis",
      "domain": "Legal",
      "status": "evaluation",
      "progress": 100,
      "model": "Mistral-7B",
      "technique": "LoRA",
      "accuracy": 91.8,
      "cost": "$2,156.75",
      "startDate": "2025-01-10",
      "estimatedCompletion": "2025-01-25"
    },
    {
      "id": "proj-003",
      "name": "Financial Advisory Bot",
      "domain": "Finance",
      "status": "deployed",
      "progress": 100,
      "model": "Falcon-7B",
      "technique": "AdaLoRA", 
      "accuracy": 89.5,
      "cost": "$3,421.20",
      "startDate": "2024-12-20",
      "estimatedCompletion": "2025-01-08"
    }
  ],
  "systemMetrics": {
    "totalProjects": 15,
    "activeTraining": 3,
    "modelsDeployed": 8,
    "totalCostSavings": "68%",
    "averageAccuracyImprovement": "16.3%",
    "gpuUtilization": 87,
    "memoryUsage": 72,
    "storageUsage": 45
  },
  "models": [
    {
      "name": "LLaMA-2-7B",
      "parameters": "7B",
      "memoryRequirement": "14GB",
      "supportedTechniques": ["LoRA", "QLoRA", "AdaLoRA"]
    },
    {
      "name": "Mistral-7B",
      "parameters": "7B", 
      "memoryRequirement": "14GB",
      "supportedTechniques": ["LoRA", "QLoRA"]
    },
    {
      "name": "Falcon-7B",
      "parameters": "7B",
      "memoryRequirement": "14GB", 
      "supportedTechniques": ["LoRA", "AdaLoRA"]
    }
  ],
  "recentExperiments": [
    {
      "id": "exp-001",
      "name": "Healthcare-LoRA-r16",
      "status": "completed",
      "accuracy": 94.2,
      "f1Score": 0.924,
      "runtime": "4h 23m",
      "cost": "$156.30"
    },
    {
      "id": "exp-002", 
      "name": "Legal-QLoRA-r32",
      "status": "running",
      "accuracy": 89.1,
      "f1Score": 0.887,
      "runtime": "2h 15m",
      "cost": "$89.45"
    }
  ],
  "costAnalysis": {
    "monthlyBudget": "$50,000",
    "currentSpend": "$28,750",
    "projectedSpend": "$42,100",
    "savingsFromPEFT": "$21,900",
    "costPerProject": "$2,875"
  },
  "securityCompliance": {
    "gdprCompliant": true,
    "piiDetectionEnabled": true,
    "dataEncryption": "AES-256",
    "accessControl": "RBAC",
    "auditTrail": "Enabled",
    "lastSecurityScan": "2025-01-27"
  }
};

// Chart instances
let trainingChart, costChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    populateDashboard();
    initializeCharts();
    initializeEventListeners();
    startRealTimeUpdates();
});

// Navigation handling (Fixed)
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.dataset.section;
            console.log('Navigating to:', targetSection);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Populate dashboard with data
function populateDashboard() {
    populateMetrics();
    populateActiveProjects();
    populateProjectsTable();
    populateExperiments();
}

// Populate key metrics
function populateMetrics() {
    const metrics = appData.systemMetrics;
    
    const totalProjectsEl = document.getElementById('totalProjects');
    const activeTrainingEl = document.getElementById('activeTraining');
    const modelsDeployedEl = document.getElementById('modelsDeployed');
    const costSavingsEl = document.getElementById('costSavings');
    
    if (totalProjectsEl) totalProjectsEl.textContent = metrics.totalProjects;
    if (activeTrainingEl) activeTrainingEl.textContent = metrics.activeTraining;
    if (modelsDeployedEl) modelsDeployedEl.textContent = metrics.modelsDeployed;
    if (costSavingsEl) costSavingsEl.textContent = metrics.totalCostSavings;
}

// Populate active projects list
function populateActiveProjects() {
    const container = document.getElementById('activeProjectsList');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    appData.projects.forEach(project => {
        const projectElement = createProjectItem(project);
        container.appendChild(projectElement);
    });
}

// Create project item element
function createProjectItem(project) {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.onclick = () => showProjectDetails(project);
    
    div.innerHTML = `
        <div class="project-info">
            <h4>${project.name}</h4>
            <div class="project-meta">${project.domain} • ${project.model} • ${project.technique}</div>
        </div>
        <div class="project-status">
            <div class="status status-${project.status}">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</div>
            <div class="progress-bar" style="width: 100px;">
                <div class="progress-fill" style="width: ${project.progress}%"></div>
            </div>
        </div>
    `;
    
    return div;
}

// Populate projects table
function populateProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = ''; // Clear existing content
    
    appData.projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.domain}</td>
            <td>${project.model}</td>
            <td>${project.technique}</td>
            <td><div class="status status-${project.status}">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</div></td>
            <td>
                <div class="progress-bar" style="width: 80px;">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <small>${project.progress}%</small>
            </td>
            <td>${project.accuracy}%</td>
            <td>${project.cost}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn--xs btn--primary" onclick="showProjectDetails('${project.id}')">View</button>
                    <button class="btn btn--xs btn--outline" onclick="editProject('${project.id}')">Edit</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate experiments list
function populateExperiments() {
    const container = document.getElementById('experimentsList');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    
    appData.recentExperiments.forEach(experiment => {
        const div = document.createElement('div');
        div.className = 'experiment-item';
        
        div.innerHTML = `
            <div class="experiment-info">
                <h4>${experiment.name}</h4>
                <div class="experiment-meta">Accuracy: ${experiment.accuracy}% • F1: ${experiment.f1Score} • ${experiment.runtime}</div>
            </div>
            <div class="experiment-status">
                <div class="status status-${experiment.status}">${experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 4px;">${experiment.cost}</div>
            </div>
        `;
        
        container.appendChild(div);
    });
}

// Initialize charts
function initializeCharts() {
    setTimeout(() => {
        initializeTrainingChart();
        initializeCostChart();
    }, 100); // Small delay to ensure DOM is ready
}

// Training progress chart
function initializeTrainingChart() {
    const canvas = document.getElementById('trainingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    trainingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Accuracy',
                data: [85.2, 87.8, 89.1, 91.3, 92.7, 93.9, 94.2],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Loss',
                data: [0.45, 0.38, 0.32, 0.28, 0.24, 0.21, 0.19],
                borderColor: '#FFC185',
                backgroundColor: 'rgba(255, 193, 133, 0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Loss'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Cost analysis chart
function initializeCostChart() {
    const canvas = document.getElementById('costChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    costChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Current Spend', 'PEFT Savings', 'Remaining Budget'],
            datasets: [{
                data: [28750, 21900, 21250],
                backgroundColor: ['#B4413C', '#1FB8CD', '#ECEBD5'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Event listeners (Fixed)
function initializeEventListeners() {
    // Project creation buttons
    const createProjectBtn = document.getElementById('createProjectBtn');
    const newProjectBtn = document.getElementById('newProjectBtn');
    const cancelProjectBtn = document.getElementById('cancelProjectBtn');
    const createProjectForm = document.getElementById('createProjectForm');
    
    if (createProjectBtn) {
        createProjectBtn.addEventListener('click', showProjectForm);
    }
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', showProjectForm);
    }
    if (cancelProjectBtn) {
        cancelProjectBtn.addEventListener('click', hideProjectForm);
    }
    if (createProjectForm) {
        createProjectForm.addEventListener('submit', handleProjectSubmission);
    }
    
    // Modal handling
    const closeModal = document.getElementById('closeModal');
    const projectModal = document.getElementById('projectModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') closeModalFunc();
        });
    }
    
    // File upload handling
    const datasetFile = document.getElementById('datasetFile');
    if (datasetFile) {
        datasetFile.addEventListener('change', handleFileUpload);
    }
    
    // Export data
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    // Model and PEFT selection
    const modelSelect = document.getElementById('modelSelect');
    if (modelSelect) {
        modelSelect.addEventListener('change', updatePEFTOptions);
    }
}

// Show project creation form
function showProjectForm() {
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.classList.remove('hidden');
        projectForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hide project creation form
function hideProjectForm() {
    const projectForm = document.getElementById('projectForm');
    const createProjectForm = document.getElementById('createProjectForm');
    
    if (projectForm) {
        projectForm.classList.add('hidden');
    }
    if (createProjectForm) {
        createProjectForm.reset();
    }
}

// Handle project form submission
function handleProjectSubmission(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating...';
    submitBtn.disabled = true;
    
    // Simulate project creation
    setTimeout(() => {
        alert('Project created successfully! Training will begin shortly.');
        hideProjectForm();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Add new project to the list (simulation)
        const formData = new FormData(e.target);
        simulateNewProject(formData);
    }, 2000);
}

// Simulate adding a new project
function simulateNewProject(formData) {
    const projectName = formData.get('project-name') || 'New Healthcare Project';
    const domain = formData.get('domain') || 'Healthcare';
    
    const newProject = {
        id: `proj-${Date.now()}`,
        name: projectName,
        domain: domain,
        status: 'training',
        progress: 5,
        model: 'LLaMA-2-7B',
        technique: 'LoRA',
        accuracy: 82.1,
        cost: '$127.50',
        startDate: new Date().toISOString().split('T')[0],
        estimatedCompletion: 'TBD'
    };
    
    // Add to projects array
    appData.projects.unshift(newProject);
    
    // Update displays
    populateActiveProjects();
    populateProjectsTable();
    
    // Update metrics
    appData.systemMetrics.totalProjects++;
    appData.systemMetrics.activeTraining++;
    populateMetrics();
}

// Update PEFT options based on selected model
function updatePEFTOptions() {
    const modelSelect = document.getElementById('modelSelect');
    const peftSelect = document.getElementById('peftSelect');
    
    if (!modelSelect || !peftSelect) return;
    
    const selectedModel = modelSelect.value;
    
    // Clear current options
    peftSelect.innerHTML = '<option value="">Select technique</option>';
    
    // Find model and populate supported techniques
    const model = appData.models.find(m => m.name.toLowerCase().replace('-', '').includes(selectedModel.replace('-', '')));
    
    if (model) {
        model.supportedTechniques.forEach(technique => {
            const option = document.createElement('option');
            option.value = technique.toLowerCase();
            option.textContent = technique;
            peftSelect.appendChild(option);
        });
    }
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const uploadArea = document.querySelector('.file-upload-area');
        if (uploadArea) {
            uploadArea.style.borderColor = 'var(--color-success)';
            uploadArea.style.backgroundColor = 'var(--color-bg-3)';
            
            const textSpan = uploadArea.querySelector('span');
            if (textSpan) {
                textSpan.textContent = `File selected: ${file.name}`;
            }
        }
        
        // Simulate file validation
        setTimeout(() => {
            alert('Dataset uploaded and validated successfully!');
        }, 1000);
    }
}

// Show project details modal
function showProjectDetails(projectId) {
    let project;
    
    if (typeof projectId === 'string') {
        project = appData.projects.find(p => p.id === projectId);
    } else {
        project = projectId; // Already a project object
    }
    
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="project-details">
            <h4>${project.name}</h4>
            <div class="detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
                <div><strong>Domain:</strong> ${project.domain}</div>
                <div><strong>Status:</strong> <span class="status status-${project.status}">${project.status}</span></div>
                <div><strong>Model:</strong> ${project.model}</div>
                <div><strong>Technique:</strong> ${project.technique}</div>
                <div><strong>Progress:</strong> ${project.progress}%</div>
                <div><strong>Accuracy:</strong> ${project.accuracy}%</div>
                <div><strong>Cost:</strong> ${project.cost}</div>
                <div><strong>Start Date:</strong> ${project.startDate}</div>
            </div>
            <div style="margin-top: 20px;">
                <h5>Training Metrics</h5>
                <div class="progress-bar" style="margin: 8px 0;">
                    <div class="progress-fill" style="width: ${project.progress}%"></div>
                </div>
                <small>Training Progress: ${project.progress}%</small>
            </div>
            <div style="margin-top: 20px;">
                <button class="btn btn--primary" onclick="deployModel('${project.id}')">Deploy Model</button>
                <button class="btn btn--outline" onclick="downloadModel('${project.id}')">Download Model</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Close modal
function closeModalFunc() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Edit project
function editProject(projectId) {
    alert(`Edit functionality for project ${projectId} would open a detailed configuration panel.`);
}

// Deploy model
function deployModel(projectId) {
    alert(`Deploying model for project ${projectId} to production environment...`);
    closeModalFunc();
}

// Download model
function downloadModel(projectId) {
    alert(`Preparing model download for project ${projectId}. This would start a file download.`);
}

// Export data
function exportData() {
    try {
        const dataStr = JSON.stringify(appData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `llm-platform-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        alert('Platform data exported successfully!');
    } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
    }
}

// Real-time updates simulation
function startRealTimeUpdates() {
    setInterval(() => {
        updateTrainingProgress();
        updateResourceMetrics();
    }, 5000);
}

// Update training progress
function updateTrainingProgress() {
    appData.projects.forEach(project => {
        if (project.status === 'training' && project.progress < 100) {
            project.progress = Math.min(100, project.progress + Math.random() * 2);
            project.accuracy = Math.min(100, project.accuracy + Math.random() * 0.3);
            
            if (project.progress >= 100) {
                project.status = 'evaluation';
            }
        }
    });
    
    // Update displays
    updateProgressBars();
}

// Update progress bars
function updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        if (index < appData.projects.length) {
            const project = appData.projects[index];
            bar.style.width = `${project.progress}%`;
        }
    });
}

// Update resource metrics
function updateResourceMetrics() {
    const metrics = appData.systemMetrics;
    
    // Simulate realistic fluctuations
    metrics.gpuUtilization = Math.max(70, Math.min(95, metrics.gpuUtilization + (Math.random() - 0.5) * 3));
    metrics.memoryUsage = Math.max(60, Math.min(85, metrics.memoryUsage + (Math.random() - 0.5) * 2));
    metrics.storageUsage = Math.max(40, Math.min(60, metrics.storageUsage + (Math.random() - 0.5) * 1));
    
    // Update resource bars
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach(item => {
        const label = item.querySelector('.resource-label');
        const bar = item.querySelector('.progress-fill');
        const value = item.querySelector('.resource-value');
        
        if (!label || !bar || !value) return;
        
        const labelText = label.textContent;
        
        if (labelText.includes('GPU')) {
            bar.style.width = `${metrics.gpuUtilization}%`;
            value.textContent = `${Math.round(metrics.gpuUtilization)}%`;
        } else if (labelText.includes('Memory')) {
            bar.style.width = `${metrics.memoryUsage}%`;
            value.textContent = `${Math.round(metrics.memoryUsage)}%`;
        } else if (labelText.includes('Storage')) {
            bar.style.width = `${metrics.storageUsage}%`;
            value.textContent = `${Math.round(metrics.storageUsage)}%`;
        }
    });
}

// Global functions for onclick handlers
window.showProjectDetails = showProjectDetails;
window.editProject = editProject;
window.deployModel = deployModel;
window.downloadModel = downloadModel;

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusColor(status) {
    const colors = {
        'training': 'var(--color-warning)',
        'evaluation': 'var(--color-info)',
        'deployed': 'var(--color-success)',
        'completed': 'var(--color-success)',
        'running': 'var(--color-warning)',
        'failed': 'var(--color-error)'
    };
    return colors[status] || 'var(--color-text-secondary)';
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // In production, this would send error reports to monitoring service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('LLM Platform loaded in:', loadTime + 'ms');
    });
}