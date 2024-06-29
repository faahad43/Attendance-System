# Attendance System

This Attendance System is built using the MERN stack and Tailwind CSS. It includes user and admin panels for managing attendance records efficiently.

## Features

### User Panel

- **Registration & Login**: 
  - Users can register and log in to the system.
  
- **Attendance Management**:
  - **Mark Attendance**: 
    - Users can mark their attendance as present once per day.
    - Attendance cannot be marked more than once or deleted.
  - **Mark Leave**:
    - Users can send leave requests to the admin.
  - **View Attendance**:
    - Users can view all their marked attendance records.

### Admin Panel

- **Login**:
  - Admins can log in to access the admin panel.
  
- **Attendance Management**:
  - **View Records**:
    - View all login records of students.
  - **Edit Attendance**:
    - Admins can add, edit, or delete student attendance.
  
- **Leave Management**:
  - Approve or reject leave requests.


- **System Reports**:
  - Generate comprehensive reports of all attendances between specified dates.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/attendance-system.git
   cd attendance-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Run the Application**:
   ```bash
   cd ..
   npm run dev
   ```

4. **Environment Variables**:
   - Create a `.env` file in the root directory with the following variables:
     ```plaintext
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     ```

## Usage

- **Users**:
  - Register or log in to access the panel.
  - Mark attendance and view records.
  - Send leave requests to the admin.

- **Admins**:
  - Log in to access the admin panel.
  - Manage attendance and leave requests.
  - Generate system reports.

## License

This project is licensed under the MIT License.