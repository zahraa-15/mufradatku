# Mufradatku

Aplikasi belajar mufradat bahasa Arab berbasis Next.js, React, TypeScript dan Supabase. Palet: `#F6E2E9`, `#FEFAF3`, `#B8CFB3`, `#84A282`.

## Deploy fullstack ke Netlify

1. Unggah seluruh isi folder ini ke root repository GitHub. `package.json`, `package-lock.json`, dan `netlify.toml` harus sejajar. Jangan unggah ZIP ini langsung ke Netlify Drop.
2. Impor repository dari Netlify. Kosongkan Base directory dan Package directory jika package.json berada di root. Build command: `npm run build`. Publish directory: `.next`.
3. Adapter `@netlify/plugin-nextjs` dipasang secara eksplisit di devDependencies dan netlify.toml, agar halaman dan API route dikemas untuk Netlify. Jangan menonaktifkan adapter di pengaturan Netlify. Hapus NETLIFY_NEXT_PLUGIN_SKIP jika ada; jangan set NPM_FLAGS=--omit=dev atau NODE_ENV=production pada fase instalasi karena adapter adalah devDependency.
4. Untuk login dan sinkronisasi, jalankan `supabase/schema.sql` di Supabase, aktifkan Email/Password, lalu tambahkan SUPABASE_URL dan SUPABASE_ANON_KEY di Netlify dengan scope Builds dan Functions. Gunakan anon key, bukan service_role key. Tanpa variabel ini mode tamu tetap tersedia.
5. Atur Site URL Supabase ke URL HTTPS Netlify aplikasi. Tambahkan URL tersebut ke daftar redirect yang diizinkan bila diperlukan alur konfirmasi email.
6. Commit lalu deploy. Untuk situs lama gunakan Clear cache and deploy. Log harus menunjukkan adapter Next.js berjalan dan pengemasan server function. Build sukses saja belum membuktikan adapter dijalankan.
7. Buka `/`: halaman belajar harus tampil. Buka `/api/session`: harus mengembalikan JSON, bukan 404. Tanpa Supabase responsnya berisi configured:false. Setelah konfigurasi Supabase uji daftar, konfirmasi email, login, simpan progres, reload, dan logout.

Jangan tambahkan redirect SPA ke /index.html dan jangan gunakan output:'export': aplikasi ini memerlukan API route server.

## Menjalankan secara lokal

Prasyarat: Node.js 20.9+ dan npm. Ekstrak proyek, lalu jalankan dari folder yang berisi package.json:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000. Untuk mencoba mode tamu, kosongkan atau hapus `.env.local`; jangan biarkan placeholder contoh terpasang. Mode tamu menyimpan progres di browser dan dapat hilang ketika data browser dihapus.

## Mengaktifkan fullstack

1. Buat proyek Supabase milik Anda.
2. Buka SQL Editor dan jalankan `supabase/schema.sql` sekali. Tabel progres menggunakan Row Level Security: pengguna hanya dapat membaca dan mengubah progresnya sendiri.
3. Di Authentication, aktifkan login email/password. Atur Site URL ke domain Netlify Anda. Untuk pengembangan lokal, gunakan URL lokal sesuai kebutuhan pengujian konfirmasi email.
4. Isi `.env.local` dengan URL proyek dan **anon key** dari Supabase. Jangan gunakan service_role key. Variabel ini dibaca oleh route server Next.js.
5. Jalankan ulang server. Tombol akun kini menampilkan formulir daftar dan masuk. Jika konfirmasi email aktif, buka tautan konfirmasi dari email sebelum masuk.
6. Uji dengan dua akun berbeda untuk memastikan pemisahan progres. Akun baru dimulai dari progres kosong; progres tamu tetap tersimpan terpisah dan tidak digabung otomatis.

Frontend memanggil `/api/session` dan `/api/progress`. Backend memvalidasi identitas melalui Supabase Auth, memvalidasi payload progres, dan menggunakan token pengguna untuk akses database. Token disimpan pada cookie HttpOnly, SameSite=Lax, dan Secure pada produksi. Kata sandi tidak disimpan aplikasi.

Sesi mengikuti masa berlaku access token Supabase (biasanya satu jam); versi ini belum melakukan refresh token otomatis. Bila sesi berakhir, keluar dan masuk kembali. Teks status penyimpanan menunjukkan bila sinkronisasi gagal. Tidak ada penyimpanan progres akun ke localStorage; data tamu dan akun dipisahkan.

## GitHub dan Vercel

1. Buat repository GitHub kosong dan unggah **isi folder ini**, termasuk package-lock.json dan berkas tersembunyi `.gitignore`. Jangan unggah node_modules, .next, atau .env.local.
2. Alternatif melalui terminal:

```bash
git init
git add .
git commit -m "Build Mufradatku learning app"
git branch -M main
git remote add origin https://github.com/USERNAME/mufradatku.git
git push -u origin main
```

3. Di Vercel pilih Add New Project, impor repository, pilih framework Next.js dan root directory yang berisi package.json.
4. Tambahkan environment variables `SUPABASE_URL` dan `SUPABASE_ANON_KEY` untuk lingkungan yang akan dipakai. Tanpa keduanya aplikasi berjalan sebagai mode tamu.
5. Deploy dengan build command `npm run build`. Setelah mengubah environment variables, redeploy. Perbarui Site URL Supabase dengan URL aplikasi.
6. Periksa pendaftaran, konfirmasi email, masuk, favorit, perubahan progres, reload, logout, dan akses dari perangkat kedua.

Proyek ini disiapkan untuk GitHub/Vercel; repository dan deployment belum dibuat otomatis karena belum ada repository atau akses Vercel yang dipilih.

## Fitur

- Dashboard responsif dengan tema, statistik dan progres.
- 3 level bertema: Hobi, Keluarga, Sekolah; masing-masing 10 kosakata.
- Kartu dua sisi dengan teks berharakat, arti, transliterasi dan contoh kalimat.
- Mode uji ingatan menyembunyikan arti sebelum kartu dibalik. Penilaian ingatan dilakukan sendiri; bukan penilaian otomatis.
- Tombol Sudah ingat / Perlu diulang; navigasi kartu dan indikator posisi.
- Kamus kecil dengan pencarian Arab (mengabaikan harakat), Indonesia dan transliterasi.
- Favorit dan filter favorit.
- Web Speech API, pemilihan suara Arab dan kecepatan lambat. Tidak ada biaya API TTS dari aplikasi.
- Backend autentikasi dan progres per pengguna melalui Supabase.
- Dukungan reduced motion dan fokus keyboard.

Tiap level dapat langsung dibuka; belum ada penguncian level atau algoritme spaced repetition. Nomor level mengikuti urutan tema, bukan klaim tingkat CEFR.

## Audio dan materi

Suara Arab harus tersedia di browser/perangkat. Jika tidak tersedia, aplikasi menampilkan pesan; tidak berpindah diam-diam ke suara bahasa lain. Instal suara Arab atau coba perangkat lain. Kualitas TTS dan harakat akhir dapat berbeda. Koneksi dapat diperlukan oleh suara tertentu. Materi contoh perlu ditinjau pengajar bahasa Arab sebelum dipakai sebagai materi resmi.

Font Google dimuat dari CSS dengan fallback sistem, sehingga aplikasi tetap berfungsi bila layanan font tidak dapat diakses. Logo ikon SVG lokal tetap tersedia tanpa koneksi font. `public/logo-concept.png` adalah konsep logo sebelumnya; UI memakai ikon SVG yang mengikuti warna baru.

## Struktur

- `app/page.tsx`: antarmuka dan interaksi.
- `app/globals.css`: desain responsif dan palet.
- `app/api/session/route.ts`: login, daftar, informasi akun, logout.
- `app/api/progress/route.ts`: baca dan simpan progres.
- `lib/server.ts`: akses Supabase pada server.
- `lib/data.ts`: materi kosakata dan struktur progres.
- `supabase/schema.sql`: tabel dan kebijakan keamanan.
- `public/icon.svg`: ikon merek.

Tambah materi melalui `lib/data.ts`; bila jumlah kata atau level berubah, sesuaikan batas validasi API, statistik 30/10 dan tampilan progres.

## Pemeriksaan

```bash
npm run typecheck
npm run build
```

Build dan TypeScript diperiksa saat paket disiapkan. Pengujian visual di browser, audio perangkat nyata, dan integrasi Supabase langsung belum dilakukan pada lingkungan pembuat karena browser QA dan kredensial Supabase tidak tersedia. Lakukan daftar pemeriksaan deployment di atas sebelum rilis publik.
