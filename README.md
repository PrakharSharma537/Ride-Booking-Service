# 🚖 Ride Booking Microservices (Node.js + Express + MongoDB + RabbitMQ)

A **Ride Booking System** built with **Microservices Architecture** using  
**Node.js, Express.js, MongoDB, and RabbitMQ**.  

This project demonstrates an **event-driven communication** between services using RabbitMQ, and each service has its own MongoDB database.

---

## ✨ Microservices

- **Gateway Service** → Routes client requests  
- **User Service** → User signup, login, profile management  
- **Ride Service** → Creates ride requests, publishes ride events  
- **Captain Service** → Captain register,login,Accepts rides and updates status  
- **Notification Service** → Sends ride acceptance notifications  

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB 
- **Message Broker**: RabbitMQ  
- **Gateway**: Express API Gateway  

---
