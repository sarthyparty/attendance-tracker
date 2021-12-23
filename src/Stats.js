import {React,useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./Loading.js";
import { getMembers, updateMembers } from "./Utils.js";
import { useAsync } from "react-async";
import { Link } from "react-router-dom";

function Stats(props) {

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState("");
  const [error, setError] = useState(null);

  const { data } = useAsync({promiseFn: getMembers});

  const handleClick = () => {
    setLoading(true)
    setError(null)
    setMembers(members.trim())
    let mems = members.split("\n");
    console.log(mems)
    for (let i = 0; i < mems.length; i++) {
      console.log(mems[i])
      if (mems[i].split(" ").length != 2) {
        setError("Names must be first name space last name.")
        setLoading(false)
        return
      }
    }
    let list_comb = mems.concat(data.members);
    data.members = list_comb
    updateMembers(data)
    setLoading(false)

  }

  if (data) {
    return (
      <div class="stats">
      <h1>Statistics</h1>
      <br/>
        {data.members.map((person) => (
          <div class="mems">
            <div class="mem-body">
              <Link to={"/dashboard/member/"+person}>{person}</Link>
            </div>
          </div>
        ))}
        <br/>
        <div class="mems">
          <div class="mem-body">
            <textarea placeholder="Add Member" onChange={(e) => setMembers(e.target.value)}></textarea>
            
          </div>
        </div>
        <button value={loading ? 'Loading...' : 'Login'} onClick={handleClick} disabled={loading}>+</button>
        <br/>
        {error && <><small style={{ color: 'red' }}>{error}</small><br/><br></br></>}
      </div>
    );
  } 
  return <Loading/>;
  
}

export default Stats;
