import { useEffect, useState } from "react";
import Home from "../components/Home.jsx";
import Header from "../components/Header.jsx";
import Heading from "../components/Heading.jsx";
import CTA from "../components/CTA.jsx";
import Cards from "../components/Cards.jsx";
import Table from "../components/Table.jsx";
import { useSelector } from "react-redux";
import { useRouter } from "next/router.js";

const IndexPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [recipientsStatus, setRecipientsStatus] = useState([]);
  const router = useRouter();
  const recipients = useSelector((state) => state.recipients);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    if (recipients) {
      const initialStatus = recipients.map((recipient) => ({
        email: recipient,
        status: "Pending",
      }));
      setRecipientsStatus(initialStatus);
    }
  }, [recipients]);

  const { subject, message } = router.query;
  let i = 0;
  const sendEmail = async (recipient, subject, body, i) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, subject, body }),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
        setRecipientsStatus((prev) =>
          prev.map((recipientStatus, index) =>
            index === i
              ? { ...recipientStatus, status: "Sent" }
              : recipientStatus
          )
        );
        setSent((prevSent) => prevSent + 1);
      } else {
        console.error(
          "Error sending email:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSend = async () => {
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (recipient && subject && message) {
        await sendEmail(recipient, subject, message, i);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second
      }
    }
  };

  return (
    <div className="w-full">
      <div class="flex flex-col flex-1 w-full">
        <Header />
        <main class="h-full overflow-y-auto">
          <div class="container px-6 mx-auto grid">
            <Heading />
            {/* <!-- CTA --> */}
            <CTA />
            {/* <!-- Cards --> */}
            <Cards length={recipients.length} sent={sent} />
            {/* <!-- Table --> */}
            {recipients.length > 0 && subject && message ? (
              <>
                <div>
                  <div className="w-full h-auto p-2 mb-4 border border-gray-300 rounded">
                    {subject}
                  </div>
                  <div className="w-full p-2 h-auto border border-gray-300 rounded">
                    {message}
                  </div>
                  <button
                    onClick={handleSend}
                    className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Send
                  </button>
                </div>

                <Table data={recipientsStatus} />
              </>
            ) : (
              "NO DATA FOUND , CREATE AUTOMATION"
            )}

            {/* <!-- Charts --> */}
            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Charts
            </h2>
            <div class="grid gap-6 mb-8 md:grid-cols-2">
              <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Revenue
                </h4>
                <canvas id="pie"></canvas>
                <div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  {/* <!-- Chart legend --> */}
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                    <span>Shirts</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                    <span>Shoes</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                    <span>Bags</span>
                  </div>
                </div>
              </div>
              <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Traffic
                </h4>
                <canvas id="line"></canvas>
                <div class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  {/* <!-- Chart legend --> */}
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                    <span>Organic</span>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                    <span>Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <Sidebar/> */}
    </div>
  );
};

export default IndexPage;
