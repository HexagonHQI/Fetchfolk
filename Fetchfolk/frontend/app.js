// frontend/app.js
const requestForm = document.getElementById('request-form');
const requestsList = document.getElementById('requests-list');

// Fetch all item requests
async function fetchItemRequests() {
    const response = await fetch('/api/item-requests');
    const requests = await response.json();
    displayRequests(requests);
}

// Display item requests
function displayRequests(requests) {
    requestsList.innerHTML = '';
    requests.forEach(request => {
        const requestDiv = document.createElement('div');
        requestDiv.innerHTML = `
            <h3>${request.itemName}</h3>
            <p>Quantity: ${request.quantity}</p>
            <p>Requested by: ${request.requesterName}</p>
            <p>Status: ${request.status}</p>
        `;
        requestsList.appendChild(requestDiv);
    });
}

// Handle form submission
requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const quantity = document.getElementById('quantity').value;
    const requesterName = document.getElementById('requesterName').value;

    const newRequest = { itemName, quantity, requesterName };

    const response = await fetch('/api/item-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
    });

    if (response.ok) {
        fetchItemRequests(); // Refresh the list
        requestForm.reset(); // Clear the form
    } else {
        console.error('Failed to post request');
    }
});

// Initial fetch of item requests
fetchItemRequests();