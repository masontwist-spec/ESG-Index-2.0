function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function formatScore(x) {
  return Number(x).toFixed(3);
}

function buildSectorData(data) {
  const grouped = {};

  data.forEach(row => {
    const sector = row.Sector || "Unclassified";
    if (!grouped[sector]) grouped[sector] = [];
    grouped[sector].push(row);
  });

  const sectors = Object.entries(grouped).map(([sector, companies]) => {
    const totalScores = companies.map(d => d.Total_Score);
    const envScores = companies.map(d => d.Environment_Score || 0);
    const socScores = companies.map(d => d.Social_Score || 0);
    const govScores = companies.map(d => d.Governance_Score || 0);

    const sortedCompanies = [...companies].sort((a, b) => a.Total_Score - b.Total_Score);

    return {
      sector,
      count: companies.length,
      avgScore: mean(totalScores),
      medianScore: median(totalScores),
      range: Math.max(...totalScores) - Math.min(...totalScores),
      bestCompany: sortedCompanies[0]?.Company || "N/A",
      worstCompany: sortedCompanies[sortedCompanies.length - 1]?.Company || "N/A",
      avgE: mean(envScores),
      avgS: mean(socScores),
      avgG: mean(govScores),
      companyScores: totalScores
    };
  });

  return sectors.sort((a, b) => a.avgScore - b.avgScore);
}

const sectorData = buildSectorData(RAW_DATA);

function renderSummaryCards(sectors) {
  const best = sectors[0];
  const worst = sectors[sectors.length - 1];
  const mostVariable = [...sectors].sort((a, b) => b.range - a.range)[0];

  const container = document.getElementById("sector-summary");
  container.innerHTML = `
    <div class="summary-card">
      <h3>Best Sector</h3>
      <p>${best.sector}</p>
      <small>${formatScore(best.avgScore)}</small>
    </div>
    <div class="summary-card">
      <h3>Worst Sector</h3>
      <p>${worst.sector}</p>
      <small>${formatScore(worst.avgScore)}</small>
    </div>
    <div class="summary-card">
      <h3>Total Sectors</h3>
      <p>${sectors.length}</p>
    </div>
    <div class="summary-card">
      <h3>Most Variable</h3>
      <p>${mostVariable.sector}</p>
      <small>Range: ${formatScore(mostVariable.range)}</small>
    </div>
  `;
}

function renderBarChart(sectors) {
  Plotly.newPlot("sectorBarChart", [{
    type: "bar",
    orientation: "h",
    x: sectors.map(s => s.avgScore),
    y: sectors.map(s => s.sector)
  }], {
    margin: { l: 180, r: 30, t: 20, b: 50 },
    xaxis: { title: "Average ESG Exposure Score" },
    yaxis: { automargin: true }
  }, { responsive: true });
}

function renderBoxPlot(sectors) {
  const traces = sectors.map(s => ({
    type: "box",
    name: s.sector,
    y: s.companyScores,
    boxpoints: "outliers"
  }));

  Plotly.newPlot("sectorBoxPlot", traces, {
    margin: { l: 50, r: 30, t: 20, b: 120 },
    yaxis: { title: "Company ESG Exposure Scores" }
  }, { responsive: true });
}

function renderStackedBar(sectors) {
  const traces = [
    {
      type: "bar",
      name: "Environment",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgE)
    },
    {
      type: "bar",
      name: "Social",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgS)
    },
    {
      type: "bar",
      name: "Governance",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgG)
    }
  ];

  Plotly.newPlot("sectorStackedBar", traces, {
    barmode: "stack",
    margin: { l: 50, r: 30, t: 20, b: 120 },
    yaxis: { title: "Average Component Score" }
  }, { responsive: true });
}

function renderTable(sectors) {
  const tbody = document.querySelector("#sectorTable tbody");
  tbody.innerHTML = sectors.map(s => `
    <tr>
      <td>${s.sector}</td>
      <td>${s.count}</td>
      <td>${formatScore(s.avgScore)}</td>
      <td>${formatScore(s.medianScore)}</td>
      <td>${s.bestCompany}</td>
      <td>${s.worstCompany}</td>
      <td>${formatScore(s.range)}</td>
    </tr>
  `).join("");
}

renderSummaryCards(sectorData);
renderBarChart(sectorData);
renderBoxPlot(sectorData);
renderStackedBar(sectorData);
renderTable(sectorData);
