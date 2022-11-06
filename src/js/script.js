const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const pokemonInput = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
var count = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
    
    if (APIResponse.status === 200){
    const data =  await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Pesquisando...';
    const data = await fetchPokemon(pokemon);
    if(data){    
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default']
    pokemonImage.style.display = 'block';    
    }else{
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Pokemon não encontrado';
    pokemonNumber.innerHTML = '';
}
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    renderPokemon(pokemonInput.value)
    pokemonInput.value = ''
});

buttonPrev.addEventListener('click', () => {
    if (count > 1) {
        count -= 1;
      renderPokemon(count.toString());
    }
  });
  
  buttonNext.addEventListener('click', () => {
    count += 1;
    renderPokemon(count.toString());
  });

renderPokemon(count.toString())


