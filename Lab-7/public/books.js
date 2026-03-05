document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    // Filters & Sort
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const topRatedBtn = document.getElementById('topRatedBtn');

    // Results & Pagination
    const booksContainer = document.getElementById('booksContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const paginationControls = document.getElementById('paginationControls');
    const paginationStatus = document.getElementById('paginationStatus');

    // --- State Variables ---
    let currentMode = 'paginate'; // 'paginate', 'search', 'filter', 'sort', 'topRated'
    let currentPage = 1;
    let currentLimit = 5;
    let fullyLoaded = false;
    let allBooks = []; // Stores the currently visible loaded books

    // Track active query parameters for modes other than paginate
    let currentSearchTerm = '';
    let currentCategory = '';
    let currentSort = '';

    // --- Initialization ---
    // Load initial page 1
    fetchPaginatedBooks(currentPage, currentLimit);

    // --- Event Listeners ---
    // 1. Search (Title Regex)
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        resetToDefault();
    });

    // 2. Filter by Category
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active styling
            filterButtons.forEach(b => b.classList.remove('active'));
            const targetBtn = e.target;
            targetBtn.classList.add('active');

            const category = targetBtn.getAttribute('data-category');

            if (category === 'all') {
                resetToDefault();
            } else {
                performCategoryFilter(category);
            }
        });
    });

    // 3. Sort (Price/Rating)
    sortSelect.addEventListener('change', (e) => {
        const field = e.target.value;
        if (field === 'default') {
            resetToDefault();
        } else {
            performSort(field);
        }
    });

    // 4. Top Rated
    topRatedBtn.addEventListener('click', () => {
        performTopRated();
    });

    // 5. Pagination (Load More)
    loadMoreBtn.addEventListener('click', () => {
        if (currentMode === 'paginate' && !fullyLoaded) {
            currentPage++;
            fetchPaginatedBooks(currentPage, currentLimit, true); // Append = true
        }
    });

    // --- Core API Functions ---

    // Function to handle Mode 1: Search
    async function performSearch(term) {
        setMode('search');
        resultsTitle.textContent = `Search Results for "${term}"`;

        try {
            const response = await fetch(`/books/search?title=${encodeURIComponent(term)}`);
            if (!response.ok) throw new Error('Search failed');

            const books = await response.json();
            allBooks = books;
            renderBooks(allBooks);
        } catch (error) {
            console.error(error);
            showError('Failed to search books.');
        }
    }

    // Function to handle Mode 2: Category Filter
    async function performCategoryFilter(category) {
        setMode('filter');
        resultsTitle.textContent = `${category} Books`;

        try {
            const response = await fetch(`/books/category/${encodeURIComponent(category)}`);
            if (!response.ok) throw new Error('Filter failed');

            const books = await response.json();
            allBooks = books;
            renderBooks(allBooks);
        } catch (error) {
            console.error(error);
            showError('Failed to filter books.');
        }
    }

    // Function to handle Mode 3: Sort
    async function performSort(field) {
        setMode('sort');
        resultsTitle.textContent = `Books Sorted by ${field === 'price' ? 'Price (Low to High)' : 'Rating (High to Low)'}`;

        try {
            const response = await fetch(`/books/sort/${field}`);
            if (!response.ok) throw new Error('Sort failed');

            const books = await response.json();
            allBooks = books;
            renderBooks(allBooks);
        } catch (error) {
            console.error(error);
            showError('Failed to sort books.');
        }
    }

    // Function to handle Mode 4: Top Rated
    async function performTopRated() {
        setMode('topRated');
        resultsTitle.textContent = `Top Rated Books`;

        try {
            const response = await fetch(`/books/top`);
            if (!response.ok) throw new Error('Fetch top rated failed');

            const books = await response.json();
            allBooks = books;
            renderBooks(allBooks);
        } catch (error) {
            console.error(error);
            showError('Failed to fetch top rated books.');
        }
    }

    // Function to handle Mode 5: Pagination
    async function fetchPaginatedBooks(page, limit, append = false) {
        try {
            const response = await fetch(`/books?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('Pagination fetch failed');

            const result = await response.json();

            if (append) {
                allBooks = [...allBooks, ...result.data];
            } else {
                allBooks = result.data;
            }

            renderBooks(allBooks);

            // Update pagination UI state
            updatePaginationUI(result.currentPage, result.totalPages, allBooks.length, result.totalItems);

        } catch (error) {
            console.error(error);
            showError('Failed to fetch paginated books.');
        }
    }


    // --- UI Helper Functions ---

    function setMode(mode) {
        currentMode = mode;

        // Hide pagination controls if we are not in paginated mode
        // (Since the server logic provided doesn't natively combine pagination with sort/filter directly as per requirements)
        if (mode !== 'paginate') {
            paginationControls.classList.add('hidden');
        } else {
            paginationControls.classList.remove('hidden');
        }

        // Reset UI elements not belonging to current action (UX improvement)
        if (mode !== 'search') searchInput.value = '';
        if (mode !== 'filter') {
            filterButtons.forEach(b => b.classList.remove('active'));
            if (mode === 'paginate') document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
        }
        if (mode !== 'sort') sortSelect.value = 'default';
    }

    function resetToDefault() {
        setMode('paginate');
        resultsTitle.textContent = 'All Books';
        currentPage = 1;
        fullyLoaded = false;
        allBooks = [];
        fetchPaginatedBooks(currentPage, currentLimit);
    }

    function renderBooks(books) {
        booksContainer.innerHTML = '';
        resultsCount.textContent = `${books.length} items`;

        if (books.length === 0) {
            booksContainer.innerHTML = '<div class="no-results">No books found matching your criteria.</div>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = `book-card ${book.rating >= 4.8 ? 'featured' : ''}`;

            // Format price as currency
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
            });
            const formattedPrice = formatter.format(book.price);

            bookCard.innerHTML = `
                <span class="book-category">${escapeHTML(book.category)} &bull; ${book.year}</span>
                <h3 class="book-title">${escapeHTML(book.title)}</h3>
                <p class="book-author">by ${escapeHTML(book.author)}</p>
                <div class="book-details">
                    <span class="book-price">${formattedPrice}</span>
                    <span class="book-rating">
                        <span class="star-icon">★</span> ${book.rating}
                    </span>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });
    }

    function updatePaginationUI(page, totalPages, loadedCount, totalItems) {
        if (page >= totalPages) {
            fullyLoaded = true;
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'All Books Loaded';
            loadMoreBtn.classList.add('hidden');
        } else {
            fullyLoaded = false;
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More';
            loadMoreBtn.classList.remove('hidden');
        }

        paginationStatus.textContent = `Showing ${loadedCount} of ${totalItems} books`;
    }

    function showError(message) {
        booksContainer.innerHTML = `<div class="no-results" style="color: #e74c3c;">${message}</div>`;
        resultsCount.textContent = 'Error';
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
