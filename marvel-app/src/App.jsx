import { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import Modal from 'react-modal';

const PUBLIC_KEY = 'a374491c22342936464e41137fef9616';

const PRIVATE_KEY = '56a57d615e446cbe2cf66aec1986c21772fc29fe';

Modal.setAppElement('#root');

const App = () => {
  const [characters, setCharacters] = useState([]);
  const[selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = new Date().getTime();
      const hash =md5(ts + PRIVATE_KEY + PUBLIC_KEY);


      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
          params: {
            apikey: PUBLIC_KEY,
            ts,
            hash,
            limit: 20,
            },
          });
          setCharacters(response.data.data.results);
        } catch (error) {
          console.error('Error fetching characters', error);
        }
      };

      fetchCharacters();
    }, []);

    const handleCharacterClick = (characterId) => {
      setSelectedCharacterId(characterId);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    }

    return (
      <div>
        <h1>Marvel Characters</h1>
        <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
        <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Character Details"
          style={{
            content: {
              maxWidth: '600px',
              margin: '0 auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#213547',
            },
          }}
        >  
          {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
          <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
        </Modal>
      </div>
    );
};

export default App;
