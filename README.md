# vue3-ts-vite-starter-template

A single page app [Vite](https://vitejs.dev) starter template, created to easily bootstrap Vue.js 3 apps.

# README

### Overview

Build a flight Departures board as per [this design](https://www.figma.com/file/Kr6pYxQbIdbfD5wG3Mo6QP/Tech-Test-FID?node-id=2%3A2), and populated it with data consumed from the [flights data API](https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata).

### Details

- Single page app.
- Used HTML and CSS
- Used **VueJS**
- Supported by the major browsers (Chrome, Firefox, Safari, Edge).
- Responsive
- Has partial test coverage

**Your solution MUST include the following features:**

- Included a form below the Departures board to allow the user to select each flight, and update the status. Status options should include:

  - Free text
  - Departed
  - Diverted
  - Delayed
  - Cancelled

- Error handling - if the API call fails, an error message should be displayed to the user.

**Features**

- TypeScript
- Jest for unit testing
- Pinia for state management
- Vue Router 4 for client-side routing
- Bootstrap 5.2 for layout and styling
- SCSS variables inside Vue components
- Purgecss for eliminating unused CSS
- Basic multiple layouts feature
- ESLint config based on `eslint:recommended` with sensible defaults :relaxed:
- [Prettier](https://prettier.io/) for code formatting
- Automated release workflow with [semantic-release](https://github.com/semantic-release/semantic-release)

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run dev
```

### Compiles and minifies for production

```
pnpm run build
```

## Run your unit tests

```
pnpm run test:unit
```

### Lints files

```
pnpm run lint
```

### Lints and fixes files

```
pnpm run lint-fix
```

### Runs Typechecks

```
pnpm run typecheck
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/guide/).
