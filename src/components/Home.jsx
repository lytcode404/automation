import { useState } from "react";
import { read, utils } from "xlsx";
import { validate } from "email-validator";
import FileUploader from "./FileUploader";
import RecipientList from "./Recipients";
import EmailForm from "./EmailForm";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAllRecipients } from "@/store/recipients";
const Home = () => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        const emailColumnIndex = 0; // Modify this if your email column is in a different position
        const emails = jsonData
          .map((row) => row[emailColumnIndex])
          .filter((email) => validate(email));
        setRecipients(emails);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const sendEmail = async (recipient, subject, body) => {
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
    // const { subject, body } = values;
    console.log(subject, body, recipients.length);
    for (const recipient of recipients) {
      if (recipient && subject && body) {
        await sendEmail(recipient, subject, body);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second
      }
    }
  };

  const handleSubmit = () => {
    dispatch(setAllRecipients(recipients));
    const query = {
      subject: subject,
      message: body
    };
    router.push({
      pathname: "/",
      query: query,
    });
  };

  

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center bg-gray-100 p-8 gap-6">
      <h1 className="text-4xl text-black font-bold">Email App</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="mr-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Upload
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Recipients:</h2>
              <ul className="list-disc pl-6">
                {recipients.map((recipient, index) => (
                  <li key={index}>{recipient}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Subject"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <textarea
              value={body}
              onChange={handleBodyChange}
              placeholder="Body"
              className="w-full p-2 h-32 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
