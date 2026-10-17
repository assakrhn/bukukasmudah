Kas Mudah — versi diperbarui

Unggah seluruh isi folder ini ke root repository GitHub Pages:
- index.html
- manifest.json
- sw.js
- assets/ (folder beserta isi)

Fitur yang diperbarui:
1. Jenis transaksi dipilih melalui tombol Debit (Masuk) atau Kredit (Keluar).
2. Pengaturan kegiatan disembunyikan setelah disimpan; gunakan tombol Edit Pengaturan untuk membukanya.
3. Scorecard Target Dana memiliki tombol Edit Target.
4. Logo utama dan favicon dibaca dari folder assets.
5. PDF: halaman awal berisi nama kegiatan, rentang waktu, scorecard uang rencana/realisasi/saldo sisa, dan tabel kas. Halaman lampiran berikutnya memuat maksimal dua transaksi per halaman, termasuk foto struk dan foto barang jika tersedia.

Catatan:
- Data transaksi lama tetap di browser karena nama database dan skema IndexedDB tidak diganti.
- Backup JSON sekarang juga menyimpan tanggal mulai/selesai dan status pengaturan kegiatan.
- Folder assets pada paket ini berisi logo.svg, logo.png, favicon.svg, favicon.png, favicon.ico. Jika ingin menampilkan Konsep 1 dan 2 di galeri pengaturan, tambahkan assets/logo-dompet.png dan assets/logo-koin.png dengan nama persis tersebut.
- Setelah deploy, tutup aplikasi dan buka kembali/refresh. Service Worker dinaikkan ke v3 agar file terbaru terambil.
