// Global Variables
let currentUser = null;
let orderItems = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Login Page
    if (document.getElementById('loginForm')) {
        initializeLoginPage();
    }
    
    // Dashboard Page
    if (document.getElementById('greeting')) {
        initializeDashboard();
    }
    
    // Stock Page
    if (document.getElementById('stockTableBody')) {
        initializeStockPage();
    }
    
    // Checkout Page
    if (document.getElementById('checkoutForm')) {
        initializeCheckoutPage();
    }
    
    // Tracking Page
    if (document.getElementById('searchTracking')) {
        initializeTrackingPage();
    }
    
    // History Page
    if (document.getElementById('historyTableBody')) {
        initializeHistoryPage();
    }
}

// ==================== LOGIN PAGE FUNCTIONS ====================
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordBtn = document.getElementById('forgotPassword');
    const registerBtn = document.getElementById('register');
    const forgotModal = document.getElementById('forgotModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close');

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Modal handlers
    forgotPasswordBtn.addEventListener('click', function() {
        forgotModal.style.display = 'block';
    });

    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
    });

    // Close modal buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            forgotModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === forgotModal) {
            forgotModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Handle forgot password form
    document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        if (email) {
            showNotification('Link reset password telah dikirim ke email Anda!', 'success');
            forgotModal.style.display = 'none';
            document.getElementById('resetEmail').value = '';
        } else {
            showNotification('Silakan masukkan email Anda!', 'error');
        }
    });

    // Handle register form
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        
        if (name && email && password) {
            showNotification('Pendaftaran berhasil! Silakan login.', 'success');
            registerModal.style.display = 'none';
            document.getElementById('registerForm').reset();
        } else {
            showNotification('Silakan lengkapi semua data!', 'error');
        }
    });
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginButton = document.querySelector('#loginForm .btn-primary');

    // Validasi input
    if (!email || !password) {
        showNotification('Silakan isi email dan password!', 'error');
        return;
    }

    // Set loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;

    // Simulasi proses login
    setTimeout(() => {
        // Cari user di dataPengguna
        const user = dataPengguna.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showNotification(`Login berhasil! Selamat datang ${user.nama}`, 'success');
            
            // Redirect ke dashboard setelah 1 detik
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Tampilkan custom alert untuk login error
            showLoginErrorAlert();
            
            // Tambahkan efek shake pada form
            const loginForm = document.querySelector('.login-form');
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 600);
            
            // Highlight input yang error
            document.getElementById('email').classList.add('error');
            document.getElementById('password').classList.add('error');
            
            setTimeout(() => {
                document.getElementById('email').classList.remove('error');
                document.getElementById('password').classList.remove('error');
            }, 3000);
        }
        
        // Remove loading state
        loginButton.classList.remove('loading');
        loginButton.disabled = false;
    }, 1000);
}

// Fungsi untuk menampilkan custom alert error login
function showLoginErrorAlert() {
    const alert = document.getElementById('loginErrorAlert');
    alert.classList.add('show');
    
    // Auto close setelah 5 detik
    setTimeout(() => {
        closeLoginError();
    }, 5000);
}

// Fungsi untuk menutup custom alert
function closeLoginError() {
    const alert = document.getElementById('loginErrorAlert');
    alert.classList.remove('show');
}

// Tambahkan event listener untuk close alert dengan ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLoginError();
    }
});

// Close alert ketika klik di luar content
document.getElementById('loginErrorAlert').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLoginError();
    }
});

// ==================== DASHBOARD FUNCTIONS ====================
function initializeDashboard() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    } else {
        window.location.href = 'index.html';
        return;
    }

    updateGreeting();
    setInterval(updateGreeting, 60000); // Update every minute
}

function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const timeDisplay = document.getElementById('timeDisplay');
    const now = new Date();
    const hours = now.getHours();
    
    let greeting = 'Selamat ';
    if (hours < 12) {
        greeting += 'Pagi';
    } else if (hours < 15) {
        greeting += 'Siang';
    } else if (hours < 19) {
        greeting += 'Sore';
    } else {
        greeting += 'Malam';
    }
    
    if (currentUser) {
        greeting += `, ${currentUser.nama}!`;
    }
    
    greetingElement.textContent = greeting;
    timeDisplay.textContent = now.toLocaleString('id-ID');
}

// ==================== STOCK PAGE FUNCTIONS ====================
function initializeStockPage() {
    displayStockTable();
    
    const addStockBtn = document.getElementById('addStockBtn');
    const addStockModal = document.getElementById('addStockModal');
    const addStockForm = document.getElementById('addStockForm');
    const closeBtn = addStockModal.querySelector('.close');

    addStockBtn.addEventListener('click', function() {
        addStockModal.style.display = 'block';
        // Reset form ketika modal dibuka
        addStockForm.reset();
    });

    closeBtn.addEventListener('click', function() {
        addStockModal.style.display = 'none';
    });

    addStockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewStock();
    });

    window.addEventListener('click', function(e) {
        if (e.target === addStockModal) {
            addStockModal.style.display = 'none';
        }
    });
}

function displayStockTable() {
    const tableBody = document.getElementById('stockTableBody');
    tableBody.innerHTML = '';

    dataKatalogBuku.forEach(book => {
        const row = document.createElement('tr');
        
        // Cek apakah file gambar ada
        const coverPath = book.cover || 'img/default.jpg';
        const imgAlt = book.namaBarang;
        
        row.innerHTML = `
            <td>
                <div class="book-cover">
                    <img src="${coverPath}" alt="${imgAlt}" 
                         onerror="this.src='img/default.jpg'; this.alt='Cover tidak tersedia'"
                         class="cover-image">
                </div>
            </td>
            <td>${book.kodeBarang}</td>
            <td><strong>${book.namaBarang}</strong></td>
            <td>${book.jenisBarang}</td>
            <td>Edisi ${book.edisi}</td>
            <td>
                <span class="stock-badge ${book.stok > 50 ? 'in-stock' : 'low-stock'}">
                    ${book.stok} pcs
                </span>
            </td>
            <td class="price">${book.harga}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-secondary edit-btn" onclick="editStock('${book.kodeBarang}')">
                        ✏️ Edit
                    </button>
                    <button class="btn-secondary delete-btn" onclick="deleteStock('${book.kodeBarang}')">
                        🗑️ Hapus
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function addNewStock() {
    const newBook = {
        kodeBarang: document.getElementById('bookCode').value,
        namaBarang: document.getElementById('bookTitle').value,
        jenisBarang: document.getElementById('bookType').value,
        edisi: document.getElementById('bookEdition').value,
        stok: parseInt(document.getElementById('bookStock').value),
        harga: document.getElementById('bookPrice').value,
        cover: document.getElementById('bookCover').value ? `img/${document.getElementById('bookCover').value}` : 'img/default.jpg'
    };

    // Validasi kode barang unik
    const existingBook = dataKatalogBuku.find(b => b.kodeBarang === newBook.kodeBarang);
    if (existingBook) {
        showNotification('Kode barang sudah ada! Gunakan kode yang berbeda.', 'error');
        return;
    }

    dataKatalogBuku.push(newBook);
    displayStockTable();
    
    document.getElementById('addStockForm').reset();
    document.getElementById('addStockModal').style.display = 'none';
    
    showNotification('Stok buku berhasil ditambahkan!', 'success');
}

function editStock(kodeBarang) {
    const book = dataKatalogBuku.find(b => b.kodeBarang === kodeBarang);
    if (book) {
        // Isi form dengan data yang ada
        document.getElementById('bookCode').value = book.kodeBarang;
        document.getElementById('bookTitle').value = book.namaBarang;
        document.getElementById('bookType').value = book.jenisBarang;
        document.getElementById('bookEdition').value = book.edisi;
        document.getElementById('bookStock').value = book.stok;
        document.getElementById('bookPrice').value = book.harga;
        
        // Extract filename dari path cover
        const coverPath = book.cover || '';
        const fileName = coverPath.replace('img/', '');
        document.getElementById('bookCover').value = fileName;
        
        // Tampilkan modal
        document.getElementById('addStockModal').style.display = 'block';
        
        // Ubah judul modal menjadi Edit
        document.querySelector('#addStockModal h2').textContent = 'Edit Stok Buku';
        
        // Simpan kode barang yang sedang diedit
        document.getElementById('addStockForm').setAttribute('data-editing', kodeBarang);
    }
}

function deleteStock(kodeBarang) {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
        dataKatalogBuku = dataKatalogBuku.filter(b => b.kodeBarang !== kodeBarang);
        displayStockTable();
        showNotification('Buku berhasil dihapus!', 'success');
    }
}

// Update form submission untuk handle edit
document.addEventListener('DOMContentLoaded', function() {
    const addStockForm = document.getElementById('addStockForm');
    if (addStockForm) {
        addStockForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const editingCode = this.getAttribute('data-editing');
            if (editingCode) {
                // Jika sedang edit, hapus buku lama dan tambahkan yang baru
                dataKatalogBuku = dataKatalogBuku.filter(b => b.kodeBarang !== editingCode);
                this.removeAttribute('data-editing');
                document.querySelector('#addStockModal h2').textContent = 'Tambah Stok Baru';
            }
            addNewStock();
        });
    }
});

// ==================== CHECKOUT PAGE FUNCTIONS ====================
function initializeCheckoutPage() {
    populateBookSelect();
    
    document.getElementById('addToOrder').addEventListener('click', addToOrder);
    document.getElementById('checkoutForm').addEventListener('submit', processOrder);
    
    updateOrderTotal();
}

function populateBookSelect() {
    const bookSelect = document.getElementById('bookSelect');
    bookSelect.innerHTML = '<option value="">Pilih Buku</option>';
    
    dataKatalogBuku.forEach(book => {
        const option = document.createElement('option');
        option.value = book.kodeBarang;
        option.textContent = `${book.namaBarang} - ${book.harga}`;
        option.setAttribute('data-price', book.harga.replace(/[^\d]/g, ''));
        bookSelect.appendChild(option);
    });
}

function addToOrder() {
    const bookSelect = document.getElementById('bookSelect');
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!bookSelect.value || quantity < 1) {
        showNotification('Pilih buku dan masukkan jumlah yang valid!', 'error');
        return;
    }
    
    const selectedBook = dataKatalogBuku.find(b => b.kodeBarang === bookSelect.value);
    const price = parseInt(selectedBook.harga.replace(/[^\d]/g, ''));
    
    const existingItem = orderItems.find(item => item.kodeBarang === selectedBook.kodeBarang);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subtotal = existingItem.quantity * price;
    } else {
        orderItems.push({
            kodeBarang: selectedBook.kodeBarang,
            namaBarang: selectedBook.namaBarang,
            price: price,
            quantity: quantity,
            subtotal: price * quantity
        });
    }
    
    updateOrderDisplay();
    bookSelect.value = '';
    document.getElementById('quantity').value = 1;
}

function updateOrderDisplay() {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = '';
    
    orderItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.namaBarang}</td>
            <td>Rp ${item.price.toLocaleString('id-ID')}</td>
            <td>${item.quantity}</td>
            <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
            <td>
                <button class="btn-secondary" onclick="removeOrderItem(${index})">Hapus</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    });
    
    updateOrderTotal();
}

function removeOrderItem(index) {
    orderItems.splice(index, 1);
    updateOrderDisplay();
}

function updateOrderTotal() {
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    document.getElementById('totalAmount').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function processOrder(e) {
    e.preventDefault();
    
    if (orderItems.length === 0) {
        showNotification('Tambahkan minimal satu buku ke pesanan!', 'error');
        return;
    }
    
    const customerName = document.getElementById('customerName').value;
    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    showNotification(`Pesanan berhasil diproses! Pemesan: ${customerName}, Total: Rp ${total.toLocaleString('id-ID')}`, 'success');
    
    // Reset form
    orderItems = [];
    updateOrderDisplay();
    document.getElementById('checkoutForm').reset();
}

// ==================== TRACKING PAGE FUNCTIONS ====================
function initializeTrackingPage() {
    document.getElementById('searchTracking').addEventListener('click', searchTracking);
}

function searchTracking() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const result = dataTracking[trackingNumber];
    const resultDiv = document.getElementById('trackingResult');
    
    if (result) {
        displayTrackingResult(result);
        resultDiv.style.display = 'block';
    } else {
        showNotification('Nomor Delivery Order tidak ditemukan!', 'error');
        resultDiv.style.display = 'none';
    }
}

function displayTrackingResult(trackingData) {
    // Update basic info
    document.getElementById('trackingName').textContent = trackingData.nama;
    document.getElementById('trackingStatus').textContent = trackingData.status;
    document.getElementById('trackingStatus').setAttribute('data-status', trackingData.status);
    document.getElementById('trackingExpedition').textContent = trackingData.ekspedisi;
    document.getElementById('trackingDate').textContent = new Date(trackingData.tanggalKirim).toLocaleDateString('id-ID');
    document.getElementById('trackingPackage').textContent = trackingData.paket;
    document.getElementById('trackingTotal').textContent = trackingData.total;
    
    // Update progress bar
    updateProgressBar(trackingData.status);
    
    // Update history
    displayTrackingHistory(trackingData.perjalanan);
}

function updateProgressBar(status) {
    const progressFill = document.getElementById('progressFill');
    let progress = 0;
    
    switch(status) {
        case 'Dikirim':
            progress = 25;
            break;
        case 'Dalam Perjalanan':
            progress = 50;
            break;
        case 'Sampai di Tujuan':
            progress = 75;
            break;
        case 'Selesai':
            progress = 100;
            break;
        default:
            progress = 0;
    }
    
    progressFill.style.width = `${progress}%`;
}

function displayTrackingHistory(history) {
    const historyDiv = document.getElementById('trackingHistory');
    historyDiv.innerHTML = '';
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        historyItem.innerHTML = `
            <div class="history-time">${formatDateTime(item.waktu)}</div>
            <div class="history-desc">${item.keterangan}</div>
        `;
        
        historyDiv.appendChild(historyItem);
    });
}

function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr.replace(' ', 'T'));
    return date.toLocaleString('id-ID');
}

// ==================== HISTORY TRANSACTIONS FUNCTIONS ====================
function initializeHistoryPage() {
    displayHistoryTable();
    setupHistoryFilters();
    updateStats();
    
    const detailModal = document.getElementById('detailModal');
    const closeBtn = detailModal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        detailModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === detailModal) {
            detailModal.style.display = 'none';
        }
    });
}

function displayHistoryTable() {
    const tableBody = document.getElementById('historyTableBody');
    tableBody.innerHTML = '';
    
    if (dataTransaksi.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <div class="icon">📊</div>
                        <h3>Belum Ada Transaksi</h3>
                        <p>Transaksi yang dilakukan akan muncul di sini.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    dataTransaksi.forEach(transaction => {
        const row = document.createElement('tr');
        const totalItems = transaction.items.reduce((sum, item) => sum + item.quantity, 0);
        
        row.innerHTML = `
            <td><strong>${transaction.id}</strong></td>
            <td>${formatDate(transaction.tanggal)}</td>
            <td>
                <div>
                    <strong>${transaction.customer.nama}</strong><br>
                    <small>${transaction.customer.email}</small>
                </div>
            </td>
            <td>${totalItems} item</td>
            <td class="price">Rp ${transaction.total.toLocaleString('id-ID')}</td>
            <td>
                <span class="status-badge status-${transaction.status}">
                    ${getStatusText(transaction.status)}
                </span>
            </td>
            <td>
                <span class="payment-method ${transaction.metodeBayar}">
                    ${getPaymentMethodText(transaction.metodeBayar)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="detail-btn view" onclick="showTransactionDetail('${transaction.id}')">
                        👁️ Detail
                    </button>
                    ${transaction.trackingNumber ? `
                        <button class="detail-btn track" onclick="trackOrder('${transaction.trackingNumber}')">
                            📦 Track
                        </button>
                    ` : ''}
                    <button class="detail-btn print" onclick="printInvoice('${transaction.id}')">
                        🖨️ Print
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function setupHistoryFilters() {
    const filterStatus = document.getElementById('filterStatus');
    const searchInput = document.getElementById('searchTransaction');
    
    filterStatus.addEventListener('change', filterTransactions);
    searchInput.addEventListener('input', filterTransactions);
}

function filterTransactions() {
    const statusFilter = document.getElementById('filterStatus').value;
    const searchTerm = document.getElementById('searchTransaction').value.toLowerCase();
    
    const filteredTransactions = dataTransaksi.filter(transaction => {
        const statusMatch = statusFilter === 'all' || transaction.status === statusFilter;
        const searchMatch = 
            transaction.id.toLowerCase().includes(searchTerm) ||
            transaction.customer.nama.toLowerCase().includes(searchTerm) ||
            transaction.customer.email.toLowerCase().includes(searchTerm);
        
        return statusMatch && searchMatch;
    });
    
    displayFilteredHistory(filteredTransactions);
}

function displayFilteredHistory(transactions) {
    const tableBody = document.getElementById('historyTableBody');
    tableBody.innerHTML = '';
    
    if (transactions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <div class="icon">🔍</div>
                        <h3>Transaksi Tidak Ditemukan</h3>
                        <p>Coba gunakan kata kunci atau filter yang berbeda.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const totalItems = transaction.items.reduce((sum, item) => sum + item.quantity, 0);
        
        row.innerHTML = `
            <td><strong>${transaction.id}</strong></td>
            <td>${formatDate(transaction.tanggal)}</td>
            <td>
                <div>
                    <strong>${transaction.customer.nama}</strong><br>
                    <small>${transaction.customer.email}</small>
                </div>
            </td>
            <td>${totalItems} item</td>
            <td class="price">Rp ${transaction.total.toLocaleString('id-ID')}</td>
            <td>
                <span class="status-badge status-${transaction.status}">
                    ${getStatusText(transaction.status)}
                </span>
            </td>
            <td>
                <span class="payment-method ${transaction.metodeBayar}">
                    ${getPaymentMethodText(transaction.metodeBayar)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="detail-btn view" onclick="showTransactionDetail('${transaction.id}')">
                        👁️ Detail
                    </button>
                    ${transaction.trackingNumber ? `
                        <button class="detail-btn track" onclick="trackOrder('${transaction.trackingNumber}')">
                            📦 Track
                        </button>
                    ` : ''}
                    <button class="detail-btn print" onclick="printInvoice('${transaction.id}')">
                        🖨️ Print
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateStats() {
    const totalTransactions = dataTransaksi.length;
    const completedTransactions = dataTransaksi.filter(t => t.status === 'completed').length;
    const pendingTransactions = dataTransaksi.filter(t => t.status === 'pending').length;
    const totalRevenue = dataTransaksi
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.total, 0);
    
    document.getElementById('totalTransactions').textContent = totalTransactions;
    document.getElementById('completedTransactions').textContent = completedTransactions;
    document.getElementById('pendingTransactions').textContent = pendingTransactions;
    document.getElementById('totalRevenue').textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
}

function showTransactionDetail(transactionId) {
    const transaction = dataTransaksi.find(t => t.id === transactionId);
    if (!transaction) return;
    
    const detailContent = document.getElementById('transactionDetail');
    
    detailContent.innerHTML = `
        <div class="transaction-detail">
            <div class="detail-section">
                <h3>Informasi Transaksi</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>ID Transaksi</label>
                        <span>${transaction.id}</span>
                    </div>
                    <div class="detail-item">
                        <label>Tanggal</label>
                        <span>${formatDate(transaction.tanggal)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status</label>
                        <span class="status-badge status-${transaction.status}">
                            ${getStatusText(transaction.status)}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Total</label>
                        <span class="price">Rp ${transaction.total.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Informasi Customer</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Nama</label>
                        <span>${transaction.customer.nama}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email</label>
                        <span>${transaction.customer.email}</span>
                    </div>
                    <div class="detail-item">
                        <label>Telepon</label>
                        <span>${transaction.customer.telepon}</span>
                    </div>
                    <div class="detail-item">
                        <label>Alamat</label>
                        <span>${transaction.customer.alamat}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Items yang Dipesan</h3>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Buku</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transaction.items.map(item => `
                            <tr>
                                <td>${item.namaBarang}</td>
                                <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
                                <td>${item.quantity}</td>
                                <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="detail-section">
                <h3>Informasi Pembayaran & Pengiriman</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Metode Bayar</label>
                        <span class="payment-method ${transaction.metodeBayar}">
                            ${getPaymentMethodText(transaction.metodeBayar)}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>No. Tracking</label>
                        <span>${transaction.trackingNumber || 'Belum tersedia'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Catatan</label>
                        <span>${transaction.catatan || 'Tidak ada catatan'}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detailModal').style.display = 'block';
}

function trackOrder(trackingNumber) {
    window.location.href = `tracking.html?do=${trackingNumber}`;
}

function printInvoice(transactionId) {
    showNotification(`Fitur print invoice untuk transaksi ${transactionId} akan segera tersedia!`, 'info');
}

// ==================== UTILITY FUNCTIONS ====================
function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Selesai',
        'pending': 'Pending',
        'cancelled': 'Dibatalkan'
    };
    return statusMap[status] || status;
}

function getPaymentMethodText(method) {
    const methodMap = {
        'transfer': 'Transfer Bank',
        'credit': 'Kartu Kredit',
        'cod': 'COD (Cash on Delivery)'
    };
    return methodMap[method] || method;
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Tambahkan ke body
    document.body.appendChild(notification);

    // Tampilkan notifikasi
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}