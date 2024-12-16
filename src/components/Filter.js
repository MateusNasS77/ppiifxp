import React, { useState } from 'react';
import styles from "./Shop.module.css";

export default function Filter({ applyFilters }) {
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState(40000);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleApply = () => {
        applyFilters(category, maxPrice);
    };

    return (
        <div className={styles.filter_container}>
            <h3>Filter</h3>
            <div className={styles.filter_item}>
                <label>Category</label>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="all">All</option>
                    <option value="motorcycle">Motorcycles</option>
                    <option value="car">Cars</option>
                </select>
            </div>

            <div className={styles.filter_item}>
                <label>Max Price</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={handlePriceChange}
                    max="40000"
                    min="0"
                />
            </div>

            <button onClick={handleApply} className={styles.filter_apply}>
                Apply
            </button>
        </div>
    );
}