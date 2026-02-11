const API_URL = 'https://de-infra-api.de-infra.servehttp.com/api';
let allServices = [];
let allTags = new Map();

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// Load services from API
async function loadServices() {
  try {
    const response = await fetch(`${API_URL}/services?skip=0&limit=100`);
    const data = await response.json();
    allServices = Array.isArray(data) ? data : (data.services || []);

    // Extract all unique tags
    allServices.forEach(service => {
      if (service.tags && Array.isArray(service.tags)) {
        service.tags.forEach(tag => {
          if (!allTags.has(tag.id)) {
            allTags.set(tag.id, tag);
          }
        });
      }
    });

    populateTagFilter();
    renderServices();
    document.getElementById('loading').style.display = 'none';
  } catch (error) {
    console.error('Error loading services:', error);
    document.getElementById('loading').innerHTML = '❌ Ошибка загрузки сервисов';
  }
}

// Populate tag filter dropdown
function populateTagFilter() {
  const tagFilter = document.getElementById('tagFilter');
  allTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag.id;
    option.textContent = `${tag.icon || '🏷️'} ${tag.name}`;
    tagFilter.appendChild(option);
  });
}

// Filter services based on name and tag
function filterServices() {
  const nameQuery = document.getElementById('nameFilter').value.toLowerCase().trim();
  const selectedTag = document.getElementById('tagFilter').value;

  return allServices.filter(service => {
    const matchesName = !nameQuery ||
      (service.name && service.name.toLowerCase().includes(nameQuery)) ||
      (service.description && service.description.toLowerCase().includes(nameQuery));

    const matchesTag = !selectedTag ||
      (service.tags && service.tags.some(tag => tag.id === selectedTag));

    return matchesName && matchesTag;
  });
}

function groupServices(services) {
  const user = [];
  const admin = [];
  const db = [];

  services.forEach(service => {
    switch (service.access_level) {
      case "admin":
        admin.push(service);
        break;
      case "database":
        db.push(service);
        break;
      case "user":
      default:
        user.push(service);
    }
  });

  return { user, admin, db };
}

function parseDbUrl(urlString) {
  if (!urlString) return {};
  try {
    const url = new URL(urlString);
    let host = url.hostname;
    let port = url.port || "";
    let dbName = "";
    if (url.pathname && url.pathname.length > 1) {
      dbName = url.pathname.replace(/^\//, '');
    }
    return { host, port, dbName };
  } catch (e) {
    return { host: urlString };
  }
}

// Create card HTML
function createCard(service, type) {
  const cardClass = type === "admin" ? "admin-card" : type === "db" ? "db-card" : "";
  const tags = service.tags.map(tag => `
    <span class="tag" style="background-color: ${tag.color};">
      ${tag.icon} <span>${escapeHtml(tag.name)}</span>
    </span>
  `).join('');

  const isDatabase = service.access_level && service.access_level.toLowerCase() === "database";
  let dbDetails = "";
  if (isDatabase && service.url) {
    const parsed = parseDbUrl(service.url);
    dbDetails = `
      <div class="db-details">
        <!--<strong>Хост:</strong> ${escapeHtml(parsed.host ?? "—")}
        ${parsed.port ? `<br><strong>Порт:</strong> ${escapeHtml(parsed.port)}` : ""}
        ${parsed.dbName ? `<br><strong>База данных:</strong> ${escapeHtml(parsed.dbName)}` : ""}-->
      </div>
    `;
  }

  const showLink = service.documentation_url
    ? `<a href="${service.documentation_url}" class="card-link docs-link" target="_blank" onclick="event.stopPropagation()">Открыть документацию →</a>`
    : "";

  const statusBadge = !isDatabase && service.status
    ? `<span class="status-badge status-${service.status}">
        ${service.status === "online" ? "🟢 Online" : "🔴 Offline"}
      </span>` : "";

  const cardHtml = `
    <div class="card ${cardClass}" ${service.url ? `data-url="${service.url}"` : ""}>
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">${service.icon ?? ""}</span> ${escapeHtml(service.name)}
        </div>
      </div>
      <div class="card-description">${escapeHtml(service.description ?? "")}</div>
      ${tags ? `<div class="card-tags">${tags}</div>` : ""}
      ${dbDetails}
      <div class="card-footer">
        ${showLink}
        ${statusBadge}
      </div>
    </div>
  `;
  return cardHtml;
}

// Клик по карточке открывает service.url
document.addEventListener("click", function(event){
  const card = event.target.closest(".card[data-url]");
  if (card) {
    const url = card.getAttribute("data-url");
    if (url) window.open(url, "_blank");
  }
});

// Render services
function renderServices() {
  const filtered = filterServices();
  const { user, admin, db } = groupServices(filtered);

  const userSection = document.getElementById('userSection');
  const userCards = document.getElementById('userCards');
  if (user.length > 0) {
    userSection.style.display = 'block';
    userCards.innerHTML = user.map(s => createCard(s, 'user')).join('');
  } else {
    userSection.style.display = 'none';
  }

  const adminSection = document.getElementById('adminSection');
  const adminCards = document.getElementById('adminCards');
  if (admin.length > 0) {
    adminSection.style.display = 'block';
    adminCards.innerHTML = admin.map(s => createCard(s, 'admin')).join('');
  } else {
    adminSection.style.display = 'none';
  }

  const dbSection = document.getElementById('dbSection');
  const dbCards = document.getElementById('dbCards');
  if (db.length > 0) {
    dbSection.style.display = 'block';
    dbCards.innerHTML = db.map(s => createCard(s, 'db')).join('');
  } else {
    dbSection.style.display = 'none';
  }

  if (user.length === 0 && admin.length === 0 && db.length === 0) {
    userSection.style.display = 'block';
    userCards.innerHTML = '<div class="empty-state">🔍 Ничего не найдено</div>';
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('nameFilter').addEventListener('input', renderServices);
  document.getElementById('tagFilter').addEventListener('change', renderServices);
  loadServices();
});
