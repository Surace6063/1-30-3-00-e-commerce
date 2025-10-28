const HeroSection = () => {
  return (
      <section className="bg-white">
        <div className="container py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              Discover the Best Deals on{" "}
              <span className="text-slate-800">Trendy Products</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              ShopEase brings you exclusive collections with unbeatable prices.
              Upgrade your style and essentials today with just a click.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn btn-primary">Shop Now</button>
              <button className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80"
              alt="Shopping bags"
              className="rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg object-cover object-center"
            />
          </div>
        </div>
    </section>
  )
}
export default HeroSection