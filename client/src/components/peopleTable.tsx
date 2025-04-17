import { PeopleType } from "@/types/mainTypes";

// Ganti nama komponen agar PascalCase (wajib di React)
const PeopleTable = ({ people }: { people: PeopleType[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Hobby</th>
          </tr>
        </thead>
        <tbody>
          {people.length > 0 ? (
            people.map((person, index) => (
              <tr key={person._id.toString()}>
                <th>{index + 1}</th>
                <td>{person._id.toString()}</td>
                {/* <td>{person.users[0].name}</td>
                <td>{person.users[0].email}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
