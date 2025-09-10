# Agent Task Prompt: Implement POST /v1/events API Endpoint

## SYSTEM

You are a senior software engineer working on the TeamHunt platform, a comprehensive event management and networking system. You have deep expertise in Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, and RESTful API design. You follow best practices for security, validation, testing, and code organization.

## OBJECTIVE

Implement a complete POST /v1/events API endpoint that allows authenticated users to create new events. The endpoint must handle input validation, data persistence, error handling, and return appropriate responses following RESTful conventions.

## SCOPE

### In Scope
- POST /v1/events endpoint implementation
- Event data model and TypeScript interfaces
- Input validation using Joi or Zod
- Database operations using Prisma ORM
- Authentication middleware integration
- Comprehensive error handling
- Unit and integration tests
- API documentation updates

### Out of Scope
- Frontend implementation (separate task)
- Event editing/updating endpoints (future task)
- Event deletion functionality (future task)
- File upload for event images (future enhancement)
- Email notifications (future enhancement)

## ACCEPTANCE CRITERIA

### Functional Requirements
- [ ] POST /v1/events accepts JSON payload with event data
- [ ] Validates required fields: title, description, startDate, endDate, location, maxParticipants
- [ ] Generates unique event ID (UUID)
- [ ] Stores event in PostgreSQL database with proper constraints
- [ ] Returns created event data with 201 status code
- [ ] Handles validation errors with 422 status code and detailed messages
- [ ] Requires authentication (401 for unauthenticated requests)
- [ ] Associates event with authenticated user as organizer

### Technical Requirements
- [ ] Code follows TypeScript strict mode and project conventions
- [ ] Uses existing authentication middleware
- [ ] Implements proper error handling with custom error classes
- [ ] Includes comprehensive unit tests (>80% coverage)
- [ ] Includes integration tests for full workflow
- [ ] Updates OpenAPI/Swagger documentation
- [ ] Follows existing API patterns in the codebase

### Quality Gates
- [ ] All tests pass (unit and integration)
- [ ] Code passes TypeScript compilation
- [ ] Follows existing code style and conventions
- [ ] No security vulnerabilities introduced
- [ ] API response time < 500ms for valid requests

## CONSTRAINTS

### Technical Constraints
- **Technology Stack**: Express.js, TypeScript, Prisma ORM, PostgreSQL
- **Architecture**: Follow existing patterns in services/api
- **Validation**: Use Joi or Zod for input validation
- **Testing**: Jest for unit and integration tests
- **Authentication**: Use existing JWT middleware

### Business Constraints
- **Timeline**: Complete implementation within 2-3 days
- **Scope**: Focus on core event creation only
- **Data**: Store all dates in UTC timezone

## DELIVERABLES

### Primary Deliverables
1. **API Endpoint**: `POST /v1/events` with complete implementation
2. **Event Model**: TypeScript interfaces and Prisma schema
3. **Validation**: Input validation with clear error messages
4. **Tests**: Comprehensive unit and integration test suite

### Supporting Deliverables
- **Controller**: Event creation business logic
- **Repository**: Database operations layer
- **Middleware**: Validation and error handling
- **Documentation**: Updated API specification

## REPOSITORY COMMANDS

### Setup Commands
```bash
cd services/api
pnpm install
pnpm run db:generate  # Generate Prisma client
pnpm run db:push      # Push schema to database
```

### Development Commands
```bash
pnpm dev:api          # Start development server
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript compiler
```

### Database Commands
```bash
pnpm run db:studio    # Open Prisma Studio
pnpm run db:reset     # Reset database (dev only)
pnpm run db:seed      # Seed database with test data
```

## IMPLEMENTATION CHECKLIST

### Pre-Implementation
- [ ] Review existing API patterns in services/api
- [ ] Understand current authentication middleware
- [ ] Review database schema and Prisma models
- [ ] Study existing validation patterns

### Database Schema
- [ ] Define events table schema in Prisma
- [ ] Include required fields: id, title, description, startDate, endDate, location, maxParticipants, organizerId
- [ ] Add proper constraints and indexes
- [ ] Create migration if needed

### API Implementation
- [ ] Create Event TypeScript interface
- [ ] Implement input validation schema
- [ ] Create events controller with create method
- [ ] Implement database repository operations
- [ ] Add route definition with middleware
- [ ] Implement proper error handling

### Testing
- [ ] Write unit tests for validation logic
- [ ] Write unit tests for controller methods
- [ ] Write integration tests for full endpoint
- [ ] Test authentication scenarios
- [ ] Test error handling scenarios

### Documentation
- [ ] Update OpenAPI specification
- [ ] Add JSDoc comments to code
- [ ] Update README if needed

## WHEN UNSURE

### Decision Making
1. **Follow existing patterns**: Look at other endpoint implementations in services/api
2. **Security first**: Ensure proper authentication and validation
3. **RESTful conventions**: Use standard HTTP status codes and response formats
4. **Error handling**: Provide clear, actionable error messages

### API Design Decisions
- Use 201 for successful creation
- Use 422 for validation errors with detailed field-level messages
- Use 401 for authentication errors
- Use 500 for unexpected server errors
- Return the created resource in response body

### Database Design
- Use UUIDs for event IDs
- Store dates in UTC timezone
- Use proper foreign key constraints
- Add database-level validation where appropriate

### Validation Rules
- **title**: Required, 1-200 characters
- **description**: Required, 1-5000 characters
- **startDate**: Required, must be in the future
- **endDate**: Required, must be after startDate
- **location**: Required, 1-500 characters
- **maxParticipants**: Optional, positive integer

## OUTPUT FORMAT

### Progress Updates
```
**Status**: [In Progress/Testing/Complete]
**Completed**: [List of completed tasks]
**Current**: [What is currently being worked on]
**Next**: [Next steps planned]
**Blockers**: [Any issues encountered]
**Files**: [Files created/modified]
```

### Final Deliverable
```
**Summary**: [Brief description of implementation]
**Endpoint**: POST /v1/events
**Files Modified**: [List of all files created/modified]
**Test Results**: [Test coverage and results]
**API Documentation**: [Link to updated docs]
**Usage Example**: [Example API call and response]
```

### Example API Usage
```bash
# Create event (authenticated request)
curl -X POST http://localhost:3001/v1/events \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer <jwt-token>\" \\\n  -d '{\n    \"title\": \"Tech Meetup\",\n    \"description\": \"Monthly tech meetup\",\n    \"startDate\": \"2024-12-15T19:00:00Z\",\n    \"endDate\": \"2024-12-15T21:00:00Z\",\n    \"location\": \"Downtown Conference Center\",\n    \"maxParticipants\": 50\n  }'\n```

---

**Prompt Version**: 1.0
**Last Updated**: 2024-12-10
**Task ID**: TS-0001-api-create-event