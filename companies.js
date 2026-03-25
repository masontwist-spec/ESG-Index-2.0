
let sortCol = 'rank';
let sortAsc = true;
function populateSectorFilter() {
  const sel = document.getElementById('sectorFilter');
  uniqueSectors().forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s; sel.appendChild(opt);
  });
}
function currentRows() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const sector = document.getElementById('sectorFilter').value;
  const tier = document.getElementById('tierFilter').value;
  let rows = rankSorted().filter(d => {
    const matchQ = !q || d.Company.toLowerCase().includes(q) || d.Ticker.toLowerCase().includes(q);
    const matchSector = !sector || d.Sector === sector;
    const matchTier = !tier || tierKey(d.Environment_Score) === tier;
    return matchQ && matchSector && matchTier;
  });
  rows.sort((a,b) => {
    const av = sortCol === 'rank' ? a.rank : sortCol === 'tier' ? tierLabel(a.Environment_Score) : a[sortCol];
    const bv = sortCol === 'rank' ? b.rank : sortCol === 'tier' ? tierLabel(b.Environment_Score) : b[sortCol];
    if (typeof av === 'string') return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    return sortAsc ? av - bv : bv - av;
  });
  return rows;
}
function renderTable() {
  const rows = currentRows();
  document.getElementById('tableBody').innerHTML = rows.map(d => {
    const tier = tierKey(d.Environment_Score);
    return `<tr><td><div class="rank-badge">${d.rank}</div></td><td><div class="company-name">${d.Company}</div></td><td><span class="ticker-badge">${d.Ticker}</span></td><td><span class="sector-name">${d.Sector}</span></td><td><span class="score-value" style="color:${tierColor(tier)}">${pct(d.Environment_Score)}</span></td><td><span class="tier-pill tier-${tier}">${tierLabel(d.Environment_Score)}</span></td></tr>`;
  }).join('');
}
document.addEventListener('DOMContentLoaded', () => {
  populateSectorFilter(); renderTable();
  document.querySelectorAll('th[data-sort]').forEach(th => th.addEventListener('click', () => {
    const col = th.dataset.sort;
    if (sortCol === col) sortAsc = !sortAsc;
    else { sortCol = col; sortAsc = col === 'rank'; }
    renderTable();
  }));
  document.getElementById('searchInput').addEventListener('input', renderTable);
  document.getElementById('sectorFilter').addEventListener('change', renderTable);
  document.getElementById('tierFilter').addEventListener('change', renderTable);
});
