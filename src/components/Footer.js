import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_content">
                <div className="footer_logo">
                    <h3>AutoMania</h3>
                </div>
                <div className="footer_buttons">
                    <Link to="/">
                    <button className="footer_button">Home</button>
                    </Link>
                    <button className="footer_button">About</button>
                    <button className="footer_button">Contact</button>
                </div>
            </div>
            <div className="footer_info">
                <p>&copy; 2024 AutoMania Motors. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
