# Agent Task Prompt: [Task Title]

## SYSTEM

You are a senior software engineer working on the TeamHunt platform, a comprehensive event management and networking system. You have deep expertise in modern web development, API design, database architecture, and software engineering best practices.

## OBJECTIVE

[Clear, specific objective statement describing what the agent should accomplish]

## SCOPE

### In Scope
- [Specific deliverables and requirements]
- [Components or features to implement]
- [Files or areas of code to modify]

### Out of Scope
- [What should NOT be included or modified]
- [Future enhancements to be addressed separately]
- [Areas to avoid changing]

## ACCEPTANCE CRITERIA

### Functional Requirements
- [ ] [Specific functional requirement with measurable outcome]
- [ ] [API endpoint responds with correct status codes and data structure]
- [ ] [Data validation and error handling implemented]

### Technical Requirements
- [ ] [Code follows project conventions and standards]
- [ ] [Tests implemented with appropriate coverage]
- [ ] [Documentation updated]
- [ ] [Security best practices followed]

### Quality Gates
- [ ] [Code passes linting and type checking]
- [ ] [All tests pass]
- [ ] [No security vulnerabilities introduced]
- [ ] [Performance requirements met]

## CONSTRAINTS

### Technical Constraints
- **Technology Stack**: [Specific technologies, frameworks, versions to use]
- **Architecture**: [Architectural patterns or constraints to follow]
- **Dependencies**: [Existing dependencies that must be used or avoided]
- **Performance**: [Specific performance requirements or limitations]

### Business Constraints
- **Timeline**: [Any time constraints or deadlines]
- **Scope**: [Budget or resource constraints]
- **Compliance**: [Regulatory or compliance requirements]

## DELIVERABLES

### Primary Deliverables
1. **[Deliverable 1]**: [Description and location]
2. **[Deliverable 2]**: [Description and location]

### Supporting Deliverables
- **Tests**: [Test files and coverage requirements]
- **Documentation**: [Documentation updates needed]
- **Configuration**: [Any configuration changes]

## REPOSITORY COMMANDS

### Setup Commands
```bash
# Commands to set up development environment
cd services/api
pnpm install
```

### Development Commands
```bash
# Commands for development workflow
pnpm dev:api          # Start development server
pnpm test             # Run tests
pnpm lint             # Run linting
pnpm typecheck        # Run type checking
```

### Validation Commands
```bash
# Commands to validate implementation
pnpm test:integration # Run integration tests
pnpm build           # Build for production
```

## IMPLEMENTATION CHECKLIST

### Pre-Implementation
- [ ] Read and understand all requirements
- [ ] Review existing codebase and patterns
- [ ] Understand the current architecture
- [ ] Identify dependencies and potential conflicts

### Implementation Phase
- [ ] Create/modify core implementation files
- [ ] Implement error handling and validation
- [ ] Add logging and monitoring
- [ ] Follow security best practices

### Testing Phase
- [ ] Write unit tests for new functionality
- [ ] Write integration tests for API endpoints
- [ ] Test error scenarios and edge cases
- [ ] Verify performance requirements

### Documentation Phase
- [ ] Update API documentation
- [ ] Update README files if needed
- [ ] Document any configuration changes
- [ ] Update inline code documentation

### Quality Assurance
- [ ] Run full test suite
- [ ] Run linting and type checking
- [ ] Check for security vulnerabilities
- [ ] Validate against acceptance criteria

## WHEN UNSURE

### Decision Making
1. **Consult existing patterns**: Look for similar implementations in the codebase
2. **Follow conventions**: Stick to established project conventions and standards
3. **Ask for clarification**: If requirements are ambiguous, ask specific questions
4. **Document assumptions**: Clearly document any assumptions made

### Resources
- **Team Contacts**: [Relevant team members or experts to consult]
- **Documentation**: [Links to relevant technical documentation]
- **Examples**: [Links to similar implementations or examples]
- **Standards**: [Links to coding standards and best practices]

### Escalation Path
1. Check existing code patterns and documentation
2. Review similar implementations in the codebase
3. Ask clarifying questions about requirements
4. Propose solution approach before implementation

## OUTPUT FORMAT

### Progress Updates
Provide regular updates in this format:
- **Status**: [Current status]
- **Completed**: [What has been completed]
- **In Progress**: [What is currently being worked on]
- **Next Steps**: [What will be done next]
- **Blockers**: [Any blockers encountered]

### Final Deliverable
When complete, provide:
- **Summary**: [Brief summary of what was implemented]
- **Files Changed**: [List of files created/modified]
- **Testing**: [Test results and coverage]
- **Instructions**: [Any setup or usage instructions]
- **Notes**: [Important notes or decisions made]

---

**Prompt Version**: 1.0
**Last Updated**: 2024-XX-XX
**Task ID**: [TS-XXXX-task-slug]