import {useState,useEffect} from "react";

function Home()
{
    const[text,setText]=useState("")
    const[responseData,setResponseData]=useState(null)
    const [loading, setLoading] = useState(false); // ✅ loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const payload = { question:text}; // data to send
    console.log(payload)

    const res = await fetch("https://ec2-13-48-104-182.eu-north-1.compute.amazonaws.com/AIGenerator/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data)
    setResponseData(data); 
    console.log(responseData,1)
  };

  useEffect(() => {
    if (responseData) {
      console.log("Data posted successfully:", responseData);
      setLoading(false)
    }
  }, [responseData]); // dependency array


    return (
    <>

        <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div className="card p-4 shadow" style={{ width: "700px" }}>
        <h4 className="text-center mb-3">SmartReply AI</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInput" className="form-label">
              Enter Your Text
            </label>
            <input
              type="text"
              placeholder="Type something..."
              className="form-control"
              id="exampleInput"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" onClick={() => {
          const value = document.getElementById("exampleInput").value; // 👈 yaha se value lete hain
        setText(value); // aur function me pass karte hain
        }}>
            Submit
          </button>
        </form>

        <div className="mt-3">
          <label htmlFor="floatingTextarea2" className="form-label">
            Response
          </label>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: "400px" }}
            value={
              loading
                ? "⏳ Please wait... Generating response..."
                : responseData?.result || ""
            }
            readOnly
          />
          <h6>Made By Pranav</h6>
        </div>
      </div>
    </div>

       </>
);
}

export default Home;


