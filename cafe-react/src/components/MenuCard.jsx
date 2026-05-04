export default function MenuCard({ item, onAddToCart }) {
  return (
    <div className="menu-card" data-category={item.category}>
      <div className="card-img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="desc">{item.desc}</p>
      </div>
      <div className="card-footer">
        <span className="price">₹{item.price}</span>
        <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(item)}>
          Order
        </button>
      </div>
    </div>
  )
}
