### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
> 1. asynchronous callbacks
> 2. promise
> 3. async/await keyword
- What is a Promise?
>> A promise is one-time guarantee of future value.
- What are the differences between an async function and a regular function?
>> async function always return promises.   
   Inside of an async function, you can write code that looks synchronous, even if it isn't. 
   Inside of async functions, the return value is wrapped in a resolved promise. 
- What is the difference between Node.js and Express.js?
>> Node is a JavaScript runtime environment that allows you to write JavaScript code that runs on the server-side. This makes it possible to write back-end applications in JavaScript.  
   Express is the most popular Node framework.
- What is the error-first callback pattern?
>> The first argument of the callback is reserved for an error object. If an error occurred, it will be returned by the first err argument. 
- What is middleware?
>> It is code that runs in the middle of the request / response cycle.
   In Express, middleware are functions that get access to the req and res objects and can also call the next function.
- What does the `next` function do?
>> Calling next() with no argument tells the system to continue processing any remaining middlewares after this one is done. next(err) is used to jump to any error middleware.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

>>  The above function is making three requests sequentially. Each request must wait for the previous request before starting. But the requests are totally independent. This can really slow down our application.
