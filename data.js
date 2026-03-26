
const RAW_DATA = [
{"Company":"3i","Ticker":"III","Sector":"Private equity","Climate_Targets":0.69,"Investment_Transition":0.00,"Climate_Reporting":0.20,"Environment_Score":0.2967},
{"Company":"Admiral Group","Ticker":"ADM","Sector":"Insurance","Climate_Targets":0.69,"Investment_Transition":0.19,"Climate_Reporting":0.38,"Environment_Score":0.4200},
{"Company":"Airtel Africa","Ticker":"AAF","Sector":"Telecom","Climate_Targets":0.13,"Investment_Transition":0.06,"Climate_Reporting":0.13,"Environment_Score":0.1067},
{"Company":"Alliance Witan","Ticker":"ALW","Sector":"Investment trust","Climate_Targets":0.25,"Investment_Transition":0.00,"Climate_Reporting":0.01,"Environment_Score":0.0867},
{"Company":"Anglo American","Ticker":"AAL","Sector":"Mining","Climate_Targets":0.51,"Investment_Transition":0.38,"Climate_Reporting":0.86,"Environment_Score":0.5833},
{"Company":"Antofagasta","Ticker":"ANTO","Sector":"Mining","Climate_Targets":0.65,"Investment_Transition":0.44,"Climate_Reporting":0.52,"Environment_Score":0.5367},
{"Company":"Ashtead Group","Ticker":"AHT","Sector":"Industrial equipment","Climate_Targets":0.40,"Investment_Transition":0.00,"Climate_Reporting":0.15,"Environment_Score":0.1833},
{"Company":"Associated British Foods","Ticker":"ABF","Sector":"Consumer staples","Climate_Targets":0.63,"Investment_Transition":0.50,"Climate_Reporting":0.59,"Environment_Score":0.5733},
{"Company":"AstraZeneca","Ticker":"AZN","Sector":"Pharmaceuticals","Climate_Targets":1.00,"Investment_Transition":0.75,"Climate_Reporting":0.48,"Environment_Score":0.7433},
{"Company":"Auto Trader Group","Ticker":"AUTO","Sector":"Online marketplace","Climate_Targets":0.44,"Investment_Transition":0.00,"Climate_Reporting":0.32,"Environment_Score":0.2533},

{"Company":"Aviva","Ticker":"AV","Sector":"Insurance","Climate_Targets":0.69,"Investment_Transition":0.38,"Climate_Reporting":0.23,"Environment_Score":0.4333},
{"Company":"Babcock International Group","Ticker":"BAB","Sector":"Defense","Climate_Targets":0.38,"Investment_Transition":0.19,"Climate_Reporting":0.21,"Environment_Score":0.2600},
{"Company":"BAE Systems","Ticker":"BA","Sector":"Defense","Climate_Targets":0.95,"Investment_Transition":0.00,"Climate_Reporting":0.39,"Environment_Score":0.4467},
{"Company":"Barclays","Ticker":"BARC","Sector":"Banking","Climate_Targets":0.63,"Investment_Transition":1.00,"Climate_Reporting":0.68,"Environment_Score":0.7700},
{"Company":"Barratt Developments","Ticker":"BDEV","Sector":"Housebuilder","Climate_Targets":0.44,"Investment_Transition":0.00,"Climate_Reporting":0.38,"Environment_Score":0.2733},
{"Company":"Beazley","Ticker":"BEZ","Sector":"Insurance","Climate_Targets":0.25,"Investment_Transition":0.00,"Climate_Reporting":0.07,"Environment_Score":0.1067},
{"Company":"Berkeley Group Holdings","Ticker":"BKG","Sector":"Housebuilder","Climate_Targets":0.38,"Investment_Transition":0.13,"Climate_Reporting":0.20,"Environment_Score":0.2367},
{"Company":"BP","Ticker":"BP","Sector":"Oil & Gas","Climate_Targets":0.88,"Investment_Transition":0.50,"Climate_Reporting":0.37,"Environment_Score":0.5833},
{"Company":"British American Tobacco","Ticker":"BATS","Sector":"Tobacco","Climate_Targets":0.78,"Investment_Transition":0.38,"Climate_Reporting":0.51,"Environment_Score":0.5567},
{"Company":"British Land","Ticker":"BLND","Sector":"Real estate","Climate_Targets":0.38,"Investment_Transition":0.19,"Climate_Reporting":0.07,"Environment_Score":0.2133},

{"Company":"BT Group","Ticker":"BT.A","Sector":"Telecom","Climate_Targets":0.88,"Investment_Transition":0.69,"Climate_Reporting":0.81,"Environment_Score":0.7933},
{"Company":"Bunzl","Ticker":"BNZL","Sector":"Distribution","Climate_Targets":0.78,"Investment_Transition":0.00,"Climate_Reporting":0.19,"Environment_Score":0.3233},
{"Company":"Burberry Group","Ticker":"BRBY","Sector":"Luxury retail","Climate_Targets":0.69,"Investment_Transition":0.25,"Climate_Reporting":0.27,"Environment_Score":0.4033},
{"Company":"Centrica","Ticker":"CNA","Sector":"Energy","Climate_Targets":0.94,"Investment_Transition":0.50,"Climate_Reporting":0.64,"Environment_Score":0.6933},
{"Company":"Coca-Cola HBC","Ticker":"CCH","Sector":"Beverages","Climate_Targets":0.94,"Investment_Transition":0.69,"Climate_Reporting":0.66,"Environment_Score":0.7633},
{"Company":"Compass Group","Ticker":"CPG","Sector":"Catering","Climate_Targets":0.78,"Investment_Transition":0.25,"Climate_Reporting":0.23,"Environment_Score":0.4200},
{"Company":"Convatec Group","Ticker":"CTEC","Sector":"Medical devices","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.28,"Environment_Score":0.2200},
{"Company":"Croda International","Ticker":"CRDA","Sector":"Chemicals","Climate_Targets":0.53,"Investment_Transition":0.25,"Climate_Reporting":0.39,"Environment_Score":0.3900},
{"Company":"DCC plc","Ticker":"DCC","Sector":"Energy distribution","Climate_Targets":0.65,"Investment_Transition":0.00,"Climate_Reporting":0.48,"Environment_Score":0.3767},
{"Company":"Diageo","Ticker":"DGE","Sector":"Beverages","Climate_Targets":0.83,"Investment_Transition":0.19,"Climate_Reporting":0.55,"Environment_Score":0.5233}, {"Company":"Diploma","Ticker":"DPLM","Sector":"Industrial","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.11,"Environment_Score":0.1633},
{"Company":"Endeavour Mining","Ticker":"EDV","Sector":"Mining","Climate_Targets":0.40,"Investment_Transition":0.25,"Climate_Reporting":0.52,"Environment_Score":0.3900},
{"Company":"Entain","Ticker":"ENT","Sector":"Gaming","Climate_Targets":0.44,"Investment_Transition":0.00,"Climate_Reporting":0.38,"Environment_Score":0.2733},
{"Company":"EasyJet","Ticker":"EZJ","Sector":"Airlines","Climate_Targets":0.63,"Investment_Transition":0.50,"Climate_Reporting":0.51,"Environment_Score":0.5467},
{"Company":"Experian","Ticker":"EXPN","Sector":"Data services","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.40,"Environment_Score":0.2600},
{"Company":"F&C Investment Trust","Ticker":"FCIT","Sector":"Investment trust","Climate_Targets":0.13,"Investment_Transition":0.00,"Climate_Reporting":0.00,"Environment_Score":0.0433},
{"Company":"Fresnillo","Ticker":"FRES","Sector":"Mining","Climate_Targets":0.25,"Investment_Transition":0.00,"Climate_Reporting":0.23,"Environment_Score":0.1600},
{"Company":"Games Workshop","Ticker":"GAW","Sector":"Consumer","Climate_Targets":0.13,"Investment_Transition":0.00,"Climate_Reporting":0.00,"Environment_Score":0.0433},
{"Company":"Glencore","Ticker":"GLEN","Sector":"Mining","Climate_Targets":0.58,"Investment_Transition":0.19,"Climate_Reporting":0.55,"Environment_Score":0.4400},
{"Company":"GSK","Ticker":"GSK","Sector":"Pharma","Climate_Targets":0.63,"Investment_Transition":0.50,"Climate_Reporting":0.76,"Environment_Score":0.6300},

{"Company":"Haleon","Ticker":"HLN","Sector":"Consumer health","Climate_Targets":0.59,"Investment_Transition":0.44,"Climate_Reporting":0.72,"Environment_Score":0.5833},
{"Company":"Halma","Ticker":"HLMA","Sector":"Industrial","Climate_Targets":0.44,"Investment_Transition":0.00,"Climate_Reporting":0.36,"Environment_Score":0.2667},
{"Company":"Hargreaves Lansdown","Ticker":"HL","Sector":"Financial services","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.00,"Environment_Score":0.1267},
{"Company":"Hikma Pharmaceuticals","Ticker":"HIK","Sector":"Pharma","Climate_Targets":0.25,"Investment_Transition":0.00,"Climate_Reporting":0.41,"Environment_Score":0.2200},
{"Company":"Hiscox","Ticker":"HSX","Sector":"Insurance","Climate_Targets":0.13,"Investment_Transition":0.00,"Climate_Reporting":0.15,"Environment_Score":0.0933},
{"Company":"Howden Joinery Group","Ticker":"HWDN","Sector":"Retail","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.18,"Environment_Score":0.1867},
{"Company":"HSBC Holdings","Ticker":"HSBA","Sector":"Banking","Climate_Targets":0.40,"Investment_Transition":0.50,"Climate_Reporting":0.45,"Environment_Score":0.4500},
{"Company":"IMI plc","Ticker":"IMI","Sector":"Engineering","Climate_Targets":0.44,"Investment_Transition":0.00,"Climate_Reporting":0.15,"Environment_Score":0.1967},
{"Company":"Imperial Brands","Ticker":"IMB","Sector":"Tobacco","Climate_Targets":0.53,"Investment_Transition":0.25,"Climate_Reporting":0.72,"Environment_Score":0.5000},
{"Company":"Informa","Ticker":"INF","Sector":"Publishing","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.27,"Environment_Score":0.2167},

{"Company":"Intercontinental Hotels Group","Ticker":"IHG","Sector":"Hospitality","Climate_Targets":0.83,"Investment_Transition":0.00,"Climate_Reporting":0.41,"Environment_Score":0.4133},
{"Company":"Intermediate Capital Group","Ticker":"ICG","Sector":"Asset management","Climate_Targets":0.13,"Investment_Transition":0.13,"Climate_Reporting":0.50,"Environment_Score":0.2533},
{"Company":"Intertek Group","Ticker":"ITRK","Sector":"Testing","Climate_Targets":0.65,"Investment_Transition":0.00,"Climate_Reporting":0.92,"Environment_Score":0.5233},
{"Company":"International Cons. Airlines (IAG)","Ticker":"IAG","Sector":"Airlines","Climate_Targets":0.38,"Investment_Transition":0.31,"Climate_Reporting":0.20,"Environment_Score":0.2967},
{"Company":"JD Sports Fashion","Ticker":"JD","Sector":"Retail","Climate_Targets":0.40,"Investment_Transition":0.19,"Climate_Reporting":0.25,"Environment_Score":0.2800},
{"Company":"Kingfisher","Ticker":"KGF","Sector":"Retail","Climate_Targets":0.83,"Investment_Transition":0.19,"Climate_Reporting":0.62,"Environment_Score":0.5467},
{"Company":"Land Securities","Ticker":"LAND","Sector":"Real estate","Climate_Targets":0.63,"Investment_Transition":0.19,"Climate_Reporting":0.27,"Environment_Score":0.3633},
{"Company":"Legal & General","Ticker":"LGEN","Sector":"Insurance","Climate_Targets":0.13,"Investment_Transition":0.19,"Climate_Reporting":0.43,"Environment_Score":0.2500},
{"Company":"Lloyds Banking Group","Ticker":"LLOY","Sector":"Banking","Climate_Targets":0.83,"Investment_Transition":0.69,"Climate_Reporting":0.94,"Environment_Score":0.8200},
{"Company":"LondonMetric Property","Ticker":"LMP","Sector":"Real estate","Climate_Targets":0.38,"Investment_Transition":0.13,"Climate_Reporting":0.43,"Environment_Score":0.3133},

{"Company":"London Stock Exchange Group","Ticker":"LSEG","Sector":"Financial services","Climate_Targets":0.88,"Investment_Transition":0.69,"Climate_Reporting":0.72,"Environment_Score":0.7633},
{"Company":"M&G","Ticker":"MNG","Sector":"Asset management","Climate_Targets":0.13,"Investment_Transition":0.19,"Climate_Reporting":0.31,"Environment_Score":0.2100},
{"Company":"Marks & Spencer","Ticker":"MKS","Sector":"Retail","Climate_Targets":0.84,"Investment_Transition":0.25,"Climate_Reporting":0.42,"Environment_Score":0.5033},
{"Company":"Melrose Industries","Ticker":"MRO","Sector":"Industrial","Climate_Targets":0.53,"Investment_Transition":0.00,"Climate_Reporting":0.62,"Environment_Score":0.3833},
{"Company":"Mondi","Ticker":"MNDI","Sector":"Packaging","Climate_Targets":0.88,"Investment_Transition":0.50,"Climate_Reporting":0.85,"Environment_Score":0.7433},
{"Company":"National Grid","Ticker":"NG","Sector":"Utilities","Climate_Targets":0.88,"Investment_Transition":0.75,"Climate_Reporting":0.60,"Environment_Score":0.7433},
{"Company":"NatWest Group","Ticker":"NWG","Sector":"Banking","Climate_Targets":0.38,"Investment_Transition":0.63,"Climate_Reporting":0.50,"Environment_Score":0.5033},
{"Company":"Next plc","Ticker":"NXT","Sector":"Retail","Climate_Targets":0.38,"Investment_Transition":0.19,"Climate_Reporting":0.15,"Environment_Score":0.2400},
{"Company":"Pearson","Ticker":"PSON","Sector":"Education","Climate_Targets":0.75,"Investment_Transition":0.38,"Climate_Reporting":0.37,"Environment_Score":0.5000},
{"Company":"Persimmon","Ticker":"PSN","Sector":"Housebuilder","Climate_Targets":0.63,"Investment_Transition":0.00,"Climate_Reporting":0.83,"Environment_Score":0.4867}, {"Company":"Phoenix Group","Ticker":"PHNX","Sector":"Insurance","Climate_Targets":0.13,"Investment_Transition":0.00,"Climate_Reporting":0.14,"Environment_Score":0.0900},
{"Company":"Prudential","Ticker":"PRU","Sector":"Insurance","Climate_Targets":0.83,"Investment_Transition":0.00,"Climate_Reporting":0.79,"Environment_Score":0.5400},
{"Company":"Reckitt Benckiser","Ticker":"RKT","Sector":"Consumer goods","Climate_Targets":0.53,"Investment_Transition":0.44,"Climate_Reporting":0.55,"Environment_Score":0.5067},
{"Company":"RELX","Ticker":"REL","Sector":"Data/analytics","Climate_Targets":0.78,"Investment_Transition":0.44,"Climate_Reporting":0.37,"Environment_Score":0.5300},
{"Company":"Rentokil Initial","Ticker":"RTO","Sector":"Services","Climate_Targets":0.40,"Investment_Transition":0.00,"Climate_Reporting":0.19,"Environment_Score":0.1967},
{"Company":"Rightmove","Ticker":"RMV","Sector":"Real estate platform","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.05,"Environment_Score":0.1433},
{"Company":"Rio Tinto","Ticker":"RIO","Sector":"Mining","Climate_Targets":1.00,"Investment_Transition":0.50,"Climate_Reporting":0.16,"Environment_Score":0.5533},
{"Company":"Rolls-Royce Holdings","Ticker":"RR","Sector":"Aerospace","Climate_Targets":0.83,"Investment_Transition":0.19,"Climate_Reporting":0.48,"Environment_Score":0.5000},
{"Company":"Sage Group","Ticker":"SGE","Sector":"Software","Climate_Targets":0.44,"Investment_Transition":0.13,"Climate_Reporting":0.47,"Environment_Score":0.3467},
{"Company":"Sainsbury’s","Ticker":"SBRY","Sector":"Retail","Climate_Targets":0.94,"Investment_Transition":0.50,"Climate_Reporting":0.73,"Environment_Score":0.7233},

{"Company":"Schroders","Ticker":"SDR","Sector":"Asset management","Climate_Targets":0.38,"Investment_Transition":0.44,"Climate_Reporting":0.43,"Environment_Score":0.4167},
{"Company":"Scottish Mortgage Trust","Ticker":"SMT","Sector":"Investment trust","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.04,"Environment_Score":0.1400},
{"Company":"Segro","Ticker":"SGRO","Sector":"Real estate","Climate_Targets":0.50,"Investment_Transition":0.00,"Climate_Reporting":0.56,"Environment_Score":0.3533},
{"Company":"Severn Trent","Ticker":"SVT","Sector":"Utilities","Climate_Targets":0.78,"Investment_Transition":0.50,"Climate_Reporting":0.56,"Environment_Score":0.6133},
{"Company":"Shell plc","Ticker":"SHEL","Sector":"Oil & Gas","Climate_Targets":0.88,"Investment_Transition":0.50,"Climate_Reporting":0.62,"Environment_Score":0.6667},
{"Company":"Smith & Nephew","Ticker":"SN","Sector":"Medical devices","Climate_Targets":0.78,"Investment_Transition":0.00,"Climate_Reporting":0.27,"Environment_Score":0.3500},
{"Company":"Smiths Group","Ticker":"SMIN","Sector":"Industrial","Climate_Targets":0.69,"Investment_Transition":0.00,"Climate_Reporting":0.35,"Environment_Score":0.3467},
{"Company":"Spirax-Sarco (Spirax Group)","Ticker":"SPX","Sector":"Engineering","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.43,"Environment_Score":0.2700},
{"Company":"SSE plc","Ticker":"SSE","Sector":"Utilities","Climate_Targets":0.63,"Investment_Transition":0.75,"Climate_Reporting":0.50,"Environment_Score":0.6267},
{"Company":"St. James’s Place","Ticker":"STJ","Sector":"Wealth management","Climate_Targets":0.13,"Investment_Transition":0.00,"Climate_Reporting":0.23,"Environment_Score":0.1200},

{"Company":"Standard Chartered","Ticker":"STAN","Sector":"Banking","Climate_Targets":0.38,"Investment_Transition":0.63,"Climate_Reporting":0.47,"Environment_Score":0.4933},
{"Company":"Taylor Wimpey","Ticker":"TW","Sector":"Housebuilder","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.52,"Environment_Score":0.3000},
{"Company":"Tesco","Ticker":"TSCO","Sector":"Retail","Climate_Targets":0.88,"Investment_Transition":0.94,"Climate_Reporting":0.73,"Environment_Score":0.8500},
{"Company":"Unilever","Ticker":"ULVR","Sector":"Consumer goods","Climate_Targets":0.88,"Investment_Transition":0.75,"Climate_Reporting":0.67,"Environment_Score":0.7667},
{"Company":"Unite Group (United Group)","Ticker":"UTG","Sector":"Real estate","Climate_Targets":0.38,"Investment_Transition":0.00,"Climate_Reporting":0.70,"Environment_Score":0.3600},
{"Company":"United Utilities Group","Ticker":"UU","Sector":"Utilities","Climate_Targets":1.00,"Investment_Transition":0.50,"Climate_Reporting":0.49,"Environment_Score":0.6633},
{"Company":"Vodafone Group","Ticker":"VOD","Sector":"Telecom","Climate_Targets":0.94,"Investment_Transition":0.88,"Climate_Reporting":0.75,"Environment_Score":0.8567},
{"Company":"Weir Group","Ticker":"WEIR","Sector":"Engineering","Climate_Targets":0.58,"Investment_Transition":0.69,"Climate_Reporting":0.66,"Environment_Score":0.6433},
{"Company":"Whitbread","Ticker":"WTB","Sector":"Hospitality","Climate_Targets":0.69,"Investment_Transition":0.19,"Climate_Reporting":0.26,"Environment_Score":0.3800},
{"Company":"WPP","Ticker":"WPP","Sector":"Advertising","Climate_Targets":0.69,"Investment_Transition":0.19,"Climate_Reporting":0.38,"Environment_Score":0.4200}];
const cappedData = RAW_DATA.map(d => {
  const clamp = v => Math.max(0, Math.min(1, Number(v) || 0));
  return {
    ...d,
    Climate_Targets: clamp(d.Climate_Targets),
    Investment_Transition: clamp(d.Investment_Transition),
    Climate_Reporting: clamp(d.Climate_Reporting),
    Environment_Score: clamp(d.Environment_Score)
  };
});

function pct(v) { return (v * 100).toFixed(1) + '%'; }

function tierKey(v) {
  if (v < 0.20) return 'best';
  if (v < 0.40) return 'good';
  if (v < 0.60) return 'moderate';
  if (v < 0.80) return 'poor';
  return 'wasteful';
}

function tierLabel(v) {
  if (v < 0.20) return 'Best';
  if (v < 0.40) return 'Good';
  if (v < 0.60) return 'Moderate';
  if (v < 0.80) return 'Poor';
  return 'Wasteful';
}

function tierColor(tier) {
  if (tier === 'best') return 'var(--green)';
  if (tier === 'good') return '#4f9b63';
  if (tier === 'moderate') return 'var(--amber)';
  if (tier === 'poor') return '#c96a2b';
  return 'var(--red)';
}

function rankSorted() {
  return [...cappedData].sort((a,b) => a.Environment_Score - b.Environment_Score).map((d, i) => ({ ...d, rank: i + 1 }));
}

function avg(key) {
  return cappedData.reduce((s,d) => s + d[key], 0) / cappedData.length;
}

function uniqueSectors() {
  return [...new Set(cappedData.map(d => d.Sector))].sort();
}
