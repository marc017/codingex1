const submitForm = async () => {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const userform = document.getElementById("userform");

  const success = document.getElementById("success-container");
  const error = document.getElementById("error-container");

  const payload = {
    name: username.value,
    email: email.value
  }

  const createdUser = await createUser(JSON.stringify(payload));
  console.log(createdUser);
  if (createdUser) {
    userform.classList.add('hidden');
    success.classList.remove('hidden');
    success.classList.add('show');
  } else {
    error.classList.remove('hidden');
    error.classList.add('show');
  }
}

const createUser = async (payload) => {
  const error = document.getElementById("error-container");
  return fetch(
    'http://localhost:9090/api/user',
    {  
      method: 'PUT', 
      body: payload,
      headers: {
        'Content-Type': 'application/json'
      },
    }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error.classList.add('show');
        error.classList.remove('hidden');
        return Promise.reject(response);
      }
    });
}