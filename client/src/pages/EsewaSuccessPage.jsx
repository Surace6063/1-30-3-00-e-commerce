import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";

const EsewaSuccessPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyEsewa = async () => {
      try {
        const res = await apiRequest.post("/orders/esewa/verify/", {
          order_id: id,
          data: data,
        });
        console.log("✅ Esewa verification success:", res.data);
        setVerifying(false);

        // Redirect after 5 seconds
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.error(" Esewa verification failed:", error);
        setVerifying(false);
      }
    };

    if (id && data) {
      verifyEsewa();
    }
  }, [id, data, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-96">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-opacity-70 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-emerald-700">
              Verifying your Esewa payment...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your transaction.
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-emerald-600 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-emerald-700">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-600 mt-2">
              Your Esewa payment has been verified successfully.
            </p>
            <p className="text-gray-500 mt-3 text-sm">
              Redirecting you to your orders page in{" "}
              <span className="font-semibold text-emerald-600">5 seconds...</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EsewaSuccessPage;
