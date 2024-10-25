import "./Navbar.css";

function Navbar(){
    return(
        <>
        <div className="navbar">
            <div className="navbar_logo"><img src={require("../../assets/logo.png")} alt="logo"></img><span>PhotoFolio</span></div>
        </div>
        </>
    );
}

export default Navbar;