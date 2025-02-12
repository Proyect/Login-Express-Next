'use client';

export default function Users() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function fetchUsers() {
        try {
          const res = await axios.get("http://127.0.0.1:5000/api/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setUsers(res.data);
        } catch (err) {
          alert("Failed to fetch users");
        }
      }
      fetchUsers();
    }, []);
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }