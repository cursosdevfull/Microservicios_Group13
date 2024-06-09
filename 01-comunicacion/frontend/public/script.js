fetch("api/config")
  .then((res) => res.json())
  .then((response) => {
    fetch(response.backendUrl)
      .then((res) => res.json())
      .then((result) => console.log(result));
  });
