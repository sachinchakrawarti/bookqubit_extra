# Logger

> **Module:** `src/shared/logger`
>
> The Logger is responsible for recording everything that happens inside the application. Instead of using `console.log()` everywhere, a logger provides a structured, consistent, and reliable way to record information, warnings, errors, and debugging details.

---

# Table of Contents

1. What is a Logger?
2. Why was Logger created?
3. Why not use `console.log()`?
4. Why do companies use Loggers?
5. Benefits of a Logger
6. Logger Levels
7. Logger Flow
8. Logger in BookQubit
9. Real-world Examples
10. Folder Structure
11. Future Improvements
12. Summary

---

# 1. What is a Logger?

A **Logger** is a utility that records events occurring inside an application.

It can record:

- Application startup
- User requests
- Database queries
- Errors
- Warnings
- Debug information
- Performance metrics

Think of it as the application's **diary**.

Instead of printing random messages to the console, the logger creates organized records.

---

# 2. Why was Logger created?

Imagine your application has **100,000 users**.

One user reports:

> "Book details are not loading."

How will you know?

Without logs, you have no idea:

- Which API failed?
- Which database query failed?
- Which server handled the request?
- Which user experienced the problem?
- What was the error message?

A logger records all of this automatically.

---

# 3. Why not use `console.log()`?

Many beginners use:

```javascript
console.log("Server Started");
```

This works for small projects.

But in large applications:

```javascript
console.log("Something happened");
console.log("Error");
console.log(user);
console.log(book);
```

After thousands of requests, your console becomes impossible to understand.

A logger formats everything consistently.

Example:

```
[INFO ] Server Started
[WARN ] Cache Miss
[ERROR] Database Connection Failed
```

---

# 4. Why do companies use Loggers?

Every large company uses logging.

Examples:

- Google
- Microsoft
- Amazon
- Netflix
- Meta
- Uber

Reasons:

- Debug production problems
- Monitor server health
- Detect attacks
- Audit user activity
- Measure performance
- Generate reports

Without logging, maintaining large applications would be extremely difficult.

---

# 5. Benefits of a Logger

## Easy Debugging

Instead of guessing, you can read the logs.

---

## Error Tracking

Every error is stored.

Example:

```
Database Connection Failed
```

---

## Security

Logs help detect:

- Invalid login attempts
- SQL injection attempts
- Suspicious API usage

---

## Performance Monitoring

You can measure:

- API response time
- Database query time
- Cache performance

---

## Auditing

Logs answer questions like:

- Who deleted this book?
- When was it deleted?
- Which admin performed the action?

---

# 6. Logger Levels

Most applications use these levels.

## INFO

General application information.

Example:

```
Server Started
```

---

## DEBUG

Detailed information for developers.

Example:

```
Loading Routes...
```

---

## WARN

Something unexpected happened, but the application still works.

Example:

```
Redis Cache Not Available
```

---

## ERROR

Something failed.

Example:

```
Database Connection Failed
```

---

## FATAL

Critical error.

Usually the application must stop.

Example:

```
Unable to Load Environment Variables
```

---

# 7. Logger Flow

```
Application
      │
      ▼
Logger
      │
      ▼
Formatter
      │
      ▼
Transport
      │
      ├──────── Console
      │
      ├──────── File
      │
      └──────── External Services
```

---

# 8. Logger in BookQubit

BookQubit is an enterprise-scale online book platform. Almost every action performed by users, administrators, and the system should be recorded by the Logger.

The Logger helps developers monitor the application, troubleshoot problems, audit important actions, and improve performance.

## Server Logs

When the server starts or stops.

```
[INFO] BookQubit Server Started

Environment : development
Port        : 5000
```

---

## Authentication Logs

When users log in, log out, or fail authentication.

```
[INFO] User Login

User ID : 105
Email   : john@example.com
IP      : 192.168.1.10
```

Failed login:

```
[WARN] Invalid Login Attempt

Email : john@example.com
IP    : 192.168.1.10
```

---

## Registration Logs

When a new account is created.

```
[INFO] New User Registered

User ID : 210
Name    : Rahul Sharma
```

---

## Book Logs

Whenever books are managed.

Book Created

```
[INFO] Book Created

Book ID : BK00125
Title   : Atomic Habits
```

Book Updated

```
[INFO] Book Updated

Book ID : BK00125
```

Book Deleted

```
[WARN] Book Deleted

Book ID : BK00125
Admin   : sachin
```

---

## Category Logs

```
[INFO] Category Created

Category : Programming
```

---

## Author Logs

```
[INFO] Author Added

Author : James Clear
```

---

## Publisher Logs

```
[INFO] Publisher Updated

Publisher : Penguin Random House
```

---

## Search Logs

Understanding what users search for helps improve recommendations.

```
[INFO] Search

Keyword : JavaScript
Results : 245
```

---

## Wishlist Logs

```
[INFO] Wishlist Updated

User ID : 105
Book ID : BK00520
```

---

## Cart Logs

```
[INFO] Book Added To Cart

User ID : 105
Book ID : BK00245
Quantity: 2
```

---

## Review Logs

```
[INFO] Review Submitted

Book ID : BK00245
Rating  : 5
```

---

## Image Upload Logs

```
[INFO] Image Uploaded

File : atomic-habits.jpg
Size : 1.8 MB
```

---

## API Logs

Every API request can be logged.

```
[INFO]

GET /api/books

Status : 200

Time : 48 ms
```

---

## Database Logs

```
[INFO]

Connected to SQLite Database
```

Query failure:

```
[ERROR]

Database Query Failed

Table : books
```

---

## Cache Logs

```
[INFO]

Cache Hit

Key : books:latest
```

```
[WARN]

Cache Miss

Key : books:popular
```

---

## File Logs

```
[INFO]

PDF Uploaded

File : javascript-guide.pdf
```

---

## Security Logs

```
[WARN]

Unauthorized Access

Route : /admin/books
IP    : 192.168.1.25
```

---

## Backup Logs

```
[INFO]

Database Backup Created

Location : storage/backups/
```

---

## Scheduler Logs

```
[INFO]

Nightly Cleanup Started
```

---

## Email Logs

```
[INFO]

Verification Email Sent

User ID : 120
```

---

## Payment Logs (Future)

```
[INFO]

Payment Successful

Order ID : ORD00125
Amount   : ₹499
```

---

## Error Logs

Unexpected application errors.

```
[ERROR]

Unhandled Exception

Message : Cannot read properties of undefined
```

---

## Performance Logs

```
[INFO]

GET /api/books

Execution Time : 35 ms
```

---

## Why BookQubit Needs a Logger

The Logger helps BookQubit by:

- Recording all important user actions
- Tracking administrator activities
- Debugging production issues
- Monitoring API performance
- Detecting security threats
- Tracking database operations
- Recording uploads and downloads
- Auditing changes to books and categories
- Monitoring scheduled jobs
- Generating operational reports

Without the Logger, it becomes difficult to understand what happened when something goes wrong. It acts as the application's **black box recorder**, making maintenance, debugging, monitoring, and auditing much easier.

---

# 9. Real-world Examples

When a user signs in:

```
[INFO]

User Login

User ID : 102

IP : 192.168.1.10
```

---

When payment succeeds:

```
[INFO]

Payment Successful

Order ID : ORD102
Amount : ₹499
```

---

When an API fails:

```
[ERROR]

GET /api/books

Status : 500
```

---

# 10. Folder Structure

```
shared/
└── logger/
    ├── formatter.js
    ├── transport.js
    ├── index.js
    └── README.md
```

---

# 11. Future Improvements

BookQubit can later support:

- Daily log files
- Error logs
- Request logs
- Database logs
- Authentication logs
- Performance logs
- Log rotation
- Cloud logging
- Email alerts
- Dashboard monitoring

Professional applications usually use:

- Winston
- Pino
- Bunyan

---

# 12. Summary

A Logger is one of the most important utilities in a backend application.

It helps developers:

- Debug problems
- Track errors
- Monitor servers
- Improve security
- Measure performance
- Audit user actions

For BookQubit, every important event should pass through the Logger instead of using `console.log()`.

As the project grows, the Logger becomes the primary source of information for understanding what happened inside the application.