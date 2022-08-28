const form = document.querySelector(".search__form");
const resultsContainer = document.querySelector(".search__findings-list");
const countContainer = document.querySelector(".search__findings");
const errorContainer = document.querySelector(".search__error");
const url = "https://api.nomoreparties.co/github-search?q=";

const renderError = () => {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            Произошла ошибка...
        </p>
  `;
  countContainer.innerHTML = "";
};

function renderEmptyResults() {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            По вашему запросу ничего не найдено, попробуйте уточнить запрос
        </p>
  `;
  countContainer.innerHTML = "";
}

const renderCount = (count) => {
  countContainer.innerHTML = `
      Найдено <span class="search__findings-amount">${count.toLocaleString(
        "ru-RU"
      )}</span> результатов
  `;
};

const onSubmitStart = () => {
  countContainer.innerHTML = `Загрузка...`;
  resultsContainer.innerHTML = "";
  errorContainer.innerHTML = "";
};

function template(item) {
  const newElement = document.createElement("li");
  newElement.classList.add("search__finding-item");
  newElement.innerHTML = `
      <p class="search__finding-name">
          ${item.full_name}
      </p>
	`;
  return newElement;
}

async function onSubmit(event) {
  // ваш код
  event.preventDefault();
  onSubmitStart();
  fetch(url + form.elements[0].value)
    .then((responce) => responce.json())
    .then((json) => {
      jsonData = json.items;
      console.log(jsonData);
      renderCount(json.total_count);
      for (let property in jsonData) {
        //template(json[property]);
        //console.log(property);
        let newElement = template(jsonData[property]);
        // console.log(jsonData[property]);
        // console.log(newElement);

        resultsContainer.append(newElement);
        // Надо добить если пустой запрос
      }
    })
    .catch((error) => renderError());

  //console.log(url + form.elements[0].value);
}

form.addEventListener("submit", onSubmit);
