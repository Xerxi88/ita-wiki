# Changelog

All notable changes to this project will be documented in this file.
## [1.5.1] - 2024-01-10

### Fixed

-  Corrected DNI letter handling to ensure it's always stored and verified in uppercase.

### Testing

- Introduced tests to ensure DNI handling in registration and login processes accepts both uppercase and lowercase inputs.

## [1.5.0] - 2023-12-20


### Added

- authenticate middleware
- Get user information endpoint

### Changed

- Modified validate token route to use authenticate middleware
- Updated controller logic to be handled in the authenticate middleware
- 
### Testing

- Added tests for get user information endpoint
  
### Documentation

- Enhanced OpenAPI documentation with details on the new get user information endpoint

## [1.4.0] - 2023-12-14

### Changed

- Register, Validate, Login endpoint returns user id
- InvalidParamError to catch foreign_key error
- EmailError to EmailDniError

### Added

- DuplicateError to catch unique_key error in errorMiddleware

### Testing

- Added tests for GET itinerary.
- Updated test for POST register.

### Documentation

- Updated Login and Validate endpoints
- Added duplicateError response and register response for POST register user.
  
## [1.3.0] - 2023-11-23

### Added

- 'itinerary' table and update 'user' table schema
- itineraryId to userSchema and registerController
- InvalidParamError to catch foreign_key error

### Testing

- Added tests for GET itinerary.
- Updated test for POST register.

### Documentation

- Swagger endpoint for GET itinerary.
- Updated error response for POST register user.
  
## [1.2.0] - 2023-11-22

### Changed

- Updated "users" table to "user"

### Testing

- Added tests for POST validate token.

### Documentation

- Swagger endpoint for POST validate token.
- Updated description for POST login user.
  
## [1.1.1] - 2023-11-20

### Added

- Swagger endpoint for POST register user.

### Fixed

- Register endpoint schema, route, controller and test.

## [1.1.0] - 2023-11-14

### Added

- Initial beta release of the project.
