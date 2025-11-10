const CheckOut = () => {
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div
        className="border border-slate-300 
        p-10 rounded-md shadow max-w-md w-full"
      >
        <h1 className="text-xl mb-6 font-semibold text-slate-800">
          Checkout Form
        </h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="method">Payment method</label>
            <select id="method" className="w-full">
              <option value="cod">Cash on delivery</option>
              <option value="e-sewa">E-Sewa</option>
            </select>
          </div>
          {/* full name */}
          <div>
            <label htmlFor="full-name">Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>

            {/* phone number */}
          <div>
            <label htmlFor="phone">Phone number</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>

             {/* shipping  address */}
          <div>
            <label htmlFor="address">Shipping address</label>
            <input type="text" placeholder="Enter your shipping address" />
          </div>

          <button className="btn btn-primary w-full">
             pay
          </button>
          

        </form>
      </div>
    </div>
  );
};
export default CheckOut;
