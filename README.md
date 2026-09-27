# Addis Eats

A React food-ordering frontend built for the **IBT College CodeOps Day 35 React Mini-Project**.

Addis Eats allows users to browse dishes, filter the menu by category, view individual dishes, add food to a cart, sign in before checkout, validate delivery information, place a demo order, and see an order confirmation.

## Features

- Food menu loaded from an external recipes API
- Category filtering using URL query parameters
- Individual dish detail pages
- Add to Cart functionality
- Shared cart state using React Context
- Increase and decrease item quantities
- Remove items from the cart
- Live cart count in the navbar
- Demo sign-in flow
- Protected checkout route
- Controlled checkout form
- Checkout validation
- Loading, empty, and error states
- React Error Boundary
- Lazy-loaded Checkout page
- Order confirmation screen
- Cart cleared after a successful order
- Responsive design for desktop, tablet, and mobile

## Tech Stack

- React
- JavaScript / JSX
- Vite
- React Router DOM
- React Context API
- CSS
- DummyJSON Recipes API

## API

The project uses the DummyJSON Recipes API:

```text
https://dummyjson.com/recipes?limit=0
```

The API helper is located at:

```text
src/api/menu.js
```

The application transforms the API response into a smaller dish object used by the UI.

Example dish structure:

```js
{
  id,
  name,
  description,
  price,
  category,
  image
}
```

The current `price` is a frontend demo value because the recipe API does not provide the restaurant price used by Addis Eats.

## Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Landing page and links into the menu |
| `/menu` | Menu | Fetch and display dishes |
| `/menu?category=Lunch` | Menu | Filter dishes by category |
| `/menu/:id` | Dish Detail | Display one dish and add it to the cart |
| `/cart` | Cart | Display order items and total |
| `/signin` | Sign In | Demo authentication |
| `/checkout` | Checkout | Protected and validated checkout form |
| `*` | Not Found | Handle unknown URLs |

## Application Flow

```text
Home
  ↓
Menu
  ↓
Filter by Category
  ↓
View Dish
  ↓
Add to Cart
  ↓
Cart
  ↓
Checkout
  ↓
Sign In when required
  ↓
Validate Form
  ↓
Place Demo Order
  ↓
Clear Cart
  ↓
Order Confirmation
```

## Project Structure

```text
src/
├── Cart/
│   └── CartContext.jsx
│
├── Menu/
│   ├── CategoryBar.jsx
│   ├── DishCard.jsx
│   └── DishList.jsx
│
├── api/
│   └── menu.js
│
├── auth/
│   ├── AuthContext.jsx
│   └── RequireAuth.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── DishDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── SignIn.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── Layout.jsx
├── ErrorBoundary.jsx
├── main.jsx
└── index.css
```

## Component Structure

```text
App
└── Layout
    ├── Header / Navigation
    ├── Outlet
    │
    ├── Home
    ├── Menu
    │   ├── CategoryBar
    │   └── DishList
    │       └── DishCard
    ├── DishDetail
    ├── Cart
    └── Checkout
```

The main responsibilities are separated so each component has a clear job.

- `App.jsx` defines the application routes.
- `Layout.jsx` provides the shared header, navigation, footer, and `<Outlet />`.
- `Menu.jsx` fetches and filters dishes.
- `CategoryBar.jsx` handles category selection.
- `DishList.jsx` renders the collection of dishes.
- `DishCard.jsx` displays one dish and its actions.
- `DishDetail.jsx` loads one dish using the route `id`.
- `CartContext.jsx` owns shared cart state.
- `AuthContext.jsx` owns the demo sign-in session.
- `RequireAuth.jsx` protects the checkout route.
- `Checkout.jsx` owns the checkout form and validation.
- `ErrorBoundary.jsx` provides a fallback when a rendering error occurs.

## State Management

The project keeps each piece of state where it is needed.

| State | Location | Reason |
|---|---|---|
| Selected category | URL | Shareable and survives refresh |
| Fetched dishes | `Menu.jsx` | Menu owns the fetched data |
| Cart | `CartContext.jsx` | Used by multiple screens |
| User session | `AuthContext.jsx` | Needed by navigation and route guard |
| Checkout form | `Checkout.jsx` | Only checkout needs the form fields |
| Order success | `Checkout.jsx` | Only checkout needs it |

## React Concepts Demonstrated

### 1. Components and Props

The application is split into reusable components and passes data and functions using props.

```jsx
<CategoryBar
  selected={category}
  onSelect={handleCategoryChange}
/>
```

```jsx
<DishList
  dishes={filteredDishes}
  onAdd={addToCart}
/>
```

### 2. State and Events

React state is used for changing information such as dishes, loading state, errors, cart contents, and form fields.

```jsx
const [dishes, setDishes] = useState([]);
```

User actions are handled through events such as `onClick`, `onChange`, and form submission.

### 3. `useEffect` and Cleanup

The Menu page uses `useEffect` to load the menu data.

```jsx
useEffect(() => {
  const controller = new AbortController();

  // fetch data

  return () => {
    controller.abort();
  };
}, []);
```

`AbortController` allows the request to be cancelled during cleanup.

### 4. Context and Custom Hooks

The project uses Context for shared cart and authentication state.

```jsx
const { addToCart } = useCart();
```

```jsx
const { user, signIn, signOut } = useAuth();
```

### 5. Nested and Dynamic Routes

The application uses nested routes with `Layout` and a dynamic dish route:

```text
/menu/:id
```

For example:

```text
/menu/1
/menu/5
```

### 6. Guarded Route

Checkout is protected by `RequireAuth`.

```text
/checkout
    ↓
RequireAuth
    ↓
Signed in?
  ├── No  → /signin
  └── Yes → Checkout
```

### 7. Controlled Form and Validation

Checkout inputs are controlled by React state and checked before an order can be submitted.

The form validates:

- Name
- Ethiopian mobile phone number
- Delivery address

### 8. Conditional Rendering

Different UI states are shown depending on the application state.

```jsx
{loading && <p>Loading menu...</p>}
```

```jsx
{error && <p>{error}</p>}
```

```jsx
{filteredDishes.length === 0 && <p>No dishes found.</p>}
```

### 9. Lazy Loading

The Checkout page is lazy-loaded so it can be loaded when needed.

```jsx
const Checkout = lazy(() => import("./pages/Checkout"));
```

`Suspense` provides a loading fallback while the page loads.

### 10. Error Boundary

`ErrorBoundary.jsx` displays a friendly fallback when a rendering error occurs instead of leaving the user with an unexplained blank screen.

## Cart Logic

The cart uses an array of items with a `quantity` value.

When a dish is added:

- If it already exists, its quantity increases.
- If it does not exist, it is added with quantity `1`.

The cart total is calculated with `reduce()`:

```js
const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
```

The navbar cart count is also calculated from the item quantities.

## Checkout

The checkout page is a frontend demonstration of an order flow.

After the form passes validation, order submission is simulated. On success:

```text
Order total is saved
       ↓
Cart is cleared
       ↓
Submitting state ends
       ↓
Success screen appears
```

## Important Prototype Limitation

This project is a **frontend prototype**. It currently does not include:

- Real user authentication
- A production backend
- A production database
- Real payment processing
- A real order API

These features could be added in a future full-stack version.

## Running the Project Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd addis-eats
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Testing Checklist

Before presenting or pushing the project, test:

- Menu loads successfully
- Loading state appears during data fetching
- API error state is displayed when the request fails
- Category filtering changes the URL
- An empty category shows a friendly message
- Dish detail loads a valid `id`
- An invalid dish `id` shows an error state
- Add to Cart updates the navbar count
- Cart quantity controls work
- Removing an item works
- Empty cart displays correctly
- Checkout redirects to Sign In when signed out
- Signing in returns the user to the intended page
- Checkout validation blocks invalid input
- Successful checkout clears the cart
- Unknown URLs display the 404 page
- Application works on smaller screens
- Browser console is clean


## Day 35 Requirement Mapping

| Requirement | Implementation |
|---|---|
| Components | `Menu`, `CategoryBar`, `DishList`, `DishCard` |
| Props | `selected`, `onSelect`, `dishes`, `onAdd` |
| Keys | `key={category}`, `key={dish.id}` |
| Conditional rendering | Loading, error, empty, success states |
| State and events | `useState`, click/change/submit handlers |
| Controlled form | Checkout and Sign In forms |
| Effect + cleanup | Menu API request with `AbortController` |
| Custom hooks | `useCart()`, `useAuth()` |
| Context/store | `CartContext`, `AuthContext` |
| Nested routes | `Layout` with child routes |
| Dynamic route | `/menu/:id` |
| Guarded route | `/checkout` through `RequireAuth` |
| Validation | Checkout validation |
| Error boundary | `ErrorBoundary.jsx` |
| Lazy route | Lazy-loaded Checkout |

## Future Improvements

Possible future improvements include:

- Connect to a real restaurant backend
- Store real restaurant prices in the database
- Implement real authentication and user accounts
- Add real order persistence
- Add payment integration
- Add restaurant-specific categories and menu management
- Add search and sorting
- Add order history
- Add admin functionality

## Author

**Temesgen Abdissa**  
Software Engineer & Full Stack Developer
