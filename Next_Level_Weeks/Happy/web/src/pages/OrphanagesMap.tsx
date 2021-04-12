import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(({ data }) => setOrphanages(data));
  }, []);

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

        {orphanages &&
          orphanages.map((orphanage: Orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className='map-popup'
                >
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color={'#FFF'} />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color={'#FFF'} />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
