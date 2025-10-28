const Footer = () => {
  return (
    <footer className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ShopEase</h2>
          <p className="mt-4 text-slate-500">
            Your one-stop shop for trendy products and exclusive deals.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            {/* Facebook */}
            <a
              href="#"
              className="text-slate-500 hover:text-slate-800"
              aria-label="Facebook"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-slate-500 hover:text-slate-800"
              aria-label="Twitter"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.12 9.12 0 01-2.88 1.1A4.52 4.52 0 0016.44 0c-2.63 0-4.77 2.14-4.77 4.77 0 .37.04.73.12 1.08C7.69 6.72 4.07 4.88 1.64 1.88a4.77 4.77 0 00-.64 2.4c0 1.66.85 3.12 2.13 3.98A4.52 4.52 0 012 7.77v.06c0 2.31 1.65 4.24 3.84 4.67a4.53 4.53 0 01-2.14.08 4.78 4.78 0 004.46 3.32A9.06 9.06 0 010 19.54a12.78 12.78 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.18 9.18 0 0023 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="text-slate-500 hover:text-slate-800"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.055 1.965.24 2.422.4a4.92 4.92 0 011.78 1.04 4.92 4.92 0 011.04 1.78c.16.457.345 1.25.4 2.422.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.965-.4 2.422a4.922 4.922 0 01-1.04 1.78 4.922 4.922 0 01-1.78 1.04c-.457.16-1.25.345-2.422.4-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.965-.24-2.422-.4a4.922 4.922 0 01-1.78-1.04 4.922 4.922 0 01-1.04-1.78c-.16-.457-.345-1.25-.4-2.422C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.055-1.17.24-1.965.4-2.422a4.92 4.92 0 011.04-1.78 4.92 4.92 0 011.78-1.04c.457-.16 1.25-.345 2.422-.4C8.416 2.172 8.8 2.16 12 2.16zm0-2.16C8.736 0 8.332.012 7.052.07 5.782.127 4.845.308 4.03.57A6.92 6.92 0 001.56 1.56a6.92 6.92 0 00-1.005 1.47C.308 3.155.127 4.092.07 5.362.012 6.642 0 7.046 0 12s.012 5.358.07 6.638c.057 1.27.238 2.207.57 3.022a6.92 6.92 0 001.47 1.005 6.92 6.92 0 001.47 1.005c.815.332 1.752.513 3.022.57C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.27-.057 2.207-.238 3.022-.57a6.92 6.92 0 001.47-1.005 6.92 6.92 0 001.005-1.47c.332-.815.513-1.752.57-3.022C23.988 17.668 24 17.264 24 12s-.012-5.358-.07-6.638c-.057-1.27-.238-2.207-.57-3.022a6.92 6.92 0 00-1.005-1.47 6.92 6.92 0 00-1.47-1.005c-.815-.332-1.752-.513-3.022-.57C15.668.012 15.264 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 106.162 6.162A6.169 6.169 0 0012 5.838zm0 10.162a4 4 0 114-4 4 4 0 01-4 4z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-slate-500">
            <li>
              <a href="/" className="hover:text-slate-800">Home</a>
            </li>
            <li>
              <a href="/shop" className="hover:text-slate-800">Shop</a>
            </li>
            <li>
              <a href="/about" className="hover:text-slate-800">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-slate-800">Contact</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-4">Support</h3>
          <ul className="space-y-2 text-slate-500">
            <li>
              <a href="#" className="hover:text-slate-800">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-800">Shipping</a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-800">Returns</a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-800">Contact Support</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-4">Subscribe</h3>
          <p className="text-slate-500 mb-4">
            Get the latest updates and offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-lg text-slate-800 focus:outline-none border border-slate-300"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-slate-200 pt-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;