import PropTypes from 'prop-types';



const CharacterList = ({ characters, onCharacterClick}) => {
    return (
        <div>
          <h2>Character List</h2>
          <ul>
            {characters.map((character) => (
              <li key={character.id} onClick={() => onCharacterClick(character.id)}>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  style={{ cursor: 'pointer', width: '100px' }} 
                />
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
        </div>
    );
};

CharacterList.propTypes = {
    characters: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            thumbnail: PropTypes.shape({
                path: PropTypes.string.isRequired,
                extension: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    onCharacterClick: PropTypes.func.isRequired,
};

export default CharacterList;