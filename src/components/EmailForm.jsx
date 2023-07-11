import { useState } from "react";

const EmailForm = ({ onSend }) => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
  
    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };
  
    const handleBodyChange = (event) => {
      setBody(event.target.value);
    };
  
    const handleSend = () => {
      onSend({subject, body});
    };
  
    return (
      <div>
        <input type="text" value={subject} onChange={handleSubjectChange} placeholder="Subject" />
        <textarea value={body} onChange={handleBodyChange} placeholder="Body" />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  };
  
  export default EmailForm;
  