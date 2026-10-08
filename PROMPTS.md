# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Daftar produk berhasil diambil dari tabel produk di Supabase pada sisi server. Koneksi Supabase dibuat di lib/supabase menggunakan environment variable. Produk ditampilkan menggunakan komponen KartuProduk tanpa mengubah tampilannya. Kondisi tabel kosong dan gagal mengambil data juga sudah ditangani.

**Perbaikan:**
Dilakukan pengecekan ulang terhadap nama tabel, kolom produk, dan environment variable agar data dapat ditampilkan dengan benar. CatatanBelumAktif juga dihapus dari halaman katalog.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail berhasil mengambil data satu produk dari Supabase berdasarkan id pada URL. Jika produk tidak ditemukan, halaman akan menggunakan notFound(). Tampilan halaman tetap menggunakan komponen yang sudah ada dan tombol WhatsApp tetap tersedia.

**Perbaikan:**
Dilakukan pengecekan terhadap parameter id dan query Supabase agar produk yang ditampilkan sesuai dengan URL. CatatanBelumAktif dihapus tanpa menghilangkan tombol WhatsApp.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Tombol WhatsApp berhasil diubah menjadi tautan wa.me dengan nomor toko dari lib/toko.js. Pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan sudah menggunakan encodeURIComponent dan tautan dibuka pada tab baru tanpa mengubah tampilan tombol.

**Perbaikan:**
Dilakukan pengecekan format nomor WhatsApp, format harga rupiah, dan encoding pesan agar karakter khusus tidak menyebabkan link WhatsApp bermasalah.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Fitur login admin berhasil menggunakan Supabase Auth dengan email dan password. Proses login dijalankan melalui Server Action dan sesi disimpan menggunakan cookie. Login berhasil mengarahkan admin ke /admin, sedangkan login gagal menampilkan pesan error. Tombol "Keluar" juga berhasil mengakhiri sesi dan mengarahkan kembali ke halaman login.

**Perbaikan:**
Dilakukan pengecekan konfigurasi SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY, alur cookie session, serta redirect setelah login dan logout agar autentikasi berjalan dengan benar.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Fitur ganti password berhasil dibuat menggunakan Supabase Auth. Password baru divalidasi di server dengan minimal 8 karakter dan harus sesuai dengan konfirmasi password. Pesan berhasil maupun error ditampilkan pada halaman setelah proses dilakukan.

**Perbaikan:**
Ditambahkan pengecekan agar hanya admin yang sedang login yang dapat mengganti password. Validasi juga diperbaiki agar password yang kurang dari 8 karakter atau tidak sesuai dengan konfirmasi ditolak.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
Proteksi halaman admin berhasil diterapkan menggunakan proxy.js. Halaman /admin dan rute admin lainnya hanya dapat diakses oleh pengguna yang sudah login. Pengguna yang belum memiliki sesi akan diarahkan ke /admin/login. Server Action yang melakukan perubahan data juga melakukan pengecekan autentikasi di sisi server.

**Perbaikan:**
Dilakukan pengecekan terhadap pengecualian /admin/login agar halaman login tetap dapat diakses tanpa autentikasi. Validasi sesi pada Server Action juga ditambahkan untuk mencegah akses langsung tanpa melalui halaman web.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
