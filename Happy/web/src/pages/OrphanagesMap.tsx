import React from 'react';

import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const OrphanagesMap = () => {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='Happy' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.8006207, -46.0277277]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <Marker position={[-23.8006207, -46.0277277]} icon={mapIcon}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className='map-popup'
          >
            Orphanage Test
            <Link to='/orphanages/1'>
              <FiArrowRight size={20} color={'#FFF'} />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color={'#FFF'} />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
