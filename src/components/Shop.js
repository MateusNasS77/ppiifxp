import { useContext, useEffect, useRef, useState } from "react";
import Product from "./Product";
import { CircularProgress } from "@mui/material";
import { CartContext } from "../context/CartContext";
import styles from "./Shop.module.css";
import Filter from "./Filter";

export default function Shop() {

    const { products, loading, error } = useContext(CartContext);
    const searchInput = useRef("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showFilter, setShowFilter] = useState(false); // Estado para controlar a exibição do filtro

    useEffect(() => {
        if (products) {
            setFilteredItems(products);
        }
    }, [products]);

    function handleSearch() {
        const term = searchInput.current.value.toLowerCase();
        setFilteredItems(
            products.filter((item) => item.title.toLowerCase().includes(term))
        );
    }

    function clearSearch() {
        searchInput.current.value = "";
        setFilteredItems(products);
    }

    // Função para aplicar os filtros de categoria (moto ou carro) e preço
    function applyFilters(category, maxPrice) {
        let filtered = [...products];

        // Filtra pela categoria de produto (moto ou carro)
        if (category !== "all") {
            filtered = filtered.filter((product) =>
                category === "motorcycle"
                    ? product.description.toLowerCase().includes("motorcycle")
                    : !product.description.toLowerCase().includes("motorcycle")
            );
        }

        // Filtra pelo preço máximo
        filtered = filtered.filter((product) => product.price <= maxPrice);

        setFilteredItems(filtered);
    }

    return (
        <section id="shop">
            <h2>Your mania for motors starts here.</h2>

            <div className={styles.search_container}>
                <div className={styles.search_box}>
                    <input
                        className={styles.search_input}
                        ref={searchInput}
                        type="text"
                        placeholder="Type to Search"
                        onChange={handleSearch}
                    />
                    <button className={styles.search_clear} onClick={clearSearch}>
                        <b>CLEAR</b>
                    </button>
                    <button
                        className={styles.filter_button}
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <b>FILTER</b>
                    </button>
                </div>
            </div>

            {/* Componente de filtro, mostrado se o estado showFilter for verdadeiro */}
            {showFilter && <Filter applyFilters={applyFilters} />}

            <ul id="products">
                {error && <p>{error}</p>}
                {loading && (
                    <div id="loading">
                        <CircularProgress size="10rem" color="inherit" />
                        <p>Loading products...</p>
                    </div>
                )}
                {!loading && !error && filteredItems.length > 0 ? (
                    filteredItems.map((product) => (
                        <li key={product.id}>
                            <Product {...product} />
                        </li>
                    ))
                ) : (
                    <p>Not Found!</p>
                )}
            </ul>
        </section>
    );
}