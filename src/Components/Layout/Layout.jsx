import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Banner from "../Banner/Banner";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const { id } = useParams();
  

  const getBannerText = () => {
   
    switch (location.pathname) {
      case "/":
        return {
          texto: "La tienda de tu mascota!",
          imagen:
            "https://media.istockphoto.com/id/877490114/es/foto/accesorios-del-perro-sobre-fondo-amarillo-vista-superior-concepto-de-animales-y-mascotas.jpg?s=612x612&w=0&k=20&c=5q2oC1LVv0FWpg_jWEND4wGNbzYWWW-zgG0fu5Xoavg=",
        };
      case "/about":
        return {
          texto: "Sobre nosotros",
          imagen:
            "https://media.istockphoto.com/id/877490114/es/foto/accesorios-del-perro-sobre-fondo-amarillo-vista-superior-concepto-de-animales-y-mascotas.jpg?s=612x612&w=0&k=20&c=5q2oC1LVv0FWpg_jWEND4wGNbzYWWW-zgG0fu5Xoavg=",
        };
      case "/tienda":
        return {
          texto: "TODOS NUESTROS PRODUCTOS",
          imagen:
            "https://media.istockphoto.com/id/877490114/es/foto/accesorios-del-perro-sobre-fondo-amarillo-vista-superior-concepto-de-animales-y-mascotas.jpg?s=612x612&w=0&k=20&c=5q2oC1LVv0FWpg_jWEND4wGNbzYWWW-zgG0fu5Xoavg=",
        };
      case `/DetailProduct/${id}`:
        return {
          texto: "Detalle del Producto",
          imagen:
            "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
        };
      case `/carrito`:
        return {
          texto: "Carrito de compras",
          imagen: "https://i.blogs.es/7a9c5d/carrito/450_1000.jpg",
        };
        case `/dashboard`:
          return {
            texto: "Panel de Administracion de usuarios",
            imagen:
              "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
          };
          case `/dashboard/HomeDashboard`:
            return {
              texto: "Dashboard",
              imagen:
                "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
            };
          case `/dashboard/creationProduct`:
          return {
            texto: "Creacion de Producto",
            imagen:
              "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
          };
          case `/dashboard/creationCategory`:
          return {
            texto: "Creacion de Categoria",
            imagen:
              "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
          };
          case `/dashboard/modifications/product/${id}`:
          return {
            texto:"Modificar producto",
            imagen:
            "https://seguros.elcorteingles.es/content/dam/eci-seguros/es/blog/blog-julio-2023/incluir-mascota-seguro-hogar.jpg.thumb.800.480.png",
          }
        }
        };

  return (
    <div>
      <Navbar />
      <Banner banner={getBannerText()} />
      <div className='container-lg'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

//coment
