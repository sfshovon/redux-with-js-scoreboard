// Select DOM Elements
const addMatchButton = document.querySelector('.addMatch');
const resetButton = document.querySelector('.resetMatch');
const allMatches = document.querySelector('.allMatches');

//Action Identifiers
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Action Creators
const addMatch = () => {
  store.dispatch({ 
    type: ADD 
  });
}
const removeMatch = (value) => {
  store.dispatch({ 
    type: REMOVE, 
    payload: value 
  });
}
const incrementScore = (value, increment) => { //2nd parameter
  store.dispatch({ 
    type: INCREMENT, 
    payload: value, increment 
  });
}
const decrementScore = (value, decrement) => { //2nd parameter
  store.dispatch({ 
    type: DECREMENT, 
    payload: value, decrement 
  });
}
const resetScores = () => {
  store.dispatch({ 
    type: RESET 
  });
}
// const resetScores = () => {
//     return{ 
//       type: RESET 
//     };
//   }
// const addMatch = () => {
//   return{ 
//     type: ADD 
//   };
// }


//Initial State
const initialState = [{ 
    matchName: 'Match 1', 
    score: 0 
  }
]

// Create Reducer Function //Full Function
const matchReducer = (state = initialState , action) => { 
  switch (action.type) {
    case 'ADD':
      return [  
            ...state, 
            { 
              matchName: `Match ${state.length + 1}`,
              score: 0 
            }
          ];

    case 'REMOVE':
      return state.filter((match, value) => value !== action.payload);

    case 'INCREMENT':
      return state.map((match, value) => {
        if (value === action.payload) {
          return { 
            ...match, 
            score: match.score + action.increment 
          };
        } else {
            return { ...match };
        }
      });
      
    case 'DECREMENT':
      return state.map((match, value) => {
        if (value === action.payload) {
          const newScore = match.score - action.decrement;
          return { 
            ...match, 
            score: newScore < 0 ? 0 : newScore 
          };
        } else {
            return { ...match };
        }
      });
    case 'RESET':
      return state.map((match) => ({ 
        ...match, 
        score: 0 
      }));

    default:
      return state;
  }
}

// Create Store
const store = Redux.createStore(matchReducer);

// Render Function //Full Function
const render = () => {
  const state = store.getState();
  // Clear matches
  allMatches.innerHTML = '';
  // Add matches
  state.forEach((match, value) => {
    const newMatch = `
          <div class="mt-2 shadow-2xl bg-zinc-100 rounded-lg overflow-hidden">
            <div class="flex justify-between items-center py-3 px-4 bg-cyan-800 text-white">
              <h3 class="text-lg font-semibold">${match.matchName}</h3>
              <button class="delete hover:text-zinc-800" onclick="removeMatch(${value})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <div class="flex items-center py-3 px-4">
              <div class="flex-1">
                <form class="incrementForm" onsubmit="event.preventDefault();
                  incrementScore(${value}, Number(this.increment.value)); this.reset();">
                  <div class="flex items-center">
                    <h4 class="md:mr-2">Increment:</h4>
                    <input type="number" name="increment" class="w-16 md:w-32 border rounded-lg px-2 py-1 bg-white" />
                  </div>
                </form>
              </div>
              <div class="flex-1">
                <form class="decrementForm" onsubmit="event.preventDefault();
                  decrementScore(${value}, Number(this.decrement.value)); this.reset();">
                  <div class="flex items-center">
                    <h4 class="md:mr-2">Decrement:</h4>
                    <input type="number" name="decrement" class="w-16 md:w-32 border rounded-lg px-2 py-1 bg-white" />
                  </div>
                </form>
              </div>
              <div class="flex-1 md:flex md:justify-end">
                <h2 class="text-lg md:text-2xl font-bold text-center ml-2">${match.score}</h2>
              </div>
            </div>
          </div>
        `;
    allMatches.insertAdjacentHTML('beforeend', newMatch);
    //  allMatches.innerHTML += newMatch;
  });
}

// Update UI initially
render()
// Subscribe to the store
store.subscribe(render);

// Add event listeners
addMatchButton.addEventListener('click', addMatch);
resetButton.addEventListener('click', resetScores);

// addMatchButton.addEventListener('click', () => {
//   store.dispatch(addMatch())
// });

// resetButton.addEventListener('click', () => {
//   store.dispatch(resetScores())
// });

