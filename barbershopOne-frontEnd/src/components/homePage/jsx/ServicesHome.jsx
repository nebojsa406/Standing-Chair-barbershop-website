import '../css/ServicesHome.css';
import { Link } from 'react-router-dom'

const services = [
  {
    number: '04872',
    title: 'Signature Haircut',
    description: 'Consultation, wash, precision cut and finish. Scissor or clipper, your call.',
    price: '7€',
  },
  {
    number: '04873',
    title: 'Beard Sculpt & Line-up',
    description: 'Shape, trim and hot towel finish. Includes a straight razor edge line-up.',
    price: '15€',
  },
  {
    number: '04874',
    title: 'Hot Towel Shave',
    description: 'The full ritual — hot towels, pre-shave oil, and a straight razor finish.',
    price: '10€',
  },
];

export function ServicesHome() {
  return (
    <section className="servicesHome" id="services">
      <div className="servicesHome-intro">
        <div>
          <p className="servicesHome-eyebrow">WHAT WE DO</p>
          <h2 className="servicesHome-title">Three chairs, one standard</h2>
        </div>
        <p className="servicesHome-copy">
          Every service starts the same way — a proper consultation, no clock-watching. Full menu and pricing on the Prices page.
        </p>
      </div>

      <div className="servicesHome-grid">
        {services.map((service) => (
          <article key={service.number} className="serviceCard">
            <div className="serviceCard-meta">
              <span className="serviceCard-number">№ {service.number}</span>
              <span className="serviceCard-tag">CUT</span>
            </div>
            <h3 className="serviceCard-title">{service.title}</h3>
            <p className="serviceCard-description">{service.description}</p>
            <div className="serviceCard-footer">
              <span className="serviceCard-price">{service.price}</span>
              <Link className="serviceCard-link" to="/prices">DETAILS</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

