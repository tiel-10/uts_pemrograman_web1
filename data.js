var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User",
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User",
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin",
    }
]

var dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "img/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: "Rp 220.000",
        cover: "img/manajemen_keuangan.jpg"
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: "Rp 150.000",
        cover: "img/kepemimpinan.jpg"
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: "Rp 200.000",
        cover: "img/mikrobiologi.jpg"
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: "Rp 250.000",
        cover: "img/paud_perkembangan.jpeg"
    }
]

var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan:[
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            },
        ]
    },
    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        status: "Selesai",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan:[
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },      
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
}

// Tambahkan variabel dataTransaksi di file data.js
var dataTransaksi = [
    {
        id: "TRX-001",
        tanggal: "2025-08-20",
        customer: {
            nama: "Rina Wulandari",
            email: "rina@gmail.com",
            telepon: "081234567890",
            alamat: "Jl. Merdeka No. 123, Jakarta"
        },
        items: [
            {
                kodeBarang: "ASIP4301",
                namaBarang: "Pengantar Ilmu Komunikasi",
                harga: 180000,
                quantity: 1,
                subtotal: 180000
            }
        ],
        total: 180000,
        status: "completed",
        metodeBayar: "transfer",
        trackingNumber: "20230012",
        catatan: "Buku sudah diterima dengan baik"
    },
    {
        id: "TRX-002",
        tanggal: "2025-08-21",
        customer: {
            nama: "Agus Pranoto",
            email: "agus@gmail.com",
            telepon: "081298765432",
            alamat: "Jl. Sudirman No. 456, Bandung"
        },
        items: [
            {
                kodeBarang: "EKMA4002",
                namaBarang: "Manajemen Keuangan",
                harga: 220000,
                quantity: 1,
                subtotal: 220000
            },
            {
                kodeBarang: "EKMA4310",
                namaBarang: "Kepemimpinan",
                harga: 150000,
                quantity: 1,
                subtotal: 150000
            }
        ],
        total: 370000,
        status: "completed",
        metodeBayar: "credit",
        trackingNumber: "20230013",
        catatan: "Pembayaran via kartu kredit"
    },
    {
        id: "TRX-003",
        tanggal: "2025-08-22",
        customer: {
            nama: "Siti Marlina",
            email: "siti@gmail.com",
            telepon: "081112223344",
            alamat: "Jl. Gatot Subroto No. 789, Surabaya"
        },
        items: [
            {
                kodeBarang: "BIOL4211",
                namaBarang: "Mikrobiologi Dasar",
                harga: 200000,
                quantity: 2,
                subtotal: 400000
            }
        ],
        total: 400000,
        status: "pending",
        metodeBayar: "transfer",
        trackingNumber: null,
        catatan: "Menunggu konfirmasi pembayaran"
    },
    {
        id: "TRX-004",
        tanggal: "2025-08-23",
        customer: {
            nama: "Budi Santoso",
            email: "budi@gmail.com",
            telepon: "081556677889",
            alamat: "Jl. Thamrin No. 321, Medan"
        },
        items: [
            {
                kodeBarang: "PAUD4401",
                namaBarang: "Perkembangan Anak Usia Dini",
                harga: 250000,
                quantity: 1,
                subtotal: 250000
            },
            {
                kodeBarang: "ASIP4301",
                namaBarang: "Pengantar Ilmu Komunikasi",
                harga: 180000,
                quantity: 1,
                subtotal: 180000
            }
        ],
        total: 430000,
        status: "cancelled",
        metodeBayar: "cod",
        trackingNumber: null,
        catatan: "Dibatalkan oleh customer"
    },
    {
        id: "TRX-005",
        tanggal: "2025-08-24",
        customer: {
            nama: "Dewi Anggraini",
            email: "dewi@gmail.com",
            telepon: "081998877665",
            alamat: "Jl. Asia Afrika No. 654, Bogor"
        },
        items: [
            {
                kodeBarang: "EKMA4310",
                namaBarang: "Kepemimpinan",
                harga: 150000,
                quantity: 3,
                subtotal: 450000
            }
        ],
        total: 450000,
        status: "completed",
        metodeBayar: "transfer",
        trackingNumber: "20230014",
        catatan: "Pesanan untuk keperluan seminar"
    }
];