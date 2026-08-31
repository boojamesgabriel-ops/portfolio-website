This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. Push the `main` branch to [the GitHub repository](https://github.com/boojamesgabriel-ops/portfolio-website).
2. Open [Vercel](https://vercel.com/new), choose **Import Git Repository**, and select `boojamesgabriel-ops/portfolio-website`.
3. Keep the detected framework as **Next.js**. The build command is `npm run build` and the output directory should remain empty.
4. In **Environment Variables**, add the values below for Production, Preview, and Development:

| Variable | Purpose |
| --- | --- |
| `GITHUB_USERNAME` | The GitHub account shown in the activity panel. |
| `GITHUB_TOKEN` | A GitHub token with permission to read the contribution calendar. |
| `GMAIL_USER` | The Gmail address that sends contact-form messages. |
| `GMAIL_APP_PASSWORD` | A Gmail App Password, not the normal Gmail password. |
| `CONTACT_RECEIVER_EMAIL` | The inbox that receives messages from the portfolio form. |

5. Click **Deploy**. Future pushes to `main` will create production deployments automatically.

Use [`.env.example`](.env.example) as the variable-name reference. Keep real values in Vercel and in the untracked local `.env` file; never commit them.

The contact form runs in the Node.js runtime and uses Gmail SMTP. Before deployment, create a Gmail App Password with two-step verification enabled for the sending account.
