
# ShredX

✍️ **App Overview**  
ShredX is a web application designed to offer a fitness forum and training programs. It provides users with an interactive community for discussing fitness topics and access to various workout programs to help them achieve their fitness goals. The application features both public and private sections, with personalized profiles and exclusive content for registered users.

![](./client/public/images/shredx-main.png)

Users can register for an account, participate in the forum discussions and browse fitness programs.With a focus on both social interaction and structured workout plans, ShredX aims to create an engaging fitness experience for all users.

---

🌎 **Public Part**  
The pages accessible to guests (non-logged-in users) are:
- Home
- Forum
- Register
- Login

👤 **Private Part**  
The pages accessible to logged-in users are:
- Programs (Fitness Programs)
- User Profile (View posts in forum an liked posts)
- Logout

🧑 **User Features**  
- Access to fitness programs
- View user profile(Posts in forum, liked posts);
- Forum participation(Create post, like post and comment);
- Logout functionality

---
### Follow these steps to get the ShredX application up and running on your local machine for development and testing purposes.
---

### **Client Application Setup**

1. **Clone the Repository**:  
   You can clone the repository using the following command or download it as a ZIP file and extract it on your computer.

   ```bash
   git clone https://github.com/viktorkortsanov/ShredX.git
   ```

2. **Navigate to the Project Directory**:  
   Use the terminal to navigate to the project directory.

   ```bash
   cd shredx
   ```

3. **Navigate to the Client Directory**:  
   Go to the client directory.

   ```bash
   cd client
   ```

4. **Install Dependencies**:  
   Install all the necessary dependencies by running the following command in your terminal:

   ```bash
   npm install
   ```

5. **Run the Client Part**:  
   Start the React development server with this command:

   ```bash
   npm run dev
   ```

6. **Open the Project**:  
   Access the application by opening the following URL in a web browser:  
   `http://localhost:5173/`

---

### **Server Part Setup**

**Before setup the server part download MongoDB**

Download from here **[](https://www.mongodb.com/try/download/community)**.


1. **Navigate to the Server Directory**:  
   Go to the server directory:

   ```bash
   cd server
   ```

2. **Install Server Dependencies and Start the Server**:  
   Execute the following commands in order to start the server.

   ```bash
   npm install
   npm start
   ```

3. **Running the Server**:  
   Once the server is started, it will listen for requests on:  
   `http://localhost:3030/`

---

🛠️ **Technologies and Tools**
- ![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
- ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=flat&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-%23404d59.svg?style=flat&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%233F9B3D.svg?style=flat&logo=mongodb&logoColor=white)
- ![Redux](https://img.shields.io/badge/Redux-%2320232a.svg?style=flat&logo=redux&logoColor=%2361DAFB)
- ![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS-%231572B6.svg?style=flat&logo=css3&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white)

---

📚 **Libraries**
- **React Router**: For handling navigation between different pages
- **Cookie-Parser**: For handling cookies in the backend
- **Bcrypt**: For hashing passwords
- **EmailJS**: For sending emails from the client-side
- **Mongoose**: For interacting with MongoDB in the backend
- **JsonWebToken**: For creating and verifying JSON Web Tokens
- **Cors**: For enabling Cross-Origin Resource Sharing (CORS)