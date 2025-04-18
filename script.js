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

// Initialize messages in localStorage
let messages = JSON.parse(localStorage.getItem('messages')) || [];

function saveMessages() {
  try {
    localStorage.setItem('messages', JSON.stringify(messages));
    console.log('Messages saved to localStorage:', messages);
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
    alert('Error saving messages. Please try again.');
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

// Valid city values
const validCities = ['lahore', 'karachi', 'islamabad', 'peshawar', 'rawalpindi', 'quetta', 'faisalabad', 'multan'];

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
let loginSection = null;
let mainContent = null;
let loginForm = null;
let signupForm = null;
let toggleSignupBtn = null;
let toggleLoginBtn = null;
let userNameSpan = null;
let profileBtn = null;
let logoutBtn = null;
let storageUsage = null;
let clearMyAdsBtn = null;
let clearAllAdsBtn = null;
let searchInput = null;
let categoryFilter = null;
let priceFilter = null;
let cityFilter = null;
let categoryGrid = null;
let recentAdsList = null;
let myAdsList = null;
let propertyForm = null;
let imageInput = null;
let imagePreview = null;
let profileModal = null;
let profileName = null;
let profileMobile = null;
let propertyModal = null;
let propertyDetails = null;
let chatModal = null;
let chatMessages = null;
let chatInput = null;
let sendMessageBtn = null;

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
    return false;
  }
  return normalized;
}

// Helper function to normalize city
function normalizeCity(city) {
  if (!city) {
    console.warn('City is null or undefined');
    return null;
  }
  const normalized = city.toLowerCase();
  if (!validCities.includes(normalized)) {
    console.warn('Invalid city:', city, 'Normalized:', normalized, 'Valid cities:', validCities);
    return false;
  }
  return normalized;
}

// Test local storage availability
function testLocalStorage() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('Local Storage is working');
  } catch (e) {
    console.error('Local Storage is not available:', e);
    alert('Local Storage is unavailable. Please enable it or try another browser.');
  }
}
testLocalStorage();

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  console.log('Page:', currentPage);
  console.log('Current user:', currentUser);
  console.log('Registered users:', users);
  console.log('Valid categories:', validCategories);
  console.log('Valid cities:', validCities);
  console.log('All properties:', properties);

  // Initialize DOM elements
  loginSection = document.getElementById('login-section');
  mainContent = document.getElementById('main-content');
  loginForm = document.getElementById('login-form');
  signupForm = document.getElementById('signup-form');
  toggleSignupBtn = document.getElementById('toggle-signup');
  toggleLoginBtn = document.getElementById('toggle-login');
  userNameSpan = document.getElementById('user-name');
  profileBtn = document.getElementById('profile');
  logoutBtn = document.getElementById('logout');
  storageUsage = document.getElementById('storage-usage');
  clearMyAdsBtn = document.getElementById('clear-my-ads');
  clearAllAdsBtn = document.getElementById('clear-all-ads');
  searchInput = document.getElementById('search-input') || document.getElementById('selection-input');
  categoryFilter = document.getElementById('category-filter');
  priceFilter = document.getElementById('price-filter');
  cityFilter = document.getElementById('city-filter');
  categoryGrid = document.querySelector('.category-grid');
  recentAdsList = document.getElementById('recent-ads-list');
  myAdsList = document.getElementById('my-ads-list');
  propertyForm = document.getElementById('property-form');
  imageInput = document.getElementById('image');
  imagePreview = document.getElementById('image-preview');
  profileModal = document.getElementById('profile-modal');
  profileName = document.getElementById('profile-name');
  profileMobile = document.getElementById('profile-mobile');
  propertyModal = document.getElementById('property-modal');
  propertyDetails = document.getElementById('property-details');
  chatModal = document.getElementById('chat-modal');
  chatMessages = document.getElementById('chat-messages');
  chatInput = document.getElementById('chat-input');
  sendMessageBtn = document.getElementById('send-message');

  console.log('DOM elements:', {
    loginSection,
    loginForm,
    signupForm,
    toggleSignupBtn,
    toggleLoginBtn,
    userNameSpan,
    profileBtn,
    logoutBtn
  });

  // Page-specific initialization
  if (currentPage === 'login.html') {
    if (loginSection) {
      loginSection.style.display = 'block';
      console.log('Login section displayed');
    }
    if (currentUser) {
      console.log('Redirecting to index.html: User already logged in');
      window.location.href = 'index.html';
      return;
    }
    // Toggle between login and sign-up forms
    if (toggleSignupBtn) {
      toggleSignupBtn.addEventListener('click', () => {
        console.log('Toggle to sign-up form');
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
      });
    } else {
      console.warn('Toggle Sign Up button (#toggle-signup) not found');
    }
    if (toggleLoginBtn) {
      toggleLoginBtn.addEventListener('click', () => {
        console.log('Toggle to login form');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
      });
    } else {
      console.warn('Toggle Login button (#toggle-login) not found');
    }
  } else {
    if (currentUser) {
      if (mainContent) mainContent.style.display = 'block';
      if (userNameSpan) userNameSpan.textContent = currentUser.username;
      updateStorageUsage();

      // Show/hide Clear All Ads button for admins
      if (clearAllAdsBtn && currentPage === 'index.html') {
        if (currentUser.username === 'admin') {
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
      return;
    }
  }

  // Login form handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Login form submitted');
      const mobileInput = document.getElementById('login-mobile');
      const passwordInput = document.getElementById('login-password');
      const errorMessage = document.getElementById('login-error');

      if (errorMessage) {
        errorMessage.textContent = '';
      }

      if (!mobileInput || !passwordInput) {
        console.error('Mobile number or password input not found');
        if (errorMessage) errorMessage.textContent = 'Error: Required input field not found.';
        return;
      }

      const mobileNumber = mobileInput.value.trim();
      const password = passwordInput.value.trim();
      console.log('Login attempt with:', { mobileNumber, password });

      if (!mobileNumber || !password) {
        if (errorMessage) errorMessage.textContent = 'All fields are required.';
        return;
      }

      const user = users.find(u => u.mobileNumber === mobileNumber && u.password === password);

      if (user) {
        console.log('Login successful:', user);
        currentUser = user;
        try {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          console.log('currentUser saved to localStorage:', currentUser);
          window.location.href = 'index.html';
        } catch (error) {
          console.error('Error saving currentUser to localStorage:', error);
          if (errorMessage) errorMessage.textContent = 'Error saving user session. Please try again.';
        }
      } else {
        console.log('Login failed: Invalid mobile number or password');
        if (errorMessage) errorMessage.textContent = 'Invalid mobile number or password.';
      }
    });
  } else {
    console.warn('Login form (#login-form) not found on page:', currentPage);
  }

  // Sign-Up form handler
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Sign-up form submitted');

      const usernameInput = document.getElementById('signup-username');
      const mobileInput = document.getElementById('signup-mobile');
      const passwordInput = document.getElementById('signup-password');
      const errorMessage = document.getElementById('signup-error');

      if (errorMessage) {
        errorMessage.textContent = '';
      }

      if (!usernameInput || !mobileInput || !passwordInput || !errorMessage) {
        console.error('Sign-up inputs or error message element not found');
        if (errorMessage) errorMessage.textContent = 'Error: Required input field not found.';
        alert('Sign-up form is incomplete. Please check the form structure.');
        return;
      }

      const username = usernameInput.value.trim();
      const mobileNumber = mobileInput.value.trim();
      const password = passwordInput.value.trim();
      console.log('Sign-up values:', { username, mobileNumber, password });

      // Validation
      if (!username || !mobileNumber || !password) {
        console.log('Sign-up failed: All fields are required');
        if (errorMessage) errorMessage.textContent = 'All fields are required.';
        return;
      }

      if (username.length < 3) {
        console.log('Sign-up failed: Username too short');
        if (errorMessage) errorMessage.textContent = 'Username must be at least 3 characters long.';
        return;
      }

      if (!/^\+?\d{10,12}$/.test(mobileNumber)) {
        console.log('Sign-up failed: Invalid mobile number');
        if (errorMessage) errorMessage.textContent = 'Mobile number must be 10-12 digits (e.g., +923001234567).';
        return;
      }

      if (password.length < 6) {
        console.log('Sign-up failed: Password too short');
        if (errorMessage) errorMessage.textContent = 'Password must be at least 6 characters long.';
        return;
      }

      if (users.some(u => u.mobileNumber === mobileNumber)) {
        console.log('Sign-up failed: Mobile number already registered');
        if (errorMessage) errorMessage.textContent = 'Mobile number already registered.';
        return;
      }

      if (users.some(u => u.username === username)) {
        console.log('Sign-up failed: Username already taken');
        if (errorMessage) errorMessage.textContent = 'Username already taken.';
        return;
      }

      const newUser = { username, mobileNumber, password };
      users.push(newUser);
      try {
        saveUsers();
        console.log('New user registered:', newUser);
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log('currentUser saved to localStorage:', currentUser);
        window.location.href = 'index.html';
      } catch (error) {
        console.error('Error saving user data:', error);
        if (errorMessage) errorMessage.textContent = 'Error saving user data. Try clearing browser data.';
      }
    });
  } else {
    console.error('Signup form (#signup-form) not found on page:', currentPage);
  }

  // Debug function for admin sign-up
  window.debugSignUp = function() {
    console.log('Debug admin sign-up triggered');
    const adminUser = {
      username: 'admin',
      mobileNumber: '+923001234567',
      password: 'test123'
    };
    if (!users.some(u => u.mobileNumber === adminUser.mobileNumber)) {
      users.push(adminUser);
      saveUsers();
      console.log('Admin user created:', adminUser);
    } else {
      console.log('Admin user already exists:', adminUser);
    }
    currentUser = adminUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('currentUser set to admin:', currentUser);
    window.location.href = 'index.html';
  };

  // Logout function
  function handleLogout() {
    console.log('Logout function triggered');
    try {
      console.log('Current user before logout:', currentUser);
      currentUser = null;
      localStorage.removeItem('currentUser');
      console.log('currentUser cleared from localStorage');
      console.log('Redirecting to login.html');
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  }

  // Attach logout event listener
  if (logoutBtn) {
    console.log('Logout button found:', logoutBtn);
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Logout button clicked');
      handleLogout();
    });
  } else {
    console.warn('Logout button (#logout) not found on page:', currentPage);
    const fallbackLogoutBtn = document.querySelector('button#logout');
    if (fallbackLogoutBtn) {
      console.log('Fallback logout button found:', fallbackLogoutBtn);
      fallbackLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Fallback logout button clicked');
        handleLogout();
      });
    } else {
      console.error('No logout button found on page:', currentPage);
    }
  }

  // Profile Modal
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      if (!currentUser) return;
      if (profileName) profileName.textContent = currentUser.username;
      if (profileMobile) profileMobile.textContent = currentUser.mobileNumber;
      if (profileModal) {
        const profileContact = document.getElementById('profile-contact') || document.createElement('p');
        profileContact.id = 'profile-contact';
        profileContact.textContent = `Mobile Number: ${currentUser.mobileNumber || 'Not provided'}`;
        profileModal.querySelector('.modal-content').appendChild(profileContact);
        profileModal.style.display = 'flex';
      }
    });
  }

  // Close Modals
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      if (profileModal) profileModal.style.display = 'none';
      if (propertyModal) propertyModal.style.display = 'none';
      if (chatModal) chatModal.style.display = 'none';
    });
  });

  // Click outside to close modal
  window.addEventListener('click', (e) => {
    if (e.target === profileModal) profileModal.style.display = 'none';
    if (e.target === propertyModal) propertyModal.style.display = 'none';
    if (e.target === chatModal) chatModal.style.display = 'none';
  });

  // Update Storage Usage
  function updateStorageUsage() {
    if (!storageUsage || !currentUser) {
      console.warn('storageUsage or currentUser not found for updateStorageUsage');
      return;
    }
    const userProperties = properties.filter(prop => prop.postedBy === currentUser.username);
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
      console.log('Clearing ads for user:', currentUser.username);
      const initialCount = properties.length;
      properties = properties.filter(prop => prop.postedBy !== currentUser.username);
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
      if (currentUser.username !== 'admin') {
        console.warn('Unauthorized attempt to clear all ads by:', currentUser.username);
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
    if (!categoryGrid) {
      console.error('categoryGrid element not found');
      return;
    }
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
      filteredProperties = filteredProperties.filter(prop => prop.status === 'active');
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

      const selectedCity = cityFilter ? normalizeCity(cityFilter.value) : null;
      console.log('Selected city:', selectedCity);
      if (selectedCity) {
        filteredProperties = filteredProperties.filter(prop => prop.city && normalizeCity(prop.city) === selectedCity);
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
        console.log('Rendering property card:', {
          id: prop.id,
          title: prop.title,
          price: prop.price,
          location: prop.location,
          city: prop.city,
          postedBy: prop.postedBy,
          showContactNumber: prop.showContactNumber,
          mobileNumber: prop.showContactNumber ? prop.mobileNumber : 'Hidden'
        });
        const div = document.createElement('div');
        div.classList.add('ad-item', `ad-item--${normalizeCategory(prop.category) || 'unknown'}`);
        div.innerHTML = `
          <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property Image'}" loading="lazy">
          <div class="text-content text-content--expanded">
            <h3 class="ad-title">${prop.title || 'Untitled Property'}</h3>
            <p class="ad-field ad-price">Price: ${typeof prop.price === 'number' ? prop.price.toLocaleString() : 'Not Specified'}</p>
            <p class="ad-field ad-location">Location: ${prop.location || 'Unknown Location'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
            <p class="ad-field ad-posted-by">Posted By: ${prop.postedBy || 'Anonymous'}</p>
            ${prop.showContactNumber && prop.mobileNumber ? `<p class="ad-field ad-contact">Contact: ${prop.mobileNumber}</p>` : ''}
            <button class="chat-btn">Chat</button>
          </div>
        `;
        div.querySelector('.chat-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          openChatModal(prop);
        });
        div.addEventListener('click', (e) => {
          if (!e.target.classList.contains('chat-btn')) {
            showPropertyDetails(prop);
          }
        });
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
      console.log('Starting renderMyAds for:', currentUser.username);
      const isAdmin = currentUser.username === 'admin';
      let displayProperties = isAdmin ? [...properties] : properties.filter(prop => prop.postedBy === currentUser.username);

      displayProperties = displayProperties.filter(prop => {
        const valid = normalizeCategory(prop.category);
        if (!valid) console.warn('Invalid property category in my ads:', prop);
        return valid;
      });
      console.log('Properties to display:', displayProperties);

      if (displayProperties.length === 0) {
        myAdsList.innerHTML = isAdmin ? '<p>No ads posted on the platform.</p>' : '<p>No ads posted yet.</p>';
        myAdsList.classList.remove('loading');
        console.log('Displayed: No ads message');
        return;
      }

      displayProperties.forEach((prop, index) => {
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
        console.log('Rendering property:', {
          id: prop.id,
          title: prop.title,
          price: prop.price,
          location: prop.location,
          city: prop.city,
          postedBy: prop.postedBy,
          showContactNumber: prop.showContactNumber,
          mobileNumber: prop.showContactNumber ? prop.mobileNumber : 'Hidden',
          status: prop.status
        });

        const div = document.createElement('div');
        div.classList.add('ad-item', `ad-item--${normalizeCategory(prop.category)}`);
        if (prop.status === 'inactive') {
          div.classList.add('inactive');
        }
        div.innerHTML = `
          <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property'}" loading="lazy">
          <div class="text-content text-content--expanded">
            <h3>${prop.title || 'Untitled'}</h3>
            <p class="ad-price">Price: ${typeof prop.price === 'number' ? prop.price.toLocaleString() : 'N/A'}</p>
            <p class="ad-location">Location: ${prop.location || 'Unknown'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
            <p class="ad-posted-by">Posted By: ${prop.postedBy || 'Unknown'}</p>
            ${isAdmin ? `<p class="ad-owner">Owner: ${prop.postedBy || prop.mobileNumber || 'Unknown'}</p>` : ''}
            ${prop.showContactNumber && prop.mobileNumber ? `<p class="ad-contact">Contact: ${prop.mobileNumber}</p>` : ''}
            <p class="ad-status">Status: ${prop.status || 'active'}</p>
            <button class="chat-btn">Chat</button>
          </div>
          <div class="ad-actions">
            ${isAdmin ? `
              <button class="toggle-btn ${prop.status === 'active' ? 'deactivate' : ''}" data-global-index="${globalIndex}">
                ${prop.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button class="delete-btn" data-global-index="${globalIndex}">Delete</button>
            ` : `
              <button class="delete-btn" data-global-index="${globalIndex}">Delete My Ad</button>
            `}
          </div>
        `;
        div.querySelector('.chat-btn').addEventListener('click', () => openChatModal(prop));
        div.addEventListener('click', (e) => {
          if (!e.target.classList.contains('toggle-btn') &&
              !e.target.classList.contains('delete-btn') &&
              !e.target.classList.contains('chat-btn')) {
            showPropertyDetails(prop);
          }
        });
        myAdsList.appendChild(div);
      });

      if (isAdmin) {
        document.querySelectorAll('.toggle-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const globalIndex = parseInt(e.target.dataset.globalIndex);
            console.log('Toggle button clicked, globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
            const newStatus = properties[globalIndex].status === 'active' ? 'inactive' : 'active';
            togglePropertyStatus(globalIndex, newStatus);
          });
        });
      }

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const globalIndex = parseInt(e.target.dataset.globalIndex);
          console.log('Delete button clicked, globalIndex:', globalIndex, 'Property:', properties[globalIndex]);
          deleteProperty(globalIndex);
        });
      });

      myAdsList.classList.remove('loading');
      console.log('Rendered', displayProperties.length, 'properties');
    }, 0);
  }

  // Toggle Property Status
  function togglePropertyStatus(globalIndex, status) {
    if (globalIndex < 0 || globalIndex >= properties.length) {
      console.error('Invalid globalIndex:', globalIndex);
      alert('Error updating property status.');
      return;
    }
    console.log('Toggling status for property at index:', globalIndex, 'to:', status);
    properties[globalIndex].status = status;
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
      console.log('Property status updated:', properties[globalIndex]);
      if (currentPage === 'my-ads.html') {
        console.log('Refreshing my ads');
        renderMyAds();
      }
      if (currentPage === 'index.html') {
        console.log('Refreshing recent ads');
        renderRecentAds();
      }
    } catch (error) {
      console.error('Error updating localStorage:', error);
      alert('Error updating property status. Please try again.');
      properties = JSON.parse(localStorage.getItem('properties')) || properties;
    }
  }

  // Delete Property
  function deleteProperty(globalIndex) {
    if (globalIndex < 0 || globalIndex >= properties.length) {
      console.error('Invalid globalIndex:', globalIndex);
      alert('Error deleting property.');
      return;
    }
    if (!confirm('Are you sure you want to delete this property? This cannot be undone.')) {
      console.log('Delete cancelled by user');
      return;
    }
    console.log('Deleting property at index:', globalIndex, 'Property:', properties[globalIndex]);
    const deletedProperty = properties.splice(globalIndex, 1)[0];
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
      console.log('Property deleted:', deletedProperty);
      updateStorageUsage();
      if (currentPage === 'my-ads.html') {
        console.log('Refreshing my ads');
        renderMyAds();
      }
      if (currentPage === 'index.html') {
        console.log('Refreshing recent ads');
        renderRecentAds();
      }
      alert('Property deleted successfully.');
    } catch (error) {
      console.error('Error updating localStorage:', error);
      alert('Error deleting property. Please try again.');
      properties = JSON.parse(localStorage.getItem('properties')) || properties;
    }
  }

  // Show Property Details
  function showPropertyDetails(prop) {
    if (!propertyModal || !propertyDetails) {
      console.error('propertyModal or propertyDetails not found');
      return;
    }
    console.log('Showing property details:', prop);
    propertyDetails.innerHTML = `
      <img src="${prop.image || 'https://via.placeholder.com/240x180?text=Property'}" alt="${prop.title || 'Property'}" loading="lazy">
      <h2>${prop.title || 'Untitled Property'}</h2>
      <p><strong>Category:</strong> ${categories.find(c => c.value === normalizeCategory(prop.category))?.name || prop.category || 'Unknown'}</p>
      <p><strong>Price:</strong> ${typeof prop.price === 'number' ? prop.price.toLocaleString() : 'Not Specified'}</p>
      <p><strong>Location:</strong> ${prop.location || 'Unknown Location'}${prop.city ? ', ' + formatCityName(prop.city) : ''}</p>
      <p><strong>Description:</strong> ${prop.description || 'No description provided'}</p>
      <p><strong>Posted By:</strong> ${prop.postedBy || 'Anonymous'}</p>
      ${prop.showContactNumber && prop.mobileNumber ? `<p><strong>Contact:</strong> ${prop.mobileNumber}</p>` : ''}
    `;
    propertyModal.style.display = 'flex';
  }

  // Open Chat Modal
  function openChatModal(prop) {
    if (!chatModal || !chatMessages || !chatInput || !sendMessageBtn || !currentUser) {
      console.error('Chat modal elements or currentUser not found');
      return;
    }
    console.log('Opening chat for property:', prop);
    chatMessages.innerHTML = '';
    const conversationId = `${currentUser.username}-${prop.postedBy}-${prop.id}`;
    const userMessages = messages.filter(msg =>
      msg.conversationId === conversationId ||
      msg.conversationId === `${prop.postedBy}-${currentUser.username}-${prop.id}`
    );
    console.log('Messages for conversation:', userMessages);
    userMessages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add(msg.sender === currentUser.username ? 'sent' : 'received');
      messageDiv.innerHTML = `<p>${msg.text}</p><small>${new Date(msg.timestamp).toLocaleString()}</small>`;
      chatMessages.appendChild(messageDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;

    sendMessageBtn.onclick = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      console.log('Sending message:', text);
      const message = {
        conversationId,
        sender: currentUser.username,
        recipient: prop.postedBy,
        text,
        timestamp: new Date().toISOString(),
        propertyId: prop.id
      };
      messages.push(message);
      saveMessages();
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('sent');
      messageDiv.innerHTML = `<p>${text}</p><small>${new Date().toLocaleString()}</small>`;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = '';
    };

    chatModal.style.display = 'flex';
  }

  // Property Form Submission
  if (propertyForm) {
    if (imageInput && imagePreview) {
      imageInput.addEventListener('change', () => {
        console.log('Image input changed');
        imagePreview.innerHTML = '';
        if (imageInput.files && imageInput.files[0]) {
          const file = imageInput.files[0];
          console.log('Selected file:', file.name, 'Size:', file.size);
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.appendChild(img);
            console.log('Image preview updated');
          };
          reader.onerror = (error) => {
            console.error('Error reading file:', error);
            alert('Error loading image. Please try another file.');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    propertyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Property form submitted');
      if (!currentUser) {
        console.error('No user logged in');
        alert('Please log in to post a property.');
        window.location.href = 'login.html';
        return;
      }

      const title = document.getElementById('title')?.value.trim();
      const category = document.getElementById('category')?.value;
      const price = document.getElementById('price')?.value;
      const location = document.getElementById('location')?.value.trim();
      const city = document.getElementById('city')?.value;
      const description = document.getElementById('description')?.value.trim();
      const showContact = document.getElementById('show-contact')?.checked;
      const imageFile = imageInput?.files[0];

      console.log('Form values:', { title, category, price, location, city, description, showContact, imageFile });

      if (!title || !category || !price || !location || !city || !description) {
        console.log('Form submission failed: All fields are required');
        alert('All fields are required.');
        return;
      }

      const normalizedCategory = normalizeCategory(category);
      if (!normalizedCategory) {
        console.log('Form submission failed: Invalid category');
        alert('Please select a valid category.');
        return;
      }

      const normalizedCity = normalizeCity(city);
      if (!normalizedCity) {
        console.log('Form submission failed: Invalid city');
        alert('Please select a valid city.');
        return;
      }

      const property = {
        id: Date.now().toString(),
        title,
        category: normalizedCategory,
        price: Number(price),
        location,
        city: normalizedCity,
        description,
        postedBy: currentUser.username,
        mobileNumber: showContact ? currentUser.mobileNumber : null,
        showContactNumber: showContact,
        status: 'active'
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          property.image = e.target.result;
          console.log('Image loaded for property:', property.title);
          properties.push(property);
          try {
            localStorage.setItem('properties', JSON.stringify(properties));
            console.log('Property added:', property);
            updateStorageUsage();
            alert('Property posted successfully.');
            propertyForm.reset();
            imagePreview.innerHTML = '';
            window.location.href = 'my-ads.html';
          } catch (error) {
            console.error('Error saving property:', error);
            alert('Error saving property. Please try again.');
          }
        };
        reader.onerror = (error) => {
          console.error('Error reading image file:', error);
          alert('Error loading image. Please try another file.');
        };
        reader.readAsDataURL(imageFile);
      } else {
        properties.push(property);
        try {
          localStorage.setItem('properties', JSON.stringify(properties));
          console.log('Property added:', property);
          updateStorageUsage();
          alert('Property posted successfully.');
          propertyForm.reset();
          window.location.href = 'my-ads.html';
        } catch (error) {
          console.error('Error saving property:', error);
          alert('Error saving property. Please try again.');
        }
      }
    });
  }

  // Filter Handlers
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      console.log('Category filter changed to:', categoryFilter.value);
      renderRecentAds();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      console.log('Search input:', searchInput.value);
      renderRecentAds();
    });
  }
  if (priceFilter) {
    priceFilter.addEventListener('change', () => {
      console.log('Price filter changed to:', priceFilter.value);
      renderRecentAds();
    });
  }
  if (cityFilter) {
    cityFilter.addEventListener('change', () => {
      console.log('City filter changed to:', cityFilter.value);
      renderRecentAds();
    });
  }

  // Data Form Handling (only for pages with dataForm)
  const dataForm = document.getElementById('dataForm');
  const itemInput = document.getElementById('itemInput');
  const editIndex = document.getElementById('editIndex');
  const itemList = document.getElementById('itemList');

  if (dataForm && itemInput && editIndex && itemList) {
    // Load items on page load
    loadItems();

    // Handle form submission
    dataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const itemValue = itemInput.value.trim();
      if (!itemValue) {
        console.warn('Input is empty');
        return;
      }

      if (editIndex.value === '') {
        console.log('Adding item:', itemValue);
        addItem(itemValue);
      } else {
        console.log('Updating item at index:', editIndex.value);
        updateItem(parseInt(editIndex.value), itemValue);
      }

      itemInput.value = '';
      editIndex.value = '';
    });

    // Load items from local storage
    function loadItems() {
      const items = getItemsFromStorage();
      itemList.innerHTML = '';
      console.log('Loaded items:', items);
      items.forEach((item, index) => displayItem(item, index));
    }

    // Get items from local storage
    function getItemsFromStorage() {
      try {
        return JSON.parse(localStorage.getItem('items')) || [];
      } catch (e) {
        console.error('Error reading from local storage:', e);
        return [];
      }
    }

    // Save items to local storage
    function saveItemsToStorage(items) {
      try {
        localStorage.setItem('items', JSON.stringify(items));
        console.log('Items saved:', items);
      } catch (e) {
        console.error('Error saving to local storage:', e);
      }
    }

    // Add new item
    function addItem(item) {
      const items = getItemsFromStorage();
      items.push(item);
      saveItemsToStorage(items);
      loadItems();
    }

    // Display item
    function displayItem(item, index) {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item}
        <div>
          <button class="edit" onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </div>
      `;
      itemList.appendChild(li);
    }

    // Edit item
    window.editItem = function(index) {
      const items = getItemsFromStorage();
      itemInput.value = items[index];
      editIndex.value = index;
      console.log('Editing item at index:', index);
    };

    // Update item
    function updateItem(index, newValue) {
      const items = getItemsFromStorage();
      items[index] = newValue;
      saveItemsToStorage(items);
      loadItems();
    }

    // Delete item
    window.deleteItem = function(index) {
      const items = getItemsFromStorage();
      items.splice(index, 1);
      saveItemsToStorage(items);
      loadItems();
      console.log('Deleted item at index:', index);
    };
  } else {
    console.log('Data form elements not found on this page:', currentPage);
  }
});