let jsonData = [];
const availableFieldsElement = document.getElementById('available-fields');
const displayedFieldsElement = document.getElementById('displayed-fields');
const productTable = document.getElementById('product-table');

// Function to load JSON from the input file
function loadJson() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            jsonData = JSON.parse(e.target.result).products;
            displayData();
        };
        reader.readAsText(file);
    } else {
        alert('Please select a JSON file first.');
    }
}

// Function to add fields to be displayed
function addToDisplayed() {
    Array.from(availableFieldsElement.selectedOptions).forEach(option => {
        displayedFieldsElement.add(option.cloneNode(true));
        availableFieldsElement.remove(option.index);
    });
    displayData();
}

// Function to remove fields from being displayed
function removeFromDisplayed() {
    Array.from(displayedFieldsElement.selectedOptions).forEach(option => {
        availableFieldsElement.add(option.cloneNode(true));
        displayedFieldsElement.remove(option.index);
    });
    displayData();
}

// Function to display data in table format
function displayData() {
    if (jsonData.length === 0) return;

    const fields = Array.from(displayedFieldsElement.options).map(option => option.value);
    const tbody = productTable.querySelector('tbody');
    const thead = productTable.querySelector('thead tr');
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Create headers
    fields.forEach(field => {
        const headerCell = document.createElement('th');
        headerCell.textContent = field.charAt(0).toUpperCase() + field.slice(1);
        thead.appendChild(headerCell);
    });

    // Sort data by popularity
    const sortedData = Object.values(jsonData)
        .sort((a, b) => b.popularity - a.popularity);

    // Create table rows
    sortedData.forEach(product => {
        const row = document.createElement('tr');
        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = product[field];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Pre-select some fields to display
    ['title', 'price'].forEach(field => {
        const option = availableFieldsElement.querySelector(option[value="${field}"]);
        if (option) {
            displayedFieldsElement.add(option.cloneNode(true));
            availableFieldsElement.remove(option.index);
        }
    });
    // Initially display data with pre-selected fields
    displayData();
});
