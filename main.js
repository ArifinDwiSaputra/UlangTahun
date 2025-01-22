document.addEventListener("DOMContentLoaded", () => {
  // Skrip Pertama
  const animasiImage = document.getElementById("animasiImage");
  const header = document.getElementById("header");
  const purpleDivider = document.querySelector(".purple-divider");
  const gift = document.getElementById("gift");
  const bawah = document.getElementById("bawah");

  // Tambahkan elemen audio
  const audio = new Audio("assets/audio/Hbd.mp3");
  audio.loop = true; // Lagu akan terus berulang

  // Cek apakah gambar sudah diklik sebelumnya
  if (sessionStorage.getItem("animasiClicked") !== "true") {
    document.getElementById("layar-awal").style.display = "flex";
    document.body.style.overflow = "hidden";

    // Sembunyikan semua elemen lain
    header.classList.add("hidden");
    purpleDivider.classList.add("hidden");
    gift.classList.add("hidden");
    bawah.classList.add("hidden");
  } else {
    document.getElementById("layar-awal").style.display = "none";
    document.body.style.overflow = "auto";
    header.classList.add("visible");
    purpleDivider.classList.add("visible");
    gift.classList.add("visible");
    bawah.classList.add("visible");

    // Putar lagu dan panggil skrip kedua langsung jika gambar sudah diklik sebelumnya
    audio.play();
    initializeHeaderAnimation();
  }

  // Event listener untuk gambar di layar awal
  animasiImage.addEventListener("click", () => {
    document.getElementById("layar-awal").style.display = "none";
    document.body.style.overflow = "auto";

    header.classList.add("visible");
    purpleDivider.classList.add("visible");
    gift.classList.add("visible");
    bawah.classList.add("visible");

    sessionStorage.setItem("animasiClicked", "true");

    // Putar lagu setelah gambar diklik
    audio.play();

    // Panggil skrip kedua setelah gambar diklik
    initializeHeaderAnimation();
  });

  // Skrip Kedua
  function initializeHeaderAnimation() {
    const headingText = "HAPPY BIRTHDAY!";
    const descriptionText = "SHINTAA AULIAA";

    const typeWriter = (element, text, delay = 100, callback = null) => {
      let i = 0;
      const cursor = document.createElement("span");
      cursor.classList.add("cursor");
      element.appendChild(cursor);

      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, delay);
        } else {
          cursor.remove();
          if (callback) callback();
        }
      };
      type();
    };

    const headingElement = document.querySelector(".birthday-heading");
    const descriptionElement = document.querySelector(".birthday-description");
    const scrollDownElement = document.querySelector(".scroll-down");

    typeWriter(headingElement, headingText, 100, () => {
      typeWriter(descriptionElement, descriptionText, 50, () => {
        scrollDownElement.style.opacity = "0"; // Sembunyikan dulu
        scrollDownElement.style.display = "block"; // Tampilkan elemen
        setTimeout(() => {
          scrollDownElement.style.opacity = "1"; // Fade-in
        }, 10); // Delay kecil untuk memulai transisi
      });
    });
  }

  // Event listener untuk mempause/memutar lagu ketika halaman diminimize/dibuka
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      audio.pause(); // Pause lagu jika halaman diminimize
    } else {
      if (sessionStorage.getItem("animasiClicked") === "true") {
        audio.play(); // Lanjutkan lagu jika halaman dibuka kembali
      }
    }
  });
});

// GIFT
document.addEventListener("DOMContentLoaded", () => {
  const giftImages = document.querySelectorAll(".gift-container > img");
  const birthdayCards = document.querySelectorAll(".birthday-card");
  const closeButtons = document.querySelectorAll(".close-button");
  const balloonContainer = document.querySelector(".balloon-container"); // Pastikan container ini ada di HTML

  // Buat elemen audio
  const clapAudio = new Audio("assets/audio/clap.mp3"); // Pastikan path ke file clap.mp3 benar

  giftImages.forEach((giftImage, index) => {
    giftImage.addEventListener("click", () => {
      // Sembunyikan semua gift kecuali yang diklik
      giftImages.forEach((img, i) => {
        if (i !== index) {
          img.parentElement.style.display = "none"; // Sembunyikan container gift lainnya
        }
      });

      // Tampilkan kartu ucapan untuk gift yang diklik
      giftImage.style.animation = "bounce 0.6s";
      setTimeout(() => {
        giftImage.style.animation = ""; // Hapus animasi setelah selesai
        birthdayCards[index].style.display = "block";

        // Mainkan audio clap
        clapAudio.currentTime = 0; // Mulai dari awal
        clapAudio.play();

        // Nonaktifkan scroll halaman
        document.body.style.overflow = "hidden";
      }, 400);

      // Dynamically create balloons with random behavior
      for (let i = 0; i < 30; i++) {
        let balloon = document.createElement("img");

        // Randomize balloon color
        const colors = ["1.gif", "2.gif", "3.gif"];
        balloon.src = `assets/img/${colors[Math.floor(Math.random() * colors.length)]}`;

        // Add class and styling
        balloon.classList.add("balloon");

        // Random horizontal and vertical position
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.bottom = `${Math.random() * 100}vh`; // Initial random position

        // Random start animation delay and duration
        balloon.style.animationDuration = `${Math.random() * 4 + 3}s`; // Random duration
        balloon.style.animationDelay = `${Math.random() * 2}s`; // Random delay

        // Append balloon to container
        balloonContainer.appendChild(balloon);
      }
    });

    closeButtons[index].addEventListener("click", () => {
      // Tutup kartu ucapan
      birthdayCards[index].style.animation = "fadeOut 0.5s";
      setTimeout(() => {
        birthdayCards[index].style.display = "none";
        birthdayCards[index].style.animation = ""; // Hapus animasi fadeOut

        // Aktifkan kembali scroll halaman
        document.body.style.overflow = "auto";

        // Hentikan audio clap
        clapAudio.pause();
        clapAudio.currentTime = 0; // Reset audio ke awal

        // Hapus semua balon
        while (balloonContainer.firstChild) {
          balloonContainer.removeChild(balloonContainer.firstChild);
        }
      }, 400);
    });
  });
});


// SURAT
document.getElementById("toggleImage").addEventListener("click", function () {
  const image = document.getElementById("toggleImage");
  const textContent = document.getElementById("textContent");

  if (image.src.includes("letter-open.png")) {
    // Tambahkan kelas untuk efek transisi keluar
    image.classList.add("fade-out");

    // Setelah transisi selesai, ubah gambar kembali ke "letter.png"
    setTimeout(() => {
      image.src = "assets/img/letter.png";
      image.classList.remove("fade-out");
      image.classList.add("fade-in");
    }, 275); // Durasi transisi fade-out

    // Sembunyikan teks
    textContent.style.display = "none";
  } else {
    // Tambahkan kelas untuk efek transisi keluar
    image.classList.add("fade-out");

    // Setelah transisi selesai, ubah gambar ke "letter-open.png"
    setTimeout(() => {
      image.src = "assets/img/letter-open.png";
      image.classList.remove("fade-out");
      image.classList.add("fade-in");
    }, 275); // Durasi transisi fade-out

    // Tampilkan teks
    setTimeout(() => {
      textContent.style.display = "block";
    }, 100); // Sesuaikan waktu agar sinkron dengan animasi
  }
});

