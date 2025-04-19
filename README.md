# restaurant-microservices

microservices-restaurant structured architecture

## Struktur Project
restaurant-microservices/
 ├─ docker-compose.yml
 ├─ order-service/
 ├─ kitchen-service/
 ├─ notification-service/
 └─ README.md

---

## Cara Menjalankan Project

1. **Siapkan file .env untuk setiap service**
   - Contoh untuk notification-service:
     ```env
     MONGO_URI=mongodb+srv://dbuser:dbPass123@cluster0.dbnokoi.mongodb.net/restaurantMicroservices?retryWrites=true&w=majority&appName=Cluster0
     RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
     ```
2. **Install dependency di masing-masing service**
   ```bash
   cd order-service && npm install
   cd ../kitchen-service && npm install
   cd ../notification-service && npm install
   ```
3. **Jalankan dengan Docker Compose**
   ```bash
   docker-compose up --build
   ```

---

## Whitelist IP untuk MongoDB Atlas

Agar service bisa connect ke MongoDB Atlas, lakukan whitelist IP:

1. **Cari IP Publik Komputer Anda:**
   - Buka https://ifconfig.me/ atau https://www.whatismyip.com/ di browser.
   - Catat IP yang muncul.
2. **Login ke MongoDB Atlas** (https://cloud.mongodb.com/)
3. **Pilih Project & Cluster**
4. **Buka menu Network Access**
5. **Klik Add IP Address**
6. **Masukkan IP address** hasil langkah 1, lalu klik Confirm.
   - Untuk debug sementara, bisa gunakan `0.0.0.0/0` (tidak aman untuk production).
7. **Tunggu hingga status Active (1-2 menit).**
8. **Restart service:**
   ```bash
   docker-compose restart notification-service
   ```

---

## Troubleshooting Koneksi MongoDB

- **Jika gagal koneksi:**
  - Pastikan user/password di MONGO_URI benar.
  - Pastikan IP sudah di-whitelist di Atlas.
  - Pastikan cluster Atlas statusnya Running.
  - Jika password ada karakter spesial, encode dengan benar (misal `@` jadi `%40`).
- **Cek log notification-service:**
  ```bash
  docker logs notification-service
  ```
- **Tes manual koneksi:**
  ```bash
  mongosh "<MONGO_URI>"
  ```

---

## Catatan Keamanan
- Setelah testing, ganti whitelist dari `0.0.0.0/0` ke IP yang spesifik.
- Jangan commit file .env ke repository publik.

---

Untuk pertanyaan lebih lanjut, cek dokumentasi masing-masing service atau hubungi maintainer project.

