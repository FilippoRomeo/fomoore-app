import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, FileCheck2, FolderTree, PackageCheck } from "lucide-react";

const DEFAULT_CONTRACT = "/assets/final-art/final-art-contract.json";

function normaliseStatus(status = "pending") {
  return status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function DeliverableCard({ deliverable }) {
  const detailItems = deliverable.clips || deliverable.items || [];
  const visibleItems = detailItems.slice(0, 6);
  const hiddenCount = Math.max(0, detailItems.length - visibleItems.length);

  return (
    <article className="final-art-card">
      <div className="final-art-card-head">
        <FileCheck2 size={16} aria-hidden="true" />
        <div>
          <h4>{deliverable.label}</h4>
          <span className={`final-art-status status-${normaliseStatus(deliverable.status)}`}>
            {deliverable.status || "pending"}
          </span>
        </div>
      </div>

      <p className="final-art-path">{deliverable.targetPath}</p>

      {deliverable.notes && <p className="final-art-notes">{deliverable.notes}</p>}

      {visibleItems.length > 0 && (
        <ul className="final-art-list">
          {visibleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {hiddenCount > 0 && <li>+{hiddenCount} more</li>}
        </ul>
      )}
    </article>
  );
}

export default function FinalArtTracker({ contractUrl = DEFAULT_CONTRACT }) {
  const [state, setState] = useState({
    loading: true,
    error: "",
    contract: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(contractUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${contractUrl}`);
        return response.json();
      })
      .then((contract) => {
        if (cancelled) return;
        setState({ loading: false, error: "", contract });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: error.message || "Final art contract failed to load.",
          contract: null,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [contractUrl]);

  const deliverables = state.contract?.requiredDeliverables || [];
  const statusCounts = useMemo(
    () =>
      deliverables.reduce((acc, deliverable) => {
        const status = deliverable.status || "pending";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {}),
    [deliverables]
  );

  return (
    <section className="final-art-tracker" aria-labelledby="final-art-title">
      <div className="final-art-head">
        <div>
          <span className="asset-pack-kicker">
            <PackageCheck size={13} aria-hidden="true" />
            Final art delivery tracker
          </span>
          <h3 id="final-art-title">Commissioned final art has a separate delivery contract.</h3>
          <p>
            This contract separates sourced look-dev inputs from commissioned Kid Apollo assets. Nothing in
            <code>_lookdev-inputs</code> should be treated as final art.
          </p>
        </div>

        <div className="final-art-meta">
          <span>{state.contract?.status || (state.loading ? "loading" : "unavailable")}</span>
          <strong>{deliverables.length || "..."}</strong>
          <small>required deliverables</small>
        </div>
      </div>

      <div className="final-art-meta-row">
        <div>
          <FolderTree size={15} aria-hidden="true" />
          <strong>Served base path</strong>
          <span>{state.contract?.servedBasePath || "/assets/final-art"}</span>
        </div>
        <div>
          <CheckCircle2 size={15} aria-hidden="true" />
          <strong>Boundary</strong>
          <span>
            {state.contract?.importantBoundary ||
              "Final identity remains custom; look-dev inputs remain temporary."}
          </span>
        </div>
      </div>

      {Object.keys(statusCounts).length > 0 && (
        <div className="final-art-status-row" aria-label="Final art status counts">
          {Object.entries(statusCounts).map(([status, count]) => (
            <span key={status}>
              {status}: {count}
            </span>
          ))}
        </div>
      )}

      {state.loading && <p className="final-art-message">Loading final art contract...</p>}
      {state.error && <p className="final-art-message error">{state.error}</p>}

      {!state.loading && !state.error && (
        <div className="final-art-grid">
          {deliverables.map((deliverable) => (
            <DeliverableCard key={deliverable.id || deliverable.label} deliverable={deliverable} />
          ))}
        </div>
      )}
    </section>
  );
}
