import React, { useState, useEffect } from 'react';



export const AddClient = () => {
  const [client, setClient] = useState([]);
  const dataType = 1;

  useEffect(() => {
    fetch(`item/${dataType}`)
    .then((results) => {
      return results.json();
    })
    .then(data => {
      setClient(data);
    })
  }, [])

  return(
    <main>
      {
        (client != null)?client.map((client) => <h3>{client.name}</h3>):<div>Loading...</div>
      }

    </main>
  )
}

 

export default AddClient;

