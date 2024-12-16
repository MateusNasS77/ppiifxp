
import { useEffect } from "react";
import { Link } from "react-router-dom";



const Home = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home">
            <div className="home-logo">
                <img src="logo.ico" alt="AutoMania Motors Logo" className="logo" />
                <h1>AutoMania Motors</h1>
                <p>Your mania for motors starts here.</p>
            </div>

            <div className="home-features">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Secure Purchases</li>
                    <li>High-Quality Vehicles</li>
                    <li>Unbeatable Offers</li>
                    <li>Excellent Customer Support</li>
                </ul>
            </div>

            <div className="home-about">
                <h2>About Us</h2>
                <p>
                    At AutoMania Motors, we are passionate about connecting people to the
                    perfect vehicle. With a commitment to quality and customer
                    satisfaction, we aim to provide the best experience for car and
                    motorcycle enthusiasts alike.
                </p>
            </div>

            <div className="home-shop-button">
                <p>Ready to find your dream vehicle?</p>
                <Link to="/shop">
                    <button className="shop-button">Visit Our Shop</button>
                </Link>
            </div>

            <div className="home-contact">
                <p>Have any questions? Get in touch with us!</p>
                <button className="contact-button">Contact Us</button>
            </div>
        </div>
    );
};

export default Home;