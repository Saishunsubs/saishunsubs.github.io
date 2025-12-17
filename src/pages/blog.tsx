<div class="translate-page">
  <h1 style="font-size: 3em; text-align: center;">BLOG TRANSLATE</h1>
  <hr data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="" data-darkreader-inline-border-right="" data-darkreader-inline-border-top="" style="--darkreader-inline-border-bottom: var(--darkreader-border-cccccc, #3e4446); --darkreader-inline-border-left: var(--darkreader-border-cccccc, #3e4446); --darkreader-inline-border-right: var(--darkreader-border-cccccc, #3e4446); --darkreader-inline-border-top: var(--darkreader-border-cccccc, #3e4446); border: 1px solid rgb(204, 204, 204); margin: 20px auto; width: 50%;" />
  <h2 data-darkreader-inline-color="" style="--darkreader-inline-color: var(--darkreader-text-e67a9e, #e5779c); font-size: 3em; color: #e67a9e; text-align: center;">Sakurazaka46</h2>

  <div class="slider-wrapper">
    <div class="member-slider" id="member-slider"></div>
  </div>
</div>

<style>
.translate-page {
  font-family: 'Poppins', sans-serif;
  padding: 25px;
  background: #fafafa0a;
}

/* Slider container */
.slider-wrapper {
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  padding: 20px 10px;
}
.slider-wrapper::-webkit-scrollbar {height: 8px;}
.slider-wrapper::-webkit-scrollbar-thumb {background: #e67a9e; border-radius: 4px;}

.member-slider {
  display: flex;
  gap: 20px;
}

/* Card member */
.member-card {
  flex: 0 0 280px;
  background: #ffffff0a;
  border-radius: 15px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: 0.3s ease;
  padding: 15px;
}
.member-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 16px rgba(230,122,158,0.3);
  border: 1.5px solid #e67a9e;
}

/* Header member */
.member-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}
.member-photo {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e67a9e;
}
.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info */
.member-info h3 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 700;
}
.member-info p {
  margin: 3px 0 0;
  font-size: 1.1em;
  color: #666;
}

/* Post list */
.member-posts {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 252px;   /* tinggi untuk 4 post pertama */
  overflow-y: auto;    /* scroll vertikal jika lebih */
  padding-right: 5px;  /* agar scrollbar tidak menutup konten */
}
.member-posts::-webkit-scrollbar {
  width: 6px;
}
.member-posts::-webkit-scrollbar-thumb {
  background: #e67a9e;
  border-radius: 3px;
}

/* Post item */
.post-item {
  display: flex;
  align-items: center;
  min-height: 60px;    /* tinggi tiap post, agar 4 post terlihat pas */
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff0a;
  border: 1px solid #e67a9e52;
  transition: 0.2s ease;
}
.post-item:hover {
  background: #e67a9e;
}
.member-posts .thumb-box {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 6px;
  flex-shrink: 0;
  position: relative;
}
.member-posts .thumb-box img,
.member-posts .post-thumb img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  display: block !important;
  position: absolute !important;
  top: 0;
  left: 0;
}
.translate-page .post-title a {
  text-decoration: none;
  color: #333;
  font-size: 0.85em;
  font-weight: 600;
  display: block;
  white-space: normal;
  margin: 0 10px;
  word-wrap: break-word;
  line-height: 1.3em;
  }
  .translate-page .post-item:hover a { color: #fff; }

/* === Responsive Mobile Customization === */
@media screen and (max-width: 768px) {
  .translate-page { padding: 15px; }
  .slider-wrapper { padding: 15px 5px; }
  .member-slider { gap: 15px; }
  .member-card { flex: 0 0 90%; width: 90%; max-width: 400px; margin: 0 auto; padding: 12px; border-radius: 12px; }
  .member-header { gap: 10px; margin-bottom: 10px; }
  .member-photo { width: 65px; height: 65px; }
  .member-info h3 { font-size: 1.2em; }
  .member-info p { font-size: 1em; }
  .post-item { padding: 4px; min-height: 50px; }
  .member-posts .thumb-box { width: 50px; height: 50px; }
  .post-title a { font-size: 0.8em; line-height: 1.2em; }
  .slider-wrapper::-webkit-scrollbar { display: none; }
}
</style>

<script>
const jsonURL = "https://raw.githubusercontent.com/ReMineral/saishunsubs/blog-file/blogprofil.json";

const activeMembers = {
  "haru_katsumata": "Haru",
  "asai_konomi": "Konomi",
  "ui_yamakawa": "Ui"
};

const slider = document.getElementById("member-slider");

fetch(jsonURL)
  .then(res => res.json())
  .then(data => {
    for (const key in activeMembers) {
      const label = activeMembers[key];
      const m = data[key];
      if (!m) continue;

      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <div class="member-header">
          <div class="member-photo"><img src="${m.img}" alt="${m.name_romaji}"></div>
          <div class="member-info">
            <h3>${m.name_romaji}</h3>
            <p>${m.name_jp || ''}</p>
          </div>
        </div>
        <div class="member-posts" id="posts-${key}">
          <p style="font-size:0.8em;color:#aaa;">Memuat postingan...</p>
        </div>
      `;
      slider.appendChild(card);

      // Ambil feed posting blog
      fetch('https://saishunsubs.blogspot.com/feeds/posts/default/-/' + encodeURIComponent(label) + '?alt=json')
        .then(r => r.json())
        .then(res => {
          const entries = res.feed?.entry;
          const postBox = document.getElementById("posts-" + key);
          if (!entries) {
            postBox.innerHTML = `<p style="font-size:0.85em;color:#999;">Belum ada postingan.</p>`;
            return;
          }

          const extractDate = (title) => {
            const match = title.match(/\[(\d{4})\.(\d{2})\.(\d{2})/);
            if (!match) return 0;
            return new Date(`${match[1]}-${match[2]}-${match[3]}`).getTime();
          };

          const sortedEntries = entries.sort((a, b) => extractDate(b.title.$t) - extractDate(a.title.$t));

          let html = "";
          sortedEntries.forEach(entry => {
            const title = entry.title.$t;
            const link = entry.link.find(l => l.rel === 'alternate').href;

            let thumb = "";
            if (entry.media$thumbnail?.url) {
              thumb = entry.media$thumbnail.url.replace(/s\d+-c/, "w400-h400-c");
            } else {
              const content = entry.content?.$t || "";
              const match = content.match(/<img[^>]+src="([^">]+)"/);
              thumb = match ? match[1] : "https://via.placeholder.com/150?text=No+Image";
            }

            html += `
              <div class="post-item">
                <div class="thumb-box"><img src="${thumb}" alt="thumb"></div>
                <div class="post-title"><a href="${link}" target="_blank">${title}</a></div>
              </div>
            `;
          });

          postBox.innerHTML = html;
        })
        .catch(() => {
          document.getElementById("posts-" + key).innerHTML =
            `<p style="font-size:0.85em;color:#999;">Gagal memuat.</p>`;
        });
    }
  });
</script>
