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
Copyright (C) 2019 John Su

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
