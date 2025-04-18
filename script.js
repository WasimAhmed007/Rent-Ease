// Load users from localStorage or initialize an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Save users to localStorage
function saveUsers() {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Users saved to localStorage:', users);
    } catch (error) {
        console.error('Error saving users to localStorage:', error);
        alert('Error saving user data. Please try again.');
    }
}

// Define categories with explicit values
const categories = [
    { name: "Apartment", value: "apartment", image: "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "House", value: "house", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Flat", value: "flat", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Portion/Floors", value: "portion-floors", image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Commercial", value: "commercial", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Land/Plots", value: "land-plots", image: "https://www.nanubhaiproperty.com/images/thumbs/property/522079_1627-sq-ft-residential-plot-land-for-sale-hadapsar-in-pune_800.jpeg" },
    { name: "Rooms", value: "rooms", image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Roommates", value: "roommates", image: "https://plus.unsplash.com/premium_photo-1661963190298-b7f86675c2ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

// Valid category values
const validCategories = categories.map(c => c.value);

// Sample properties (stored in localStorage)
let properties = JSON.parse(localStorage.getItem('properties')) || [];

// Current user
let currentUser = null;

// Load current user from localStorage
try {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
} catch (error) {
    console.error('Error loading currentUser from localStorage:', error);
    localStorage.removeItem('currentUser');
}

// Page detection
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// DOM Elements
const loginSection = document.getElementById('login-section');
const mainContent = document.getElementById('main-content');
const loginForm = document.getElementById('login-form');
const userNameSpan = document.getElementById('user-name');
const profileBtn = document.getElementById('profile');
const logoutBtn = document.getElementById('logout');
const storageUsage = document.getElementById('storage-usage');
const clearMyAdsBtn = document.getElementById('clear-my-ads');
const clearAllAdsBtn = document.getElementById('clear-all-ads');
const searchInput = document.getElementById('search-input') || document.getElementById('selection-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const cityFilter = document.getElementById('city-filter');
const categoryGrid = document.querySelector('.category-grid');
const recentAdsList = document.getElementById('recent-ads-list');
const myAdsList = document.getElementById('my-ads-list');
const propertyForm = document.getElementById('property-form');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const profileModal = document.getElementById('profile-modal');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const propertyModal = document.getElementById('property-modal');
const propertyDetails = document.getElementById('property-details');

// Helper function to format city name
function formatCityName(city) {
    if (!city) return 'Unknown City';
    return city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Helper function to normalize category
function normalizeCategory(category) {
    if (!category) {
        console.warn('Category is null or undefined');
        return null;
    }
    const normalized = category.toLowerCase();
    if (!validCategories.includes(normalized)) {
        console.warn('Invalid category:', category, 'Normalized:', normalized, 'Valid categories:', validCategories);
        return null;
    }
    return normalized;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded:', currentPage);
    console.log('Current user:', currentUser);
    console.log('Registered users:', users);
    console.log('Valid categories:', validCategories);
    console.log('All properties:', properties);

    if (currentPage === 'login.html') {
        if (loginSection) loginSection.style.display = 'block';
        if (currentUser) {
            console.log('Redirecting to index.html: User already logged in');
            window.location.href = 'index.html';
        }
    } else {
        if (currentUser) {
            if (mainContent) mainContent.style.display = 'block';
            if (userNameSpan) userNameSpan.textContent = currentUser.name;
            updateStorageUsage();

            // Show/hide Clear All Ads button for admins
            if (clearAllAdsBtn && currentPage === 'index.html') {
                if (currentUser.email === 'admin@example.com') {
                    clearAllAdsBtn.classList.add('admin');
                    clearAllAdsBtn.style.display = 'inline-block';
                } else {
                    clearAllAdsBtn.style.display = 'none';
                }
            }

            if (currentPage === 'index.html') {
                renderCategories();
                renderRecentAds();
            } else if (currentPage === 'my-ads.html') {
                renderMyAds();
            }
        } else {
            console.log('Redirecting to login.html: User not logged in');
            window.location.href = 'login.html';
        }
    }

    if (!clearMyAdsBtn && currentPage === 'my-ads.html') {
        console.warn('Clear My Ads button (#clear-my-ads) not found on page:', currentPage);
    }
    if (!clearAllAdsBtn && currentPage === 'index.html') {
        console.warn('Clear All Ads button (#clear-all-ads) not found on page:', currentPage);
    }
});

// Login / Register
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Login form submitted');

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMessage = document.getElementById('error-message');

        if (errorMessage) {
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        }

        if (!emailInput || !passwordInput) {
            console.error('Email or password input not found');
            if (errorMessage) {
                errorMessage.textContent = 'Error: Email or password input not found.';
                errorMessage.style.display = 'block';
            }
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        console.log('Login attempt with:', { email, password });

        let user = users.find(u => u.email === email);

        if (user) {
            if (user.password === password) {
                console.log('Login successful:', user);
                currentUser = user;
                try {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    console.log('currentUser saved to localStorage');
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error('Error saving currentUser to localStorage:', error);
                    if (errorMessage) {
                        errorMessage.textContent = 'Error saving user session. Please try again.';
                        errorMessage.style.display = 'block';
                    }
                    return;
                }
            } else {
                console.log('Login failed: Incorrect password');
                if (errorMessage) {
                    errorMessage.textContent = 'Incorrect password. Please try again.';
                    errorMessage.style.display = 'block';
                }
            }
        } else {
            const name = email.split('@')[0];
            user = { email, password, name };
            users.push(user);
            saveUsers();

            console.log('New user registered and logged in:', user);
            currentUser = user;
            try {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                console.log('currentUser saved to localStorage');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error saving currentUser to localStorage:', error);
                if (errorMessage) {
                    errorMessage.textContent = 'Error saving user session. Please try again.';
                    errorMessage.style.display = 'block';
                }
                return;
            }
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        console.log('Logging out');
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Profile Modal
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        if (!currentUser) return;
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
        if (profileModal) profileModal.style.display = 'flex';
    });
}

// Close Modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        if (profileModal) profileModal.style.display = 'none';
        if (propertyModal) propertyModal.style.display = 'none';
    });
});

// Click outside to close modal
window.addEventListener('click', (e) => {
    if (e.target === profileModal) profileModal.style.display = 'none';
    if (e.target === propertyModal) propertyModal.style.display = 'none';
});

// Update Storage Usage
function updateStorageUsage() {
    if (!storageUsage || !currentUser) {
        console.warn('storageUsage or currentUser not found for updateStorageUsage');
        return;
    }
    const userProperties = properties.filter(prop => prop.postedBy === currentUser.email);
    const totalSize = userProperties.reduce((acc, prop) => acc + (prop.image ? prop.image.length : 0), 0);
    storageUsage.textContent = `Storage Used: ${(totalSize / 1024).toFixed(2)} KB`;
    console.log('Storage updated:', storageUsage.textContent);
}

// Clear My Ads (My Ads Page)
if (clearMyAdsBtn) {
    clearMyAdsBtn.addEventListener('click', () => {
        console.log('Clear My Ads button clicked');
        if (!currentUser) {
            console.error('No user logged in');
            alert('Please log in to clear your ads.');
            window.location.href = 'login.html';
            return;
        }
        if (!confirm('Are you sure you want to clear all YOUR ads? This cannot be undone.')) {
            console.log('Clear My Ads cancelled by user');
            return;
        }
        console.log('Clearing ads for user:', currentUser.email);
        const initialCount = properties.length;
        properties = properties.filter(prop => prop.postedBy !== currentUser.email);
        try {
            localStorage.setItem('properties', JSON.stringify(properties));
            console.log(`Cleared ${initialCount - properties.length} ads. Remaining: ${properties.length}`);
            updateStorageUsage();
            if (currentPage === 'my-ads.html') {
                console.log('Refreshing my ads');
                renderMyAds();
            }
            if (currentPage === 'index.html') {
                console.log('Refreshing recent ads');
                renderRecentAds();
            }
            alert('Your ads have been cleared.');
        } catch (error) {
            console.error('Error updating localStorage:', error);
            alert('Error clearing your ads. Please try again.');
            properties = JSON.parse(localStorage.getItem('properties')) || properties;
        }
    });
}

// Clear All Ads (Home Page, Admin Only)
if (clearAllAdsBtn) {
    clearAllAdsBtn.addEventListener('click', () => {
        console.log('Clear All Ads button clicked');
        if (!currentUser) {
            console.error('No user logged in');
            alert('Please log in to clear ads.');
            window.location.href = 'login.html';
            return;
        }
        if (currentUser.email !== 'admin@example.com') {
            console.warn('Unauthorized attempt to clear all ads by:', currentUser.email);
            alert('Only admins can clear all ads.');
            return;
        }
        if (!confirm('Are you sure you want to clear ALL ads on the website? This cannot be undone.')) {
            console.log('Clear All Ads cancelled by user');
            return;
        }
        console.log('Clearing all ads from website');
        const initialCount = properties.length;
        properties = [];
        try {
            localStorage.setItem('properties', JSON.stringify(properties));
            console.log(`Cleared ${initialCount} ads. Remaining: ${properties.length}`);
            updateStorageUsage();
            if (currentPage === 'index.html') {
                console.log('Refreshing recent ads');
                renderRecentAds();
            }
            if (currentPage === 'my-ads.html') {
                console.log('Refreshing my ads');
                renderMyAds();
            }
            alert('All ads have been cleared from the website.');
        } catch (error) {
            console.error('Error updating localStorage:', error);
            alert('Error clearing all ads. Please try again.');
            properties = JSON.parse(localStorage.getItem('properties')) || properties;
        }
    });
}

// Render Categories (Home Page)
function renderCategories() {
    if (!categoryGrid) return;
    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('category-item');
        div.tabIndex = 0;
        div.innerHTML = `
            <img src="${category.image}" alt="${category.name} property" loading="lazy">
            <h3>${category.name}</h3>
        `;
        div.addEventListener('click', () => {
            if (categoryFilter) {
                categoryFilter.value = category.value;
                if (searchInput) searchInput.value = '';
                if (priceFilter) priceFilter.value = '';
                if (cityFilter) cityFilter.value = '';
                console.log('Category clicked:', category.value, 'Filter set to:', categoryFilter.value);
                const event = new Event('change', { bubbles: true });
                categoryFilter.dispatchEvent(event);
            } else {
                console.error('categoryFilter element not found');
            }
        });
        div.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (categoryFilter) {
                    categoryFilter.value = category.value;
                    if (searchInput) searchInput.value = '';
                    if (priceFilter) priceFilter.value = '';
                    if (cityFilter) cityFilter.value = '';
                    console.log('Category selected via keyboard:', category.value, 'Filter set to:', categoryFilter.value);
                    const event = new Event('change', { bubbles: true });
                    categoryFilter.dispatchEvent(event);
                }
            }
        });
        categoryGrid.appendChild(div);
    });
}

// Render Recent Ads (Home Page)
function renderRecentAds() {
    if (!recentAdsList) {
        console.error('recentAdsList element not found');
        return;
    }
    recentAdsList.classList.add('loading');
    recentAdsList.innerHTML = '';
    setTimeout(() => {
        console.log('Starting renderRecentAds');
        console.log('All properties:', properties);

        let filteredProperties = [...properties];

        // Validate and filter by category
        filteredProperties = filteredProperties.filter(prop => {
            const normalized = normalizeCategory(prop.category);
            if (!normalized) {
                console.warn('Skipping property with invalid category:', prop);
                return false;
            }
            return true;
        });
        console.log('Properties with valid categories:', filteredProperties);

        // Filter by active status
        filteredProperties = filteredProperties.filter(prop => !prop.status || prop.status === 'active');
        console.log('Active properties:', filteredProperties);

        // Apply category filter
        const selectedCategory = categoryFilter ? normalizeCategory(categoryFilter.value) : null;
        console.log('Selected category:', selectedCategory);
        if (selectedCategory) {
            filteredProperties = filteredProperties.filter(prop => normalizeCategory(prop.category) === selectedCategory);
            console.log('After category filter:', filteredProperties);
        }

        // Apply additional filters
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchTerm) {
            filteredProperties = filteredProperties.filter(prop =>
                (prop.title && prop.title.toLowerCase().includes(searchTerm)) ||
                (prop.description && prop.description.toLowerCase().includes(searchTerm)) ||
                (prop.location && prop.location.toLowerCase().includes(searchTerm)) ||
                (prop.city && prop.city.toLowerCase().includes(searchTerm))
            );
            console.log('After search filter:', filteredProperties);
        }

        const selectedPrice = priceFilter ? priceFilter.value : '';
        if (selectedPrice) {
            const [min, max] = selectedPrice.split('-').map(val => val === '500001+' ? Infinity : Number(val));
            filteredProperties = filteredProperties.filter(prop => prop.price >= min && (max === Infinity ? true : prop.price <= max));
            console.log('After price filter:', filteredProperties);
        }

        const selectedCity = cityFilter ? cityFilter.value : '';
        if (selectedCity) {
            filteredProperties = filteredProperties.filter(prop => prop.city && prop.city.toLowerCase() === selectedCity.toLowerCase());
            console.log('After city filter:', filteredProperties);
        }

        console.log('Final filtered properties:', filteredProperties);

        if (filteredProperties.length === 0) {
            const message = selectedCategory
                ? `No properties found for category: ${categories.find(c => c.value === selectedCategory)?.name || selectedCategory}`
                : 'No properties found.';
            recentAdsList.innerHTML = `<p>${message}</p>`;
            recentAdsList.classList.remove('loading');
            console.log('Displayed:', message);
            return;
        }

        filteredProperties.forEach(prop => {
            const div = document.createElement('div');
            div.classList.add('ad-item', `ad-item--${normalizeCategory(prop.category)}`);
            div.innerHTML = `
                <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property'}" loading="lazy">
                <div class="text-content">
                    <h3>${prop.title || 'Untitled'}</h3>
                    <p>Price: ${prop.price || 'N/A'}</p>
                    <p>Location: ${prop.location || 'Unknown'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
                    <p>Posted By: ${prop.postedBy || 'Unknown'}</p>
                </div>
            `;
            div.addEventListener('click', () => showPropertyDetails(prop));
            recentAdsList.appendChild(div);
        });

        recentAdsList.classList.remove('loading');
        console.log('Rendered', filteredProperties.length, 'properties');
    }, 0);
}

// Render My Ads (My Ads Page)
function renderMyAds() {
    if (!myAdsList || !currentUser) {
        console.error('myAdsList or currentUser not found');
        return;
    }
    myAdsList.classList.add('loading');
    myAdsList.innerHTML = '';
    setTimeout(() => {
        console.log('Starting renderMyAds for:', currentUser.email);
        let userProperties = properties.filter(prop => prop.postedBy === currentUser.email);
        userProperties = userProperties.filter(prop => {
            const valid = normalizeCategory(prop.category);
            if (!valid) console.warn('Invalid property category in my ads:', prop);
            return valid;
        });
        console.log('User properties:', userProperties);

        if (userProperties.length === 0) {
            myAdsList.innerHTML = '<p>No ads posted yet.</p>';
            myAdsList.classList.remove('loading');
            console.log('Displayed: No ads posted yet');
            return;
        }

        userProperties.forEach((prop, index) => {
            const globalIndex = properties.findIndex(p =>
                p.postedBy === prop.postedBy &&
                p.title === prop.title &&
                p.category === prop.category &&
                p.price === prop.price &&
                p.location === prop.location &&
                p.city === prop.city
            );
            if (globalIndex === -1) {
                console.warn('Global index not found for property:', prop);
                return;
            }
            console.log('Rendering property:', prop, 'Global index:', globalIndex);

            const div = document.createElement('div');
            div.classList.add('ad-item', `ad-item--${normalizeCategory(prop.category)}`);
            if (prop.status === 'inactive') {
                div.classList.add('inactive');
            }
            div.innerHTML = `
                <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property'}" loading="lazy">
                <div class="text-content">
                    <h3>${prop.title || 'Untitled'}</h3>
                    <p>Price: ${typeof prop.price === 'number' ? prop.price.toLocaleString() : 'N/A'}</p>
                    <p>Location: ${prop.location || 'Unknown'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
                    <p>Posted By: ${prop.postedBy || 'Unknown'}</p>
                    <p>Status: ${prop.status || 'active'}</p>
                </div>
                <div class="ad-actions">
                    <button class="active-btn" data-global-index="${globalIndex}" ${prop.status === 'active' ? 'disabled' : ''}>Active</button>
                    <button class="inactive-btn" data-global-index="${globalIndex}" ${prop.status === 'inactive' ? 'disabled' : ''}>Inactive</button>
                    <button class="delete-btn" data-global-index="${globalIndex}">Delete</button>
                </div>
            `;
            div.addEventListener('click', (e) => {
                if (!e.target.classList.contains('active-btn') &&
                    !e.target.classList.contains('inactive-btn') &&
                    !e.target.classList.contains('delete-btn')) {
                    showPropertyDetails(prop);
                }
            });
            myAdsList.appendChild(div);
        });

        document.querySelectorAll('.active-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const globalIndex = parseInt(e.target.dataset.globalIndex);
                console.log('Active button clicked, globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
                togglePropertyStatus(globalIndex, 'active');
            });
        });

        document.querySelectorAll('.inactive-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const globalIndex = parseInt(e.target.dataset.globalIndex);
                console.log('Inactive button clicked, globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
                togglePropertyStatus(globalIndex, 'inactive');
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const globalIndex = parseInt(e.target.dataset.globalIndex);
                console.log('Delete button clicked, globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
                deleteProperty(globalIndex);
            });
        });

        myAdsList.classList.remove('loading');
        console.log('Rendered', userProperties.length, 'user properties');
    }, 0);
}

// Toggle Property Status
function togglePropertyStatus(globalIndex, status) {
    if (globalIndex < 0 || globalIndex >= properties.length) {
        console.error('Invalid globalIndex:', globalIndex);
        return;
    }
    console.log(`Toggling status to ${status} for property at globalIndex: ${globalIndex}`);
    properties[globalIndex].status = status;
    localStorage.setItem('properties', JSON.stringify(properties));
    console.log('Updated properties:', properties);
    if (currentPage === 'my-ads.html') {
        renderMyAds();
    }
    if (currentPage === 'index.html') {
        renderRecentAds();
    }
}

// Delete Property
function deleteProperty(globalIndex) {
    if (globalIndex < 0 || globalIndex >= properties.length) {
        console.error('Invalid globalIndex:', globalIndex);
        return;
    }
    if (!confirm(`Are you sure you want to delete "${properties[globalIndex].title || 'this property'}"?`)) {
        console.log('Deletion cancelled for globalIndex:', globalIndex);
        return;
    }
    console.log('Deleting property at globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
    properties.splice(globalIndex, 1);
    localStorage.setItem('properties', JSON.stringify(properties));
    console.log('Properties after deletion:', properties);
    updateStorageUsage();
    if (currentPage === 'my-ads.html') {
        renderMyAds();
    }
    if (currentPage === 'index.html') {
        renderRecentAds();
    }
}

// Show Property Details
function showPropertyDetails(prop) {
    if (!propertyDetails || !propertyModal) return;
    propertyDetails.innerHTML = `
        <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property'}" loading="lazy">
        <h2>${prop.title || 'Untitled'}</h2>
        <p><strong>Category:</strong> ${prop.category || 'Unknown'}</p>
        <p><strong>Price:</strong> ${typeof prop.price === 'number' ? prop.price.toLocaleString() : 'N/A'}</p>
        <p><strong>Location:</strong> ${prop.location || 'Unknown'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
        <p><strong>Description:</strong> ${prop.description || 'No description'}</p>
        <p><strong>Posted By:</strong> ${prop.postedBy || 'Unknown'}</p>
        <p><strong>Status:</strong> ${prop.status || 'active'}</p>
    `;
    propertyModal.style.display = 'flex';
}

// Filters (Home Page)
if (searchInput) {
    searchInput.addEventListener('input', () => {
        console.log('Search input:', searchInput.value);
        renderRecentAds();
    });
}
if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        console.log('Category filter changed to:', categoryFilter.value);
        renderRecentAds();
    });
}
if (priceFilter) {
    priceFilter.addEventListener('change', () => {
        console.log('Price filter changed:', priceFilter.value);
        renderRecentAds();
    });
}
if (cityFilter) {
    cityFilter.addEventListener('change', () => {
        console.log('City filter changed:', cityFilter.value);
        renderRecentAds();
    });
}

// Image Preview (Post New Property Page)
if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && imagePreview) {
            if (file.size > 1024 * 1024) {
                alert('Image size must be under 1MB.');
                imageInput.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Post Property (Post New Property Page)
if (propertyForm) {
    propertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Please log in to post a property.');
            window.location.href = 'login.html';
            return;
        }

        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const price = Number(document.getElementById('price').value);
        const location = document.getElementById('location').value;
        const city = document.getElementById('city').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];

        console.log('Form submitted with category:', category);
        if (!validCategories.includes(category)) {
            alert('Please select a valid category.');
            console.warn('Invalid category submitted:', category, 'Valid categories:', validCategories);
            return;
        }
        if (price <= 0) {
            alert('Price must be positive.');
            return;
        }
        if (description.length > 1000) {
            alert('Description must be under 1000 characters.');
            return;
        }
        if (imageFile && imageFile.size > 512 * 1024) {
            alert('Image must be under 512KB.');
            return;
        }

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newProperty = {
                    title,
                    category,
                    price,
                    location,
                    city,
                    description,
                    image: event.target.result,
                    postedBy: currentUser.email,
                    status: 'active'
                };
                properties.push(newProperty);
                localStorage.setItem('properties', JSON.stringify(properties));
                console.log('New property added:', newProperty);
                alert('Property posted successfully!');
                propertyForm.reset();
                if (imagePreview) imagePreview.innerHTML = '';
                updateStorageUsage();
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert('Please upload an image.');
        }
    });
}