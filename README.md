# Eyetinerary API
![Repository Size](https://img.shields.io/github/repo-size/Tyncture/Eyetinerary-API.svg?t&style=flat-square)
![License](https://img.shields.io/github/license/Tyncture/Eyetinerary-API.svg?&style=flat-square)
![Top Language](https://img.shields.io/github/languages/top/Tyncture/Eyetinerary-API.svg?&style=flat-square)

Platform for effortless creation, sharing and management of travel and general itineraries.

Backend API written in [TypeScript](https://www.typescriptlang.org/), running on the Node.js platform. It is built on top of the [Nest.js](https://nestjs.com/) framework, with PostgreSQL using [TypeORM](https://typeorm.io).

## GET Methods
### GET `/itinerary/:id`
#### Response Body
| Key         | Type     | Description                      |
|-------------|----------|----------------------------------|
| id          | `number` | Unique itinerary identifier      |
| title        | `string` | Itinerary title                   |
| description | `string` | Itinerary description            |
| owner       | `Object` | Owner information, if applicable |
| pages       | `Object` | Pages, if applicable             |
| created     | `string` | Created timestamp                |
| updated     | `string` | Last updated timestamp           |

### GET `/page/:id`
#### Response Body
| Key             | Type     | Description                     |
|-----------------|----------|---------------------------------|
| id              | `number` | Unique page identifier          |
| title            | `string` | Page title                       |
| description     | `string` | Page description                |
| itinerary       | `Object` | Parent itinerary                |
| rankInItinerary | `number` | Page number in parent itinerary |
| items           | `Object` | Items, if applicable            |
| created         | `string` | Created timestamp               |
| updated         | `string` | Last updated timestamp          |

### GET `/item/:id`
#### Response Body
| Key       | Type     | Description            |
|-----------|----------|------------------------|
| id        | `number` | Unique item identifier |
| title     | `string` | Item title             |
| body      | `string` | Item body              |
| timeStart | `string` | Item start timestamp   |
| timeEnd   | `string` | Item end timestamp     |
| page      | `Object` | Parent page            |
| created   | `string` | Created timestamp      |
| updated   | `string` | Last updated timestamp |

## POST/PATCH methods
### POST `/itinerary` + PATCH `/itinerary/:id`
#### Request Body
| Key         | Type     | Description           |
|-------------|----------|-----------------------|
| title       | `string` | Itinerary title       |
| description | `string` | Itinerary description |

#### Response Body
| Key       | Type     | Description                          |
|-----------|----------|--------------------------------------|
| editToken | `string` | Edit token for ownerless itineraries |

### POST `/page` + PATCH `/page/:id`
#### Request Body
| Key             | Type     | Description                                   |
|-----------------|----------|-----------------------------------------------|
| title           | `string` | Page title                                    |
| itinerary       | `number` | Parent itinerary ID                           |
| description     | `string` | Page description                              |
| rankInItinerary | `number` | Page number in parent itinerary               |
| editToken       | `string` | Optional - for when no JWT provided in header |
#### Response body
Same as GET `/page/:id` with new ID returned.

### POST `/item` + PATCH `/item/:id`
#### Request Body
| Key        | Type     | Description                                   |
|------------|----------|-----------------------------------------------|
| title      | `string` | Item title                                    |
| page       | `number` | Parent page ID                                |
| body       | `string` | Item body                                     |
| rankInPage | `number` | Item number in parent page                    |
| timeStart  | `string` | Item start timestamp                          |
| timeEnd    | `string` | Optional - item end timestamp                 |
| editToken  | `string` | Optional - for when no JWT provided in header |
#### Response body
Same as GET `/item/:id` with new ID returned.

## License
```
MIT License

Copyright (c) 2019 John Su

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
