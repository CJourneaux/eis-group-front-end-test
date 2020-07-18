# Product Dropper

## Installation

To set-up the application locally, run the following commands:

```
> npm run build
> npm run setup --prefix backend
```

To run either the server or the client execute the respective following command:

```
> npm run start:server
> npm run start:client
```

Otherwise, it is also possible to run everything at once by simply executing:

```
> npm start
```

The server will be accessible at http://localhost:5000 and the client at http://localhost:3000 (a tab should automatically open in your browser when you start running the client).

## Reflexion on the task

### Library choices

- **Chakra UI & Emotion theme**

To not have to reinvent the wheel, I decided to use a library that would create basic React components that would look okay for a simple web application, be accessible and be modulable.
I first looked at Grommet, which looked promising, but I found that the default styles did not please me and was a bit complex to change. I did not want to use Material UI, as even though it looked great and was well documented, I felt it was too easy to use existing components, and would not demonstrate my ability to understand how they work.

In the end I went with Chakra UI, which is a small library that is very accessible and can easily be extended. It can easily be themed using the Styled System Theme specifications, meaning we can style components by passing props to them, rather than using a library like Styled Components, where we need to declare new components to add more CSS.

- **React Hook Form**

Rather than using Formik, which is one of the most popular library to deal with forms, I used React Hook Form. There are two raisons for this:

1. It is a very light-weight library, with no external dependency, [meaning that it is good in terms of performance](https://react-hook-form.com/).
2. It uses React hooks, and can make use of React Context, more than Formik. This makes the code very simple, readable and clear, which is a huge benefit.

### Architecture choices for the client

The application is divided into a few folders:

- `components/`: for generic components that could be reused elsewhere if the application had more pages
- `api/`: for functions related to data manipulation that communicate with the server
- `utils/`: for utility functions that are completely independent from the UI
- `product-dropper/`: a stand-alone component which includes a file input and a modal, that can be used to add products to the DB
- `products-list/`: for components that are related to displaying a list of products

### What I did

- I paid great attention to ensure that the product-filter and the drag-and-drop component were accessible.
- I made it so that the file upload and product creation were done as one step rather than first upload the file, and then use it to create a product. This makes it easier for data management, as it means there is no file uploaded without a corresponding product, and the user can cancel the product creation without any consequences for the server.
- I added a button to reset the application.
- I added confirmation steps for any deletion action.

### What could be done given more requirements

- Add the possibility to upload many files at once
  - Would we want to have a longer pop-up to add the details?
  - Or we could use tabs inside the pop-up for each file uploaded?
  - Or we could drop many files, and then have a separate pop-up appearing in succession for each file dropped?
- Add the possibility to edit products using the same pop-up as the one used for adding one.
  - The possibility to edit the file would be nice, but would need more design input.
- The default number proposed when adding a product seems flaky. There must be a way to improve it.
