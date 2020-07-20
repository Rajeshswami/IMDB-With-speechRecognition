
let search = document.querySelector('#search');
search.addEventListener('keyup', (e) => {
  let searchText = e.target.value;
  searchMovies(searchText);

  let formText = document.getElementById('divBlock');
  formText.style.display = 'none';
  search.classList.add('afterkeyPress');
  document.querySelector('#formBlock').classList.add('afterkey_formBlock');
});
// speech Recognition api
let speechSearch = document.getElementById('speechIcon');
speechSearch.addEventListener('click', () => {
  let formText = document.getElementById('divBlock');
  formText.style.display = 'none';
  search.classList.add('afterkeyPress');
  document.querySelector('#formBlock').classList.add('afterkey_formBlock');

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement('p');
  recognition.interimResults = true;
  recognition.addEventListener('result', (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      p.innerHTML = transcript;
      let searchText = transcript;
      searchMovies(searchText);
    }
  });
  recognition.start();
});

function searchMovies(searchText) {
  const imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=7bb525b7`;
  window
    .fetch(imdbApi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            let defaultImg =
              movie.Poster === 'N/A'
                ? 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw4QDQ8PDw8NDQ0NDg8NDw0OFREWFhURFRUYHiggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIARIAuAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAQIDBQQG/8QAPhAAAgECAAcNCAIBBAMAAAAAAAECAxEEITFTcrHREhMUIiMyM0FRUnORsgUVYXGSk6KjgcHhQoKh8GJj8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9VgeC0nSpt0qbbp0226cW29ym23bKW8DpZqn9uOwWBdFS8On6UX32gU8Do5qn9uGwOB0s1T+3HYXNhcCnglLM0/tw2BwSlmqX247C4QFXBKWap/bhsDgdLNU/tx2F1wAp4HRzVP7cdgcDo5qn9uOwuACngdLNU/tx2BwOlmaf247C4AKeCUc1T+3DYHBKOZp/bjsLguBTwOlmqf247A4HSzNP7cdhc2AFPA6Wap/bjsDgdLNU/tw2FwAU8EpZqn9uGwOB0c1T+3HYXXEgKuB0s1T+3DYHA6WZp/bjsLrgBx4ZgtJUqjVKmmqc2moRTT3LxjLMN6Kr4dT0sAFgXRUvDp+lF1yjAuipeHT9KLmAx3I3AB3AiAEgEC/7cB3C4gYDuFxAwGFxXBgMBABIVxAAwuIAGFyIwKsNfJVfDn6WBHDeiqeHP0sYCwLoqfh0/Si65Rgb5Kn4cPSi4BgK4XAYXFcLgNoLiuCYDQCuDAYXEFwGArhcBoBXC4DAQwGIQJgMBABVhnRVPDn6WAYZ0VTw5+lgAsCfJU/Dh8P9KLrlOB9FT8OHpRaA7hcQAKrNRTk8kU27ZcRy8PWbn+G0twx8nU0JajjcrK7yfEC/h6zdT8NoLD1m6n4bTm32PaiW66+q1/hYC/h6zdT8NoPD1m6n4bTm32PeQb7HtQHTw9Zuf4bQ4es3U/Dac2+x7UG+x7UB08PWbqfhtBYes3P8Npzb7HtQb7HtQHT7wWbn+G0OHrN1Pw2nNvse1ElJPaBfw9Zup+G0OHrN1Pw2nMqse8iUZJ407gd9CqpxUldXvlypp2/osObAOZ/un62dADTEAAU4Y+SqeHP0sYsM6Kp4c/SwAWB9FT8OHpRcUYH0VPw4elF4A2AgAqw3oqmhLUZ9Z8VnfhvRVNCWoz6lrO+S2PHYDanUlj4z6+tmLDo1orUQdu/P65k8W5xZLYvIDWoVZbiHGfMj1tdSLN9l3n9TKKD4kNCPpRO4Fm+y70vNgqsu8/NlYAWOrLvPzYb7LvS82VgBYqsu8/NmNSfFX85fmayymPRfFX86wNTAqkt6p2bXEj1vsOGT41Tr5SetnOrdU5W+EpWJ07WxY8bvjbx3xgd2AdH/un62dJy+z3ya0qnrZ03AYXFcAK8M6Kp4c/SwFhj5Op4c/SwAWB9HT8OHpRaU4G+Tp+HDUi0BgIAKsN6KpoS1GZVfFZpYd0VTQlqMydrO+QDcqVJWfGfX1sw4PiLRWojj70/OY21ucWS2LyA2KD4kNCOpEyuhzIaEfSiYDAQAMZEAGspj0ub5mwspiU3i89YGvgNSW9U+M+Yut9hnTfHqeJPH/LOdLFilO3VaU7EqdrYu1t5cvWBp+znya0qnrZ0I5PZvRrSqetnVcBgK4AV4X0dTw5+lgLC3ydTw5+lgAsE6On4cNSLijBXydPQhqRb/gCQXI3C4FOHPkqnhz1GVVfFf8Gphz5Kr4c9RkTas75APQzqSs8csj62efg+ItH+iNn3qnnMlFqytk6vkBqUcNpKME6kbqMb4/gT4bRzsfqMiy7AsuwDX4dSzkPNBw6lnY+ZkWXYFl2Aa3DqWdh5ofDqWch9RkWXYFl2Aa6w6lnI+Zk03i7corLsHcDZwCpLeaeNriR632GXVlx6niT1nPGOLE526rOdrDh1/N3ve9/iBq+zOjWlU9bOq5x+zHyS0p+tnXcB3C4guBXhfR1NCfpYCwt8nU0J+lgAsFfJ09CHpRZcpwbo6ehHUiy4EguRuAFWHPkqvhz1MxpvF5Gvhz5Kr4c9RjTtbHkA9JUnKz40uvrZ5yD4i0f6E4S/9v7BNrc4slsXkBt0MHpbiF6UW3GON7q7dsuUnwWlmofltFQfEhoR9KLAIcGpZqH5bQWDUs1D8tpO47gV8FpZqH5bQ4NSzUPy2k7gmBBYLSzUPy2mLB4vNf8AJvJnnoPF56wN32fOW80rN8yPW+wyaz5Sp4k9Zzxg7Yt8t1bnd2sOP9u98t79YGv7LfJLSn62ddzi9lvklpT9bOtMCQEbhcCGFPk6mhP0sZHCnyc9CXpYARwZ8nDQjqRZcpwfmQ0I6kWJgSuBG4XAqw98jV8OfpZiTeLyNnD3yVXw5+kxJWtjyAemqVJWeN5H1s8zB8RaP9DdKXZV8qhF23OLJbF8rAeioPiQ0I+lE7lVB8SGhDUidwJBcjcLgTTE2RQXAmnjPOweL+XrPQJnnI/29YG/7OnLeqVm+ZHreLEZFd8pU8SesojTlbFvlurcqdrCjivlyu98t747gbPsroo6VT1s67nF7KfIx0qnrZ13AlcLkbhcCGEviT0JamAsIfEnoS1MAI4PzIaEdSLLlVDmQ0I6kTuBJMBXFcCrDnyVXw5+lmHJ4vI28O6Kr4c9RhvGrAemqTljxvI+tnmIviLR/oLfGX1Ml1W/gD0GD8yGhH0osZ5pR+MvlumK3/lL6mB6YWM83Z9svqYrfGX1MD0ruGM83Z9svqYWfbL6mB6WN7o85F63rI2fel9TCKtiA3/Z8pbzSxvmR7ewx8IfKVPEnrOdRtkcl8pNDX+QNn2U+RjpVPWzrucXsp8kvnU9bOtASuFxXACGEcyejLUMjX5k9GWoAChzIaMdSJFdDmR0Y6iwBhcQXAjVgpRlF5JJxduxqxy+6qecqfr2HYwuBx+6qecqfr2B7rp9+p+vYdgAcfuunnKn69ge66ecqfr2HYAHH7rp5yr+vYHuunnKn69h2ABx+66ecqfr2B7qp9+p5U9h2XADj910+/U8qewPddPOVf17DsQgOT3XTzlT9ewPdVPOVP17DsACGD0VTioxbaV7N2vjbfV8yy5G4wHcQXC4EK/Mnoy1DFX5ktGWoAFQ5sdGOpE7ldHmx0VqRMBgQVVNuN02ldrrCNRO9muLil8AJDKYYTTk9yppvsT1FkpJJtuyWNv4ASApp4RCWKM4t9lwqYTCLtKaT7GwLxFdSrFLdOSS7b5SKwqnbdbuNu24F1wKY4VTbsppv4EVhdNuynFt4krgdAJlEsKpp2c4prE03kLU08aydqAkBzvDKa/1x+OMnUrwjZyko/N5QLQuV79Hc7vdLc9t8Q5VIpJt2TslfrbAmCIRqRbaTTayrrIvCIJOTkrJ2b7H2AWgV060Z33MlL5O5YBCu+LLRlqAVfmS0ZagAVHmx0VqRMhR5sdFaiQGXVhJ16soO06ahKK6pK2OL/gqjVc6NeUU1epdrrSxXNhRSd1GKk8skrSf8jikrtRjFt3k0kt0+19oGfh1WlKlFU9y5Nx3pQtuk7nThztRqXzcr+RZCjCL3UacIy70YRT80Tkk7ppSTypq6f8AAGfQoVJqi3CFOMLS3aacpK2TEGA1aaVRVNyp7uW+bu13HqtfqNBJLEkkliSSskQqUYSacqcJtZHKKk15gZtKKdKLc1T5WUqO+Y01fEmdWA191KcZRptxavKmk4T/AMnXKKkrSjGS7sopx8iNOnGKtGEYLshFRA4vZ7W91XZX3dVXsrrKV+zaj3FPjYPa2ST5T/6aUYxWJRik8qSSTbytorWDUcxRT7VSgrf8AZ0qkoywhqnGpFS4zljccXYaGARtTglJSxXusmPqLVBK9oxV+c0knL59oRikrRjGK7IpJAZvs5VHFuMaDju5XdTdbvnY+otjUjHCJ75ZNxjvbla1uu1ztjGKVoxUVltFJK/bYVSnGStOEZrsnFSsBl1nulhTp46do23PNcr8axbhdeMoUVGSk3UptRTu7LK/gaMbJWUVFLJFJJJfIhCjTi7xpwjLvRgk/MDNcZb7WnDnU3G8e/G2NfMqjVTouVrJ4QsuRY+s2YxSd1FJu15JJOTXa+si6ULWdODV7uO4i03227QOOtOEqtLety53bm6dujt/qsaNyunCMVaEIQTyqEVHUTAhWfFloy1AFbmy0ZahAFHmx0VqRIhSfFjorUiYDAQXAYribEBLdCuIAqW6C5EAJXC5EAJ3ERAImBAAJgRuMBgIAAATACNZ8WWjLUAq3Nloy1AAqXNjox1ImQpPix0VqJAMBAAAABQAAAAAAAAAAAAAAAAAxAAwEFgiQhAAqvNloy1AKtzZaL1AAqXNjorUTIUubHRWomAAJDAAAAoAAAAAAAAAAAAAAAAAAAAC4AEACABVebLReoBVebLReoYCpc2OitRL/uIjS5sfktQ0AwAQEkwIjuAwC4XCgAAAAAAAAAAAAAEx3EEAAAAACAVXmy+T1AKrzZfJ6hgcG+SxY3kXW+xAqku8/NjABOpLvPzYKpLvPzYAAb5LvPzY98l3n5sAASqS7z82PfJd5+bAAE6ku8/Nhvku8/NgABvku8/Nk41Jd5+bEAHUpO2Uqc3fK/MYAWtu2U5KlSV+c/NgAUt8l3n5sW+S7z82ABD3yXefmw3yXefmwAA3yXefmxb5LvPzYAAOpLHxn5sAAD//2Q=='
                : movie.Poster;
            output += `<div>
            <img src = "${defaultImg}" />
            <h1>${movie.Title}</h1>
            <p>${movie.Year}</p>
            <a href =  "http://www.imdb.com/title/${movie.imdbID}/"target = "_blank" &apikey=7bb525b7>Movie Detail</a>
            </div>`;
          }
          document.querySelector('#template').innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
