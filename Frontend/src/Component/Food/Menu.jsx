import React, { useState } from 'react';
import '../../assets/Style/Food/Menu.css';
import burger from "../../assets/Images/burger.jpg"
const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    'ALL',
    'PIZZA/PASTA',
    'SANDWICHES',
    'BRUNCH',
    'STEAK/GRILL',
    'SALAD'
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Crispy Crust Pizza',
      category: 'PIZZA/PASTA',
      price: '$5.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    },
    {
      id: 2,
      name: 'Juicy Burger',
      category: 'SANDWICHES',
      price: '$8.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    },
    {
      id: 3,
      name: 'Fries McDonald',
      category: 'BRUNCH',
      price: '$3.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    },
    {
      id: 4,
      name: 'Chicken Popeyes',
      category: 'BRUNCH',
      price: '$11.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    },
    {
      id: 5,
      name: 'Chicken Sandwich',
      category: 'SANDWICHES',
      price: '$6.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    },
    {
      id: 6,
      name: 'Salmon Steak',
      category: 'STEAK/GRILL',
      price: '$14.99',
      image: burger,
      description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
    }
  ];

  const filteredItems = activeCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="menu-section">
      <h3 className="section-subtitle">Discover</h3>
      <h2 className="section-title">Our Menu</h2>
      <p className="section-description">
        White men large of on front. Via be greater related adopted proceed entered on. Through if examine express
        promises no. Past add size gone cold get off old.
      </p>

      <nav className="menu-nav">
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-item">
            <img
              src={item.image}
              alt={item.name}
              className="menu-item-image"
            />
            <span className="menu-item-price">{item.price}</span>
            <h3 className="menu-item-title">{item.name}</h3>
            <p className="menu-item-category">{item.category}</p>
            <p className="menu-item-description">{item.description}</p>
            <button className="order-button">Add to cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;

