import { Link, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { serviceExtras } from "./ServiceData";

export const AdminServiceDetails = () => {
  const { serviceName } = useParams();
  const { services } = useAuth();

  const index = services.findIndex((s) => s.service === serviceName);
  const item = services[index];

    const backTo = window.location.pathname.startsWith("/admin")
    ? "/admin/services"
    : "/service";

  if (services.length === 0) {
    return <h1>Loading ...</h1>;
  }

  if (!item) {
    return (
      <section className="container">
        <h1 className="main-heading">Service not found</h1>
        <p>
          <Link to="/admin/services">Back to services</Link>
        </p>
      </section>
    );
  }

  const extra = serviceExtras[item.service] || {};
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="service-detail">
      <div className="container">
                <div className="service-hero">
          <div className="service-hero-text">
            <p className="service-eyebrow">SERVICE {number}</p>
            <h1>{item.service}</h1>
            <p className="service-hero-desc">{item.description}</p>

            <div className="service-stats">
              <div>
                <small>Provider</small>
                <strong>{item.provider}</strong>
              </div>
              <div>
                <small>Price</small>
                <strong>{item.price}</strong>
              </div>
              {extra.duration && (
                <div>
                  <small>Duration</small>
                  <strong>{extra.duration}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="service-hero-image">
            <img src="/images/design.png" alt={item.service} />
          </div>
        </div>

        <div className="service-detail-body">
          <div className="service-detail-block">
            <h3>OVERVIEW</h3>
            <p>{extra.overview || item.description}</p>
          </div>

          {extra.features && (
            <div className="service-detail-block">
              <h3>FEATURES</h3>
              <ul className="service-detail-checks">
                {extra.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          )}

          {extra.technologies && (
            <div className="service-detail-block">
              <h3>TECHNOLOGIES</h3>
              <div className="service-detail-tags">
                {extra.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {extra.suitableFor && (
            <div className="service-detail-block">
              <h3>SUITABLE FOR</h3>
              <div className="service-detail-tags">
                {extra.suitableFor.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {extra.deliverables && (
            <div className="service-detail-block">
              <h3>DELIVERABLES</h3>
              <div className="service-detail-tags">
                {extra.deliverables.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          )}
          <Link to={backTo}>Back to services</Link>
        </div>
      </div>
    </section>
  );
};