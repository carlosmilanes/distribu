# Distribu - Project Specification

## Overview

Distribu is a full-stack financial management application built with React Router 7 and TypeScript. The application focuses on income distribution and reserve fund management, allowing users to track income sources, allocate funds to different reserves, and monitor usage patterns.

The app focus is simplicity for the user, since many financial management applications are not easy to use.

Distribu is thought mainly for personal and family financial management on a monthly basis. Small businesses might also find the app useful, though they are not the primary focus.

## Core Concepts

### Distribu

A **Distribu** represents a financial management workspace or organization. Each distribu contains:

- Income sources and tracking
- Reserve funds with allocation rules
- Usage tracking and reporting
- User access control with role-based permissions

Distribus can be shared and managed by many people.

### Income Management

- **Incomes**: Individual income entries with source, amount, and notes
- **Recurring Incomes**: Automated income tracking with configurable frequency (daily, weekly, monthly)
- Income aggregation and historical tracking

The total of all incomes make up the **funds** available for distribution.

### Reserve Management

- **Reserves**: Named fund allocations with manually assigned amounts from the total funds
- **Active/Inactive States**: Reserves can be created with an assigned amount even if there are not sufficient funds to cover the assignment, but they will remain inactive until sufficient funds are available; users control activation via manual confirmation (e.g., "activate" button). Users can also choose to "pause" a reserve arbitrarily, even if there are enough funds for it.
- **Monthly vs One-time**:
  - **Monthly reserves** persist month-to-month with default assigned amounts (e.g., "Rent", "Groceries")
  - **One-time reserves** are single-month allocations that automatically disappear next month (e.g., "Mom's birthday")
- **Position-based ordering**: Reserves have configurable display order
- **Tagging system**: Reserves can be categorized with custom tags for analysis and grouping
- **Dynamic reallocation**: Users can adjust reserve amounts and reassign leftover funds from fulfilled reserves within the same month

### Usage Tracking

- **Reserve Uses**: Spending records tied to specific reserves
- **Direct Uses**: Direct spending from general funds (not tied to any reserve)
- **Optional Use Reassignment**: Direct uses can optionally be assigned to existing or new reserves at the user's discretion, but they can remain as direct uses permanently if the user prefers.
- **Recurring Uses**: Automatic recurring expenses tied to reserves based on frequency
- **Real-time balance**: Track remaining funds and reserve balances

### Financial Flow & Methodology

The app combines elements of **envelope budgeting** and **zero-based budgeting**:

1. **Income Entry**: Users record income from various sources
2. **Fund Calculation**: Total incomes create the available funds pool
3. **Manual Allocation**: Users manually distribute funds across reserves (envelope budgeting)
4. **Zero-based feedback**: Users see remaining unallocated funds (zero-based budgeting)
5. **Flexible Usage**: Spending can be from specific reserves or general funds
6. **Dynamic Reallocation**: Adjust and reassign funds as needs change throughout the month

## User Journey

1. **Distribu Creation**: User creates a distribu (e.g., "Family")
2. **Income Addition**: User adds incomes as they're received (e.g., "Salary")
3. **Reserve Management**:
   - Create reserves for available funds
   - Reserves can be created without funds but remain inactive until funded
   - Activate/deactivate reserves to control fund allocation
   - Mark reserves as monthly for month-to-month persistence
4. **Fund Allocation**: Manually assign amounts to each active reserve
5. **Tagging & Analysis**: Create and assign tags to reserves for grouping and statistical analysis
6. **Expense Tracking**:
   - Record uses from specific reserves
   - Record direct uses from general funds (direct uses)
   - Optionally reassign direct uses to existing or new reserves (completely optional - direct uses can remain unassigned permanently)

## Technical Architecture

### Frontend Stack

- **Framework**: React Router 7 with SSR
- **Language**: TypeScript
- **Styling**: StyleX
- **UI Components**: React Aria Components
- **Animations**: Motion library
- **Build Tool**: Vite

### Backend Stack

- **Runtime**: Node.js (development), Cloudflare Workers (production)
- **Data Store**: To be determined (currently exploring options)
- **Authentication**: Custom session-based auth with Cloudflare integration
- **Deployment**: Cloudflare (Durable Objects + Workers)

### Key Features

#### Funds Manager

- Income entry and tracking
- Visual fund status display
- Real-time allocation calculations
- Historical income analysis

#### Reserve Manager

- Reserve creation and configuration
- Tag-based organization
- Usage tracking and reporting
- Position-based ordering

#### Authentication System

- User registration and login
- Session-based authentication
- Role-based access control per distribu
- Multi-user collaboration support

## Development Workflow

### Data Management

- `pnpm dev`: Start development server
- `pnpm build`: Create production build with Cloudflare Workers
- `pnpm typecheck`: Run TypeScript validation

### Development Commands

- `pnpm dev`: Start development server with HMR
- `pnpm build`: Create production build
- `pnpm typecheck`: Run TypeScript validation

### Recurring Patterns

- **Recurring Incomes**: Automatically added to funds based on specified frequency (daily, weekly, monthly)
- **Recurring Uses**: Automatically added to their corresponding reserves based on frequency
- **Constraints**:
  - Recurring uses can only be tied to reserves (no direct recurring uses)
  - Monthly recurring uses can only belong to monthly reserves
  - Daily/weekly recurring uses behavior depends on reserve type:
    - If tied to one-time reserves: only recur within the current month
    - If tied to monthly reserves: continue recurring according to their frequency across months
- **User Control**: Users can be notified of automatic additions to review, adjust, or remove them

### Multi-User Collaboration

- **Roles**:
  - **Managers/Admins**: Full edit permissions (add incomes, create reserves, manage settings)
  - **Viewers**: Read-only access to check financial status
- **Use Cases**:
  - Couples: One partner manages, other views
  - Mentorship: Financial advisors/mentors get viewer access for guidance
  - Family: Parents manage, older children view for financial education

### Monthly Cycle Management

- **User-Controlled Transition**:
  - Users receive notifications when month-end approaches
  - Users manually trigger creation of new month's distribu
  - This gives users control over timing and final adjustments
- **Month Transition Process**:
  - One-time reserves are archived (not copied to new month)
  - Previous month's incomes are archived
  - Monthly reserves are copied to new distribu with their default assigned amounts
  - Read-only snapshot of previous distribu's final state preserved in monthly archive
- **Fund Carryover**: Potential future feature to pass remaining funds as "first income" to next month
- **Reallocation**: Only possible within the same month
- **Archive System**: Complete monthly snapshots for historical reference (detailed comparison features to be considered later)

## Planned Features & Future Development

### Current Development Focus (Phase 1)

- Core fund management and reserve functionality
- Complete UI implementation
- Data persistence architecture (exploring options)

### Planned Features (Phase 2-3)

- Real-time collaboration and synchronization
- Cross-device synchronization via Cloudflare Durable Objects
- Conflict resolution for concurrent editing scenarios
- Monthly archive system
- Month-end notifications and manual transition controls
- Notification system for recurring transactions
- Fund carryover between months
- Reserve activation notifications and controls

### Future Considerations (Phase 4+)

- Native iOS and Android apps
- Advanced historical analysis and reporting
- Tag-based statistical analysis
- Enhanced reporting and analytics
- REST API layer for third-party integrations
- Export/import functionality

### Explicitly Not Planned

- Bank integrations
- Payment system integrations
- Third-party financial tool connections
