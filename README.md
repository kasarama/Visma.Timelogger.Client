# Client solution for e-conomic hiring task

This application covers the following User Stories:

1. As a freelancer I want to be able to register how I spend time on my _projects_, so that I can provide my _customers_ with an overview of my work.
2. As a freelancer I want to be able to get an _overview of my time registrations per project_, so that I can create correct invoices for my customers.
3. As a freelancer I want to be able to _sort my projects by their deadline_, so that I can prioritise my work.

Individual time registrations should be 30 minutes or longer, and once a project is complete it can no longer receive new registrations. You do not need to create an actual invoice.

## Implementation

This React app is developed by adapting [material-kit-react](https://github.com/minimal-ui-kit/material-kit-react/tree/main).

Application is typed using TypeScript and uses Role Based Access Control.

The Authentication and Authorization functions are mocked as the Server does not provide these features. Mocked auth features can be enabled/disabled by changing the value of `ignoreAuth` variable [here](https://github.com/kasarama/Visma.Timelogger.Client/blob/c7c569f7c470e0bd356101d0fe8fa4fd42eeedb6/src/App.tsx#L25).

The available users are:

| userName    |  password   |          roles |
| ----------- | :---------: | -------------: |
| freelancer1 | freelancer1 | ['freelancer'] |
| freelancer2 | freelancer2 | ['freelancer'] |
| customer1   |  customer1  |   ['customer'] |
| customer2   |  customer2  |   ['customer'] |

Once user is logged in the token is valid in 20 minutes. You can change the time [here](https://github.com/kasarama/Visma.Timelogger.Client/blob/c7c569f7c470e0bd356101d0fe8fa4fd42eeedb6/src/_mock/mockFunctions.tsx#L19)

On application start, the authorizeUser function is called that reads user data from store and sends those data and a token to the server. If data is invalid, the Login page at `/login` is returned.

When logging in as a freelancer, app returns the Freelancer Start Page at `/freelancer`.
When clicked on `Projects`, the server is called and depending on the response, app can return the Access Unauthorized Page (if user is not authorized to view the data) at `/401` - logout and login is required in order to get new authentication.
If user is authorized, the page with the list of user's Projects is returned at `/freelancer_projects`.
Projects are sorted by the deadline, and other sorts are available. It is possible to hide Inactive Projects by clicking on `Hide Inactive Projects` button. (The row count in a table is not being updated, so iterating through table's pages might be necessary.)

Click on a row with a project to view the Project's Detail Page at `/freelancer_projects/{projectId}`.
Time Registrations are showed ordered by time.
To register new time, click on `Add Time` button. Time record must not be in the future, it must be between deadline and start time of the project (both edges included) and must be at least of 30 minutes and at most of 24 h (24\*60). Time Registration list is updated if request succeeded.

No customer features are implemented.

### The Router

The Router implementation from the template is extended by RBAC related features. Here the available roots are defined accordingly to the user type.
Protected routes are available for logged in users with valid roles.

### Project structure

Files are organized following te structure of the used template.

The `components` folder includes implementation of components used in app. JS files are the original once from the template.

The `hooks` folder includes user defined hooks (JS files are from the template).

The `layouts`folder includes 2 layouts - one with a navigation and a header components, the other without them.

The `page` folder includes the "PageWrappers" - these files are responsible for requesting resources and returning Page representations of the resources if request succeeded.

The `sections` folder includes sections used in Pages.

The `theme` includes styling related files.

#### There is no test implementd 😱

## How to run this app

This project is developed and tested on Windows 10 with node v20.7.0 and npm 10.1.0.

Add `.env` file in the root directory and add `REACT_APP_PROJECT_SERVICE=http://localhost:5105`

`npm install` to install dependencies, `npm start` runs the create-react-app development server on `http://localhost:3000/´
