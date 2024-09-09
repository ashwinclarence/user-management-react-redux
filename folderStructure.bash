user-management-system/
│
├── backend/                         # Backend (Node.js + Express + MongoDB)
│   ├── config/                      # Configurations
│   │   └── db.js                    # MongoDB Connection Setup
│   ├── controllers/                 # Controllers for request handling
│   │   └── userController.js        # User-related logic
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js        # JWT authentication middleware
│   │   └── errorMiddleware.js       # Error handling middleware
│   ├── models/                      # MongoDB models/schemas
│   │   └── userModel.js             # User schema
│   ├── routes/                      # API routes
│   │   ├── userRoutes.js            # User routes for CRUD operations
│   │   └── authRoutes.js            # Authentication routes (login, register)
│   ├── utils/                       # Utility functions (e.g., JWT handling)
│   │   └── generateToken.js         # JWT token generation
│   ├── .env                         # Environment variables (e.g., MongoDB URL, JWT secret)
│   ├── server.js                    # Main backend entry point
│   └── package.json                 # Backend dependencies
│
├── frontend/                        # Frontend (React + Redux)
│   ├── public/                      # Static files
│   │   └── index.html               # Main HTML template
│   ├── src/                         # React source code
│   │   ├── actions/                 # Redux actions
│   │   │   ├── userActions.js       # Actions for user-related operations
│   │   │   └── authActions.js       # Actions for authentication (login/register)
│   │   ├── components/              # Reusable components
│   │   │   ├── UserList.js          # Displays list of users
│   │   │   ├── UserForm.js          # Form for user creation/editing
│   │   │   └── Navbar.js            # Navigation component
│   │   ├── constants/               # Redux action types/constants
│   │   │   └── userConstants.js     # Constants for user actions (CREATE_USER, DELETE_USER)
│   │   ├── reducers/                # Redux reducers
│   │   │   ├── userReducer.js       # Reducer for user state management
│   │   │   ├── authReducer.js       # Reducer for authentication
│   │   │   └── index.js             # Combines all reducers
│   │   ├── store/                   # Redux store setup
│   │   │   └── store.js             # Configures Redux store with middleware
│   │   ├── pages/                   # Pages (routes) for the app
│   │   │   ├── Home.js              # Home page
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Register page
│   │   │   └── UserManagement.js    # Main user management page
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # React entry point
│   │   └── styles/                  # CSS and styling
│   │       └── App.css              # Main app styling
│   ├── .env                         # Frontend environment variables (e.g., API URL)
│   └── package.json                 # Frontend dependencies
│
├── .gitignore                       # Ignoring node_modules and environment files
├── README.md                        # Project documentation
└── package.json                     # Root package.json for managing both frontend and backend concurrently
