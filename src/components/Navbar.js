import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`); // Corrigido para usar crase corretamente
    setSearch("");
  }

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">MovieEasy</Link>
      </h2>
      <form onSubmit={handleSubmit}> 
        <input 
          type="text" 
          placeholder='Busque um filme' 
          onChange={(e) => setSearch(e.target.value)} 
          value={search}
        />
        <button type="submit">Buscar</button>
      </form>
    </nav>
  );
};

export default Navbar;
