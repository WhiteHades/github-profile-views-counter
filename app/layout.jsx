import './globals.css';

export const metadata = {
  title: 'GitHub Profile Views Counter',
  description: 'Next.js deployment for GitHub profile view badges.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
