# AI Task Execution Guide

To ensure efficiency, minimize token usage, and maintain high code quality, follow these steps for every task.

## 1. Task Decomposition
Break every user request into the smallest possible atomic units. Do not attempt to solve the entire problem in one go if it involves more than 2-3 files or complex logic.

## 2. Planning Phase (Low Token Usage)
- **Review Rules:** Read `antigravity-rules.md` first.
- **Identify Files:** List only the files strictly necessary for the current sub-task.
- **Formulate Plan:** Write a concise plan (max 10-15 lines) outlining the specific changes.

## 3. Implementation Phase (Modular)
- **Modify, Don't Rewrite:** Change only the specific lines or functions needed. Avoid rewriting entire files.
- **Functional Components:** In React/Next.js, keep components focused and small (< 200 lines).
- **TypeScript First:** Ensure all new code is strictly typed. Avoid `any`.

## 4. Verification Phase
- **Check Lints/Types:** Run `npm run lint` or `tsc` if applicable.
- **Verify Logic:** Double-check the logic against the requirements in `project-plan.md`.
- **Build Clean:** Ensure `npm run build` succeeds before declaring a task finished.

## 5. Iteration
After completing a sub-task, report progress to the user and wait for feedback or move to the next atomic sub-task.

## Token Saving Tips
- Use `view_file` with specific line ranges if the file is large.
- Avoid listing large directories; use `find_by_name` or `grep_search` if you know what you are looking for.
- Do not repeat documentation that already exists in `/docs`.
