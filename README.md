
<p align="center">
  <a href="https://maurogioberti.com" target="_blank">
    <img alt="Mauro Gioberti" src="https://maurogioberti.com/assets/profile/maurogioberti-avatar.png" width="200" />
  </a>
</p>

<h1 align="center">
  Clean Architecture Template for Next.js 🚀
</h1>
<p align="center">
  Next.js Clean Architecture Template 🏗️
  <br />
  <br />
  <a href="https://github.com/maurogioberti/next-clean-architecture/stargazers">⭐ Stars are welcome 😊</a>
  <a href="https://github.com/maurogioberti/next-clean-architecture/issues">🐛 Report an issue</a>
  <a href="https://maurogioberti.com">🌐 Visit my site</a>
</p>

<p>
  <a href="https://www.codescouts.academy/" title="CodeScouts Academy" target="_blank">
    <img src="https://img.shields.io/badge/built_with-Codescouts-blue?style=for-the-badge" alt="Built with Codescouts" />
  </a>
</p>

<span>
  <img src="https://img.shields.io/badge/maintained-yes-green" alt="maintained - yes">
  <a href="https://github.com/maurogioberti/next-clean-architecture/contribute"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="contributions - welcome"></a>
  <a href="https://github.com/maurogioberti/next-clean-architecture/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license - MIT"></a>
</span>

---

## 🚀 Getting Started

⬇️ **Clone this repo**
```bash
git clone https://github.com/maurogioberti/next-clean-architecture.git
cd next-clean-architecture
```

🏂 **Install dependencies**
```bash
npm install
```

🏁 **Run the app**
```bash
npm run dev
```

## 📂 Folder Structure

This project is structured to align with **Clean Architecture** principles. This folder structure is designed to maximize separation of concerns and ensure testability, scalability, and maintainability.

Here's how it's organized:

```
project-root/
├── src/
│   ├── core/  # Clean Architecture Core Logic
│   │   ├── application/  # Use cases
│   │   │   └── get-message-usecase.ts --> Handles application-specific logic
│   │   ├── crosscutting/  # Shared utilities and cross-cutting concerns
│   │   │   └── injection/
│   │   │       └── DependencyInjectionContainer.ts --> Configures DI container and bindings
│   │   ├── domain/  # Business rules
│   │   │   ├── events/
│   │   │   │   └── MessageEvent.ts --> Represents a domain event for notifications
│   │   │   ├── model/
│   │   │   │   ├── Message.ts --> Models a message entity
│   │   │   │   └── User.ts --> Models a user entity
│   │   │   ├── repository/
│   │   │   │   └── MessageRepository.ts --> Interface for message repository
│   │   │   └── services/
│   │   │       └── MessageService.ts --> Interface for message service
│   │   └── infrastructure/  # External service implementations
│   │       ├── repository/
│   │       │   └── MessageRepositoryImpl.ts --> Concrete implementation of MessageRepository
│   │       └── services/
│   │           └── MessageServiceImpl.ts --> Handles message service
│   └── app/  # Next.js UI and pages
│       ├── layout.tsx --> Global layout
│       ├── pages/  # Next.js pages
│       │   ├── page.tsx --> Page Home component (View)
│       │   └── homeViewModel.ts --> Page Home UI business logic (ViewModel)
│       └── components/  # Reusable UI components
│           └── HomeBanner.tsx --> Example of a reusable banner component
├── public/  # Static assets (e.g., favicon)
│   └── favicon.ico --> Example favicon
└── di.ts  # Dependency injection configuration
```


## 🧪 Testing

Clean Architecture makes testing simple:

- **Isolated Layers**: Test each layer independently (Domain, Application, Infrastructure).
- **Mockable Dependencies**: Easily replace services and repositories with mocks.
- **Solid Coverage**: Unit and integration tests for core; smoke tests suggested for UI.

## ✨ Naming Conventions

Consistency is key! Here's the naming convention used in this project:


| Layer                      | Example Filename             | Convention         | Purpose                                      | Notes                          |
|----------------------------|------------------------------|--------------------|----------------------------------------------|--------------------------------|
| Pages                      | `page.tsx`                   | camelCase          | UI entry points for each route               | Represents Next.js pages       |
| Components                 | `HomeBanner.tsx`             | PascalCase         | Reusable UI components                       | Stateless, reusable pieces     |
| ViewModels                 | `homeViewModel.ts`           | camelCase          | UI business logic                            | Encapsulates state             |
| Domain Event               | `MessageEvent.ts`            | PascalCase         | Models domain-specific events                | Example: Notification triggers |
| Domain Model               | `Message.ts`                 | PascalCase         | Defines business entities                    | Core entities for the domain   |
| Domain Repository          | `MessageRepository.ts`       | PascalCase         | Abstracts data access logic                  | Interface for persistence      |
| Domain Service             | `MessageService.ts`          | PascalCase         | Encapsulates domain-specific operations      | Logic specific to the domain   |
| Application Use Cases      | `get-message-usecase.ts`     | kebab-case         | Implements application-specific workflows    | Directly consumes repositories |
| Infrastructure Repository  | `MessageRepositoryImpl.ts`   | PascalCase         | Implements domain repository interfaces      | Connects to external services  |
| Infrastructure Service     | `MessageServiceImpl.ts`      | PascalCase         | Implements domain service interfaces         | Example: Notifications backend |


## 🧑‍💻 About This Project

This is a **Clean Architecture** implementation in **Next.js**, inspired by [Damian Pumar](https://damianpumar.com) and the amazing work at [CodeScouts Academy](https://www.codescouts.academy/). 

Based on their approach to Clean Architecture, it does not use any of their libraries, as they are CSR-focused. Instead, we implemented our own methods to handle DI with SSR.

If you’re interested in Clean Architecture, check out their [React Template](https://github.com/codescouts-academy/react-clean-architecture).

## 🤔 Contributing

Feel free to fork this repository and send PRs with improvements or fixes. I’d love to hear your feedback or collaborate on cool ideas. Don’t hesitate to open an issue if something isn’t working as expected!

---

## 📜 License

Released under [MIT License](https://github.com/maurogioberti/next-clean-architecture/blob/master/LICENSE) by [Mauro Gioberti](https://maurogioberti.com).
