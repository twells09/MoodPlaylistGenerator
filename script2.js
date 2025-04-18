let selectedMood = localStorage.getItem("mood") || "";
let selectedGenres;

try {
  selectedGenres = JSON.parse(localStorage.getItem("genres") || "[]");
} catch (error) {
  console.error("Error parsing genres from localStorage:", error);
  selectedGenres = [];
}

function selectMood(mood) {
  // Save the selected mood
  localStorage.setItem("mood", mood);
  localStorage.removeItem("genres");

  // Highlight mood
  const moodContainers = document.querySelectorAll(".mood-container");
  moodContainers.forEach((container) => {
    container.classList.remove("selected"); // Remove 'selected' from all
  });

  
  const selectedContainer = document.querySelector(`.mood-container[onclick="selectMood('${mood}')"]`);
  if (selectedContainer) {
    selectedContainer.classList.add("selected");
  }

  // Redirect to the genre selection page
  window.location.href = "genre.html";
}

function toggleGenre(element, genre) {
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    selectedGenres = selectedGenres.filter((selectedGenre) => selectedGenre !== genre);
  } else {
    element.classList.add("selected");
    selectedGenres.push(genre);
  }

  localStorage.setItem("genres", JSON.stringify(selectedGenres));
}

function saveGenres() {
  if (selectedGenres.length === 0) {
    alert("Please select at least one genre before proceeding.");
    return;
  }

  localStorage.setItem("genres", JSON.stringify(selectedGenres));
  window.location.href = "playlist.html";
}

function getPlaylists() {
  return {
    happy: {
      pop: { title: "Happy Pop Hits", link: "37i9dQZF1DWVlYsZJXqdym" },
      hiphop: { title: "Happy Hip Hop Vibes", link: "37i9dQZF1EIcHCl8kCVSai" },
      country: { title: "Happy Country Tunes", link: "5pxItCRqm3tt66tNtAE9sg" },
      house: { title: "Feel Good House Beats", link: "37i9dQZF1EIdVgSaFrQPK9" },
      rnb: { title: "Happy RnB Vibes", link: "37i9dQZF1EIfnv6xfVRu20" },
      rock: { title: "Happy Rock Anthems", link: "37i9dQZF1EIfpuWVTkCyiW" },
    },
    sad: {
      pop: { title: "Sad Pop Songs", link: "4vCc5ESMGnxHZbZzdKKmKA" },
      hiphop: { title: "Sad Hip Hop Mix", link: "37i9dQZF1EIcZUgkA3BSiL" },
      country: { title: "Sad Country Songs", link: "1iCEEJ7epfU1EcnZ6d4LIe" },
      house: { title: "Sad House Melodies", link: "6RuimEDRflEjHX2SKHHYws" },
      rnb: { title: "Sad RnB Music for Hurt Hearts", link: "4zZEAU9CoHg6RVttePEF6C" },
      rock: { title: "Sad Rock Ballads", link: "0em8nwwZRtjVIimTXUdOib" },
    },
    angry: {
      pop: { title: "Angry Pop Mix", link: "37i9dQZF1EIfThrCEERy1q" },
      hiphop: { title: " Angry Hip Hop ", link: "7J9BcmPs2pCbAMfa1IdjZR" },
      country: { title: "Pissed off Counrty Music", link: "1vnYIjTHm5tJ6h6lJvaxwJ" },
      house: { title: "Angry House Mix", link: "37i9dQZF1EIerQaR1PQwrc" },
      rnb: { title: "Angry Girl Muisc", link: "24sFkmMLsGVl8FtcXzUnj1" },
      rock: { title: "Pissed Off Rock Songs", link: "5IwFDvJvKVub47mVa4DPY0" },
    },
    chill: {
      pop: { title: "Chilled Pop Hits", link: "37i9dQZF1DX1IeqVkK7Ebc" },
      hiphop: { title: "Chill Rap &Hip Hop Vibe", link: "6mv2k2DBxZ516Cqcw1IZQE" },
      country: { title: "Late Night/ Chill Country Vibes", link: "5FWhYtR66Kf04oFWNsEVoM" },
      house: { title: "Chill House 2025", link: "62bReXvmroQzQfEUuTNe3Y" },
      rnb: { title: "Chilled R&B", link: "37i9dQZF1DX2UgsUIg75Vg" },
      rock: { title: "Chill Rock", link: "37i9dQZF1DX2UXfvEIZvDK" },
    },
    hype: {
      pop: { title: "Hype Pop Mix", link: "37i9dQZF1EIePmEgz7p91b" },
      hiphop: { title: "Beast Mode Hip Hop", link: "37i9dQZF1DX9oh43oAzkyx" },
      country: { title: "Hype Country", link: "3aSdLvEGFPOpjZYIhdtDsl" },
      house: { title: "EDM/ House Bangers", link: "0GoQedvZwO4jaWgtdZXOEs" },
      rnb: { title: "Hype R&B Vibes", link: "6pIObZZxHGelQgWiopucmJ" },
      rock: { title: "Best Hyoe Rock Songs", link: "6mnDHDzomspXDCRKsSMegk" },
    },
    energetic: {
      pop: { title: "Engegy Booster Pop", link: "37i9dQZF1DX0vHZ8elq0UK" },
      hiphop: { title: "Energy Booster Hip Hop", link: "51EwhCbmmahVxHPd6rZpMH" },
      country: { title: "Energectic Country", link: "37i9dQZF1EIgbK94rz3nZ9" },
      house: { title: "Upbeat House", link: "7Fngdne5bJbGNkCXyMwMD4" },
      rnb: { title: "Energy Booster R&B", link: "37i9dQZF1DWTUHzPOW6Jl7" },
      rock: { title: "Energy Booster Rock", link: "37i9dQZF1DWZVAVMhIe3pV" },
    },
  };
}

function displayPlaylist() {
  const container = document.getElementById("playlist-container");
  if (!container) {
    console.warn("Playlist container not found in the DOM.");
    return;
  }

  container.innerHTML = ""; // Clear existing content

  const mood = localStorage.getItem("mood");
  const genres = JSON.parse(localStorage.getItem("genres") || "[]");

  if (!Array.isArray(genres)) {
    console.error("Invalid genres data:", genres);
    return;
  }

  const playlists = getPlaylists();

  if (!playlists[mood]) {
    container.innerHTML = `<p>No playlists found for mood: ${mood}</p>`;
    return;
  }

  genres.forEach((genre) => {
    if (playlists[mood][genre]) {
      const playlist = playlists[mood][genre];
      const { title, link } = playlist;
      const div = document.createElement("div");
      div.className = "playlist";

      div.innerHTML = `
        <h2>${title}</h2>
        <iframe src="https://open.spotify.com/embed/playlist/${link}"
                width="300"
                height="380"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media">
        </iframe>
      `;
      container.appendChild(div);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayPlaylist();
});

