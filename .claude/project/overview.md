# Overview

Distribu is a financial management application built with React Router and TypeScript. The application focuses on income distribution and reserve management, allowing users to track income sources, allocate funds to different reserves, and monitor reserve usage patterns (expense patterns).

The app focus is simplicity for the user, since many financial management applications are not easy to use.

Distribu is thought mainly for personal and family financial management on a monthly basis.

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