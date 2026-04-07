import './globals.css';

export const metadata = {
  title: 'Frontend Task',
  description: 'Authentication and profiles dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
