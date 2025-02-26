import { NavLink } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@auth/model/AuthProvider';  
import './MainLayout.css';  


const MainLayout = () => {
	const { isAuthenticated, user, logout } = useAuth();  
	const location = useLocation();
	const isLoginPage = location.pathname !== '/login';

	return (
	<>
		<nav className="main-container">
		<NavLink to="/">Home</NavLink>
		<NavLink 
			style={ ({ isActive }) => isActive ? {color: "red"} : {}}  
			to="/category/character">Герои</NavLink>
		<NavLink 
			style={ ({ isActive }) => isActive ? {color: "red"} : {}}  
			to="/category/location">Локации</NavLink>
		<NavLink 
			style={ ({ isActive }) => isActive ? {color: "red"} : {}} 
			to="/category/episode">Эпизоды</NavLink>
		</nav>
		{isAuthenticated ? (
			<div className="greeting"> 
			<p>Добро пожаловать, {user}</p> 
			<button onClick={logout}>Выйти</button> 
			</div>
		) :  (
			isLoginPage ?  <div className="greeting">
			<p>Пожалуйста, войдите</p> 
			<Link to="/login">
				<button>Войти</button>  
			</Link>
			</div> : null
			
		)}
	  </>
  );
};

export default MainLayout;