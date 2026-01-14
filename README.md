# IBM Network Intelligence - Interactive Chat Demo

A modern, interactive chat interface for IBM Network Intelligence with AI-powered insights, ticket management, and real-time network monitoring capabilities.

## Features

### Chat Interface
- **Persistent Chat Panel**: Toggleable chat rail on the right side with smooth animations
- **Widget View**: When no conversation exists, displays product tiles for:
  - Network Metrics
  - Anomaly Detection
  - Traffic Analysis
  - Incident Management
- **Conversation Mode**: Full chat experience with AI responses
- **New Chat**: Reset conversation and return to widget view
- **History**: Access previous conversations (UI ready)

### Ticket Management
- **Ticket Artifacts**: Display network tickets with AI badge
- **Tearsheet View**: Detailed ticket information in a slide-up panel
  - Slides up from bottom, stops below header
  - Shows ticket details, status, priority, and timestamps
  - Covers main content but not chat panel

### UI Components
- **Top Bar**: Full-width header with IBM Network Intelligence branding
- **Sidebar**: Fixed navigation with icon-based menu
- **Dashboard**: Main content area with network visualizations
- **Chat Input**: Advanced input with mode selection (Ask/Plan/Analyze) and tool options
- **Dark Theme**: Consistent dark UI with custom scrollbars

### Interactions
- Resizable chat panel (320px - 640px)
- Smooth transitions and animations
- Hover effects and active states
- Responsive layout adjustments

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom Components** built with shadcn/ui patterns

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interactive-chat-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── chat-input.tsx       # Advanced chat input with tools
│   │   │   ├── chat-panel.tsx       # Chat rail with widgets/messages
│   │   │   ├── dashboard.tsx        # Main content area
│   │   │   ├── sidebar.tsx          # Left navigation
│   │   │   ├── top-bar.tsx          # Header with chat toggle
│   │   │   ├── ticket-artifact.tsx  # Ticket card component
│   │   │   ├── tearsheet.tsx        # Slide-up detail panel
│   │   │   └── ui/                  # Reusable UI components
│   │   └── App.tsx                  # Main application
│   ├── styles/
│   │   ├── index.css                # Global styles
│   │   ├── tailwind.css             # Tailwind imports
│   │   ├── theme.css                # Theme variables & scrollbar
│   │   └── fonts.css                # Font definitions
│   └── main.tsx                     # Application entry point
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Key Features Implementation

### Chat Panel States
- **Closed**: Hidden, chat button visible in top bar
- **Open (No Messages)**: Shows 4 product/metric widgets
- **Open (With Messages)**: Shows conversation with AI responses

### Ticket Workflow
1. User asks about network issues
2. AI responds with ticket artifact card
3. Click "View more" on ticket
4. Tearsheet slides up with full details
5. Tearsheet covers main content but not chat or header

### Layout Hierarchy
```
┌─────────────────────────────────────────┐
│  IBM Network Intelligence (Top Bar)     │
├───┬─────────────────────────────────┬───┤
│ S │                                 │ C │
│ i │      Main Content               │ h │
│ d │      (Dashboard)                │ a │
│ e │                                 │ t │
│ b │                                 │   │
│ a │                                 │ P │
│ r │                                 │ a │
│   │                                 │ n │
│   │                                 │ e │
│   │                                 │ l │
└───┴─────────────────────────────────┴───┘
```

## Customization

### Theme Colors
Edit `src/styles/theme.css` to customize colors and theme variables.

### AI Responses
Modify the `generateAIResponse` function in `src/app/App.tsx` to customize AI behavior.

### Widgets
Update the widget content in `src/app/components/chat-panel.tsx` (lines 80-120).

## Contributing

This project is part of IBM's internal tools. For contributions, please follow IBM's standard development practices.

## License

IBM Confidential - Internal Use Only

## Original Design

Based on the Figma design: https://www.figma.com/design/AQR37e2fhv6pj9TzKh2g6h/Interactive-Chat-Demo

---

Built with ❤️ by IBM