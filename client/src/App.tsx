import PeopleTable from "./components/peopleTable";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/people");
      setPeople(data.data.people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);
  return (
    <>
      <PeopleTable people={people} />
    </>
  );
}

export default App;
