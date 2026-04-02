# Holy Grail Files 🛡️

**The Master Vault for Software Engineering Excellence.**

Holy Grail Files is a high-performance, professional knowledge base and documentation platform built with **Next.js 16 (Turbopack)**. It transforms local Markdown and raw source code files into a beautiful, interactive "Vault" with a sophisticated "Black & White" monochromatic aesthetic.

---

## 🌓 Core Philosophy: The Monochromatic Vault

The platform is designed with a **Deep Monochromatic Aesthetic**—shifting away from traditional "Blue Accents" to a premium, high-contrast **Black & White** system. It features a seamless theme toggle that respects the technical, minimalist nature of deep software research.

### ✨ Key Features

1.  **🚀 Universal Content Pipeline**:
    *   **Recursive Crawler**: Automatically indexes both Markdown (`.md`, `.mdx`) and Raw Source Code (`.c`, `.cpp`, `.py`, `.js`, etc.).
    *   **Automatic Wrapping**: Raw source files are instantly wrapped in high-fidelity code blocks with correct syntax detection.
    *   **MDX Escaping**: Robust character escaping ensures that raw source code won't break the build during MDX/Acorn parsing.

2.  **🖥️ VS Code Style Code Blocks**:
    *   **Shiki-Powered**: Uses the same engine as VS Code for pixel-perfect syntax highlighting.
    *   **Editor UI**: Features tab-like headers with filenames, language icons, and sticky navigation.
    *   **Line Numbers & Gutter**: Industry-standard code gutters for easy reference.
    *   **Overflow Stability**: Strict layout control for long lines on both desktop and mobile.

3.  **📱 Fully Responsive Mobile Navigation**:
    *   **Sticky Mobile Header**: A sleek header with a hamburger menu for quick access on small screens.
    *   **Animated Drawer**: A high-performance slide-out sidebar using `framer-motion` for tablet and phone navigation.

4.  **📑 MDX Enhanced Content**:
    *   Supports custom components like `Notes`, `Quizzes`, and `CodeBlocks` for a rich learning experience.
    *   Monochromatic breadcrumbs for effortless navigation through deep directory trees.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Highlighting**: [Shiki](https://shiki.matsu.io/)
*   **Content**: [MDX Remote](https://github.com/hashicorp/next-mdx-remote)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+)
*   [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/holy-grail-files.git
    cd holy-grail-files
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Start the development server**:
    ```bash
    pnpm dev
    ```

4.  **Build for production**:
    ```bash
    pnpm build
    ```

---

## 📁 Directory Structure

*   `app/`: Next.js 16 App Router pages and global layouts.
*   `components/`: Reusable UI components (Sidebar, MobileNav, MDX components).
*   `content/`: The source of truth. Add your `.mdx` or raw code files here to see them in the vault.
*   `lib/`: Core logic for the content crawler, sidebar generation, and syntax highlighting.
*   `public/`: Static assets and fonts.

---

> [!NOTE]  
> This platform is currently in **v2.4 Vault Protocol** active development.

> [!IMPORTANT]  
> All source code files are escaped in the pipeline to prevent MDX parsing errors. If you see broken characters in the code blocks, ensure your file encoding is UTF-8.

---

Built with ❤️ for Software Engineers.
© 2026 Holy Grail Files.
