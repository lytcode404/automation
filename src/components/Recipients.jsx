const RecipientList = ({ recipients }) => {
    return (
      <div>
        <h2>Recipients:</h2>
        <ul>
          {recipients.map((recipient, index) => (
            <li key={index}>{recipient}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecipientList;
  