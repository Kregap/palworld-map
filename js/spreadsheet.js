const sheetID = '1m_MW0M2kCiKJtVJ6anJQOqbHOILGh10Q6TtNCQK_KCw';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

export async function fetchTable(sheetName, query) {
  const data = [];
  const queryEncoded = encodeURIComponent(query);
  const url = `${base}&sheet=${sheetName}&tq=${queryEncoded}`;
  return fetch(url)
    .then(res => res.text())
    .then(rep => {
      const jsData = JSON.parse(rep.substr(47).slice(0, -2));
      const colz = [];
      jsData.table.cols.forEach((heading) => {
        if (heading.label) {
          colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
        }
      })
      jsData.table.rows.forEach((main) => {
        const row = {};
        colz.forEach((ele, ind) => {
          row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
        })
        data.push(row);
      })
      return data
    })
}
