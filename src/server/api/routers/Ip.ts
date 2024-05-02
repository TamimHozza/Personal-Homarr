import axios from "axios";
import { useEffect, useState } from "react";


const Ip = () => {
    const [ipAddress, setIpAddress] = useState('Fetching...');

    useEffect (() => {
        axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      })
    })
  return (
    ipAddress
  )
}

export default Ip