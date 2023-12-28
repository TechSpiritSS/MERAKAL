# Background Task Service API Documentation

This documentation provides information on how to test the Background Task Service API.

## Table of Contents

- [Authentication](#authentication)
- [Submit Background Task](#submit-background-task)
- [Get List of Tasks](#get-list-of-tasks)
- [Get List of Tasks by Status](#get-list-of-tasks-by-status)

## Authentication

To access the Background Task Service API, you need to include a valid Bearer token in the `Authorization` header of your requests.

```bash
-H 'Authorization: Bearer YOUR_API_KEY'
```

Replace `YOUR_API_KEY` with your actual API key.

## Submit Background Task

Endpoint: `POST /`

Submit a background task by providing the following parameters:

- `endpoint` (string, required): The URL endpoint where the task will be executed.
- `delay` (number, optional): The delay in milliseconds before executing the task.
- `method` (string, optional): The HTTP method to use for the task (default is "POST").
- `data` (object, optional): The JSON data to be sent with the task.

Example cURL request:

```bash
curl -X POST -L 'http://your-service-api-endpoint/?endpoint=https://reqbin.com/echo/post/json&delay=1000&method=POST' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"Id": 78912, "Quantity": 1, "Price": 18.00}'
```

Response:

```json
{
  "message": "Task queued successfully",
  "taskId": 1
}
```

## Get List of Tasks

Endpoint: `GET /tasks`

Get a list of all tasks for the provided Bearer token.

Example cURL request:

```bash
curl -X GET 'http://your-service-api-endpoint/tasks' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

Response:

```json
[
  {
    "id": 1,
    "endpoint": "https://reqbin.com/echo/post/json",
    "status": "queued",
    "data": "{\"Id\":78912,\"Quantity\":1,\"Price\":18.00}",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": null
  }
]
```

## Get List of Tasks by Status

Endpoint: `GET /tasks/:status`

Get a list of tasks with a specific status for the provided Bearer token.

Example cURL request:

```bash
curl -X GET 'http://your-service-api-endpoint/tasks/queued' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

Response:

```json
[
  {
    "id": 1,
    "endpoint": "https://reqbin.com/echo/post/json",
    "status": "queued",
    "data": "{\"Id\":78912,\"Quantity\":1,\"Price\":18.00}",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": null
  }
]
```

Replace `http://your-service-api-endpoint/` and `YOUR_API_KEY` with the actual API endpoint and key for your service.