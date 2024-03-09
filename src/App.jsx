import { useEffect, useState } from "react";

// librarys
import { CSSTransition } from "react-transition-group";
import Chart from "react-apexcharts";
import GoogleMapReact from "google-map-react";

// components
import Accordin from "./Components/Accordin/Accordin";
import Table from "./Components/Table/Table";
import Modal from "./Components/Modal/Modal";
import Marker from "./Components/Marker/Marker";

// user data
import data from "./Data/users.json";
import Icons from "./Data/Icons";

const App = () => {
  // search input value
  const [searchValue, setSearchValue] = useState("");

  // set users in useState
  const [users, setUsers] = useState([...data.users]);

  // modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // states for user id and the user
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});

  // edit input state
  const [editName, setEditName] = useState("");
  const [editFamily, setEditFamily] = useState("");
  const [editCode, setEditCode] = useState("");

  // add new user states
  const [newUserName, setNewUserName] = useState("");
  const [newUserFamily, setNewUserFamily] = useState("");
  const [newUserCode, setNewUserCode] = useState("");

  // chart state
  const [chartOption, setChartOption] = useState({
    grid: {
      strokeDashArray: 6,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ["#22c55e"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          tooltip: {
            enabled: false,
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  });

  // map state
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  // reset inputs functions
  const clearEditModalInputs = () => {
    setEditCode("");
    setEditName("");
    setEditFamily("");
  };

  const clearNewUserInputs = () => {
    setNewUserName("");
    setNewUserCode("");
    setNewUserFamily("");
  };

  // reset the user id whene modal edit closed
  useEffect(() => {
    if (!showEditModal) {
      clearEditModalInputs();
    }
  }, [showEditModal]);

  // reset the user id whene modal info closed
  useEffect(() => {
    if (!showInfoModal) {
      setUser({});
    }
  }, [showInfoModal]);

  // useEffect for whene edit modal state change
  useEffect(() => {
    if (showEditModal) {
      setEditName(user.name);
      setEditFamily(user.family);
      setEditCode(user.code);
    } else {
      setUser({});
      setUserId(null);
    }
  }, [showEditModal]);

  // useEffect for whene map modal state change
  useEffect(() => {
    if (!showMapModal) {
      setPosition({
        lat: 0,
        lng: 0,
      });
    }
  }, [showMapModal]);

  // functions for update and clear input
  const updateInput = (e) => setSearchValue(e.target.value);
  const resetInputValue = () => setSearchValue("");

  // delete modal events
  const hideDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };
  const showDeleteModalHandler = (id) => {
    setShowDeleteModal(true);
    setUserId(id);
  };
  const deleteUser = () => {
    const copyUsers = [...users];

    const newUsers = copyUsers.filter((user) => user.id !== userId);

    setUsers(newUsers);
    hideDeleteModalHandler();
  };

  // info modal events
  const hideInfoModalHandler = () => {
    setShowInfoModal(false);
  };
  const showInfoModalHandler = (userInfo) => {
    setShowInfoModal(true);
    setUser(userInfo);
  };

  // edit modal events
  const hideEditModalHandler = () => {
    setShowEditModal(false);
  };
  const showEditModalHandler = (userInfo) => {
    setShowEditModal(true);
    setUser(userInfo);
    setUserId(userInfo.id);
  };
  const updateUserInfo = () => {
    if (!String(editCode).trim() || !editFamily.trim() || !editName.trim()) {
      alert("بابا انپوت خالی نزار");
      return;
    }
    const updateObj = {
      ...user,
      id: userId,
      name: editName,
      family: editFamily,
      code: editCode,
      fullName: editName + " " + editFamily,
    };

    const copyUsers = [...users];

    copyUsers.forEach((user) => {
      if (user.id === userId) {
        Object.assign(user, updateObj);
      }
    });

    setUsers(copyUsers);
    hideEditModalHandler();
  };

  // chart modal events
  const hideChartModalHandler = () => {
    setShowChartModal(false);
  };
  const showChartModalHandler = (userInfo) => {
    setShowChartModal(true);
    setUser(userInfo);
  };

  // add new user events
  const hideNewUserModalHandler = () => {
    setShowAddNewUserModal(false);
  };
  const addNewUserHandler = () => {
    if (!newUserName.trim() || !newUserFamily.trim() || !newUserCode.trim()) {
      alert("بابا یه چیزی رو خالی نزار");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: newUserName,
      family: newUserFamily,
      code: newUserCode,
      fullName: newUserName + " " + newUserFamily,
    };

    const copyUsers = [...users];

    copyUsers.push(newUser);
    setUsers(copyUsers);
    hideNewUserModalHandler();
    clearNewUserInputs();
  };

  // map modal events
  const hideMapModalHandler = () => {
    setShowMapModal(false);
  };
  const showMapModalHandler = (pos) => {
    setShowMapModal(true);
    setPosition(pos);
  };

  // filter user by writing in input
  const filterItems = () => {
    return users.filter((item) =>
      searchValue.trim() === "" ? item : item.fullName.includes(searchValue)
    );
  };

  return (
    <>
      <div className="container">
        {/* accordin */}
        <Accordin
          value={searchValue}
          onChangeHandler={updateInput}
          clearInput={resetInputValue}
        />

        {/* add new user button */}
        <div className="mb-5">
          <button
            onClick={() => setShowAddNewUserModal(true)}
            type="button"
            className="flex-align-center bg-primary text-white py-2 px-6 rounded-lg"
          >
            <span>{Icons.add}</span>
            <span>افزودن کاربر</span>
          </button>
        </div>

        {/* users table */}
        <Table
          users={filterItems()}
          showDeleteModal={showDeleteModalHandler}
          showInfoModal={showInfoModalHandler}
          showEditModal={showEditModalHandler}
          showChartModal={showChartModalHandler}
          showMapModla={showMapModalHandler}
        />
      </div>

      {/* delete modal */}
      <CSSTransition
        in={showDeleteModal}
        timeout={300}
        classNames={"modal"}
        unmountOnExit
      >
        <Modal
          title=" آیا از حذف کاربر مطمئن هستید ؟"
          icon={Icons.closeModal}
          onHide={hideDeleteModalHandler}
          color="text-red-500"
        >
          <div className="mt-6 flex-center-center gap-3">
            <button
              onClick={deleteUser}
              type="button"
              className="modal-btn bg-primary"
            >
              بله
            </button>
            <button
              onClick={hideDeleteModalHandler}
              type="button"
              className="modal-btn bg-red-500"
            >
              خیر
            </button>
          </div>
        </Modal>
      </CSSTransition>

      {/* info modal */}
      <CSSTransition
        in={showInfoModal}
        timeout={300}
        classNames={"modal"}
        unmountOnExit
      >
        <Modal
          onHide={hideInfoModalHandler}
          color="text-slate-500"
          icon={Icons.info}
          title="طلاعات کاربر"
        >
          <ul className="my-5 space-y-3 [&>*]:text-sm [&>*]:sm:text-base ">
            <li>نام : {user?.name}</li>
            <li>نام خانوادگی : {user?.family}</li>
            <li>کد ملی : {user?.code}</li>
          </ul>

          <button
            onClick={hideInfoModalHandler}
            type="button"
            className="modal-btn bg-red-500 w-full py-4"
          >
            خروج
          </button>
        </Modal>
      </CSSTransition>

      {/* edit modal */}
      <CSSTransition
        in={showEditModal}
        timeout={300}
        classNames={"modal"}
        unmountOnExit
      >
        <Modal
          onHide={hideEditModalHandler}
          icon={Icons.edit}
          color="text-yellow-500"
          title="ویرایش اطلاعات کاربر"
        >
          <form className="flex flex-col space-y-2">
            <input
              onChange={(e) => setEditName(e.target.value)}
              className="modal-input"
              type="text"
              placeholder="اسم"
              value={editName}
            />
            <input
              onChange={(e) => setEditFamily(e.target.value)}
              className="modal-input"
              type="text"
              placeholder="فامیل"
              value={editFamily}
            />
            <input
              onChange={(e) => setEditCode(e.target.value)}
              className="modal-input"
              type="text"
              placeholder="کد ملی"
              value={editCode}
            />
          </form>

          <div className="flex-center-center mt-4 gap-3">
            <button
              onClick={updateUserInfo}
              type="button"
              className="modal-btn bg-primary"
            >
              بروزرسانی
            </button>
            <button
              onClick={hideEditModalHandler}
              type="button"
              className="modal-btn bg-red-500"
            >
              بستن
            </button>
          </div>
        </Modal>
      </CSSTransition>

      {/* chart modal */}
      <CSSTransition
        in={showChartModal}
        timeout={300}
        classNames={"modal"}
        unmountOnExit
      >
        <Modal
          color={"text-green-500"}
          onHide={hideChartModalHandler}
          icon={Icons.chart}
          title="نمودار ورود کاربر"
        >
          <Chart
            options={chartOption}
            series={user.data || []}
            type="area"
            width="100%"
          />
          <button
            onClick={hideChartModalHandler}
            type="button"
            className="modal-btn bg-red-500 w-full mt-3"
          >
            بستن
          </button>
        </Modal>
      </CSSTransition>

      {/* add new user modal */}
      <CSSTransition
        in={showAddNewUserModal}
        timeout={300}
        unmountOnExit
        classNames="modal"
      >
        <Modal
          onHide={hideNewUserModalHandler}
          title="کاربر جدیدی ایجاد کنید"
          icon={Icons.add}
          color={"text-primary"}
        >
          <form className="flex flex-col gap-4">
            <input
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              type="text"
              className="modal-input"
              placeholder="نام"
            />
            <input
              value={newUserFamily}
              onChange={(e) => setNewUserFamily(e.target.value)}
              type="text"
              className="modal-input"
              placeholder="نام خانوادگی"
            />
            <input
              value={newUserCode}
              onChange={(e) => setNewUserCode(e.target.value)}
              type="text"
              className="modal-input"
              placeholder="کد ملی"
            />
          </form>

          <div className="flex-align-center gap-3 mt-4">
            <button
              onClick={addNewUserHandler}
              type="button"
              className="modal-btn bg-primary"
            >
              ثبت
            </button>
            <button
              onClick={hideNewUserModalHandler}
              type="button"
              className="modal-btn bg-red-500"
            >
              بستن
            </button>
          </div>
        </Modal>
      </CSSTransition>

      {/* map modal */}
      <CSSTransition
        in={showMapModal}
        timeout={300}
        unmountOnExit
        classNames="modal"
      >
        <Modal
          onHide={hideMapModalHandler}
          title="موقعیت مکانی کاربر"
          icon={Icons.map}
          color={"text-cyan-500"}
        >
          <div className="w-full h-[300px]">
            <GoogleMapReact
              center={position}
              defaultZoom={17}
              bootstrapURLKeys={{
                key: "AIzaSyBBMDiwkne3NdFfEfqdtDbIYMh3oEIGNx0",
              }}
              options={{ fullscreenControl: false }}
            >
              <Marker lat={position.lat} lng={position.lng} />
            </GoogleMapReact>
          </div>
          <button
            onClick={hideMapModalHandler}
            type="button"
            className="modal-btn bg-red-500 w-full mt-3"
          >
            بستن
          </button>
        </Modal>
      </CSSTransition>
    </>
  );
};

export default App;
