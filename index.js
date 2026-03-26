function renderOverviewRankingChart(data) {
  const target = document.getElementById('overviewRankingChart');
  if (!target || !Array.isArray(data)) return;

  const top10 = [...data]
    .sort((a, b) => a.Environment_Score - b.Environment_Score)
    .slice(0, 10)
    .reverse();

  Plotly.newPlot('overviewRankingChart', [
    {
      type: 'bar',
      orientation: 'h',
      x: top10.map(d => d.Environment_Score),
      y: top10.map(d => d.Company),
      text: top10.map(d => (d.Environment_Score * 100).toFixed(1) + '%'),
      textposition: 'outside',
      cliponaxis: false,
      marker: { color: '#2e8b57' },
      hovertemplate: '<b>%{y}</b><br>Score: %{x:.3f}<extra></extra>'
    }
  ], {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { l: 150, r: 40, t: 10, b: 30 },
    xaxis: { title: 'Environment Score' },
    yaxis: { automargin: true }
  }, {
    responsive: true,
    displayModeBar: false
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const best = cappedData.filter(d => d.Environment_Score < 0.20).length;
  const stats = [
    { value: cappedData.length, label: 'Companies Assessed' },
    { value: uniqueSectors().length, label: 'Sectors Covered' },
    { value: best, label: 'Best Tier (<20%)' },
    { value: pct(avg('Environment_Score')), label: 'Avg. ESG Exposure' }
  ];
  document.getElementById('statsGrid').innerHTML = stats.map(s => `<div class="stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');

  const pillars = [
    { title: 'Climate Targets', badge: 'E1', avgVal: avg('Climate_Targets'), note: 'Net zero year, scope coverage, SBTi alignment, TPI alignment' },
    { title: 'Investment & Transition', badge: 'E2', avgVal: avg('Investment_Transition'), note: 'Decarbonisation capex, green bonds, transition memberships, internal carbon pricing' },
    { title: 'Climate Reporting', badge: 'E3', avgVal: avg('Climate_Reporting'), note: 'Sustainability reporting, CDP score, executive pay KPIs, assurance level' }
  ];
  document.getElementById('pillarStack').innerHTML = pillars.map(p => `<div class="pillar-card"><div class="pillar-top"><div class="pillar-title">${p.title} <span class="pill">${p.badge}</span></div><div class="pill">${pct(p.avgVal)} avg.</div></div><div class="progress red"><span style="width:${(p.avgVal * 100).toFixed(1)}%"></span></div><div class="pillar-note">${p.note}</div></div>`).join('');

  const lowest = rankSorted().slice(0, 8);
  document.getElementById('leaderboardList').innerHTML = lowest.map(d => `<div class="lb-row"><div class="lb-rank">${d.rank}</div><div class="lb-company"><div class="name">${d.Company}</div><div class="meta">${d.Sector}</div></div><div class="lb-score"><div class="value" style="color:var(--green)">${pct(d.Environment_Score)}</div><div class="ticker">${d.Ticker}</div></div></div>`).join('');

  renderOverviewRankingChart(cappedData);
});
