import React from 'react';
import styles from './Footer.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={`${styles.footer} relative mt-20 px-4 pt-20`}>
      
      <nav aria-label="Footer Navigation" className="mx-auto mb-10 max-w-lg">
        <div className={styles['footer-nav']}>
          <a href="/tienda" className="font-medium text-white">Tienda</a>
        </div>
      </nav>
      <div className={`${styles['footer-content']} flex justify-center`}>
        <div className="flex items-center mr-6">
          <FaMapMarkerAlt className="mr-2" />
          <p>Dirección: 123 Calle Principal, Ciudad, País</p>
        </div>
        <div className="flex items-center mr-6">
          <FaPhone className="mr-2" />
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="mr-2" />
          <p>Email: SrThomson@gmail.com</p>
        </div>
      </div>
      <p className="py-10 text-center text-gray-300">Copyright 2024 - Todos los Derechos Reservados</p>
    </footer>
  );
}

export default Footer;
