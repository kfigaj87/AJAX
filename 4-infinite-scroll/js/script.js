console.log("Warsztat - Infinite Scroll");

let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {
  let preloader = document.getElementById("preloader");
  console.log(`showPreloader`);
  preloader.style.display = "block";
  preloading = true;
};

const hidePreloader = () => {
  let preloader = document.getElementById("preloader");
  console.log(`hidePreloader`);
  preloader.style.display = "none";
  preloading = false;
};

const getData = () => {
  if (!preloading) {
    showPreloader();

    fetch("https://akademia108.pl/api/ajax/get-users.php")
      .then((res) => res.json())
      .then((data) => {
        let body = document.body;
        let hr = document.createElement("hr");
        body.appendChild(hr);

        for (let user of data) {
          let pId = document.createElement("p");
          let pName = document.createElement("p");
          let pWebsite = document.createElement("p");

          pId.innerText = `User ID: ${user.id}`;
          pName.innerText = `User ID: ${user.name}`;
          pWebsite.innerHTML = `User ID: ${user.website}<br/>------------------`;

          body.appendChild(pId);
          body.appendChild(pName);
          body.appendChild(pWebsite);
        }
        preloading = false;
        hidePreloader();

        console.log(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }
};

const scrollToEndOfPage = () => {
  let d = document.documentElement;

  //height of an element's content, inluding content not visible on the screan
  let scrollHeight = d.scrollHeight;

  // number of pixels that an element's content id scrolled verticaly
  let scrollTop = d.scrollTop;

  // inner height od an element in pixels
  let clientHeight = d.clientHeight;

  let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

  console.log(`scrollHeight: ${scrollHeight}`);
  console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
  console.log(`scrollTop: ${scrollTop}`);
  console.log(`clientHeight: ${clientHeight}`);
  console.log(`==================`);

  if (sumScrollTopClientHeight >= scrollHeight) {
    endOfThePage += 1;

    console.log(`Scrolled to the end of page: ${endOfThePage}`);

    getData();
  }
};

window.addEventListener("scroll", scrollToEndOfPage);
