function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function fmt(num) {
  return Number(num).toFixed(3);
}

function buildSectorData(data) {
  const grouped = {};

  data.forEach((row) => {
    const sector = row.Sector || "Unclassified";
    if (!grouped[sector]) grouped[sector] = [];
    grouped[sector].push(row);
  });

  const sectors = Object.entries(grouped).map(([sector, companies]) => {
    const sortedCompanies = [...companies].sort(
      (a, b) => a.Environment_Score - b.Environment_Score
    );

    const scores = sortedCompanies.map(c => c.Environment_Score);

    return {
      sector,
      count: companies.length,
      avgScore: mean(scores),
      medianScore: median(scores),
      range: Math.max(...scores) - Math.min(...scores),
      bestCompany: sortedCompanies[0].Company,
      worstCompany: sortedCompanies[sortedCompanies.length - 1].Company,
      avgClimateTargets: mean(companies.map(c => c.Climate_Targets)),
      avgInvestmentTransition: mean(companies.map(c => c.Investment_Transition)),
      avgClimateReporting: mean(companies.map(c => c.Climate_Reporting)),
      companyScores: scores
    };
  });

  return sectors.sort((a, b) => a.avgScore - b.avgScore).map((s, i) => ({
    ...s,
    rank: i + 1
  }));
}

function renderStats(sectors) {
  const grid = document.getElementById("sectorStatsGrid");
  if (!grid) return;

  const best = sectors[0];
  const worst = sectors[sectors.length - 1];
  const widest = [...sectors].sort((a, b) => b.range - a.range)[0];
  const tightest = [...sectors].sort((a, b) => a.range - b.range)[0];

  grid.innerHTML = `
    <div class="card stat-card sector-stat-card">
      <div class="stat-label">Best Sector</div>
      <div class="stat-value sector-stat-value">${best.sector}</div>
      <div class="stat-note">Avg score: ${fmt(best.avgScore)}</div>
    </div>
    <div class="card stat-card sector-stat-card">
      <div class="stat-label">Worst Sector</div>
      <div class="stat-value sector-stat-value">${worst.sector}</div>
      <div class="stat-note">Avg score: ${fmt(worst.avgScore)}</div>
    </div>
    <div class="card stat-card sector-stat-card">
      <div class="stat-label">Widest Spread</div>
      <div class="stat-value sector-stat-value">${widest.sector}</div>
      <div class="stat-note">Range: ${fmt(widest.range)}</div>
    </div>
    <div class="card stat-card sector-stat-card">
      <div class="stat-label">Most Consistent</div>
      <div class="stat-value sector-stat-value">${tightest.sector}</div>
      <div class="stat-note">Range: ${fmt(tightest.range)}</div>
    </div>
  `;
}

function renderTable(sectors) {
  const tbody = document.getElementById("sectorTableBody");
  if (!tbody) return;

  tbody.innerHTML = sectors.map(sector => `
    <tr>
      <td style="padding:12px;">${sector.rank}</td>
      <td style="padding:12px;">${sector.sector}</td>
      <td style="padding:12px;">${sector.count}</td>
      <td style="padding:12px;">${fmt(sector.avgScore)}</td>
      <td style="padding:12px;">${fmt(sector.medianScore)}</td>
      <td style="padding:12px;">${sector.bestCompany}</td>
      <td style="padding:12px;">${sector.worstCompany}</td>
      <td style="padding:12px;">${fmt(sector.range)}</td>
    </tr>
  `).join("");
}

function renderBarChart(sectors) {
  Plotly.newPlot("sectorBarChart", [
    {
      type: "bar",
      orientation: "h",
      x: sectors.map(s => s.avgScore),
      y: sectors.map(s => s.sector),
      text: sectors.map(s => fmt(s.avgScore)),
      textposition: "outside",
      cliponaxis: false,
      hovertemplate: "<b>%{y}</b><br>Average score: %{x:.3f}<extra></extra>"
    }
  ], {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 180, r: 40, t: 10, b: 40 },
    xaxis: { title: "Average Environment Score" },
    yaxis: { automargin: true }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function renderBoxPlot(sectors) {
  const traces = sectors.map(s => ({
    type: "box",
    name: s.sector,
    y: s.companyScores,
    boxpoints: "outliers",
    hovertemplate: "<b>" + s.sector + "</b><br>Score: %{y:.3f}<extra></extra>"
  }));

  Plotly.newPlot("sectorBoxPlot", traces, {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 60, r: 30, t: 10, b: 110 },
    yaxis: { title: "Company Environment Score" },
    xaxis: { tickangle: -30 }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function renderStackedChart(sectors) {
  Plotly.newPlot("sectorStackedChart", [
    {
      type: "bar",
      name: "Climate Targets",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgClimateTargets)
    },
    {
      type: "bar",
      name: "Investment & Transition",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgInvestmentTransition)
    },
    {
      type: "bar",
      name: "Climate Reporting",
      x: sectors.map(s => s.sector),
      y: sectors.map(s => s.avgClimateReporting)
    }
  ], {
    barmode: "stack",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { l: 60, r: 30, t: 10, b: 110 },
    yaxis: { title: "Average Component Score" },
    xaxis: { tickangle: -30 }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

function initSectorsPage() {
  if (!Array.isArray(RAW_DATA)) {
    console.error("RAW_DATA is not available.");
    return;
  }

  const sectors = buildSectorData(RAW_DATA);
  renderStats(sectors);
  renderSectorList(sectors);
  renderTable(sectors);
  renderBarChart(sectors);
  renderBoxPlot(sectors);
  renderStackedChart(sectors);
}

document.addEventListener("DOMContentLoaded", initSectorsPage);
