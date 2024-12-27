// import React, { useState } from 'react';
// import '../../assets/Style/Food/Menu.css';
// import burger from "../../assets/Images/burger.jpg"
// const MenuSection = () => {
//   const [activeCategory, setActiveCategory] = useState('ALL');

//   const categories = [
//     'ALL',
//     'PIZZA/PASTA',
//     'SANDWICHES',
//     'BRUNCH',
//     'STEAK/GRILL',
//     'SALAD'
//   ];

//   const menuItems = [
//     {
//       id: 1,
//       name: 'Crispy Crust Pizza',
//       category: 'PIZZA/PASTA',
//       price: '$5.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     },
//     {
//       id: 2,
//       name: 'Juicy Burger',
//       category: 'SANDWICHES',
//       price: '$8.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     },
//     {
//       id: 3,
//       name: 'Fries McDonald',
//       category: 'BRUNCH',
//       price: '$3.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     },
//     {
//       id: 4,
//       name: 'Chicken Popeyes',
//       category: 'BRUNCH',
//       price: '$11.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     },
//     {
//       id: 5,
//       name: 'Chicken Sandwich',
//       category: 'SANDWICHES',
//       price: '$6.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     },
//     {
//       id: 6,
//       name: 'Salmon Steak',
//       category: 'STEAK/GRILL',
//       price: '$14.99',
//       image: burger,
//       description: 'Considered concluded friendship him am connection. Yet perhaps between he expect on.'
//     }
//   ];

//   const filteredItems = activeCategory === 'ALL' 
//     ? menuItems 
//     : menuItems.filter(item => item.category === activeCategory);

//   return (
//     <section className="menu-section">
//       <h3 className="section-subtitle">Discover</h3>
//       <h2 className="section-title">Our Menu</h2>
//       <p className="section-description">
//         White men large of on front. Via be greater related adopted proceed entered on. Through if examine express
//         promises no. Past add size gone cold get off old.
//       </p>

//       <nav className="menu-nav">
//         {categories.map(category => (
//           <button
//             key={category}
//             className={activeCategory === category ? 'active' : ''}
//             onClick={() => setActiveCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </nav>

//       <div className="menu-grid">
//         {filteredItems.map(item => (
//           <div key={item.id} className="menu-item">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="menu-item-image"
//             />
//             <span className="menu-item-price">{item.price}</span>
//             <h3 className="menu-item-title">{item.name}</h3>
//             <p className="menu-item-category">{item.category}</p>
//             <p className="menu-item-description">{item.description}</p>
//             <button className="order-button">Add to cart</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MenuSection;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../assets/Style/Food/Menu.css';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [error, setError] = useState(null); // State to handle errors

  const categories = [
    'ALL',
    'PIZZA/PASTA',
    'SANDWICHES',
    'BRUNCH',
    'STEAK/GRILL',
    'SALAD'
  ];

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/foods'); // Replace with your backend endpoint
        setMenuItems(response.data.foods); // Assuming response contains a `foods` array
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    activeCategory === 'ALL'
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
        {error ? (
          <p className="error-message">{error}</p>
        ) : filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item._id} className="menu-item">
              <img
                src={`http://localhost:8080${item.image}`} // Assuming the backend provides a valid image path
                alt={item.name}
                className="menu-item-image"
              />
              <span className="menu-item-price">{item.price}</span>
              <h3 className="menu-item-title">{item.name}</h3>
              <p className="menu-item-category">{item.category}</p>
              <p className="menu-item-description">{item.description}</p>
              <button className="order-button">Add to cart</button>
            </div>
          ))
        ) : (
          <p className="no-items-message">No menu items available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
