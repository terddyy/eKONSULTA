import './globals.css';

export const metadata = {
  title: 'AI Doctor Chatbot',
  description: 'A virtual medical assistant for AI-powered health consultations and symptom analysis',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#10b981', // Emerald 600 color
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  },
  openGraph: {
    title: 'E-Konsulta - AI Medical Assistant',
    description: 'Get instant medical guidance, symptom analysis, and health advice from our advanced AI assistant.',
    url: 'https://ekonsulta.ai',
    siteName: 'E-Konsulta',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Konsulta AI Medical Assistant'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// Watermark component with multiple security layers
const SecureWatermark = () => {
  return (
    <>
      {/* Fixed watermark */}
      <div className="fixed bottom-2 right-2 opacity-70 hover:opacity-100 text-xs transition-opacity z-[9999] font-sans pointer-events-none select-none">
        <a 
          href="https://www.facebook.com/TERDTHEPRO"
          target="_blank" 
          rel="noopener noreferrer"
          className="text-accent hover:text-blue-600 transition-colors flex items-center pointer-events-auto"
          style={{ textShadow: '0 0 1px rgba(0,0,0,0.3)' }}
        >
          <span>Developed by Terd 2025</span>
        </a>
      </div>

      {/* Pseudo-random watermarks */}
      <div 
        className="fixed inset-0 pointer-events-none select-none z-[9998] opacity-[0.02]"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text x=\"50%\" y=\"50%\" font-size=\"8\" text-anchor=\"middle\" fill=\"currentColor\">Terd 2025</text></svg>')",
          backgroundRepeat: 'repeat',
          transform: 'rotate(-45deg)',
        }}
      />

      {/* Hidden identifier */}
      <div 
        className="fixed opacity-0 pointer-events-none select-none"
        data-watermark="terd-2025"
        style={{ display: 'none' }}
      >
        Developed by Terd 2025 - All rights reserved
      </div>
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Anti-tampering CSS */
            [data-watermark] { display: none !important; }
            .watermark-protection::before { content: 'Developed by Terd 2025'; }
            @media print { body::after { content: 'Developed by Terd 2025'; position: fixed; bottom: 0; right: 0; } }
          `
        }} />
      </head>
      <body className="bg-gray-50">
        {children}
        <SecureWatermark />
        
        {/* Script for viewport height adjustment on mobile */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Fix for mobile viewport height issues (especially iOS)
            function setVH() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            
            // Set initially and on resize
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);
          `
        }} />
        
        {/* Inline script for additional protection */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Anti-removal protection
            (function() {
              function checkWatermark() {
                const watermarks = document.querySelectorAll('[data-watermark]');
                if (watermarks.length === 0) {
                  console.warn('Watermark tampering detected');
                  location.reload();
                }
              }
              
              // Check periodically
              setInterval(checkWatermark, 1000);
              
              // Prevent inspection removal
              document.addEventListener('contextmenu', function(e) {
                const target = e.target;
                if (target.closest('.watermark-protection') || target.closest('[data-watermark]')) {
                  e.preventDefault();
                }
              });
            })();
          `
        }} />
      </body>
    </html>
  );
} 