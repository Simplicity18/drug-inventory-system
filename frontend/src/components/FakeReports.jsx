export default function FakeReports({ reports }) {
  return (
    <section>
      <h3>Reported Fake Medicines</h3>
      <ul className="report-list">
        {reports.map((report) => (
          <li key={report._id}>
            <strong>{report.medicine?.name || report.batchNumber}</strong> — {report.reason}
          </li>
        ))}
        {reports.length === 0 && <li>No fake medicines reported.</li>}
      </ul>
    </section>
  );
}
