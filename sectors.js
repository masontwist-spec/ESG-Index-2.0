(function () {
  function toNumber(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : 0;
    if (typeof value === "string") {
      const cleaned = value.replace(/,/g, "").trim();
      const parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  }

  function mean(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  function formatScore(value) {
    return toNumber(value).toFixed(3);
  }

  function getScore(row) {
    // Tries several likely field names to make integration easier.
    const direct =
      row.Exposure_Score ??
      row["Exposure Score"] ??
      row.Total_Score ??
      row["Total Score"] ??
      row.ESG_Exposure_Score ??
      row["ESG Exposure Score"];

    if (direct !== undefined && direct !== null && direct !== "") {
      return toNumber(direct);
    }

    // Fallback to summing the three environmental components currently visible on your site.
    return (
      toNumber(row.Climate_Targets ?? row["Climate Targets"]) +
      toNumber(row.Investment_Transition ?? row["Investment & Transition"] ?? row["Inv. & Transition"]) +
      toNumber(row.Climate_Reporting ?? row["Climate Reporting"])
    );
  }

  function getComponent(row, keys) {
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
        return toNumber(row[key]);
      }
    }
    return 0;
  }

  function buildSectorData(data) {
    const grouped = {};

    data.forEach((row) => {
      const sector = (row.Sector || "Unclassified").trim();
      if (!grouped[sector]) grouped[sector] = [];
      grouped[sector].push(row);
    });

    const sectorRows = Object.entries(grouped).map(([sector, companies]) => {
      const rows = companies.map((company) => {
        const score = getScore(company);
        return {
          name: company.Company || company["Company Name"] || company.Name || "Unknown",
          score,
          climateTargets: getComponent(company, ["Climate_Targets", "Climate Targets"]),
          investmentTransition: getComponent(company, ["Investment_Transition", "Investment & Transition", "Inv. & Transition"]),
          climateReporting: getComponent(company, ["Climate_Reporting", "Climate Reporting"])
        };
      });

      const scores = rows.map((row) => row.score).sort((a, b) => a - b);
      const bestCompany = rows.reduce((best, current) => current.score < best.score ? current : best, rows[0]);
      const worstCompany = rows.reduce((worst, current) => current.score > worst.score ? current : worst, rows[0]);

      return {
        sector,
        count: rows.length,
        avgScore: mean(scores),
        medianScore: median(scores),
        range: scores.length ? Math.max(...scores) - Math.min(...scores) : 0,
        bestCompany: bestCompany ? bestCompany.name : "N/A",
        worstCompany: worstCompany ? worstCompany.name : "N/A",
        avgClimateTargets: mean(rows.map((row) => row.climateTargets)),
        avgInvestmentTransition: mean(rows.map((row) => row.investmentTransition)),
        avgClimateReporting: mean(rows.map((row) => row.climateReporting)),
        companyScores: scores
      };
    });

    return sectorRows.sort((a, b) => a.avgScore - b.avgScore).map((row, index) => ({
      ...row,
      rank: index + 1
    }));
  }

  function renderSummaryCards(sectors) {
    const container = document.getElementById("sectorSummary");
    if (!container || !sectors.length) return;

    const best = sectors[0];
    const worst = sectors[sectors.length - 1];
    const widestSpread = [...sectors].sort((a, b) => b.range - a.range)[0];
    const mostCompact = [...sectors].sort((a, b) => a.range - b.range)[0];

    container.innerHTML = `
      <article class="summary-card">
        <div class="summary-label">Best Sector</div>
        <div class="summary-value">${best.sector}</div>
        <div class="summary-meta">Avg score: ${formatScore(best.avgScore)}</div>
      </article>

      <article class="summary-card">
        <div class="summary-label">Worst Sector</div>
        <div class="summary-value">${worst.sector}</div>
        <div class="summary-meta">Avg score: ${formatScore(worst.avgScore)}</div>
      </article>

      <article class="summary-card">
        <div class="summary-label">Widest Spread</div>
        <div class="summary-value">${widestSpread.sector}</div>
        <div class="summary-meta">Range: ${formatScore(widestSpread.range)}</div>
      </article>

      <article class="summary-card">
        <div class="summary-label">Most Consistent</div>
        <div class="summary-value">${mostCompact.sector}</div>
        <div class="summary-meta">Range: ${formatScore(mostCompact.range)}</div>
      </article>
    `;
  }

  function renderBarChart(sectors) {
    const target = document.getElementById("sectorBarChart");
    if (!target) return;

    Plotly.newPlot(
      target,
      [
        {
          type: "bar",
          orientation: "h",
          x: sectors.map((sector) => sector.avgScore),
          y: sectors.map((sector) => sector.sector),
          text: sectors.map((sector) => formatScore(sector.avgScore)),
          textposition: "outside",
          cliponaxis: false,
          hovertemplate:
            "<b>%{y}</b><br>Average score: %{x:.3f}<extra></extra>"
        }
      ],
      {
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        margin: { l: 180, r: 40, t: 10, b: 40 },
        xaxis: {
          title: "Average Exposure Score",
          zeroline: false,
          gridcolor: "rgba(255,255,255,0.08)"
        },
        yaxis: {
          automargin: true,
          categoryorder: "array",
          categoryarray: sectors.map((sector) => sector.sector)
        },
        font: {
          color: "#edf2f7",
          family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }
      },
      { responsive: true, displayModeBar: false }
    );
  }

  function renderBoxPlot(sectors) {
    const target = document.getElementById("sectorBoxPlot");
    if (!target) return;

    const traces = sectors.map((sector) => ({
      type: "box",
      name: sector.sector,
      y: sector.companyScores,
      boxpoints: "outliers",
      hovertemplate:
        "<b>" + sector.sector + "</b><br>Score: %{y:.3f}<extra></extra>"
    }));

    Plotly.newPlot(
      target,
      traces,
      {
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        margin: { l: 60, r: 30, t: 10, b: 110 },
        yaxis: {
          title: "Company Exposure Score",
          zeroline: false,
          gridcolor: "rgba(255,255,255,0.08)"
        },
        xaxis: {
          tickangle: -30
        },
        font: {
          color: "#edf2f7",
          family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }
      },
      { responsive: true, displayModeBar: false }
    );
  }

  function renderStackedChart(sectors) {
    const target = document.getElementById("sectorStackedChart");
    if (!target) return;

    Plotly.newPlot(
      target,
      [
        {
          type: "bar",
          name: "Climate Targets",
          x: sectors.map((sector) => sector.sector),
          y: sectors.map((sector) => sector.avgClimateTargets),
          hovertemplate: "<b>%{x}</b><br>Climate Targets: %{y:.3f}<extra></extra>"
        },
        {
          type: "bar",
          name: "Investment & Transition",
          x: sectors.map((sector) => sector.sector),
          y: sectors.map((sector) => sector.avgInvestmentTransition),
          hovertemplate: "<b>%{x}</b><br>Investment & Transition: %{y:.3f}<extra></extra>"
        },
        {
          type: "bar",
          name: "Climate Reporting",
          x: sectors.map((sector) => sector.sector),
          y: sectors.map((sector) => sector.avgClimateReporting),
          hovertemplate: "<b>%{x}</b><br>Climate Reporting: %{y:.3f}<extra></extra>"
        }
      ],
      {
        barmode: "stack",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        margin: { l: 60, r: 30, t: 10, b: 110 },
        yaxis: {
          title: "Average Component Score",
          zeroline: false,
          gridcolor: "rgba(255,255,255,0.08)"
        },
        xaxis: {
          tickangle: -30
        },
        legend: {
          orientation: "h",
          y: 1.12,
          x: 0
        },
        font: {
          color: "#edf2f7",
          family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }
      },
      { responsive: true, displayModeBar: false }
    );
  }

  function renderTable(sectors) {
    const tbody = document.querySelector("#sectorTable tbody");
    if (!tbody) return;

    tbody.innerHTML = sectors.map((sector) => `
      <tr>
        <td>${sector.rank}</td>
        <td>${sector.sector}</td>
        <td>${sector.count}</td>
        <td>${formatScore(sector.avgScore)}</td>
        <td>${formatScore(sector.medianScore)}</td>
        <td>${sector.bestCompany}</td>
        <td>${sector.worstCompany}</td>
        <td>${formatScore(sector.range)}</td>
      </tr>
    `).join("");
  }

  function init() {
    const data = window.RAW_DATA;

    if (!Array.isArray(data) || data.length === 0) {
      const summary = document.getElementById("sectorSummary");
      if (summary) {
        summary.innerHTML = `
          <article class="summary-card summary-card-error">
            <div class="summary-label">Data not found</div>
            <div class="summary-value">RAW_DATA is missing</div>
            <div class="summary-meta">
              Add your dataset to assets/js/data.js as: const RAW_DATA = [ ... ];
            </div>
          </article>
        `;
      }
      return;
    }

    const sectors = buildSectorData(data);
    renderSummaryCards(sectors);
    renderBarChart(sectors);
    renderBoxPlot(sectors);
    renderStackedChart(sectors);
    renderTable(sectors);
  }

  init();
})();