const KeyDataTable = ({ overview }) => {
  const rows = [
    ["Symbol", overview.Symbol],
    ["Name", overview.Name],
    ["Sector", overview.Sector],
    ["Industry", overview.Industry],
    ["Market Cap", overview.MarketCapitalization],
    ["P/E Ratio", overview.PERatio],
    ["Dividend Yield", overview.DividendYield],
  ];
  return (
    <table>
      <thead>
        <tr>
          <th className="-ml-10">Key Data</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, value], idx) => (
          <tr key={label} className={idx % 2 === 0 ? "bg-gray-200" : ""}>
            <td className="border px-4 py-2">{label}</td>
            <td className="border px-4 py-2">{value ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KeyDataTable;
