# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## Security Classification *(mandatory)*

<!--
  ACTION REQUIRED: Classify the security impact of this feature.
  This classification drives security requirements throughout the specification.
-->

**Data Sensitivity**: [HIGH/MEDIUM/LOW]
- Type of data handled: [e.g., PII, financial, public]
- Retention requirements: [e.g., "30 days", "7 years", "permanent"]
- Compliance requirements: [e.g., GDPR, SOC2, N/A]

**Access Level**: [HIGH/MEDIUM/LOW]
- Required authentication: [YES/NO]
- Required authorization: [Role types needed]
- API security level: [e.g., Public API, Internal only, Partner API]

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

#### Functional Edge Cases
- What happens when [boundary condition]?
- How does system handle [error scenario]?

#### Security Edge Cases
- What happens during authentication failure?
- How are invalid tokens handled?
- What if rate limits are exceeded?
- How are injection attempts handled?
- What happens during data validation failures?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

#### Core Requirements
- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

#### Security Requirements
- **SR-001**: System MUST validate all input against [validation rules]
- **SR-002**: System MUST enforce rate limiting at [specified rate]
- **SR-003**: System MUST implement authentication using [method]
- **SR-004**: System MUST enforce authorization for [resources]
- **SR-005**: System MUST encrypt [data types] using [standard]
- **SR-006**: System MUST implement audit logging for [operations]
- **SR-007**: System MUST sanitize all output to prevent [vulnerability]

#### Error Handling Requirements
- **ER-001**: System MUST handle [error condition] by [action]
- **ER-002**: System MUST log security events with [required fields]
- **ER-003**: System MUST mask sensitive data in [contexts]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **SR-008**: System MUST implement rate limiting at [NEEDS CLARIFICATION: rate not specified - requests/min/IP?]
- **ER-004**: System MUST retain security logs for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

#### Data Entities
- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

#### Security Entities
- **Authentication**: [Auth tokens, sessions, credentials]
- **Authorization**: [Roles, permissions, scopes]
- **Audit**: [Audit trail, security events, logs]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

#### Functional Success Criteria
- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]

#### Security Success Criteria
- **SSC-001**: [Authentication success rate, e.g., "99.9% successful auth attempts for valid credentials"]
- **SSC-002**: [Authorization accuracy, e.g., "Zero unauthorized access attempts succeed"]
- **SSC-003**: [Security response time, e.g., "Security events logged within 100ms"]
- **SSC-004**: [Input validation, e.g., "100% of malformed requests rejected"]
- **SSC-005**: [Rate limiting effectiveness, e.g., "All requests above threshold blocked"]

#### Compliance Success Criteria
- **CSC-001**: [Audit capability, e.g., "100% of required events captured in audit trail"]
- **CSC-002**: [Data protection, e.g., "All PII encrypted at rest and in transit"]
- **CSC-003**: [Access logging, e.g., "All access attempts logged with required fields"]
