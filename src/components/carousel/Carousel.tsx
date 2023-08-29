import './Carousel.css'

const Carousel: React.FC = () => {
  return (
    <div className="container-carousel">
      <div className="carousel">
        <article className="card">
    <img src="/imagenes/hamburguesa.png" alt="" />
        </article>
        <article className="card">
        <img src="/imagenes/alitas.png" alt="" />
        </article>
        <article className="card">
        <img src="/imagenes/salchigrill.png" alt="" />
        </article>
        <article className="card">
        <img src="/imagenes/pack2.png" alt="" />
        </article>
        <article className="card">
        <img src="/imagenes/presentacion.png" alt="" />
        </article>
      </div>
    </div>
  )
}

export default Carousel
