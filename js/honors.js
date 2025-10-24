// Honors Program Lookup Tool
// This file handles the college honors program search functionality

// Placeholder data structure for honors programs
// This will be replaced with actual data from honors.json or API call
const honorsData = {
    'sample1': {
        name: 'Sample College 1',
        requirements: [
            'Minimum 3.25 GPA',
            'Complete Honors application form',
            'Submit personal statement (500-750 words)',
            'Two letters of recommendation from instructors'
        ],
        completion: [
            'Complete at least 15 units of Honors coursework',
            'Maintain minimum 3.25 GPA in Honors courses',
            'Complete Honors capstone project or thesis',
            'Attend minimum of 4 Honors seminars per semester'
        ],
        contact: 'Honors Program Office: (555) 123-4567 | honors@sample1.edu',
        website: 'https://www.sample1.edu/honors'
    },
    'sample2': {
        name: 'Sample College 2',
        requirements: [
            'Minimum 3.0 GPA',
            'Complete online Honors application',
            'Personal statement required',
            'Faculty recommendation preferred'
        ],
        completion: [
            'Complete 18 units of Honors coursework',
            'Maintain 3.0 GPA overall',
            'Participate in Honors Transfer Alliance Program (TAP)',
            'Complete service learning requirement (20 hours)'
        ],
        contact: 'Honors Coordinator: (555) 987-6543 | honorsinfo@sample2.edu',
        website: 'https://www.sample2.edu/academics/honors'
    },
    'sample3': {
        name: 'Sample College 3',
        requirements: [
            'Minimum 3.5 GPA for new students',
            'Complete Honors orientation',
            'Submit application by priority deadline',
            'Interview with Honors committee'
        ],
        completion: [
            'Complete 12 units of Honors courses',
            'Maintain cumulative 3.25 GPA',
            'Present at Honors Symposium',
            'Complete Honors contract for each course'
        ],
        contact: 'Honors Department: (555) 555-1234 | honors.program@sample3.edu',
        website: 'https://www.sample3.edu/honors-program'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const collegeSelect = document.getElementById('college-select');
    const lookupBtn = document.getElementById('lookup-btn');
    const resultsContainer = document.getElementById('results-container');
    const placeholderMessage = document.getElementById('placeholder-message');

    // Populate dropdown with colleges (placeholder - will be loaded from JSON later)
    // populateCollegeDropdown();

    // Add event listener to lookup button
    lookupBtn.addEventListener('click', function() {
        const selectedCollege = collegeSelect.value;
        
        if (!selectedCollege) {
            alert('Please select a community college from the dropdown.');
            return;
        }

        displayHonorsInfo(selectedCollege);
    });

    // Also trigger lookup when Enter is pressed in dropdown
    collegeSelect.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            lookupBtn.click();
        }
    });
});

// Function to display honors program information
function displayHonorsInfo(collegeId) {
    const resultsContainer = document.getElementById('results-container');
    const placeholderMessage = document.getElementById('placeholder-message');
    const data = honorsData[collegeId];

    if (!data) {
        alert('No data available for this college yet. Please check back later or contact us to contribute information.');
        return;
    }

    // Populate college name
    document.getElementById('college-name').textContent = data.name + ' Honors Program';

    // Populate requirements list
    const requirementsList = document.getElementById('requirements-list');
    requirementsList.innerHTML = '';
    data.requirements.forEach(req => {
        const li = document.createElement('li');
        li.style.cssText = 'padding-left:1.5rem; position:relative; margin-bottom:0.75rem; color:var(--muted)';
        li.innerHTML = `<span style="color:var(--brand); position:absolute; left:0">•</span> ${req}`;
        requirementsList.appendChild(li);
    });

    // Populate completion requirements
    const completionList = document.getElementById('completion-list');
    completionList.innerHTML = '';
    data.completion.forEach(req => {
        const li = document.createElement('li');
        li.style.cssText = 'padding-left:1.5rem; position:relative; margin-bottom:0.75rem; color:var(--muted)';
        li.innerHTML = `<span style="color:var(--brand); position:absolute; left:0">•</span> ${req}`;
        completionList.appendChild(li);
    });

    // Populate contact information
    document.getElementById('contact-details').textContent = data.contact;
    document.getElementById('website-link').innerHTML = 
        `<strong>Website:</strong> <a href="${data.website}" target="_blank" rel="noopener noreferrer">${data.website}</a>`;

    // Show results and hide placeholder
    resultsContainer.style.display = 'block';
    placeholderMessage.style.display = 'none';

    // Smooth scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Function to populate dropdown from JSON data (for future implementation)
function populateCollegeDropdown() {
    // This will load from honors.json in the future
    // fetch('data/honors.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         const select = document.getElementById('college-select');
    //         // Clear existing options except the first one
    //         while (select.options.length > 1) {
    //             select.remove(1);
    //         }
    //         // Add colleges alphabetically
    //         Object.keys(data).sort().forEach(collegeId => {
    //             const option = document.createElement('option');
    //             option.value = collegeId;
    //             option.textContent = data[collegeId].name;
    //             select.appendChild(option);
    //         });
    //     })
    //     .catch(error => console.error('Error loading honors data:', error));
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        displayHonorsInfo,
        populateCollegeDropdown
    };
}
