const board = document.getElementById("board");
const countEl = document.getElementById("count");

function sortBy(list, key, desc = false) {
  return [...list].sort((a, b) => {
    if (a[key] < b[key]) return desc ? 1 : -1;
    if (a[key] > b[key]) return desc ? -1 : 1;
    return 0;
  });
}


function updateLikeCount() {
  document.getElementById("likeCount").textContent =
    document.querySelectorAll(".liked").length;
}

function renderCards(list) {
  board.innerHTML = list
    .map((m) => {
      const badgeClass = m.rating >= 8.0 ? "high" : "mid";
      return `
        <article class="card">
          <div class="poster-wrap">
            <img src="${m.poster}" alt="${m.title} 포스터">
            <span class="badge ${badgeClass}">${m.rating.toFixed(1)}</span>
          </div>
          <div class="card-body">
            <h3>${m.title}</h3>
            <p class="year">${m.year}</p>
            <button class="like" type="button">♥</button>
          </div>
        </article>
      `;
    })
    .join("");

  countEl.textContent = `${list.length}편`;
  updateLikeCount();

  
  if (list.length === 0) {
    board.classList.add("is-empty");
  } else {
    board.classList.remove("is-empty");
  }
}


function getView() {
  const keyword = document.getElementById("q").value.trim().toLowerCase();
  const found = movies.filter((m) => m.title.toLowerCase().includes(keyword));
  const key = document.getElementById("sort").value;
  return sortBy(found, key, key !== "title");
}

function applySort() {
  renderCards(getView());
}


renderCards(getView());


document.getElementById("q").addEventListener("input", () => {
  renderCards(getView());
});


document.getElementById("sort").addEventListener("change", applySort);


document.querySelector(".board").addEventListener("click", (e) => {
  if (e.target.classList.contains("like")) {
    e.target.classList.toggle("liked");
    updateLikeCount();
  }
});


document.getElementById("q").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
    renderCards(getView());
  }
});
