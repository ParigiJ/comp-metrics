const Overview = ({ Symbol, OfficialSite, Name, Description }) => {
  return (
    <div className="mt-6 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Overview for {Symbol}:</h2>
        <p>
          {OfficialSite ? (
            <a
              href={OfficialSite}
              target="_blank"
              rel="noopenr noreferrer"
              className="text-blue-600 hover:underline"
            >
              {Name}
            </a>
          ) : (
            <span>{Name}</span>
          )}
        </p>
        <p>
          <strong>Description:</strong> {Description}
        </p>
      </section>
    </div>
  );
};

export default Overview;
