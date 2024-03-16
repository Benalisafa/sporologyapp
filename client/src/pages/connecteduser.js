import { useState, useEffect } from 'react';

const useConnectedUserData = () => {
  const [connectedUser, setConnectedUser] = useState({});

  const getConnectedUserData = () => {
    setConnectedUser(JSON.parse(localStorage.getItem("user_data")));
  };

  useEffect(() => {
    getConnectedUserData();
  }, []);

  return connectedUser;
};

export default useConnectedUserData;