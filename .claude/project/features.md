# Key Features

## Funds Manager

- Income entry and tracking
- Visual fund status display
- Real-time allocation calculations
- Historical income analysis

## Reserve Manager

- Reserve creation and configuration
- Tag-based organization
- Usage tracking and reporting
- Position-based ordering

## Authentication System

- User registration and login
- Session-based authentication
- Role-based access control per distribu
- Multi-user collaboration support

## Recurring Patterns

- **Recurring Incomes**: Automatically added to funds based on specified frequency (daily, weekly, monthly)
- **Recurring Uses**: Automatically added to their corresponding reserves based on frequency
- **Constraints**:
  - Recurring uses can only be tied to reserves (no direct recurring uses)
  - Monthly recurring uses can only belong to monthly reserves
  - Daily/weekly recurring uses behavior depends on reserve type:
    - If tied to one-time reserves: only recur within the current month
    - If tied to monthly reserves: continue recurring according to their frequency across months
- **User Control**: Users can be notified of automatic additions to review, adjust, or remove them

## Multi-User Collaboration

- **Roles**:
  - **Managers/Admins**: Full edit permissions (add incomes, create reserves, manage settings)
  - **Viewers**: Read-only access to check financial status
- **Use Cases**:
  - Couples: One partner manages, other views
  - Mentorship: Financial advisors/mentors get viewer access for guidance
  - Family: Parents manage, older children view for financial education

## Monthly Cycle Management

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
- Cross-device synchronization (possibly via Cloudflare Durable Objects)
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
- Export/import functionality

### Explicitly Not Planned

- Bank integrations
- Payment system integrations
- Third-party financial tool connections