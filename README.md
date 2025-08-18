# Distribu

A full-stack financial management application focused on income distribution and reserve fund management. Built with React Router 7 and TypeScript, Distribu combines envelope budgeting with zero-based budgeting principles to help users track income sources, allocate funds to reserves, and monitor spending patterns.

Designed primarily for personal and family financial management on a monthly basis, with a focus on simplicity and ease of use.

## Core Features

### 💰 Income Management
- Track individual income entries with sources and notes
- Configure recurring incomes (daily, weekly, monthly)
- Real-time fund calculation and allocation

### 📊 Reserve Management
- Create named fund allocations with manual assignments
- Monthly vs one-time reserve types
- Active/inactive states with manual control
- Tag-based organization and analysis
- Position-based ordering

### 📝 Usage Tracking
- Record spending from specific reserves
- Direct spending from general funds
- Optional reassignment of direct uses to reserves
- Recurring expense automation

### 👥 Multi-User Collaboration
- Role-based access control (Managers/Viewers)
- Shared distribu workspaces
- Real-time collaboration support

### 🗓️ Monthly Cycle Management
- User-controlled month transitions
- Archive system for historical reference
- Dynamic fund reallocation within months

## Technical Stack

### Frontend
- **Framework**: React Router 7 with SSR
- **Language**: TypeScript
- **Styling**: StyleX
- **UI Components**: React Aria Components
- **Animations**: Motion library
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js (development), Cloudflare Workers (production)
- **Data Store**: To be determined (exploring options)
- **Authentication**: Custom session-based auth with Cloudflare integration
- **Deployment**: Cloudflare (Durable Objects + Workers)

## Core Concepts

### Distribu Workspace
A **Distribu** represents a financial management workspace that contains:
- Income sources and tracking
- Reserve funds with allocation rules
- Usage tracking and reporting
- User access control with role-based permissions

### Financial Flow
Distribu combines **envelope budgeting** and **zero-based budgeting**:
1. **Income Entry**: Record income from various sources
2. **Fund Calculation**: Total incomes create available funds pool
3. **Manual Allocation**: Distribute funds across reserves (envelope budgeting)
4. **Zero-based Feedback**: See remaining unallocated funds
5. **Flexible Usage**: Spend from specific reserves or general funds
6. **Dynamic Reallocation**: Adjust fund distribution within the month

### User Journey
1. Create a distribu workspace (e.g., "Family Budget")
2. Add incomes as they're received
3. Create and manage reserves with manual fund allocation
4. Track expenses from reserves or as direct uses
5. Analyze spending patterns with tags and reporting

## Development Status

### Current Focus (Phase 1)
- Core fund management and reserve functionality
- Complete UI implementation
- Data persistence architecture

### Planned Features (Phase 2-3)
- Real-time collaboration and synchronization
- Monthly archive system
- Enhanced notification system
- Cross-device synchronization

---

Built for simplified financial management with React Router 7 and TypeScript.
