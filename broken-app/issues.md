# Broken App Issues
- catch() is missing err argument to pass to the next() function. And it misses global error handler at bottom. We need to tell Express to send error to global error handler.

- In order to tell Express to parse request bodies form JSON, need to include middleware `app.use(express.json())`.

- In the code :  
    `let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });`  
    It maps every requested item to a Prmise but it fails to wait for all the Promises. We need to wait for all the Promises and then collect the results in an Array.

