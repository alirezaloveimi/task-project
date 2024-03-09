import Icons from "../../Data/Icons";

const Table = ({
  users,
  showDeleteModal,
  showInfoModal,
  showEditModal,
  showChartModal,
  showMapModla,
}) => {
  return (
    <div className="table-wrapper w-full my-3 overflow-y-auto">
      <table className=" w-full border-collapse border-spacing-0 bg-white min-w-[900px]">
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>کد ملی</th>
            <th className="text-center">عملیات ها</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.family}</td>
                <td>{user.code}</td>
                <td className="flex-center-center gap-3">
                  <button
                    onClick={() => showInfoModal(user)}
                    type="button"
                    className="table-btn bg-slate-500 grid-center"
                  >
                    {Icons.info}
                  </button>
                  <button
                    onClick={() => showEditModal(user)}
                    type="button"
                    className="table-btn bg-yellow-500 grid-center"
                  >
                    {Icons.edit}
                  </button>
                  {user.data && (
                    <button
                      onClick={() => showChartModal(user)}
                      type="button"
                      className="table-btn bg-green-500 grid-center"
                    >
                      {Icons.chart}
                    </button>
                  )}
                  {user.map && (
                    <button
                      onClick={() => showMapModla(user.map)}
                      type="button"
                      className="table-btn bg-cyan-500 grid-center"
                    >
                      {Icons.map}
                    </button>
                  )}
                  <button
                    onClick={() => showDeleteModal(user.id)}
                    type="button"
                    className="table-btn bg-red-600 grid-center"
                  >
                    {Icons.delete}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>کاربری یافت نشد</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
