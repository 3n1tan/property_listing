'use client';
import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, {Marker} from 'react-map-gl'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {Spinner} from "@nextui-org/react";
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import { pin } from '@/public/assets';


const ListMap = ({singleList}: any) => {
  const [lat, setLat] = useState<number | undefined>(undefined); // Initialize with undefined
  const [lng, setLng] = useState<number | undefined>(undefined);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 8,
        width: '100%',
        height: '500px'
    });
    
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);
  
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
      language: 'en',
      region: 'fi',
      outputFormat: OutputFormat.JSON,
    });

    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const res = await fromAddress(
            `${singleList.location.street} ${singleList.location.city} ${singleList.location.state} ${singleList.location.zipcode}`
          );
  
          //  Check for results
          if (res.results.length === 0) {
            // No results found
            setGeocodeError(true);
            setLoading(false);
            return;
          }
  
          const { lat, lng } = res.results[0].geometry.location;

          console.log(lat, lng);
  
          setLat(lat);
          setLng(lng);
          setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng,
          });
  
          setLoading(false);
        } catch (error) {
          console.log(error);
          setGeocodeError(true);
          setLoading(false);
        }
      };
  
      fetchLocation();
    }, []);

    if (loading) return <Spinner />;

    // Handle case where geocoding failed
    if (geocodeError) {
      return <div className='text-xl'>No location data found</div>;
    }


  return (
  !loading && (
    <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
            longitude: lng ,
            latitude: lat ,
            zoom: 13,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
    >
        {lat !== undefined && lng !== undefined && (
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} alt='location' width={25} height={25} />
            </Marker>
        )}
    </Map>
)
);
}

export default ListMap


