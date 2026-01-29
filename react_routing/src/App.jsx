import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const url = "https://rickandmortyapi.com/api/character?page="
  const[characters,setCharacters] = useState([]);
  const[page,setPage] = useState(1);
  
  
  
  async function requestData(){
    const request = await fetch(`${url}${page}`)
    const data = await request.json()
    setCharacters(data.results)
  }

  useEffect(() => {
    requestData();
  },[page])


  return <>
    <section className='list'>
      {
        characters.map((character,index) => {

        const {id,name,image,status,species,type,gender} = character

        return <article key={character.id}>
            <div className='border'>
              <img src={image} alt={name}/>
              
            
            </div>
            <h3>{name}</h3>
            <div> 
              <strong>Estado: {status}</strong> <span></span>
            </div>
            <button>Comprar</button>
        </article>



        })
      }
    </section>
  
  
  </>

  
}

export default App
