export default function DashboardModal({
  title,
  children,
  onClose,
  footer,
  size = "large",
}) {
  return (
    <div className="dashboard-modal-overlay" role="dialog" aria-modal="true">
      <div className={`dashboard-modal dashboard-modal-${size}`}>
        <div className="dashboard-modal-header">
          <h4>{title}</h4>
          <button
            type="button"
            className="dashboard-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fa fa-times" />
          </button>
        </div>
        <div className="dashboard-modal-body">{children}</div>
        {footer ? <div className="dashboard-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
